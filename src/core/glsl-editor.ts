import * as fs from 'fs';
import { Uri, TextDocument, ExtensionContext, DiagnosticCollection, languages } from 'vscode';
import { DocumentInfo } from './document-info';
import { Configurations } from './configurations';
import { GlslDiagnosticProvider } from '../providers/glsl-diagnostic-provider';
import { Constants } from './constants';

export class GlslEditor {

    public static readonly CONFIGURATIONS = new Configurations();

    private static readonly documentInfos = new Map<Uri, DocumentInfo>();
    private static context: ExtensionContext;
    private static readonly collection = languages.createDiagnosticCollection(Constants.GLSL);

    public static initialize(context: ExtensionContext): void {
        this.context = context;
    }

    public static getContext(): ExtensionContext {
        return this.context;
    }

    public static loadJson<T>(name: string): T {
        return JSON.parse(fs.readFileSync(`${this.context.extensionPath}/res/json/${name}.json`, 'utf8'));
    }

    public static processElements(document: TextDocument): void {
        const di = this.getDocumentInfo(document.uri);
        di.processElements(document);
    }

    public static getDocumentInfo(uri: Uri): DocumentInfo {
        let di = this.documentInfos.get(uri);
        if (!di) {
            di = new DocumentInfo(uri);
            this.documentInfos.set(uri, di);
        }
        return di;
    }

    public static invalidateDocuments(): void {
        for (const di of this.documentInfos.values()) {
            di.invalidate();
            if (!di.getDocument().isClosed) {
                new GlslDiagnosticProvider().textChanged(di.getDocument());
            }
        }
    }

    public static getDiagnosticCollection(): DiagnosticCollection {
        return this.collection;
    }

}
