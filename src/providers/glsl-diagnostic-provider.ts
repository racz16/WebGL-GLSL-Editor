import { exec, ChildProcess } from 'child_process';
import { Stream } from 'stream';
import { platform } from 'os';

import { TextDocument, DiagnosticCollection, Diagnostic, DiagnosticSeverity, Uri } from "vscode";
import { GlslEditor } from '../core/glsl-editor';

export class GlslDiagnosticProvider {

    private diagnostics = new Array<Diagnostic>();
    private document: TextDocument;
    private collection: DiagnosticCollection;

    private initialize(document: TextDocument, collection: DiagnosticCollection): void {
        this.document = document;
        this.collection = collection;
    }

    public textChanged(document: TextDocument, collection: DiagnosticCollection): void {
        this.initialize(document, collection);
        const platformName = this.getPlatformName();
        const extension = this.getExtension(document.uri);
        const stageName = this.getStageName(extension);
        const validatorPath = `${GlslEditor.getContext().extensionPath}\\res\\bin\\glslangValidator${platformName}`;
        this.executeCommand(validatorPath, stageName);
    }

    private executeCommand(validatorPath: string, stageName: string): void {
        const result = exec(`${validatorPath} --stdin -S ${stageName}`);
        result.stdout.on('data', (data: string) => {
            this.handleErrors(data);
        });
        result.stdout.on('close', () => {
            this.collection.set(this.document.uri, this.diagnostics);
        });

        this.provideInput(result);
    }

    private handleErrors(data: string): void {
        const rows = data.split('\r\n');
        for (const row of rows) {
            this.addDiagnostic(row);
        }
    }

    private addDiagnostic(row: string): void {
        if (!row.includes('compilation terminated') && !row.includes('No code generated')) {
            if (row.includes('ERROR: 0:')) {
                const t1 = row.substring(9);
                const i = t1.indexOf(':');
                const line = +t1.substring(0, i);
                const error = row.substring(9 + i + 2);
                this.diagnostics.push(new Diagnostic(this.document.lineAt(line - 1).range, error, DiagnosticSeverity.Error));
            } else if (row.includes('ERROR: ')) {
                const error = row.substring(7);
                this.diagnostics.push(new Diagnostic(this.document.lineAt(0).range, error, DiagnosticSeverity.Error));
            }
        }
    }

    private provideInput(result: ChildProcess): void {
        const stdinStream = new Stream.Readable();
        stdinStream.push(this.document.getText());
        stdinStream.push(null);
        stdinStream.pipe(result.stdin);
    }

    private getPlatformName(): string {
        switch (platform()) {
            case "win32": return 'Windows';
            case "linux": return 'Linux';
            case "darwin": return 'Mac';
            default: return '';
        }
    }

    private getExtension(uri: Uri): string {
        return uri.fsPath.substring(uri.fsPath.lastIndexOf('.'));
    }

    private getStageName(extension: string): string {
        switch (extension) {
            case '.vert':
            case '.vs':
                return 'vert';
            case '.frag':
            case '.fs':
                return 'frag';
            default:
                return '';
        }
    }

}