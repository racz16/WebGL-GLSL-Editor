import { Token } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { RuleNode } from 'antlr4ts/tree/RuleNode';
import { Uri } from 'vscode';
import { AntlrGlslLexer } from '../_generated/AntlrGlslLexer';
import {
    AntlrGlslParser,
    Case_groupContext,
    Compound_statementContext,
    Do_while_iterationContext,
    ExpressionContext,
    For_iterationContext,
    Function_definitionContext,
    Function_headerContext,
    Function_prototypeContext,
    Interface_block_declarationContext,
    Invariant_declarationContext,
    Layout_qualifierContext,
    Selection_statementContext,
    StartContext,
    Switch_statementContext,
    Type_declarationContext,
    Variable_declarationContext,
    While_iterationContext,
} from '../_generated/AntlrGlslParser';
import { AntlrGlslParserVisitor } from '../_generated/AntlrGlslParserVisitor';
import { ExpressionProcessor } from '../processor/expression-processor';
import { FunctionProcessor } from '../processor/function-processor';
import { Helper } from '../processor/helper';
import { TypeDeclarationProcessor } from '../processor/type-declaration-processor';
import { VariableDeclarationProcessor } from '../processor/variable-declaration-processor';
import { VariableUsageProcessor } from '../processor/variable-usage-processor';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { Interval } from '../scope/interval';
import { PreprocessorRegion } from '../scope/regions/preprocessor-region';
import { Scope } from '../scope/scope';
import { DocumentInfo } from './document-info';
import { GlslEditor } from './glsl-editor';

export class GlslVisitor extends AbstractParseTreeVisitor<void> implements AntlrGlslParserVisitor<void> {
    private uri: Uri;
    private di: DocumentInfo;
    private scope: Scope;

    private currentFunction: FunctionDeclaration;

    public constructor(uri: Uri) {
        super();
        this.uri = uri;
    }

    private initialize(): void {
        this.di = GlslEditor.getDocumentInfo(this.uri);
        this.di.reset();
        this.setTokenInformations();
        this.scope = this.di.getRootScope();
    }

    private setTokenInformations(): void {
        this.di.setVersion(100);
        let onlyTabsAndSpaces = true;
        const ctx = new CommentContext();
        for (let i = 0; i < this.di.getTokens().length; i++) {
            const token = this.di.getTokens()[i];
            this.addCommentFoldingRegionBasedOnToken(ctx, token, i);
            this.addPreprocessorRegion(token);
            if (token.type !== AntlrGlslLexer.TAB && token.type !== AntlrGlslLexer.SPACE) {
                this.setVersionIfTokenIsVersionPreprocessor(token, onlyTabsAndSpaces);
                onlyTabsAndSpaces = false;
            }
        }
        this.addSingleLineCommentFoldingRegionIfExists(ctx);
    }

    private setVersionIfTokenIsVersionPreprocessor(token: Token, onlyTabsAndSpaces: boolean): void {
        if (onlyTabsAndSpaces && token.type === AntlrGlslLexer.PREPROCESSOR && token.text.startsWith('#version')) {
            const version = token.text.includes('300') ? 300 : 100;
            this.di.setVersion(version);
        }
    }

    private addPreprocessorRegion(token: Token): void {
        if (token.type === AntlrGlslLexer.PREPROCESSOR) {
            const interval = new Interval(token.startIndex, token.stopIndex + 1, this.di);
            const r = new RegExp('\\s*#\\s*extension\\s+.*?\\s*:\\s*.*?\\s*');
            let extension = '';
            let extensionState = '';
            if (r.test(token.text)) {
                const index = token.text.indexOf('extension') + 9;
                const values = token.text.substring(index).split(':');
                extension = values[0].trim();
                extensionState = values[1].trim();
            }
            this.di
                .getRegions()
                .preprocessorRegions.push(new PreprocessorRegion(token.text, interval, extension, extensionState));
        }
    }

