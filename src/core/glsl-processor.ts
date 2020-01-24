import { Uri, TextDocument } from 'vscode';
import { GlslDocumentInfo } from './glsl-document-info';

export class GlslProcessor {

    private static readonly documentInfos = new Map<Uri, GlslDocumentInfo>();

    public static processDocument(document: TextDocument): void {
        const documentInfo = this.getDocumentInfo(document.uri);
        documentInfo.processDocument(document);
    }

    public static getDocumentInfo(uri: Uri): GlslDocumentInfo {
        let documentInfo = this.documentInfos.get(uri);
        if (!documentInfo) {
            documentInfo = new GlslDocumentInfo(uri);
            this.documentInfos.set(uri, documentInfo);
        }
        return documentInfo;
    }

    //TODO: ez kell?
    /*
    public static getCaretScope(caretOffset: number): Scope {
        if (this.rootScope === null) {
            return null;
        }
        return this.getScope(this.rootScope, caretOffset);
    }

    private static getScope(scope: Scope, caretOffset: number): Scope {
        for (const child of scope.children) {
            if (child.interval.startIndex <= caretOffset && child.interval.stopIndex >= caretOffset) {
                return this.getScope(child, caretOffset);
            }
        }
        return scope;
    }
    */

}
