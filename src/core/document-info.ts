import { ANTLRInputStream, CommonTokenStream, Token } from 'antlr4ts';
import { Location, Position, Range, TextDocument, Uri } from 'vscode';
import { AntlrGlslLexer } from '../_generated/AntlrGlslLexer';
import { AntlrGlslParser } from '../_generated/AntlrGlslParser';
import { Builtin } from '../builtin/builtin';
import { ExpandedDocument, ExpandedSource } from '../include/expanded-document';
import { ExpandedDocumentCache } from '../include/expanded-document-cache';
import { SourceMap } from '../include/source-map';
import { FunctionCall } from '../scope/function/function-call';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { Interval } from '../scope/interval';
import { Scope } from '../scope/scope';
import { ShaderStage } from '../scope/shader-stage';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { TypeUsage } from '../scope/type/type-usage';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { VariableUsage } from '../scope/variable/variable-usage';
import { Constants } from './constants';
import { DocumentRegions } from './document-regions';
import { GlslEditor } from './glsl-editor';
import { GlslVisitor } from './glsl-visitor';

export class DocumentInfo {
    private readonly uri: Uri;

    private lexer: AntlrGlslLexer;
    private parser: AntlrGlslParser;
    private tokens: Array<Token>;
    private lastProcessedVersion = Constants.INVALID;

    private injectionOffset = 0;
    private injectionLineCount = 0;
    private injectionError = false;
    private invalid = false;

    private visitor: GlslVisitor;

    private expanded: ExpandedDocument | null = null;

    private version = 100;
    private stage: ShaderStage;
    private regions = new DocumentRegions();

    public builtin: Builtin;

    private document: TextDocument;
    private rootScope: Scope;

    private preprocessedText: string;

    public constructor(uri: Uri) {
        this.uri = uri;
        this.setShaderStage();
    }

    public reset(): void {
        if (this.builtin) {
            this.builtin.reset();
        }
        this.regions.reset();
        this.rootScope = new Scope(null, null);
    }

    public getVisitor(): GlslVisitor {
        return this.visitor;
    }

    private getExtension(size = 1): string {
        const fileName = this.uri.path.substring(this.uri.path.lastIndexOf('/') + 1);
        return fileName.split(Constants.DOT).slice(-size).join(Constants.DOT);
    }

    public getStageName(): string {
        const ext1 = this.getExtension();
        const ext2 = this.getExtension(2);

        if (Constants.VERTEX_EXTS.includes(ext1) || Constants.VERTEX_EXTS.includes(ext2)) {
            return Constants.VERT;
        }

        if (Constants.FRAGMENT_EXTS.includes(ext1) || Constants.FRAGMENT_EXTS.includes(ext2)) {
            return Constants.FRAG;
        }

        return Constants.EMPTY;
    }

    public getShaderStage(): ShaderStage {
        return this.stage;
    }

    private setShaderStage(): void {
        const stageName = this.getStageName();

        if (stageName === Constants.FRAG) {
            this.stage = ShaderStage.FRAGMENT;
        } else if (stageName === Constants.VERT) {
            this.stage = ShaderStage.VERTEX;
        } else {
            this.stage = ShaderStage.DEFAULT;
        }
    }

    public isGlsl300es(): boolean {
        return this.version === 300;
    }

    public isGlsl100es(): boolean {
        return this.version === 100;
    }

    public getVersion(): number {
        return this.version;
    }

    public setVersion(version: 100 | 300): void {
        if (version !== this.version || !this.builtin) {
            this.version = version;
            if (version === 100) {
                this.builtin = Builtin.get100();
            } else {
                this.builtin = Builtin.get300();
            }
        }
    }

    public getRootScope(): Scope {
        return this.rootScope;
    }

    public getTokens(): Array<Token> {
        return this.tokens;
    }