    private addCommentFoldingRegionBasedOnToken(ctx: CommentContext, token: Token, index: number): void {
        if (token.type === AntlrGlslLexer.SINGLE_LINE_COMMENT) {
            this.di.getRegions().commentRegions.push(new Interval(token.startIndex, token.stopIndex + 1, this.di));
            this.growSingleLineComment(ctx, token);
        } else {
            this.addCommentFoldingRegionIfExists(ctx, token, index);
        }
    }

    private growSingleLineComment(ctx: CommentContext, token: Token): void {
        if (!ctx.firstComment) {
            ctx.firstComment = token;
        }
        ctx.lastComment = token;
    }

    private addCommentFoldingRegionIfExists(ctx: CommentContext, token: Token, index: number): void {
        if (token.type === AntlrGlslLexer.MULTI_LINE_COMMENT) {
            const endToken = index + 1 === this.di.getTokens().length ? token : this.di.getTokens()[index + 1];
            Helper.addFoldingRegionFromComment(this.di, token, endToken);
            this.di.getRegions().commentRegions.push(new Interval(token.startIndex, token.stopIndex + 1, this.di));
        }
        if (
            token.type !== AntlrGlslLexer.NEW_LINE &&
            token.type !== AntlrGlslLexer.TAB &&
            token.type !== AntlrGlslLexer.SPACE
        ) {
            this.addSingleLineCommentFoldingRegionIfExists(ctx);
            ctx.firstComment = null;
            ctx.lastComment = null;
        }
    }

    private addSingleLineCommentFoldingRegionIfExists(ctx: CommentContext): void {
        if (ctx.firstComment !== ctx.lastComment && ctx.firstComment != null) {
            Helper.addFoldingRegionFromComment(this.di, ctx.firstComment, ctx.lastComment);
        }
    }

    public getCurrentFunction(): FunctionDeclaration {
        return this.currentFunction;
    }

    public visitStart(ctx: StartContext): void {
        this.initialize();
        this.visitChildren(ctx);
    }

    //
    //declarations
    //
    public visitType_declaration(ctx: Type_declarationContext): void {
        new TypeDeclarationProcessor().getTypeDeclaration(ctx, this.scope, this.di, 0, false, false);
    }

    public visitVariable_declaration(ctx: Variable_declarationContext): void {
        new VariableDeclarationProcessor().getDeclarations(ctx, this.scope, this.di);
        this.visitList(ctx.type_usage().qualifier());
    }

    public visitInvariant_declaration(ctx: Invariant_declarationContext): void {
        new VariableUsageProcessor().getVariableUsage(ctx.IDENTIFIER(), this.scope, this.di);
    }

    public visitInterface_block_declaration(ctx: Interface_block_declarationContext): void {
        Helper.addFoldingRegionFromTokens(this.di, ctx.IDENTIFIER()?.symbol ?? ctx.LCB().symbol, ctx.RCB().symbol);
        new VariableDeclarationProcessor().getInterfaceBlockVariableDeclaration(ctx, this.scope, this.di);
        this.visitList(ctx.qualifier());
    }

    //
    //functions
    //
    public visitFunction_prototype(ctx: Function_prototypeContext): void {
        this.scope = this.createScopeFromFunctionPrototype(this.scope, ctx);
        new FunctionProcessor().getFunctionPrototype(ctx, this.scope, this.di);
        this.addFunctionParametersListRegion(ctx.function_header());
        this.scope = this.scope.parent;
    }

