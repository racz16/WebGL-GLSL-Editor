import { Uri, workspace } from 'vscode';
import {
    IncludeDirective,
    IncludeGraph,
    IncludeGraphNode,
    IncludeResolutionError,
    IncludeResolverOptions,
    ResolvedInclude,
} from './include-types';

// Supports: #include "path" and #include <path>, with optional trailing //... or /* ... */ comments.
const INCLUDE_RE = /^\s*#\s*include\s+(?:"([^"]+)"|<([^>]+)>)\s*(?:(?:\/\/.*)|(?:\/\*.*\*\/\s*))?$/;

function uriKey(uri: Uri): string {
    return uri.toString(true);
}

function splitIncludePath(p: string): Array<string> {
    return p.split(/[\\/]+/g).filter(Boolean);
}

async function readTextFile(uri: Uri): Promise<string> {
    const data = await workspace.fs.readFile(uri);
    return new TextDecoder('utf-8').decode(data);
}

export class IncludeResolver {
    public static scanDirectives(text: string): Array<IncludeDirective> {
        const directives: Array<IncludeDirective> = [];
        const lines = text.split(/\r?\n/g);
        for (let i = 0; i < lines.length; i++) {
            const lineText = lines[i];
            const m = INCLUDE_RE.exec(lineText);
            if (!m) {
                continue;
            }
            const quoted = m[1];
            const angled = m[2];
            directives.push({
                line: i,
                raw: lineText,
                path: (quoted ?? angled).trim(),
                kind: quoted ? 'quoted' : 'angled',
            });
        }
        return directives;
    }

    public static async buildGraph(
        root: Uri,
        rootText: string,
        options: IncludeResolverOptions
    ): Promise<IncludeGraph> {
        const graph: IncludeGraph = {
            root,
            nodes: new Map<string, IncludeGraphNode>(),
            errors: [],
        };

        if (!options.enabled) {
            graph.nodes.set(uriKey(root), { uri: root, includes: [] });
            return graph;
        }

        const totalBytes = { value: rootText.length };
        await this.visit(root, rootText, graph, options, [], totalBytes);
        return graph;
    }

    private static async visit(
        uri: Uri,
        text: string,
        graph: IncludeGraph,
        options: IncludeResolverOptions,
        stack: Array<string>,
        totalBytes: { value: number }
    ): Promise<void> {
        const key = uriKey(uri);
        if (graph.nodes.has(key)) {
            return;
        }

        // stack length corresponds to include nesting depth from the root.
        if (stack.length > options.maxDepth) {
            graph.errors.push({ from: uri, message: `Max include depth (${options.maxDepth}) exceeded.` });
            graph.nodes.set(key, { uri, includes: [] });
            return;
        }

        if (totalBytes.value > options.maxTotalBytes) {
            graph.errors.push({ from: uri, message: `Max include size (${options.maxTotalBytes} bytes) exceeded.` });
            graph.nodes.set(key, { uri, includes: [] });
            return;
        }

        const directives = this.scanDirectives(text);
        const includes: Array<ResolvedInclude> = [];
        graph.nodes.set(key, { uri, includes });

        for (const directive of directives) {
            if (directive.kind === 'angled' && !options.allowAngledIncludes) {
                graph.errors.push({
                    from: uri,
                    directive,
                    message: 'Angled includes (<...>) are disabled by configuration.',
                });
                continue;
            }

            const resolved = await this.resolveInclude(uri, directive, options, graph.errors);
            if (!resolved) {
                continue;
            }

            const toKey = uriKey(resolved.to);
            if (stack.includes(toKey)) {
                graph.errors.push({ from: uri, directive, message: 'Include cycle detected.' });
                continue;
            }

            includes.push(resolved);

            try {
                const includedText = await readTextFile(resolved.to);
                totalBytes.value += includedText.length;
                await this.visit(resolved.to, includedText, graph, options, [...stack, toKey], totalBytes);
            } catch (e) {
                graph.errors.push({
                    from: uri,
                    directive,
                    message: `Failed to read include '${directive.path}': ${String(e)}`,
                });
            }
        }
    }

    private static async resolveInclude(
        from: Uri,
        directive: IncludeDirective,
        options: IncludeResolverOptions,
        errors: Array<IncludeResolutionError>
    ): Promise<ResolvedInclude | null> {
        if (!directive.path) {
            errors.push({ from, directive, message: 'Empty include path.' });
            return null;
        }

        const candidates: Array<Uri> = [];

        // 1) relative to current file
        if (directive.kind === 'quoted') {
            const rel = splitIncludePath(directive.path);
            candidates.push(Uri.joinPath(from, '..', ...rel));
        }

        // 2) search paths
        const segments = splitIncludePath(directive.path);
        for (const base of options.searchPaths) {
            candidates.push(Uri.joinPath(base, ...segments));
        }

        for (const candidate of candidates) {
            try {
                await workspace.fs.stat(candidate);
                return { from, to: candidate, directive };
            } catch {
                // try next
            }
        }

        errors.push({ from, directive, message: `Include not found: ${directive.path}` });
        return null;
    }
}
