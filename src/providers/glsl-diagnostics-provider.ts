import { TextDocument, DiagnosticCollection, Diagnostic } from 'vscode';
import { GlslProcessor } from '../core/glsl-processor';
import { GlslDocumentInfo } from '../core/glsl-document-info';

export class GlslDiagnosticsProvider {

    //TODO: specifikáció alapján a többi hiba

    private document: TextDocument;
    private documentInfo: GlslDocumentInfo;
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
        GlslProcessor.processDocument(document);
        this.documentInfo = GlslProcessor.getDocumentInfo(document.uri);
        this.diagnostics = new Array<Diagnostic>();
        this.document = document;
    }

    private addUniqueDiagnostics(): void {
        for (const error of this.documentInfo.errors) {
            const diagnostic = error.toDiagnostic(this.document);
            this.diagnostics.push(diagnostic);
        }
    }

    private addAntlrGeneratedDiagnostics(): void {
        for (const error of this.documentInfo.generatedErrors) {
            const diagnostic = error.toDiagnostic();
            this.diagnostics.push(diagnostic);
        }
    }

}
