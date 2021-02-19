import { CancellationToken, DocumentHighlight, DocumentHighlightProvider, Position, ProviderResult, TextDocument } from "vscode";
import { DocumentInfo } from "../../core/document-info";
import { GlslEditor } from "../../core/glsl-editor";

export class ScopeDebugHighlighter implements DocumentHighlightProvider {

    protected di: DocumentInfo;
    protected document: TextDocument;
    protected position: Position;

    protected initialize(document: TextDocument, position: Position): void {
        GlslEditor.processElements(document);
        this.di = GlslEditor.getDocumentInfo(document.uri);
        this.document = document;
        this.position = position;
    }

    public provideDocumentHighlights(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<DocumentHighlight[]> {
        this.initialize(document, position);
        const scope = this.di.getScopeAt(position);
        return [new DocumentHighlight(this.di.intervalToRange(scope.interval))];
    }

}