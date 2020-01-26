import { Uri, TextDocument, Position } from 'vscode';
import { ANTLRInputStream, CommonTokenStream, Token } from 'antlr4ts';
import { GlslVisitor } from './glsl-visitor';
import { UniqueDiagnostic } from '../diagnostic/unique-diagnostic';
import { GlslErrorListener } from './glsl-error-listener';
import { AntlrGeneratedDiagnostic } from '../diagnostic/antlr-generated-diagnostic';
import { FunctionValidator } from '../diagnostic/validators/function-validator';
import { AntlrGlslLexer } from '../_generated/AntlrGlslLexer';
import { AntlrGlslParser } from '../_generated/AntlrGlslParser';
import { LogicalFunction } from '../scope/function/logical-function';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { Scope } from '../scope/scope';
import { Interval } from '../scope/interval';
import { Builtin } from '../builtin/builtin';
import { Helper } from '../helper/helper';
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
        if (document.version > this.lastProcessedVersion) {
            this.processDocumentUnsafe(document);
            this.lastProcessedVersion = document.version;
        }
    }

    private processDocumentUnsafe(document: TextDocument): void {
        const lexer = this.createLexer(document);
        const parser = this.createParser(lexer);
        this.generatedErrors = this.getGeneratedErrors(parser);
        this.processVisitor(parser);
        Validator.validate(this);
    }

    private createLexer(document: TextDocument): AntlrGlslLexer {
        const inputStream = new ANTLRInputStream(document.getText());
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

    public getScopeAt(position: Position, document: TextDocument): Scope {
        let scope: Scope = this.rootScope;
        while (true) {
            const newScope = this.getChildScope(scope, position, document);
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
    public getFunctionPrototypeAt(position: Position, document: TextDocument): FunctionDeclaration {
        return this.getFunction(this.functionPrototypes, position, document);
    }

    public getFunctionDefinitionAt(position: Position, document: TextDocument): FunctionDeclaration {
        return this.getFunction(this.functionDefinitions, position, document);
    }

    private getFunction(functionList: Array<FunctionDeclaration>, position: Position, document: TextDocument) {
        for (const fd of functionList) {
            if (Helper.intervalToRange(fd.nameInterval, document).contains(position)) {
                return fd;
            }
        }
        return null;
    }

    //function calls
    public getFunctionCallAt(position: Position, document: TextDocument): FunctionCall {
        return this.getElementAt(position, document, 'functionCalls') as FunctionCall;
    }

    //variable declaration
    public getVariableDeclarationAt(position: Position, document: TextDocument): VariableDeclaration {
        return this.getElementAt(position, document, 'variableDeclarations') as VariableDeclaration;
    }

    //variable usages
    public getVariableUsageAt(position: Position, document: TextDocument): VariableUsage {
        return this.getElementAt(position, document, 'variableUsages') as VariableUsage;
    }

    //type declaration
    public getTypeDeclarationAt(position: Position, document: TextDocument): TypeDeclaration {
        return this.getElementAt(position, document, 'typeDeclarations') as TypeDeclaration;
    }

    //type usages
    public getTypeUsageAt(position: Position, document: TextDocument): TypeUsage {
        return this.getElementAt(position, document, 'typeUsages') as TypeUsage;
    }

    //
    private getElementAt(position: Position, document: TextDocument, type: 'variableDeclarations' | 'variableUsages' | 'typeDeclarations' | 'typeUsages' | 'functionCalls'): VariableDeclaration | VariableUsage | TypeDeclaration | TypeUsage | FunctionCall {
        let scope: Scope = this.rootScope;
        while (scope) {
            for (const element of scope[type]) {
                if (Helper.intervalToRange(element.nameInterval, document).contains(position)) {
                    return element;
                }
            }
            scope = this.getChildScope(scope, position, document);
        }
        return null;
    }

    public getChildScope(scope: Scope, position: Position, document: TextDocument): Scope {
        for (const childScope of scope.children) {
            if (Helper.intervalToRange(childScope.interval, document).contains(position)) {
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
