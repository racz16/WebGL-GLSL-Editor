import { Uri, workspace } from 'vscode';
import { ExpandedDocument, ExpandedSource } from './expanded-document';
import { IncludeResolver } from './include-resolver';
import { IncludeResolutionError, IncludeResolverOptions, ResolvedInclude } from './include-types';
import { SourceMap } from './source-map';

async function readTextFile(uri: Uri): Promise<string> {
    const data = await workspace.fs.readFile(uri);
    return new TextDecoder('utf-8').decode(data);
}

function computeLineStartOffsets(text: string): Array<number> {
    const starts = [0];
    for (let i = 0; i < text.length; i++) {
        const c = text.charCodeAt(i);
        if (c === 10 /* \n */) {
            starts.push(i + 1);
        }
    }
    return starts;
}

function uriKey(uri: Uri): string {
    return uri.toString(true);
}

function getLineSliceOffsets(
    text: string,
    lineStartOffsets: Array<number>,
    line: number
): { start: number; end: number } {
    const start = lineStartOffsets[line] ?? text.length;
    const nextStart = lineStartOffsets[line + 1];
    const end = nextStart != null ? nextStart : text.length;
    return { start, end };
}

export class IncludeExpander {
    /**
     * Phase 2: produce expanded text + source map.
     * Later phases will feed this expanded text into the ANTLR pipeline.
     */
    public static async expand(
        root: Uri,
        rootText: string,
        options: IncludeResolverOptions
    ): Promise<ExpandedDocument> {
        const graph = await IncludeResolver.buildGraph(root, rootText, options);
        // Use the same backing array so expansion-time errors aren't dropped.
        const errors: Array<IncludeResolutionError> = graph.errors;

        const sources = new Map<string, ExpandedSource>();
        sources.set(uriKey(root), { uri: root, text: rootText, lineStarts: computeLineStartOffsets(rootText) });

        if (!options.enabled) {
            const sm = new SourceMap();
            sm.appendSource(root, 0, rootText.length);
            return { root, text: rootText, sourceMap: sm, sources, graph, errors };
        }

        const visited = new Set<string>();
        const { text, sourceMap } = await this.expandFile(root, rootText, errors, options, visited, sources);
        return { root, text, sourceMap, sources, graph, errors };
    }

    private static async expandFile(
        uri: Uri,
        text: string,
        errors: Array<IncludeResolutionError>,
        options: IncludeResolverOptions,
        visited: Set<string>,
        sources: Map<string, ExpandedSource>
    ): Promise<{ text: string; sourceMap: SourceMap }> {
        const key = uriKey(uri);
        if (visited.has(key)) {
            // cycle already reported by graph builder; keep original text
            const sm = new SourceMap();
            sm.appendSource(uri, 0, text.length);
            return { text, sourceMap: sm };
        }
        visited.add(key);

        if (!sources.has(key)) {
            sources.set(key, { uri, text, lineStarts: computeLineStartOffsets(text) });
        }

        const directives = IncludeResolver.scanDirectives(text);
        const lineToInclude = new Map<number, ResolvedInclude>();
        for (const d of directives) {
            const resolved = await IncludeResolver.tryResolveInclude(uri, d, options, errors);
            if (resolved) {
                lineToInclude.set(d.line, resolved);
            }
        }

        const lineStarts = computeLineStartOffsets(text);
        const lineCount = lineStarts.length;

        let out = '';
        const sm = new SourceMap();

        for (let line = 0; line < lineCount; line++) {
            const resolved = lineToInclude.get(line);
            const { start, end } = getLineSliceOffsets(text, lineStarts, line);

            if (!resolved) {
                out += text.slice(start, end);
                sm.appendSource(uri, start, end);
                continue;
            }

            // Preserve the include directive line for stable source mapping,
            // then inline the included content after it.
            out += text.slice(start, end);
            sm.appendSource(uri, start, end);

            try {
                const includedText = await readTextFile(resolved.to);
                const expandedIncluded = await this.expandFile(
                    resolved.to,
                    includedText,
                    errors,
                    options,
                    visited,
                    sources
                );
                out += expandedIncluded.text;
                sm.appendFrom(expandedIncluded.sourceMap);
            } catch (e) {
                errors.push({
                    from: uri,
                    directive: resolved.directive,
                    message: `Failed to expand include: ${String(e)}`,
                });
                // Keep going; the directive line is already emitted.
            }
        }

        visited.delete(key);
        return { text: out, sourceMap: sm };
    }
}
