import { ChildProcess, exec } from 'child_process';
import { Stream } from 'stream';
import { Diagnostic, DiagnosticSeverity, DiagnosticTag, TextDocument, Uri, ViewColumn, window } from 'vscode';
import { Constants } from '../core/constants';
import { DocumentInfo } from '../core/document-info';
import { GlslEditor } from '../core/glsl-editor';
import { getCompilerPath } from '../extension-desktop';
import { Element } from '../scope/element';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { LogicalFunction } from '../scope/function/logical-function';
import { Interval } from '../scope/interval';
import { Scope } from '../scope/scope';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { GlslTextProvider } from './glsl-text-provider';

export class GlslDiagnosticProvider {
    private static newestLintIds = new Map<Uri, number>();
    private static previouslyPublishedUrisByRoot = new Map<string, Set<string>>();

    private di: DocumentInfo;
    private diagnosticsByUri = new Map<string, { uri: Uri; diagnostics: Array<Diagnostic> }>();
    private document: TextDocument;

    private includeDiagnosticsMode = false;
    private compilerTextLineStarts: Array<number> = [];

    private static uriKey(uri: Uri): string {
        return uri.toString(true);
    }

    private clearDiagnostics(): void {
        this.diagnosticsByUri.clear();
    }

    private pushDiagnostic(uri: Uri, diagnostic: Diagnostic): void {
        const k = GlslDiagnosticProvider.uriKey(uri);
        let entry = this.diagnosticsByUri.get(k);
        if (!entry) {
            entry = { uri, diagnostics: [] };
            this.diagnosticsByUri.set(k, entry);
        }
        entry.diagnostics.push(diagnostic);
    }

    private computeLineStarts(text: string): Array<number> {
        const starts = [0];
        for (let i = 0; i < text.length; i++) {
            if (text.charCodeAt(i) === 10 /* \n */) {
                starts.push(i + 1);
            }
        }
        return starts;
    }

    private initialize(document: TextDocument): void {
        GlslEditor.processElements(document);
        this.di = GlslEditor.getDocumentInfo(document.uri);
        this.document = document;
        this.includeDiagnosticsMode =
            this.di.hasSourceMap() && GlslEditor.CONFIGURATIONS.getIncludeResolverOptions().enabled;
        this.clearDiagnostics();
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
            const loc = this.di.intervalToLocation(element.nameInterval);
            if (!loc) {
                return;
            }
            const d = new Diagnostic(loc.range, message, DiagnosticSeverity.Hint);
            d.tags = [DiagnosticTag.Unnecessary];
            this.pushDiagnostic(loc.uri, d);
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
        const stageName = this.di.getStageName();
        const compilerPath = getCompilerPath();
        this.executeGeneration(compilerPath, stageName);
    }

    private executeGeneration(compilerPath: string, stageName: string): void {
        const result = exec(`"${compilerPath}" --stdin -E -S ${stageName}`);
        let preprocessedText = Constants.EMPTY;
        let error = false;
        result.stdout.on('data', (data: string) => {
            preprocessedText += data;
        });
        result.stderr.on('data', (_data: string) => {
            error = true;
        });
        result.stdout.on('close', async () => {
            if (error) {
                await window.showErrorMessage("Something went wrong. Most likely the code doesn't compile.");
                return;
            }
            const uri = Uri.parse(`${Constants.PREPROCESSED_GLSL}: ${this.document.fileName}`);
            GlslEditor.getDocumentInfo(uri).setPreprocessedText(preprocessedText);
            GlslTextProvider.onDidChangeEmitter.fire(uri);
            await window.showTextDocument(uri, { preview: false, viewColumn: ViewColumn.Beside });
        });
        this.provideInput(result);
    }

    private addErrors(): void {
        const stageName = this.di.getStageName();
        const compilerPath = getCompilerPath();
        this.executeValidation(compilerPath, stageName);
    }

    private executeValidation(compilerPath: string, stageName: string): void {
        const result = exec(`"${compilerPath}" --stdin -C -S ${stageName}`);
        const lintId = this.increaseLintId();
        result.stdout.on('data', (data: string) => {
            this.handleErrors(data);
        });
        result.stdout.on('close', () => {
            if (lintId === this.getCurrentLintId() && !this.document.isClosed) {
                this.publishDiagnostics();
            }
        });
        this.di.setInjectionError(false);
        this.provideInput(result);
    }

    private publishDiagnostics(): void {
        const collection = GlslEditor.getDiagnosticCollection();

        const rootKey = GlslDiagnosticProvider.uriKey(this.document.uri);

        const currentUris = new Set<string>();
        if (this.includeDiagnosticsMode) {
            for (const uri of this.di.getIncludeSourceUris()) {
                currentUris.add(GlslDiagnosticProvider.uriKey(uri));
            }
        } else {
            currentUris.add(rootKey);
        }

        // Clear any diagnostics previously published for this root that no longer apply.
        const prev = GlslDiagnosticProvider.previouslyPublishedUrisByRoot.get(rootKey);
        if (prev) {
            for (const k of prev) {
                if (!currentUris.has(k)) {
                    collection.set(Uri.parse(k), []);
                }
            }
        }

        for (const k of currentUris) {
            const entry = this.diagnosticsByUri.get(k);
            collection.set(entry?.uri ?? Uri.parse(k), entry?.diagnostics ?? []);
        }

        GlslDiagnosticProvider.previouslyPublishedUrisByRoot.set(rootKey, currentUris);
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
            this.addCompilerDiagnostic(row, 9, DiagnosticSeverity.Error);
        } else if (row.startsWith('WARNING: 0:')) {
            this.addCompilerDiagnostic(row, 11, DiagnosticSeverity.Warning);
        }
    }

    private addCompilerDiagnostic(row: string, headerLen: number, severity: DiagnosticSeverity): void {
        const t1 = row.substring(headerLen);
        const i = t1.indexOf(Constants.COLON);
        const lineRaw = +t1.substring(0, i);
        const message = row.substring(headerLen + i + 2);

        if (this.includeDiagnosticsMode) {
            const virtualLine0 = lineRaw - 1;
            if (virtualLine0 < 0 || virtualLine0 >= this.compilerTextLineStarts.length) {
                return;
            }

            const vOffset = this.compilerTextLineStarts[virtualLine0];
            const loc = this.di.intervalToLocation(new Interval(vOffset, vOffset + 1, this.di));
            if (!loc) {
                // Typically means this diagnostic points to generated/injected prelude.
                this.di.setInjectionError(true);
                return;
            }

            const lineRange = this.di.getLineRangeAtUri(loc.uri, loc.range.start.line) ?? loc.range;
            this.pushDiagnostic(loc.uri, new Diagnostic(lineRange, message, severity));
            return;
        }

        // Legacy mode: subtract injection line count and publish only to the root.
        const line = lineRaw - this.di.getInjectionLineCount();
        if (line > 0) {
            this.pushDiagnostic(
                this.document.uri,
                new Diagnostic(this.document.lineAt(line - 1).range, message, severity)
            );
        } else {
            this.di.setInjectionError(true);
        }
    }

    private provideInput(result: ChildProcess): void {
        const stdinStream = new Stream.Readable();
        const text = this.di.getCompilerText();
        this.compilerTextLineStarts = this.computeLineStarts(text);
        stdinStream.push(text);
        stdinStream.push(null);
        stdinStream.pipe(result.stdin);
    }
}
