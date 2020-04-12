import { DocumentSemanticTokensProvider, TextDocument, CancellationToken, ProviderResult, SemanticTokens, SemanticTokensLegend, SemanticTokensBuilder } from "vscode";

import { GlslEditor } from "../core/glsl-editor";

export class GlslDocumentSemanticTokensProvider implements DocumentSemanticTokensProvider {

    public provideDocumentSemanticTokens(document: TextDocument, token: CancellationToken): ProviderResult<SemanticTokens> {
        GlslEditor.processElements(document);
        const di = GlslEditor.getDocumentInfo(document.uri);
        const legend = new GlslSemanticTokensLegend();
        const result = new SemanticTokensBuilder(legend);

        for (const semanticElement of di.semanticElements) {
            result.push(semanticElement.line, semanticElement.offset, semanticElement.length, semanticElement.code);
        }

        return result.build();
    }

}

export class GlslSemanticTokensLegend implements SemanticTokensLegend {
    public readonly tokenTypes = ['type', 'function'];
    public readonly tokenModifiers = [];
}