import { Uri, workspace } from 'vscode';
import { ExpandedDocument } from './expanded-document';
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

        if (!options.enabled) {
            const sm = new SourceMap();
            sm.appendSource(root, 0, rootText.length);
            return { root, text: rootText, sourceMap: sm, graph, errors };
        }

        const visited = new Set<string>();
        const { text, sourceMap } = await this.expandFile(root, rootText, errors, options, visited);
        return { root, text, sourceMap, graph, errors };
    }

    private static async expandFile(
        uri: Uri,
        text: string,
        errors: Array<IncludeResolutionError>,
        options: IncludeResolverOptions,
        visited: Set<string>
    ): Promise<{ text: string; sourceMap: SourceMap }> {
        const key = uri.toString(true);
        if (visited.has(key)) {
            // cycle already reported by graph builder; keep original text
            const sm = new SourceMap();
            sm.appendSource(uri, 0, text.length);
            return { text, sourceMap: sm };
        }
        visited.add(key);

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

            // Replace the include directive line with included file content.
            try {
                const includedText = await readTextFile(resolved.to);
                const expandedIncluded = await this.expandFile(resolved.to, includedText, errors, options, visited);
                out += expandedIncluded.text;
                sm.appendFrom(expandedIncluded.sourceMap);
            } catch (e) {
                errors.push({
                    from: uri,
                    directive: resolved.directive,
                    message: `Failed to expand include: ${String(e)}`,
                });
                // Fall back to keeping original line as-is.
                out += text.slice(start, end);
                sm.appendSource(uri, start, end);
            }
        }

        visited.delete(key);
        return { text: out, sourceMap: sm };
    }
}
