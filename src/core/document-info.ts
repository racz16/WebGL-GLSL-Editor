import { Uri, TextDocument, Position, Location, Range } from 'vscode';
import { ANTLRInputStream, CommonTokenStream, Token } from 'antlr4ts';
import { GlslVisitor } from './glsl-visitor';
import { UniqueDiagnostic } from '../diagnostic/unique-diagnostic';
import { ErrorListener } from '../diagnostic/error-listener';
import { AntlrGeneratedDiagnostic } from '../diagnostic/antlr-generated-diagnostic';
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

export class DocumentInfo {
    private readonly uri: Uri;
    private lastProcessedVersion = -1;
    private version = 100;
    private stage: ShaderStage;
    private tokens: Array<Token>;

    public readonly errors = new Array<UniqueDiagnostic>();
    public generatedErrors = new Array<AntlrGeneratedDiagnostic>();
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
        this.errors.length = 0;
        this.rootScope = new Scope(Interval.NONE, null);
    }

    public getShaderStage(): ShaderStage {
        return this.stage;
    }

    private setShaderStage(): void {
        if (this.uri.path.endsWith('.fs') || this.uri.path.endsWith('.frag')) {
            this.stage = ShaderStage.FRAGMENT;
        } else if (this.uri.path.endsWith('.vs') || this.uri.path.endsWith('.vert')) {
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

    public getUri(): Uri {
        return this.uri;
    }

    public getLastProcessedVersion(): number {
        return this.lastProcessedVersion;
    }

    //
    //process
    //
    public processDocument(document: TextDocument): void {
        this.document = document;
        if (document.version > this.lastProcessedVersion) {
            this.processDocumentUnsafe();
            this.lastProcessedVersion = document.version;
        }
    }

    private processDocumentUnsafe(): void {
        const lexer = this.createLexer();
        const parser = this.createParser(lexer);
        this.generatedErrors = this.getGeneratedErrors(parser);
        this.processVisitor(parser);
        //Validator.validate(this);
    }

    private createLexer(): AntlrGlslLexer {
        const inputStream = new ANTLRInputStream(this.document.getText());
        const lexer = new AntlrGlslLexer(inputStream);
        this.tokens = lexer.getAllTokens();
        lexer.reset();
        return lexer;
    }

    private createParser(lexer: AntlrGlslLexer): AntlrGlslParser {
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new AntlrGlslParser(tokenStream);
        return parser;
    }

    private getGeneratedErrors(parser: AntlrGlslParser): Array<AntlrGeneratedDiagnostic> {
        parser.removeErrorListeners();
        parser.addErrorListener(new ErrorListener());
        const listener = parser.getErrorListeners()[0] as ErrorListener;
        return listener.getSyntaxErrors();
    }

    private processVisitor(parser: AntlrGlslParser): void {
        const tree = parser.start();
        new GlslVisitor(this.uri).visit(tree);
    }

    //
    //
    //
    public intervalToLocation(interval: Interval): Location {
        const range = this.intervalToRange(interval);
        return new Location(this.document.uri, range);
    }

    public intervalToRange(interval: Interval): Range {
        const start = this.offsetToPosition(interval.startIndex);
        const stop = this.offsetToPosition(interval.stopIndex);
        return new Range(start, stop);
    }

    public offsetToPosition(offset: number): Position {
        return this.document.positionAt(offset);
    }

    public lineAndCharacterToRange(line: number, character: number): Range {
        const position = new Position(line - 1, character);
        return new Range(position, position);
    }

    //
    //get elements
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
    private getElementAt(position: Position, type: 'variableDeclarations' | 'variableUsages' | 'typeDeclarations' | 'typeUsages' | 'functionCalls' | 'functionPrototypes' | 'functionDefinitions'): VariableDeclaration | VariableUsage | TypeDeclaration | TypeUsage | FunctionCall | FunctionDeclaration {
        let scope: Scope = this.rootScope;
        while (scope) {
            for (const element of scope[type]) {
                if (this.intervalToRange(element.nameInterval).contains(position)) {
                    return element;
                }
            }
            scope = this.getChildScope(scope, position);
        }
        return null;
    }

    public getScopeAt(position: Position): Scope {
        let scope: Scope = this.rootScope;
        while (true) {
            const newScope = this.getChildScope(scope, position);
            if (!newScope) {
                return scope;
            } else {
                scope = newScope;
            }
        }
    }

    public getChildScope(scope: Scope, position: Position): Scope {
        for (const childScope of scope.children) {
            if (this.intervalToRange(childScope.interval).contains(position)) {
                return childScope;
            }
        }
        return null;
    }

}