    public getTokenAt(position: Position): Token {
        const offset = this.positionToOffset(position);
        for (const token of this.getTokens()) {
            const interval = new Interval(token.startIndex, token.stopIndex + 1, this);
            if (offset >= interval.startIndex && offset < interval.stopIndex) {
                return token;
            }
        }
        return null;
    }

    //
    //process
    //
    public processElements(document: TextDocument): void {
        if (document.version > this.lastProcessedVersion || this.invalid) {
            this.processDocument(document);
            this.processVisitor();
            this.lastProcessedVersion = document.version;
            this.invalid = false;
        }
    }

    private processDocument(document: TextDocument): void {
        this.document = document;
        this.expanded = ExpandedDocumentCache.get(document);
        this.applyInjectionToExpandedIfNeeded();
        this.lexer = this.createLexer();
        this.parser = this.createParser();
    }

    private applyInjectionToExpandedIfNeeded(): void {
        if (!this.expanded) {
            return;
        }

        // Reset; code injection is opt-in and not used for preprocessed docs.
        this.injectionLineCount = 0;
        this.injectionOffset = 0;

        if (!GlslEditor.CONFIGURATIONS.getCodeInjection() || this.uri.scheme === Constants.PREPROCESSED_GLSL) {
            return;
        }

        const injectionSource = GlslEditor.CONFIGURATIONS.getCodeInjectionSource();
        const prelude = injectionSource.join(Constants.NEW_LINE) + Constants.NEW_LINE;
        this.injectionLineCount = injectionSource.length;
        this.injectionOffset = prelude.length;

        if (!prelude) {
            return;
        }

        // Compose a per-document expanded snapshot that also contains the injected prelude.
        // The injected prelude is marked as generated so it does not map to any real source file.
        const sm = new SourceMap();
        sm.appendGenerated(prelude);
        sm.appendFrom(this.expanded.sourceMap);
        this.expanded = {
            ...this.expanded,
            text: prelude + this.expanded.text,
            sourceMap: sm,
        };
    }

    private createLexer(): AntlrGlslLexer {
        //The ANTLRInputStream class is deprecated, however as far as I know this is the only way the TypeScript version of ANTLR accepts UTF-16 strings.
        //The CharStreams.fromString method only accepts UTF-8 and other methods of the CharStreams class are not implemented in TypeScript.
        const charStream = new ANTLRInputStream(this.getParseText());
        const lexer = new AntlrGlslLexer(charStream);
        this.tokens = lexer.getAllTokens();
        lexer.reset();
        return lexer;
    }

    private getParseText(): string {
        // In include mode, we parse the expanded text snapshot if available.
        if (this.expanded && GlslEditor.CONFIGURATIONS.getIncludeResolverOptions().enabled) {
            return this.expanded.text;
        }
        return this.getText();
    }

    /**
     * Text used for compiler diagnostics.
     *
     * When includes are enabled and an expanded snapshot is available, diagnostics should compile
     * the same expanded text we parse, so line numbers can be mapped back via the SourceMap.
     */
    public getCompilerText(): string {
        if (this.expanded && GlslEditor.CONFIGURATIONS.getIncludeResolverOptions().enabled) {
            return this.expanded.text;
        }
        return this.getText();
    }

    public getText(): string {
        const originalText = this.document.getText();
        if (GlslEditor.CONFIGURATIONS.getCodeInjection() && this.uri.scheme !== Constants.PREPROCESSED_GLSL) {
            const injectionSource = GlslEditor.CONFIGURATIONS.getCodeInjectionSource();
            let text = injectionSource.join(Constants.NEW_LINE) + Constants.NEW_LINE;
            this.injectionLineCount = injectionSource.length;
            this.injectionOffset = text.length;
            text += originalText;
            return text;
        } else {
            this.injectionLineCount = 0;
            this.injectionOffset = 0;
            return originalText;
        }
    }

    private createParser(): AntlrGlslParser {
        const tokenStream = new CommonTokenStream(this.lexer);
        const parser = new AntlrGlslParser(tokenStream);
        parser.removeErrorListeners();
        return parser;
    }

