import { Uri, TextDocument, Position, Location, Range } from 'vscode';
import { ANTLRInputStream, CommonTokenStream, Token } from 'antlr4ts';
import { GlslVisitor } from './glsl-visitor';
import { UniqueDiagnostic } from '../diagnostic/unique-diagnostic';
import { GlslErrorListener } from './glsl-error-listener';
import { AntlrGeneratedDiagnostic } from '../diagnostic/antlr-generated-diagnostic';
import { AntlrGlslLexer } from '../_generated/AntlrGlslLexer';
import { AntlrGlslParser } from '../_generated/AntlrGlslParser';
import { LogicalFunction } from '../scope/function/logical-function';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { Scope } from '../scope/scope';
import { Interval } from '../scope/interval';
import { Builtin } from '../builtin/builtin';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { VariableUsage } from '../scope/variable/variable-usage';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { TypeUsage } from '../scope/type/type-usage';
import { FunctionCall } from '../scope/function/function-call';
import { Validator } from '../diagnostic/validators/validator';
import { ShaderStage } from './shader-stage';

export class GlslDocumentInfo {
    private readonly uri: Uri;
    private lastProcessedVersion = -1;
    private glslVersion = 100;
    private stage: ShaderStage;
    private tokens: Array<Token>;

    //public readonly FOLDING_BLOCKS = new Array<FoldingBlock>();
    //public readonly BRACELESS_SCOPES = new Array<Scope>();
    public readonly errors = new Array<UniqueDiagnostic>();
    public generatedErrors = new Array<AntlrGeneratedDiagnostic>();
    //public readonly MACRO_DEFINITIONS = new Array<string>();
    public readonly functions = new Array<LogicalFunction>();
    public readonly functionPrototypes = new Array<FunctionDeclaration>();
    public readonly functionDefinitions = new Array<FunctionDeclaration>();
    public builtin: Builtin;

    private document: TextDocument;
    private rootScope: Scope;

    public constructor(uri: Uri) {
        this.uri = uri;
        this.setShaderStage();
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

    public reset(): void {
        //this.FOLDING_BLOCKS.length = 0;
        //this.BRACELESS_SCOPES.length = 0;
        //this.MACRO_DEFINITIONS.length = 0;
        if (this.builtin) {
            this.builtin.reset();
        }
        this.errors.length = 0;
        this.functions.length = 0;
        this.functionPrototypes.length = 0;
        this.functionDefinitions.length = 0;
        this.rootScope = new Scope(Interval.NONE, null);
    }

    public getRootScope(): Scope {
        return this.rootScope;
    }

    public setVersion(version: 100 | 300): void {
        this.glslVersion = version;
        if (version === 100) {
            this.builtin = Builtin.get100();
        } else {
            this.builtin = Builtin.get300();
        }
    }

    public isGlsl300es(): boolean {
        return this.glslVersion === 300;
    }

    public isGlsl100es(): boolean {
        return this.glslVersion === 100;
    }

    public getGlslVersion(): number {
        return this.glslVersion;
    }

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
        parser.addErrorListener(new GlslErrorListener());
        const listener = parser.getErrorListeners()[0] as GlslErrorListener;
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
    //
    //

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

    /*public isVariableVisibleAt(position: Position, document: TextDocument, name: string): boolean {
        return this.isElementVisibleAt(position, document, name, 'variableDeclarations');
    }

    public isTypeVisibleAt(position: Position, document: TextDocument, name: string): boolean {
        return this.isElementVisibleAt(position, document, name, 'typeDeclarations');
    }

    private isElementVisibleAt(position: Position, document: TextDocument, name: string, type: 'variableDeclarations' | 'typeDeclarations'): boolean {
        let scope: Scope = this.rootScope;
        while (scope) {
            for (const element of scope[type]) {
                if (element.name === name) {
                    return true;
                }
            }
            scope = this.getChildScope(scope, position, document);
        }
        return false;
    }*/

    //
    //get elements
    //

    //function
    public getFunctionPrototypeAt(position: Position): FunctionDeclaration {
        return this.getFunction(this.functionPrototypes, position);
    }

    public getFunctionDefinitionAt(position: Position): FunctionDeclaration {
        return this.getFunction(this.functionDefinitions, position);
    }

    private getFunction(functionList: Array<FunctionDeclaration>, position: Position) {
        for (const fd of functionList) {
            if (this.intervalToRange(fd.nameInterval).contains(position)) {
                return fd;
            }
        }
        return null;
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

    //
    private getElementAt(position: Position, type: 'variableDeclarations' | 'variableUsages' | 'typeDeclarations' | 'typeUsages' | 'functionCalls'): VariableDeclaration | VariableUsage | TypeDeclaration | TypeUsage | FunctionCall {
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

    public getChildScope(scope: Scope, position: Position): Scope {
        for (const childScope of scope.children) {
            if (this.intervalToRange(childScope.interval).contains(position)) {
                return childScope;
            }
        }
        return null;
    }

    //
    //
    //
    public getTokens(): Array<Token> {
        return this.tokens;
    }

    public getUri(): Uri {
        return this.uri;
    }

    public getLastProcessedVersion(): number {
        return this.lastProcessedVersion;
    }

}
