import { Uri, TextDocument, ExtensionContext, DiagnosticCollection, languages } from 'vscode';
import { DocumentInfo } from './document-info';
import { Configurations } from './configurations';
import { Constants } from './constants';
import { HostDependent } from '../host-dependent';

export class GlslEditor {
    public static readonly CONFIGURATIONS = new Configurations();

    private static readonly documentInfos = new Map<string, DocumentInfo>();
    private static context: ExtensionContext;
    private static readonly collection = languages.createDiagnosticCollection(Constants.GLSL);

    public static initialize(context: ExtensionContext): void {
        this.context = context;
    }

    public static getContext(): ExtensionContext {
        return this.context;
    }

    public static processElements(document: TextDocument): void {
        const di = this.getDocumentInfo(document.uri);
        di.processElements(document);
    }

    public static getDocumentInfo(uri: Uri): DocumentInfo {
        const key = `${uri.scheme}:${uri.path}`;
        let di = this.documentInfos.get(key);
        if (!di) {
            di = new DocumentInfo(uri);
            this.documentInfos.set(key, di);
        }
        return di;
    }

    public static invalidateDocuments(): void {
        for (const di of this.documentInfos.values()) {
            di.invalidate();
            if (!di.getDocument().isClosed) {
                HostDependent.textChanged(di.getDocument());
            }
        }
    }

    public static getDiagnosticCollection(): DiagnosticCollection {
        return this.collection;
    }
}