    private processVisitor(): void {
        const tree = this.parser.start();
        this.visitor = new GlslVisitor(this.uri);
        this.visitor.visit(tree);
        this.parser.reset();
    }

    //
    //general
    //
    public getLineCount(): number {
        return this.document.lineCount;
    }

    public intervalToLocation(interval: Interval): Location {
        const mapped = this.intervalToMappedRange(interval);
        if (!mapped) {
            return null;
        }
        return new Location(mapped.uri, mapped.range);
    }

    public intervalToRange(interval: Interval): Range {
        return this.intervalToMappedRange(interval)?.range ?? null;
    }

    private intervalToMappedRange(interval: Interval): { uri: Uri; range: Range } | null {
        if (!interval) {
            return null;
        }

        if (!this.hasSourceMap()) {
            const start = this.offsetToPosition(interval.startIndex);
            const stop = this.offsetToPosition(interval.stopIndex);
            if (!start || !stop) {
                return null;
            }
            return { uri: this.document.uri, range: new Range(start, stop) };
        }

        const startMapped = this.mapVirtualOffsetToPosition(interval.startIndex);
        const stopMapped = this.mapVirtualOffsetToPosition(interval.stopIndex);
        if (!startMapped || !stopMapped) {
            return null;
        }

        // If an interval somehow crosses files, keep it anchored to the start file.
        const uri = startMapped.uri;
        const stop = stopMapped.uri.toString(true) === uri.toString(true) ? stopMapped.position : startMapped.position;
        return { uri, range: new Range(startMapped.position, stop) };
    }

    public offsetToPosition(offset: number): Position {
        if (!this.hasSourceMap()) {
            return this.document.positionAt(offset);
        }

        const mapped = this.mapVirtualOffsetToPosition(offset);
        return mapped?.position ?? null;
    }

    public positionToOffset(position: Position): number {
        if (!this.hasSourceMap()) {
            return this.document.offsetAt(position);
        }

        const sourceOffset = this.document.offsetAt(position);
        const v = this.expanded.sourceMap.mapSourceOffset(this.document.uri, sourceOffset);
        return v ?? sourceOffset;
    }

    public lineAndCharacterToRange(line: number, character: number): Range {
        const position = new Position(line - 1, character);
        return new Range(position, position);
    }

    public getTextInInterval(interval: Interval): string {
        if (!interval) {
            return Constants.EMPTY;
        }
        if (!this.hasSourceMap()) {
            return this.document.getText(this.intervalToRange(interval));
        }

        const start = this.expanded.sourceMap.mapVirtualOffset(interval.startIndex);
        const stop = this.expanded.sourceMap.mapVirtualOffset(interval.stopIndex);
        if (!start || !stop) {
            return Constants.EMPTY;
        }
        if (start.uri.toString(true) !== stop.uri.toString(true)) {
            return Constants.EMPTY;
        }
        const src = this.getExpandedSource(start.uri);
        if (!src) {
            return Constants.EMPTY;
        }
        return src.text.substring(start.offset, stop.offset);
    }

    public hasSourceMap(): boolean {
        return this.expanded != null;
    }

    public getIncludeSourceUris(): Array<Uri> {
        if (!this.expanded) {
            return [this.document.uri];
        }
        const result: Array<Uri> = [];
        for (const s of this.expanded.sources.values()) {
            result.push(s.uri);
        }
        return result;
    }

