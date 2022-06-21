import { DocumentSemanticTokensProvider, TextDocument, CancellationToken, ProviderResult, SemanticTokens, SemanticTokensLegend, SemanticTokensBuilder, Range, Position } from "vscode";
import { DocumentInfo } from "../core/document-info";
import { GlslEditor } from "../core/glsl-editor";
import { SemanticRegion } from "../scope/regions/semantic-region";

export class GlslDocumentSemanticTokensProvider implements DocumentSemanticTokensProvider {

    private di: DocumentInfo;
    private result: SemanticTokensBuilder;

    private initialize(document: TextDocument): void {
        GlslEditor.processElements(document);
        this.di = GlslEditor.getDocumentInfo(document.uri);
        const legend = new GlslSemanticTokensLegend();
        this.result = new SemanticTokensBuilder(legend);
    }

    public provideDocumentSemanticTokens(document: TextDocument, token: CancellationToken): ProviderResult<SemanticTokens> {
        this.initialize(document);
        for (const sr of this.di.getRegions().semanticRegions) {
            this.addSemanticToken(sr);
        }
        return this.result.build();
    }

    private addSemanticToken(sr: SemanticRegion): void {
        const realLine = sr.token.line - this.di.getInjectionLineCount();
        if (realLine >= 0) {
            const range = new Range(new Position(sr.token.line - 1, sr.token.charPositionInLine), new Position(sr.token.line - 1, sr.token.charPositionInLine + sr.token.text.length));
            this.result.push(range, sr.type, sr.modifiers);
        }
    }

}

export class GlslSemanticTokensLegend implements SemanticTokensLegend {
    public readonly tokenTypes = [
        'type',     //user type
        'struct',   //builtin type
        'function',
        'variable',
    ];
    public readonly tokenModifiers = [
        'declaration',
        'definition',
        'readonly',
    ];
}