    private createScopeFromFunctionPrototype(currentScope: Scope, ctx: Function_prototypeContext): Scope {
        const interval = new Interval(
            ctx.function_header().LRB().symbol.startIndex,
            ctx.SEMICOLON().symbol.stopIndex + 1,
            this.di
        );
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    public visitFunction_definition(ctx: Function_definitionContext): void {
        this.scope = this.createScopeFromFunctionDefinition(this.scope, ctx);
        Helper.addFoldingRegionFromTokens(
            this.di,
            ctx.function_header().IDENTIFIER().symbol,
            ctx.compound_statement().RCB().symbol
        );
        this.currentFunction = new FunctionProcessor().getFunctionDefinition(ctx, this.scope, this.di);
        this.di.getRegions().scopedCurlyBracePositions.push(ctx.compound_statement().LCB().symbol.startIndex);
        this.visit(ctx.compound_statement());
        this.addFunctionParametersListRegion(ctx.function_header());
        this.currentFunction = null;
        this.scope = this.scope.parent;
    }

    private addFunctionParametersListRegion(ctx: Function_headerContext): void {
        const t1 = ctx.LRB().symbol;
        const t2 = ctx.RRB().symbol;
        if (t1.line !== t2.line && ctx.function_parameter_list()) {
            const interval = new Interval(t1.startIndex, t2.stopIndex, this.di);
            this.di.getRegions().functionParametersRegions.push(interval);
        }
    }

    private createScopeFromFunctionDefinition(currentScope: Scope, ctx: Function_definitionContext): Scope {
        const interval = new Interval(
            ctx.function_header().LRB().symbol.startIndex + 1,
            ctx.compound_statement().RCB().symbol.stopIndex,
            this.di
        );
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
        this.di
            .getRegions()
            .forHeaderRegions.push(new Interval(ctx.LRB().symbol.startIndex, ctx.RRB().symbol.stopIndex, this.di));
        if (ctx.statement().compound_statement()) {
            Helper.addFoldingRegionFromTokens(this.di, ctx.KW_FOR().symbol, ctx.stop);
        }
        this.visitChildren(ctx);
        this.scope = this.scope.parent;
    }

    private createScopeFromForIteration(currentScope: Scope, ctx: For_iterationContext): Scope {
        const increment = ctx.statement().simple_statement() ? 1 : 0;
        if (increment === 0) {
            this.di
                .getRegions()
                .scopedCurlyBracePositions.push(ctx.statement().compound_statement().LCB().symbol.startIndex);
        }
        const interval = new Interval(
            ctx.LRB().symbol.startIndex + 1,
            ctx.statement().stop.stopIndex + increment,
            this.di
        );
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    public visitWhile_iteration(ctx: While_iterationContext): void {
        this.visit(ctx.expression());
        this.scope = this.createScopeFromWhileIteration(this.scope, ctx);
        if (ctx.statement().compound_statement()) {
            Helper.addFoldingRegionFromTokens(this.di, ctx.KW_WHILE().symbol, ctx.stop);
        }
        this.visit(ctx.statement());
        this.scope = this.scope.parent;
    }

    public visitDo_while_iteration(ctx: Do_while_iterationContext): void {
        this.scope = this.createScopeFromWhileIteration(this.scope, ctx);
        if (ctx.statement().compound_statement()) {
            Helper.addFoldingRegionFromTokens(this.di, ctx.KW_DO().symbol, ctx.statement().stop);
        }
        this.visit(ctx.statement());
        this.scope = this.scope.parent;
        this.visit(ctx.expression());
    }

    private createScopeFromWhileIteration(
        currentScope: Scope,
        ctx: While_iterationContext | Do_while_iterationContext
    ): Scope {
        const interval = Helper.getIntervalFromStatement(ctx.statement(), this.di);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    //
    //if-else
    //
    public visitSelection_statement(ctx: Selection_statementContext): void {
        this.visitIfStatement(ctx);
        if (ctx.statement().length > 1) {
            this.visitElseStatement(ctx);
        }
    }

    private visitIfStatement(ctx: Selection_statementContext): void {
        this.visit(ctx.expression());
        this.scope = this.createScopeFromIf(this.scope, ctx);
        if (ctx.statement()[0].compound_statement()) {
            Helper.addFoldingRegionFromTokens(this.di, ctx.KW_IF().symbol, ctx.statement()[0].stop);
        }
        this.visit(ctx.statement()[0]);
        this.scope = this.scope.parent;
    }

    private visitElseStatement(ctx: Selection_statementContext): void {
        this.scope = this.createScopeFromElse(this.scope, ctx);
        if (ctx.statement()[1].compound_statement()) {
            Helper.addFoldingRegionFromTokens(this.di, ctx.KW_ELSE().symbol, ctx.statement()[1].stop);
        }
        this.visit(ctx.statement()[1]);
        this.scope = this.scope.parent;
    }

    private createScopeFromIf(currentScope: Scope, ctx: Selection_statementContext): Scope {
        const interval = Helper.getIntervalFromStatement(ctx.statement()[0], this.di);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    private createScopeFromElse(currentScope: Scope, ctx: Selection_statementContext): Scope {
        const interval = Helper.getIntervalFromStatement(ctx.statement()[1], this.di);
        const elseIf = !!ctx.statement()[1].simple_statement()?.selection_statement();
        const newScope = new Scope(interval, currentScope, elseIf);
        currentScope.children.push(newScope);
        return newScope;
    }

    //
    //switch/case
    //
    public visitSwitch_statement(ctx: Switch_statementContext): void {
        this.visit(ctx.expression());
        this.scope = this.createScopeFromSwitch(this.scope, ctx);
        Helper.addFoldingRegionFromTokens(this.di, ctx.KW_SWITCH().symbol, ctx.stop);
        this.visitList(ctx.case_group());
        this.scope = this.scope.parent;
    }

    private createScopeFromSwitch(currentScope: Scope, ctx: Switch_statementContext): Scope {
        const interval = new Interval(ctx.LCB().symbol.startIndex + 1, ctx.RCB().symbol.stopIndex, this.di);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    public visitCase_group(ctx: Case_groupContext): void {
        Helper.addFoldingRegionFromTokens(this.di, ctx.start, ctx.stop, -1);
        this.di
            .getRegions()
            .caseHeaderRegions.push(
                new Interval(ctx.case_label().start.startIndex, ctx.case_label().stop.stopIndex + 1, this.di)
            );
        if (ctx.statement()[0].simple_statement()) {
            this.di
                .getRegions()
                .caseStatementsRegions.push(
                    new Interval(
                        ctx.statement()[0].start.startIndex,
                        ctx.statement()[ctx.statement().length - 1].stop.stopIndex + 1,
                        this.di
                    )
                );
        }
        this.visitChildren(ctx);
    }

    //
    //compound
    //
    public visitCompound_statement(ctx: Compound_statementContext): void {
        if (this.isScoped(ctx)) {
            this.scope = this.createScope(this.scope, ctx);
            Helper.addFoldingRegionFromTokens(this.di, ctx.start, ctx.stop);
            this.visitChildren(ctx);
            this.scope = this.scope.parent;
        } else {
            this.visitChildren(ctx);
        }
    }

    private isScoped(ctx: Compound_statementContext): boolean {
        const pp = ctx.parent.parent;
        return (
            ctx.parent.ruleIndex !== AntlrGlslParser.RULE_function_definition &&
            pp.ruleIndex !== AntlrGlslParser.RULE_selection_statement &&
            pp.ruleIndex !== AntlrGlslParser.RULE_for_iteration &&
            pp.ruleIndex !== AntlrGlslParser.RULE_while_iteration &&
            pp.ruleIndex !== AntlrGlslParser.RULE_do_while_iteration &&
            pp.ruleIndex !== AntlrGlslParser.RULE_switch_statement
        );
    }

    private createScope(currentScope: Scope, ctx: Compound_statementContext): Scope {
        const interval = Helper.getIntervalFromCompoundStatement(ctx, this.di);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    public visitLayout_qualifier(ctx: Layout_qualifierContext): void {
        this.di
            .getRegions()
            .layoutRegions.push(new Interval(ctx.LRB().symbol.startIndex, ctx.RRB().symbol.stopIndex, this.di));
    }

    protected visitList(rules: Array<RuleNode>): void {
        for (const rule of rules) {
            this.visit(rule);
        }
    }

    protected defaultResult(): void {}
}

class CommentContext {
    public firstComment: Token;
    public lastComment: Token;
}