    public getLineRangeAtUri(uri: Uri, line0: number): Range | null {
        if (!uri) {
            return null;
        }

        if (uri.toString(true) === this.document.uri.toString(true)) {
            if (line0 < 0 || line0 >= this.document.lineCount) {
                return null;
            }
            return this.document.lineAt(line0).range;
        }

        const src = this.getExpandedSource(uri);
        if (!src) {
            return null;
        }

        const starts = src.lineStarts;
        if (line0 < 0 || line0 >= starts.length) {
            return null;
        }
        const startOffset = starts[line0];
        let endOffset = line0 + 1 < starts.length ? starts[line0 + 1] : src.text.length;

        // Trim a single trailing newline (and optional preceding \r) so the range matches VS Code's line range.
        if (endOffset > startOffset) {
            const last = src.text.charCodeAt(endOffset - 1);
            if (last === 10 /* \n */) {
                endOffset--;
                if (endOffset > startOffset && src.text.charCodeAt(endOffset - 1) === 13 /* \r */) {
                    endOffset--;
                }
            }
        }

        const endChar = Math.max(0, endOffset - startOffset);
        return new Range(new Position(line0, 0), new Position(line0, endChar));
    }

    public isVirtualOffsetInjected(offset: number): boolean {
        if (!this.expanded) {
            return offset < 0;
        }
        return this.expanded.sourceMap.isGeneratedVirtualOffset(offset);
    }

    private mapVirtualOffsetToPosition(offset: number): { uri: Uri; position: Position } | null {
        if (!this.expanded) {
            return { uri: this.document.uri, position: this.document.positionAt(offset) };
        }

        const loc = this.expanded.sourceMap.mapVirtualOffset(offset);
        if (!loc) {
            return null;
        }

        if (loc.uri.toString(true) === this.document.uri.toString(true)) {
            return { uri: this.document.uri, position: this.document.positionAt(loc.offset) };
        }

        const src = this.getExpandedSource(loc.uri);
        if (!src) {
            return null;
        }

        return { uri: src.uri, position: this.positionAtInSource(src, loc.offset) };
    }

    private getExpandedSource(uri: Uri): ExpandedSource | null {
        const k = uri.toString(true);
        return this.expanded?.sources.get(k) ?? null;
    }

    private positionAtInSource(source: ExpandedSource, offset: number): Position {
        const starts = source.lineStarts;
        let lo = 0;
        let hi = starts.length - 1;
        while (lo <= hi) {
            const mid = (lo + hi) >>> 1;
            const s = starts[mid];
            const n = mid + 1 < starts.length ? starts[mid + 1] : source.text.length + 1;
            if (offset < s) {
                hi = mid - 1;
            } else if (offset >= n) {
                lo = mid + 1;
            } else {
                return new Position(mid, Math.max(0, offset - s));
            }
        }
        return new Position(0, 0);
    }

    //
    //get element at
    //

    //function
    public getFunctionPrototypeAt(position: Position): FunctionDeclaration {
        return this.getElementAt(position, 'functionPrototypes') as FunctionDeclaration;
    }

    public getFunctionDefinitionAt(position: Position): FunctionDeclaration {
        return this.getElementAt(position, 'functionDefinitions') as FunctionDeclaration;
    }

    //function calls
    public getFunctionCallAt(position: Position): FunctionCall {
        return this.getElementAt(position, 'functionCalls') as FunctionCall;
    }

    //variable declaration
    public getVariableDeclarationAt(position: Position): VariableDeclaration {
        return this.getElementAt(position, 'variableDeclarations') as VariableDeclaration;
    }

    //variable usages
    public getVariableUsageAt(position: Position): VariableUsage {
        return this.getElementAt(position, 'variableUsages') as VariableUsage;
    }

    //type declaration
    public getTypeDeclarationAt(position: Position): TypeDeclaration {
        return this.getElementAt(position, 'typeDeclarations') as TypeDeclaration;
    }

    //type usages
    public getTypeUsageAt(position: Position): TypeUsage {
        return this.getElementAt(position, 'typeUsages') as TypeUsage;
    }

