import { DocumentSemanticTokensProvider, TextDocument, CancellationToken, ProviderResult, SemanticTokens, SemanticTokensLegend, SemanticTokensBuilder } from "vscode";
import { GlslEditor } from "../core/glsl-editor";

export class GlslDocumentSemanticTokensProvider implements DocumentSemanticTokensProvider {

    public provideDocumentSemanticTokens(document: TextDocument, token: CancellationToken): ProviderResult<SemanticTokens> {
        GlslEditor.processElements(document);
        const di = GlslEditor.getDocumentInfo(document.uri);
        const legend = new GlslSemanticTokensLegend();
        const result = new SemanticTokensBuilder(legend);

        for (const sr of di.getRegions().semanticRegions) {
            const realLine = sr.line - di.getInjectionLineCount();
            if (realLine >= 0) {
                result.push(realLine, sr.offset, sr.length, sr.code);
            }
        }

        return result.build();
    }

}

export class GlslSemanticTokensLegend implements SemanticTokensLegend {
    public readonly tokenTypes = [
        'type',     //user type
        'struct',   //builtin type
        'function'
    ];
    public readonly tokenModifiers = [];
}