import { Uri, TextDocument, Position, Location, Range } from 'vscode';
import { CharStreams, CommonTokenStream, Token } from 'antlr4ts';
import { GlslVisitor } from './glsl-visitor';
import { AntlrGlslLexer } from '../_generated/AntlrGlslLexer';
import { AntlrGlslParser } from '../_generated/AntlrGlslParser';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { Scope } from '../scope/scope';
import { Interval } from '../scope/interval';
import { Builtin } from '../builtin/builtin';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { VariableUsage } from '../scope/variable/variable-usage';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { TypeUsage } from '../scope/type/type-usage';
import { FunctionCall } from '../scope/function/function-call';
import { ShaderStage } from '../scope/shader-stage';
import { Constants } from './constants';
import { GlslEditor } from './glsl-editor';
import { DocumentRegions } from './document-regions';

export class DocumentInfo {
    private readonly uri: Uri;

    private lexer: AntlrGlslLexer;
    private parser: AntlrGlslParser;
    private tokens: Array<Token>;
    private lastProcessedVersion = Constants.INVALID;

    private injectionOffset = 0;
    private injectionLineCount = 0;
    private invalid = false;

    private visitor: GlslVisitor;

    private version = 100;
    private stage: ShaderStage;
    private regions = new DocumentRegions();

    public builtin: Builtin;

    private document: TextDocument;
    private rootScope: Scope;

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

    public getShaderStage(): ShaderStage {
        return this.stage;
    }

    private setShaderStage(): void {
        if (this.uri.path.endsWith(Constants.FS) || this.uri.path.endsWith(Constants.FRAG)) {
            this.stage = ShaderStage.FRAGMENT;
        } else if (this.uri.path.endsWith(Constants.VS) || this.uri.path.endsWith(Constants.VERT)) {
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
        for (const token of this.getTokens()) {
            const range = this.intervalToRange(new Interval(token.startIndex, token.stopIndex + 1, this));
            if (range.contains(position)) {
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
        this.lexer = this.createLexer();
        this.parser = this.createParser();
    }

    private createLexer(): AntlrGlslLexer {
        const charStream = CharStreams.fromString(this.getText());
        const lexer = new AntlrGlslLexer(charStream);
        this.tokens = lexer.getAllTokens();
        lexer.reset();
        return lexer;
    }

    public getText(): string {
        const originalText = this.document.getText();
        if (GlslEditor.CONFIGURATIONS.getCodeInjection()) {
            const injectionSource = GlslEditor.CONFIGURATIONS.getCodeInjectionSource();
            let text = injectionSource.join(Constants.CRLF) + Constants.CRLF;
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
        const range = this.intervalToRange(interval);
        return new Location(this.document.uri, range);
    }

    public intervalToRange(interval: Interval): Range {
        if (!interval) {
            return null;
        }
        const start = this.offsetToPosition(interval.startIndex);
        const stop = this.offsetToPosition(interval.stopIndex);
        return new Range(start, stop);
    }

    public offsetToPosition(offset: number): Position {
        return this.document.positionAt(offset);
    }

    public positionToOffset(position: Position): number {
        return this.document.offsetAt(position);
    }

    public lineAndCharacterToRange(line: number, character: number): Range {
        const position = new Position(line - 1, character);
        return new Range(position, position);
    }

    public getTextInInterval(interval: Interval): string {
        return this.document.getText(this.intervalToRange(interval));
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
    private getElementAt(position: Position, type:
        'variableDeclarations' |
        'variableUsages' |
        'typeDeclarations' |
        'typeUsages' |
        'functionCalls' |
        'functionPrototypes' |
        'functionDefinitions'):
        VariableDeclaration |
        VariableUsage |
        TypeDeclaration |
        TypeUsage |
        FunctionCall |
        FunctionDeclaration {

        let scope: Scope = this.rootScope;
        while (scope) {
            for (const element of scope[type]) {
                if (element.nameInterval && !element.nameInterval.isInjected() && this.intervalToRange(element.nameInterval)?.contains(position)) {
                    return element;
                }
            }
            scope = this.getChildScope(scope, position);
        }
        return null;
    }

    private getChildScope(scope: Scope, position: Position): Scope {
        for (const childScope of scope.children) {
            if (this.intervalToRange(childScope.interval)?.contains(position)) {
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
        let depth = 0;
        for (const cr of this.regions.caseStatementsRegions) {
            if (this.intervalToRange(cr)?.contains(position)) {
                depth++;
            }
        }
        return depth;
    }

    public getInjectionLineCount(): number {
        return this.injectionLineCount;
    }

    public getInjectionOffset(): number {
        return this.injectionOffset;
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

}
