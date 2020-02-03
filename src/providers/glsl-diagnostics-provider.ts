import { TextDocument, DiagnosticCollection, Diagnostic } from 'vscode';
import { GlslEditor } from '../core/glsl-editor';
import { DocumentInfo } from '../core/document-info';

export class GlslDiagnosticsProvider {

    //TODO

    private document: TextDocument;
    private di: DocumentInfo;
    private diagnostics: Array<Diagnostic>;

    public textChanged(document: TextDocument, collection: DiagnosticCollection): void {
        if (document) {
            this.initialize(document);
            this.addUniqueDiagnostics();
            this.addAntlrGeneratedDiagnostics();
            collection.set(document.uri, this.diagnostics);
        } else {
            collection.clear();
        }
    }

    private initialize(document: TextDocument): void {
        GlslEditor.processDocument(document);
        this.di = GlslEditor.getDocumentInfo(document.uri);
        this.diagnostics = new Array<Diagnostic>();
        this.document = document;
    }

    private addUniqueDiagnostics(): void {
        for (const error of this.di.errors) {
            const diagnostic = error.toDiagnostic(this.document);
            this.diagnostics.push(diagnostic);
        }
    }

    private addAntlrGeneratedDiagnostics(): void {
        for (const error of this.di.generatedErrors) {
            const diagnostic = error.toDiagnostic();
            this.diagnostics.push(diagnostic);
        }
    }

}
