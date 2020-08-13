import { exec, ChildProcess } from 'child_process';
import { Stream } from 'stream';
import { platform } from 'os';
import { TextDocument, DiagnosticCollection, Diagnostic, DiagnosticSeverity, Uri, DiagnosticTag } from "vscode";
import { GlslEditor } from '../core/glsl-editor';
import { DocumentInfo } from '../core/document-info';
import { LogicalFunction } from '../scope/function/logical-function';
import { Scope } from '../scope/scope';
import { Element } from '../scope/element';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { VariableDeclaration } from '../scope/variable/variable-declaration';

export class GlslDiagnosticProvider {

    private static newestLintId = 0;

    private di: DocumentInfo;
    private diagnostics = new Array<Diagnostic>();
    private document: TextDocument;
    private collection: DiagnosticCollection;

    private initialize(document: TextDocument, collection: DiagnosticCollection): void {
        GlslEditor.processElements(document);
        this.di = GlslEditor.getDocumentInfo(document.uri);
        this.document = document;
        this.collection = collection;
    }

    public textChanged(document: TextDocument, collection: DiagnosticCollection): void {
        this.initialize(document, collection);
        this.addHints();
        this.addErrors();
    }

    private addHints(scope = this.di.getRootScope()): void {
        this.addFunctionHints(scope);
        this.addTypeHints(scope);
        this.addVariableHints(scope);
        for (const childScope of scope.children) {
            this.addHints(childScope);
        }
    }

    private addFunctionHints(scope: Scope): void {
        for (const lf of scope.functions) {
            if (!lf.calls.length && !this.isTheMainFunction(lf) && !this.isConstructor(lf)) {
                for (const fd of lf.definitions) {
                    this.addUnusedHint(fd, this.getUnusedFunctionMessage(fd));
                }
                for (const fp of lf.prototypes) {
                    this.addUnusedHint(fp, this.getUnusedFunctionMessage(fp));
                }
            }
        }
    }

    private addTypeHints(scope: Scope): void {
        for (const td of scope.typeDeclarations) {
            if (!td.usages.length && td.members.length) {
                this.addUnusedHint(td, this.getUnusedTypeMessage(td));
            }
        }
    }

    private addVariableHints(scope: Scope): void {
        for (const vd of scope.variableDeclarations) {
            if (!vd.usages.length && !vd.functionPrototypeParameter) {
                this.addUnusedHint(vd, this.getUnusedVariableMessage(vd));
            }
        }
    }

    private getUnusedFunctionMessage(func: FunctionDeclaration | FunctionDeclaration): string {
        return `Function '${func.name}' is never called.`;
    }

    private getUnusedTypeMessage(td: TypeDeclaration): string {
        return `Type '${td.name}' is never used.`;
    }

    private getUnusedVariableMessage(vd: VariableDeclaration): string {
        return `Variable '${vd.name}' is never used.`;
    }

    private addUnusedHint(element: Element, message: string): void {
        const range = this.di.intervalToRange(element.nameInterval);
        const d = new Diagnostic(range, message, DiagnosticSeverity.Hint);
        d.tags = [DiagnosticTag.Unnecessary];
        this.diagnostics.push(d);
    }

    private isTheMainFunction(lf: LogicalFunction): boolean {
        const fd = lf.getDeclaration();
        return fd.name === 'main' && fd.parameters.length === 0;
    }

    private isConstructor(lf: LogicalFunction): boolean {
        return lf.getDeclaration().ctor;
    }

    private addErrors(): void {
        const platformName = this.getPlatformName();
        const extension = this.getExtension(this.document.uri);
        const stageName = this.getStageName(extension);
        const validatorPath = `${GlslEditor.getContext().extensionPath}\\res\\bin\\glslangValidator${platformName}`;
        this.executeCommand(validatorPath, stageName);
    }

    private executeCommand(validatorPath: string, stageName: string): void {
        const result = exec(`${validatorPath} --stdin -C -S ${stageName}`);
        const lintId = ++GlslDiagnosticProvider.newestLintId;
        result.stdout.on('data', (data: string) => {
            this.handleErrors(data);
        });
        result.stdout.on('close', () => {
            if (lintId === GlslDiagnosticProvider.newestLintId) {
                this.collection.set(this.document.uri, this.diagnostics);
            }
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