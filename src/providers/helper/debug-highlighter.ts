import { CancellationToken, DocumentHighlight, DocumentHighlightProvider, Position, ProviderResult, Range, TextDocument } from "vscode";
import { DocumentInfo } from "../../core/document-info";
import { GlslEditor } from "../../core/glsl-editor";

export class DebugHighlighter implements DocumentHighlightProvider {

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
        //return this.scopeHighlights();
        //return this.regionHighlight('scopelessInterfaceBlockRegions');
        return this.regionHighlight('forHeaderRegions');
    }

    private scopeHighlights(): Array<DocumentHighlight> {
        const scope = this.di.getScopeAt(this.position);
        return [new DocumentHighlight(scope.interval)];
    }

    private regionHighlight(region: string): Array<DocumentHighlight> {
        const result = new Array<DocumentHighlight>();
        //const offset = this.di.positionToOffset(this.position);
        for (const interval of this.di[region]) {
            if ((interval as Range).contains(this.position)) {
                result.push(new DocumentHighlight(interval));
            }
        }
        return result;
    }

}