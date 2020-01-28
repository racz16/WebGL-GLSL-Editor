import { DiagnosticSeverity, DiagnosticTag, Diagnostic, TextDocument, DiagnosticRelatedInformation } from 'vscode';
import { DiagnosticExtension } from './diagnostic-extension';
import { Helper } from '../helper/helper';
import { Interval } from '../scope/interval';

export class UniqueDiagnostic {

    public readonly severity: DiagnosticSeverity;
    public readonly message: string;
    public readonly interval: Interval;
    public readonly errorCode: string;
    public readonly extensions: Array<DiagnosticExtension>;
    public readonly tags: Array<DiagnosticTag>;

    public constructor(severity: DiagnosticSeverity, message: string, interval: Interval, errorCode?: string, tag?: DiagnosticTag, extensions = new Array<DiagnosticExtension>()) {
        this.severity = severity;
        this.message = message;
        this.interval = interval;
        this.errorCode = errorCode;
        this.extensions = extensions;
        if (tag) {
            this.tags = [tag];
        }
    }

    public toDiagnostic(document: TextDocument): Diagnostic {
        //TODO
        /*const diagnostic = new Diagnostic(Helper.intervalToRange(this.interval, document), this.message, this.severity);
        diagnostic.code = this.errorCode;
        diagnostic.relatedInformation = this.extensionsToRelatedInformations(document, this.extensions);
        diagnostic.tags = this.tags;
        return diagnostic;*/
        return null;
    }

    private extensionsToRelatedInformations(document: TextDocument, extensions: Array<DiagnosticExtension>): Array<DiagnosticRelatedInformation> {
        const infos = new Array<DiagnosticRelatedInformation>();
        for (const extension of extensions) {
            const info = this.extensionToRelatedInformation(extension, document);
            infos.push(info);
        }
        return infos;
    }

    private extensionToRelatedInformation(extension: DiagnosticExtension, document: TextDocument): DiagnosticRelatedInformation {
        //TODO
        /*const location = Helper.intervalToLocation(extension.interval, document);
        return new DiagnosticRelatedInformation(location, extension.message);*/
        return null;
    }

}
