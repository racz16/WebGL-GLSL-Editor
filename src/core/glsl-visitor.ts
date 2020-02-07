import { GlslEditor } from './glsl-editor';
import { Uri } from 'vscode';
import { DocumentInfo } from './document-info';
import { StartContext, Function_definitionContext, Function_prototypeContext, Declaration_statementContext, ExpressionContext, Compound_statementContext, Variable_declarationContext, Type_declarationContext, For_iterationContext, While_iterationContext, Do_while_iterationContext, Selection_statementContext } from '../_generated/AntlrGlslParser';
import { FunctionProcessor } from '../processor/function-processor';
import { Helper } from '../processor/helper';
import { Scope } from '../scope/scope';
import { AntlrGlslParserVisitor } from '../_generated/AntlrGlslParserVisitor';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { TypeDeclarationProcessor } from '../processor/type-declaration-processor';
import { AntlrGlslLexer } from '../_generated/AntlrGlslLexer';
import { VariableDeclarationProcessor } from '../processor/variable-declaration-processor';
import { ExpressionProcessor } from '../processor/expression-processor';

export class GlslVisitor extends AbstractParseTreeVisitor<void> implements AntlrGlslParserVisitor<void> {

    private uri: Uri;
    private di: DocumentInfo;
    private scope: Scope;

    public constructor(uri: Uri) {
        super();
        this.uri = uri;
    }

    protected defaultResult(): void { }

    private initialize(): void {
        this.di = GlslEditor.getDocumentInfo(this.uri);
        const version = this.getVersion();
        this.di.setVersion(version);
        this.di.reset();
        this.scope = this.di.getRootScope();
    }

    private getVersion(): 100 | 300 {
        for (const token of this.di.getTokens()) {
            if (token.type === AntlrGlslLexer.MACRO && token.text.startsWith('#version')) {
                if (token.text.includes('300')) {
                    return 300;
                }
                break;
            } else if (token.type === AntlrGlslLexer.TAB || token.type === AntlrGlslLexer.SPACE) {
                //do nothing
            } else {
                break;
            }
        }
        return 100;
    }

    public visitStart(ctx: StartContext): void {
        this.initialize();
        super.visitChildren(ctx);
    }

    //
    //declarations
    //
    public visitType_declaration(ctx: Type_declarationContext): void {
        TypeDeclarationProcessor.getTypeDeclaration(ctx, this.scope, this.di, 0);
    }

    public visitVariable_declaration(ctx: Variable_declarationContext): void {
        VariableDeclarationProcessor.getDeclarations(ctx, this.scope, this.di);
    }

    //
    //functions
    //
    public visitFunction_prototype(ctx: Function_prototypeContext): void {
        this.scope = Helper.createScopeFromFunctionPrototype(this.scope, ctx);
        FunctionProcessor.getFunctionPrototype(ctx, this.scope, this.di);
        this.scope = this.scope.parent;
    }

    public visitFunction_definition(ctx: Function_definitionContext): void {
        this.scope = Helper.createScopeFromFunctionDefinition(this.scope, ctx);
        FunctionProcessor.getFunctionDefinition(ctx, this.scope, this.di);
        this.visitChildren(ctx.compound_statement());
        this.scope = this.scope.parent;
    }

    //
    //expressions
    //
    public visitExpression(ctx: ExpressionContext): void {
        new ExpressionProcessor().processExpression(ctx, this.scope, this.di);
    }

    public visitFor_iteration(ctx: For_iterationContext): void {
        this.scope = Helper.createScopeFromForIteration(this.scope, ctx);
        this.visitVariable_declaration(ctx.variable_declaration());
        for (const el of ctx.expression_list()) {
            this.visitChildren(el);
        }
        this.visitExpression(ctx.expression());
        this.visitChildren(ctx.statement());
        this.scope = this.scope.parent;
    }

    public visitWhile_iteration(ctx: While_iterationContext): void {
        this.visitExpression(ctx.expression());
        this.scope = Helper.createScopeFromWhileIteration(this.scope, ctx);
        this.visitChildren(ctx.statement());
        this.scope = this.scope.parent;
    }

    public visitDo_while_iteration(ctx: Do_while_iterationContext): void {
        this.visitExpression(ctx.expression());
        this.scope = Helper.createScopeFromWhileIteration(this.scope, ctx);
        this.visitChildren(ctx.statement());
        this.scope = this.scope.parent;
    }

    public visitSelection_statement(ctx: Selection_statementContext): void {
        this.visitExpression(ctx.expression());
        this.scope = Helper.createScopeFromIf(this.scope, ctx);
        this.visitChildren(ctx.statement()[0]);
        this.scope = this.scope.parent;
        if (ctx.statement().length > 1) {
            this.scope = Helper.createScopeFromElse(this.scope, ctx);
            this.visitChildren(ctx.statement()[1]);
            this.scope = this.scope.parent;
        }
    }

    public visitCompound_statement(ctx: Compound_statementContext): void {
        this.scope = Helper.createScope(this.scope, ctx);
        this.visitChildren(ctx);
        this.scope = this.scope.parent;
    }

}
