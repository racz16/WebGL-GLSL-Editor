import { GlslEditor } from './glsl-editor';
import { Uri } from 'vscode';
import { DocumentInfo } from './document-info';
import { StartContext, Function_definitionContext, Function_prototypeContext, ExpressionContext, Compound_statementContext, Variable_declarationContext, Type_declarationContext, For_iterationContext, While_iterationContext, Do_while_iterationContext, Selection_statementContext, Case_groupContext, StatementContext, Invariant_declarationContext } from '../_generated/AntlrGlslParser';
import { FunctionProcessor } from '../processor/function-processor';
import { Helper } from '../processor/helper';
import { Scope } from '../scope/scope';
import { AntlrGlslParserVisitor } from '../_generated/AntlrGlslParserVisitor';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { TypeDeclarationProcessor } from '../processor/type-declaration-processor';
import { AntlrGlslLexer } from '../_generated/AntlrGlslLexer';
import { VariableDeclarationProcessor } from '../processor/variable-declaration-processor';
import { ExpressionProcessor } from '../processor/expression-processor';
import { Interval } from '../scope/interval';
import { ParserRuleContext } from 'antlr4ts';
import { VariableUsageProcessor } from '../processor/variable-usage-processor';

export class GlslVisitor extends AbstractParseTreeVisitor<void> implements AntlrGlslParserVisitor<void> {

    private uri: Uri;
    private di: DocumentInfo;
    private scope: Scope;

    public constructor(uri: Uri) {
        super();
        this.uri = uri;
    }

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

    public visitInvariant_declaration(ctx: Invariant_declarationContext): void {
        VariableUsageProcessor.getVariableUsage(ctx.IDENTIFIER(), this.scope, this.di);
    }

    //
    //functions
    //
    public visitFunction_prototype(ctx: Function_prototypeContext): void {
        this.scope = this.createScopeFromFunctionPrototype(this.scope, ctx);
        FunctionProcessor.getFunctionPrototype(ctx, this.scope, this.di);
        this.scope = this.scope.parent;
    }

    private createScopeFromFunctionPrototype(currentScope: Scope, ctx: Function_prototypeContext): Scope {
        const interval = new Interval(ctx.function_header().LRB().symbol.startIndex, ctx.SEMICOLON().symbol.stopIndex + 1);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    public visitFunction_definition(ctx: Function_definitionContext): void {
        this.scope = this.createScopeFromFunctionDefinition(this.scope, ctx);
        FunctionProcessor.getFunctionDefinition(ctx, this.scope, this.di);
        this.visitChildren(ctx.compound_statement());
        this.scope = this.scope.parent;
    }

    private createScopeFromFunctionDefinition(currentScope: Scope, ctx: Function_definitionContext): Scope {
        const interval = new Interval(ctx.function_header().LRB().symbol.startIndex, ctx.compound_statement().RCB().symbol.stopIndex + 1);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    //
    //expressions
    //
    public visitExpression(ctx: ExpressionContext): void {
        new ExpressionProcessor().processExpression(ctx, this.scope, this.di);
    }

    //
    //iterations
    //
    public visitFor_iteration(ctx: For_iterationContext): void {
        this.scope = this.createScopeFromForIteration(this.scope, ctx);
        this.visit(ctx.variable_declaration());
        for (const el of ctx.expression_list()) {
            this.visit(el);
        }
        this.visit(ctx.expression());
        this.visit(ctx.statement());
        this.scope = this.scope.parent;
    }

    private createScopeFromForIteration(currentScope: Scope, ctx: For_iterationContext): Scope {
        const interval = new Interval(ctx.LRB().symbol.startIndex, ctx.statement().stop.stopIndex + 1);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    public visitWhile_iteration(ctx: While_iterationContext): void {
        this.visit(ctx.expression());
        this.scope = this.createScopeFromWhileIteration(this.scope, ctx);
        this.visit(ctx.statement());
        this.scope = this.scope.parent;
    }

    public visitDo_while_iteration(ctx: Do_while_iterationContext): void {
        this.visit(ctx.expression());
        this.scope = this.createScopeFromWhileIteration(this.scope, ctx);
        this.visit(ctx.statement());
        this.scope = this.scope.parent;
    }

    private createScopeFromWhileIteration(currentScope: Scope, ctx: While_iterationContext | Do_while_iterationContext): Scope {
        const interval = Helper.getIntervalFromParserRule(ctx.statement());
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    //
    //if-else
    //
    public visitSelection_statement(ctx: Selection_statementContext): void {
        this.visit(ctx.expression());
        this.scope = this.createScopeFromIf(this.scope, ctx);
        this.visit(ctx.statement()[0]);
        this.scope = this.scope.parent;
        if (ctx.statement().length > 1) {
            this.scope = this.createScopeFromElse(this.scope, ctx);
            this.visit(ctx.statement()[1]);
            this.scope = this.scope.parent;
        }
    }

    private createScopeFromIf(currentScope: Scope, ctx: Selection_statementContext): Scope {
        const interval = Helper.getIntervalFromParserRule(ctx.statement()[0]);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    //
    //case
    //
    private createScopeFromElse(currentScope: Scope, ctx: Selection_statementContext): Scope {
        const interval = Helper.getIntervalFromParserRule(ctx.statement()[1]);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    public visitCase_group(ctx: Case_groupContext): void {
        this.visit(ctx.case_label().expression());
        if (ctx.statement().length) {
            this.scope = this.createScopeFromCaseStatements(this.scope, ctx.statement());
            for (const st of ctx.statement()) {
                this.visit(st);
            }
            this.scope = this.scope.parent;
        }
    }

    private createScopeFromCaseStatements(currentScope: Scope, statements: Array<StatementContext>): Scope {
        const interval = Helper.getIntervalFromParserRules(statements[0], statements[statements.length - 1]);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    //
    //compound
    //
    public visitCompound_statement(ctx: Compound_statementContext): void {
        this.scope = this.createScope(this.scope, ctx);
        this.visitChildren(ctx);
        this.scope = this.scope.parent;
    }

    private createScope(currentScope: Scope, prc: ParserRuleContext): Scope {
        const interval = Helper.getIntervalFromParserRule(prc);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    protected defaultResult(): void { }

}
