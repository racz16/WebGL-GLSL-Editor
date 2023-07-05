import { exec, ChildProcess } from 'child_process';
import { Stream } from 'stream';
import { platform } from 'os';
import { TextDocument, Diagnostic, DiagnosticSeverity, Uri, DiagnosticTag, window } from 'vscode';
import { GlslEditor } from '../core/glsl-editor';
import { DocumentInfo } from '../core/document-info';
import { LogicalFunction } from '../scope/function/logical-function';
import { Scope } from '../scope/scope';
import { Element } from '../scope/element';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { Constants } from '../core/constants';
import { GlslTextProvider } from './glsl-text-provider';

export class GlslDiagnosticProvider {
    private static newestLintIds = new Map<Uri, number>();

    private di: DocumentInfo;
    private diagnostics = new Array<Diagnostic>();
    private document: TextDocument;

    private initialize(document: TextDocument): void {
        GlslEditor.processElements(document);
        this.di = GlslEditor.getDocumentInfo(document.uri);
        this.document = document;
    }

    public textChanged(document: TextDocument): void {
        if (!GlslEditor.CONFIGURATIONS.getDiagnostics()) {
            GlslEditor.getDiagnosticCollection().clear();
            return;
        }
        this.initialize(document);
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
            if (!td.usages.length && !this.isInterfaceBlockUsed(td) && !td.inline) {
                this.addUnusedHint(td, this.getUnusedTypeMessage(td));
            }
        }
    }

    private isInterfaceBlockUsed(td: TypeDeclaration): boolean {
        if (!td.interfaceBlock || td.members.length) {
            return false;
        }
        return td.interfaceMembers.some((td) => td.usages.length);
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
        const type = td.interfaceBlock ? 'Interface block' : 'Type';
        return `${type} '${td.name}' is never used.`;
    }

    private getUnusedVariableMessage(vd: VariableDeclaration): string {
        return `Variable '${vd.name}' is never used.`;
    }

    private addUnusedHint(element: Element, message: string): void {
        if (element.nameInterval && !element.nameInterval.isInjected()) {
            const range = this.di.intervalToRange(element.nameInterval);
            const d = new Diagnostic(range, message, DiagnosticSeverity.Hint);
            d.tags = [DiagnosticTag.Unnecessary];
            this.diagnostics.push(d);
        }
    }

    private isTheMainFunction(lf: LogicalFunction): boolean {
        const fd = lf.getDeclaration();
        return fd.name === 'main' && fd.parameters.length === 0;
    }

    private isConstructor(lf: LogicalFunction): boolean {
        return lf.getDeclaration().ctor;
    }

    public displayPreprocessedCode(document: TextDocument): void {
        this.document = document;
        this.di = GlslEditor.getDocumentInfo(this.document.uri);
        const platformName = this.getPlatformName();
        const stageName = this.di.getStageName();
        const validatorPath = `${GlslEditor.getContext().extensionPath}/res/bin/glslangValidator${platformName}`;
        this.executeGeneration(validatorPath, stageName);
    }

    private executeGeneration(validatorPath: string, stageName: string): void {
        const result = exec(`${validatorPath} --stdin -E -S ${stageName}`);
        let preprocessedText = Constants.EMPTY;
        result.stdout.on('data', (data: string) => {
            preprocessedText += data;
        });
        result.stdout.on('close', async () => {
            const uri = Uri.parse(`${Constants.PREPROCESSED_GLSL}: ${this.document.fileName}`);
            GlslEditor.getDocumentInfo(uri).setPreprocessedText(preprocessedText);
            GlslTextProvider.onDidChangeEmitter.fire(uri);
            await window.showTextDocument(uri, { preview: false });
        });
        this.provideInput(result);
    }

    private addErrors(): void {
        const platformName = this.getPlatformName();
        const stageName = this.di.getStageName();
        const validatorPath = `${GlslEditor.getContext().extensionPath}/res/bin/glslangValidator${platformName}`;
        this.executeValidation(validatorPath, stageName);
    }

    private executeValidation(validatorPath: string, stageName: string): void {
        const result = exec(`${validatorPath} --stdin -C -S ${stageName}`);
        const lintId = this.increaseLintId();
        result.stdout.on('data', (data: string) => {
            this.handleErrors(data);
        });
        result.stdout.on('close', () => {
            if (lintId === this.getCurrentLintId() && !this.document.isClosed) {
                GlslEditor.getDiagnosticCollection().set(this.document.uri, this.diagnostics);
            }
        });
        this.di.setInjectionError(false);
        this.provideInput(result);
    }

    private increaseLintId(): number {
        const currentLintId = this.getCurrentLintId();
        const newLintId = currentLintId + 1;
        GlslDiagnosticProvider.newestLintIds.set(this.di.getDocument().uri, newLintId);
        return newLintId;
    }

    private getCurrentLintId(): number {
        return GlslDiagnosticProvider.newestLintIds.get(this.di.getDocument().uri) ?? 0;
    }

    private handleErrors(data: string): void {
        const rows = this.getDiagnosticRows(data);
        for (const row of rows) {
            this.addDiagnostic(row);
        }
    }

    private getDiagnosticRows(data: string): Array<string> {
        const rows = data.split(Constants.NEW_LINE);
        const results = new Array<string>();
        for (const row of rows) {
            if (row.startsWith('ERROR: ') || row.startsWith('WARNING: ')) {
                results.push(row);
            } else if (results.length) {
                results[results.length - 1] += ` ${row}`;
            }
        }
        return results;
    }

    private addDiagnostic(row: string): void {
        if (row.startsWith('ERROR: 0:')) {
            const t1 = row.substring(9);
            const i = t1.indexOf(Constants.COLON);
            const line = +t1.substring(0, i) - this.di.getInjectionLineCount();
            if (line > 0) {
                const error = row.substring(9 + i + 2);
                this.diagnostics.push(
                    new Diagnostic(this.document.lineAt(line - 1).range, error, DiagnosticSeverity.Error)
                );
            } else {
                this.di.setInjectionError(true);
            }
        } else if (row.startsWith('WARNING: 0:')) {
            const t1 = row.substring(11);
            const i = t1.indexOf(Constants.COLON);
            const line = +t1.substring(0, i) - this.di.getInjectionLineCount();
            if (line > 0) {
                const error = row.substring(11 + i + 2);
                this.diagnostics.push(
                    new Diagnostic(this.document.lineAt(line - 1).range, error, DiagnosticSeverity.Warning)
                );
            }
        }
    }

    private provideInput(result: ChildProcess): void {
        const stdinStream = new Stream.Readable();
        const text = this.di.getText();
        stdinStream.push(text);
        stdinStream.push(null);
        stdinStream.pipe(result.stdin);
    }

    private getPlatformName(): string {
        switch (platform()) {
            case 'win32':
                return 'Windows';
            case 'linux':
                return 'Linux';
            case 'darwin':
                return 'Mac';
            default:
                return Constants.EMPTY;
        }
    }
}