    //generic
    private getElementAt(
        position: Position,
        type:
            | 'variableDeclarations'
            | 'variableUsages'
            | 'typeDeclarations'
            | 'typeUsages'
            | 'functionCalls'
            | 'functionPrototypes'
            | 'functionDefinitions'
    ): VariableDeclaration | VariableUsage | TypeDeclaration | TypeUsage | FunctionCall | FunctionDeclaration {
        const offset = this.positionToOffset(position);
        return this.findElementAtOffset(this.rootScope, type, offset);
    }

    private findElementAtOffset(
        scope: Scope,
        type:
            | 'variableDeclarations'
            | 'variableUsages'
            | 'typeDeclarations'
            | 'typeUsages'
            | 'functionCalls'
            | 'functionPrototypes'
            | 'functionDefinitions',
        offset: number
    ): VariableDeclaration | VariableUsage | TypeDeclaration | TypeUsage | FunctionCall | FunctionDeclaration {
        // Prefer the most nested scope first.
        for (const child of scope.children) {
            const found = this.findElementAtOffset(child, type, offset);
            if (found) {
                return found;
            }
        }

        for (const element of scope[type]) {
            if (
                element.nameInterval &&
                !element.nameInterval.isInjected() &&
                offset >= element.nameInterval.startIndex &&
                offset < element.nameInterval.stopIndex
            ) {
                return element;
            }
        }

        return null;
    }

    private getChildScope(scope: Scope, position: Position): Scope {
        const offset = this.positionToOffset(position);
        for (const childScope of scope.children) {
            if (offset >= childScope.interval.startIndex && offset < childScope.interval.stopIndex) {
                return childScope;
            }
        }
        return null;
    }

    public getScopeAt(position: Position, scope = this.rootScope): Scope {
        const newScope = this.getChildScope(scope, position);
        if (!newScope) {
            return scope;
        } else {
            return this.getScopeAt(position, newScope);
        }
    }

    public getDepthAt(position: Position): number {
        const scopeDepth = this.getScopeDepthAt(position, this.rootScope, 0);
        const caseDepth = this.getCaseDepthAt(position);
        return scopeDepth + caseDepth;
    }

    private getScopeDepthAt(position: Position, scope: Scope, depth: number): number {
        const newScope = this.getChildScope(scope, position);
        if (!newScope) {
            return depth;
        } else {
            const increment = newScope.elseIfScope ? 0 : 1;
            return this.getScopeDepthAt(position, newScope, depth + increment);
        }
    }

    private getCaseDepthAt(position: Position): number {
        const offset = this.positionToOffset(position);
        let depth = 0;
        for (const cr of this.regions.caseStatementsRegions) {
            if (offset >= cr.startIndex && offset < cr.stopIndex) {
                depth++;
            }
        }
        return depth;
    }

    public getInjectionLineCount(): number {
        if (this.uri.scheme === Constants.PREPROCESSED_GLSL) {
            return 0;
        } else {
            return this.injectionLineCount;
        }
    }

    public getInjectionOffset(): number {
        if (this.uri.scheme === Constants.PREPROCESSED_GLSL) {
            return 0;
        } else {
            return this.injectionOffset;
        }
    }

    public invalidate(): void {
        this.invalid = true;
    }

    public getDocument(): TextDocument {
        return this.document;
    }

    public getRegions(): DocumentRegions {
        return this.regions;
    }

    public getPreprocessedText(): string {
        return this.preprocessedText;
    }

    public setPreprocessedText(preprocessedText: string): void {
        this.preprocessedText = preprocessedText;
    }

    public hasInjectionError(): boolean {
        return this.injectionError;
    }

    public setInjectionError(injectionError: boolean): void {
        this.injectionError = injectionError;
    }

    public isExtensionAvailable(extension: string, offset: number): boolean {
        if (!extension) {
            return true;
        }
        let available = false;
        for (const pr of this.regions.preprocessorRegions) {
            if (pr.interval.stopIndex <= offset && (pr.extension === extension || pr.extension === 'all')) {
                if (pr.extensionState === 'disable') {
                    available = false;
                } else {
                    available = true;
                }
            }
        }
        return available;
    }
}
