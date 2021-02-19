import { GlslEditor } from './glsl-editor';
import { Uri, FoldingRangeKind, Position, } from 'vscode';
import { DocumentInfo } from './document-info';
import { StartContext, Function_definitionContext, Function_prototypeContext, ExpressionContext, Compound_statementContext, Variable_declarationContext, Type_declarationContext, For_iterationContext, While_iterationContext, Do_while_iterationContext, Selection_statementContext, Case_groupContext, Invariant_declarationContext, Switch_statementContext, Interface_block_declarationContext, AntlrGlslParser } from '../_generated/AntlrGlslParser';
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
import { ParserRuleContext, Token } from 'antlr4ts';
import { VariableUsageProcessor } from '../processor/variable-usage-processor';
import { FoldingRegion } from '../scope/folding-region';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { RuleNode } from 'antlr4ts/tree/RuleNode';

export class GlslVisitor extends AbstractParseTreeVisitor<void> implements AntlrGlslParserVisitor<void> {

    private uri: Uri;
    private di: DocumentInfo;
    private scope: Scope;

    private currentFunction: FunctionDeclaration;
    private versionEndPosition: Position;

    public constructor(uri: Uri) {
        super();
        this.uri = uri;
    }

    private initialize(): void {
        this.di = GlslEditor.getDocumentInfo(this.uri);
        this.setVersion();
        this.di.reset();
        this.scope = this.di.getRootScope();
        this.addCommentFoldingRegions();
    }

    private setVersion(): void {
        this.versionEndPosition = null;
        this.di.setVersion(100);
        for (const token of this.di.getTokens()) {
            const versionFound = this.setVersionIfTokenAppropirate(token);
            if (versionFound) {
                break;
            }
        }
    }

    private setVersionIfTokenAppropirate(token: Token): boolean {
        if (token.type === AntlrGlslLexer.TAB || token.type === AntlrGlslLexer.SPACE) {
            return false;
        } else {
            this.setVersionIfTokenIsVersionMacro(token);
            return true;
        }
    }

    private setVersionIfTokenIsVersionMacro(token: Token): void {
        if (token.type === AntlrGlslLexer.MACRO && token.text.startsWith('#version')) {
            const version = token.text.includes('300') ? 300 : 100;
            this.di.setVersion(version);
            this.versionEndPosition = new Position(token.line - 1, token.charPositionInLine + token.text.length);
        }
    }

    private addCommentFoldingRegions(): void {
        const ctx = new CommentContext();
        for (let i = 0; i < this.di.getTokens().length; i++) {
            const token = this.di.getTokens()[i];
            this.addCommentFoldingRegionBasedOnToken(ctx, token, i);
        }
        this.addSingleLineCommentFoldingRegionIfExists(ctx);
    }

    private addCommentFoldingRegionBasedOnToken(ctx: CommentContext, token: Token, index: number): void {
        if (token.type === AntlrGlslLexer.SINGLE_LINE_COMMENT) {
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
            this.addFoldingRangeFromComment(token, endToken);
        }
        if (token.type !== AntlrGlslLexer.NEW_LINE && token.type !== AntlrGlslLexer.TAB && token.type !== AntlrGlslLexer.SPACE) {
            this.addSingleLineCommentFoldingRegionIfExists(ctx);
            ctx.firstComment = null;
            ctx.lastComment = null;
        }
    }

    private addSingleLineCommentFoldingRegionIfExists(ctx: CommentContext): void {
        if (ctx.firstComment !== ctx.lastComment && ctx.firstComment != null) {
            this.addFoldingRangeFromComment(ctx.firstComment, ctx.lastComment);
        }
    }

    public getCurrentFunction(): FunctionDeclaration {
        return this.currentFunction;
    }

    public getVersionEndPosition(): Position {
        return this.versionEndPosition;
    }

    public visitStart(ctx: StartContext): void {
        this.initialize();
        this.visitChildren(ctx);
    }

    //
    //declarations
    //
    public visitType_declaration(ctx: Type_declarationContext): void {
        this.addFoldingRangeFromTokens(ctx.KW_STRUCT().symbol, ctx.RCB().symbol);
        new TypeDeclarationProcessor().getTypeDeclaration(ctx, this.scope, this.di, 0);
    }

    public visitVariable_declaration(ctx: Variable_declarationContext): void {
        new VariableDeclarationProcessor().getDeclarations(ctx, this.scope, this.di);
    }

    public visitInvariant_declaration(ctx: Invariant_declarationContext): void {
        new VariableUsageProcessor().getVariableUsage(ctx.IDENTIFIER(), this.scope, this.di);
    }

    public visitInterface_block_declaration(ctx: Interface_block_declarationContext): void {
        this.addFoldingRangeFromTokens(ctx.IDENTIFIER()?.symbol ?? ctx.LCB().symbol, ctx.RCB().symbol);
        new VariableDeclarationProcessor().getInterfaceBlockVariableDeclaration(ctx, this.scope, this.di);
    }

    //
    //functions
    //
    public visitFunction_prototype(ctx: Function_prototypeContext): void {
        this.scope = this.createScopeFromFunctionPrototype(this.scope, ctx);
        new FunctionProcessor().getFunctionPrototype(ctx, this.scope, this.di);
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
        this.addFoldingRangeFromTokens(ctx.function_header().IDENTIFIER().symbol, ctx.compound_statement().RCB().symbol);
        this.currentFunction = new FunctionProcessor().getFunctionDefinition(ctx, this.scope, this.di);
        this.visit(ctx.compound_statement());
        this.currentFunction = null;
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
        if (ctx.statement().compound_statement()) {
            this.addFoldingRangeFromTokens(ctx.KW_FOR().symbol, ctx.stop);
        }
        this.visitChildren(ctx);
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
        if (ctx.statement().compound_statement()) {
            this.addFoldingRangeFromTokens(ctx.KW_WHILE().symbol, ctx.stop);
        }
        this.visit(ctx.statement());
        this.scope = this.scope.parent;
    }

    public visitDo_while_iteration(ctx: Do_while_iterationContext): void {
        this.scope = this.createScopeFromWhileIteration(this.scope, ctx);
        if (ctx.statement().compound_statement()) {
            this.addFoldingRangeFromTokens(ctx.KW_DO().symbol, ctx.statement().stop);
        }
        this.visit(ctx.statement())
        this.scope = this.scope.parent;
        this.visit(ctx.expression());
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
        this.visitIfStatement(ctx);
        if (ctx.statement().length > 1) {
            this.visitElseStatement(ctx);
        }
    }

    private visitIfStatement(ctx: Selection_statementContext): void {
        this.visit(ctx.expression());
        this.scope = this.createScopeFromIf(this.scope, ctx);
        if (ctx.statement()[0].compound_statement()) {
            this.addFoldingRangeFromTokens(ctx.KW_IF().symbol, ctx.statement()[0].stop);
        }
        this.visit(ctx.statement()[0]);
        this.scope = this.scope.parent;
    }

    private visitElseStatement(ctx: Selection_statementContext): void {
        this.scope = this.createScopeFromElse(this.scope, ctx);
        if (ctx.statement()[1].compound_statement()) {
            this.addFoldingRangeFromTokens(ctx.KW_ELSE().symbol, ctx.statement()[1].stop);
        }
        this.visit(ctx.statement()[1]);
        this.scope = this.scope.parent;
    }

    private createScopeFromIf(currentScope: Scope, ctx: Selection_statementContext): Scope {
        const interval = Helper.getIntervalFromParserRule(ctx.statement()[0]);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    private createScopeFromElse(currentScope: Scope, ctx: Selection_statementContext): Scope {
        const interval = Helper.getIntervalFromParserRule(ctx.statement()[1]);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    //
    //switch/case
    //
    public visitSwitch_statement(ctx: Switch_statementContext): void {
        this.visit(ctx.expression());
        this.scope = this.createScopeFromSwitch(this.scope, ctx);
        this.addFoldingRangeFromTokens(ctx.KW_SWITCH().symbol, ctx.stop);
        this.visitList(ctx.case_group());
        this.scope = this.scope.parent;
    }

    private createScopeFromSwitch(currentScope: Scope, ctx: Switch_statementContext): Scope {
        const interval = Helper.getIntervalFromTerminalNodes(ctx.LCB(), ctx.RCB());
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    public visitCase_group(ctx: Case_groupContext): void {
        this.addFoldingRangeFromTokens(ctx.start, ctx.stop, -1);
        this.visitChildren(ctx);
    }

    //
    //compound
    //
    public visitCompound_statement(ctx: Compound_statementContext): void {
        if (this.isScoped(ctx)) {
            this.scope = this.createScope(this.scope, ctx);
            this.addFoldingRangeFromTokens(ctx.start, ctx.stop);
            this.visitChildren(ctx);
            this.scope = this.scope.parent;
        } else {
            this.visitChildren(ctx);
        }
    }

    private isScoped(ctx: Compound_statementContext): boolean {
        const pp = ctx.parent.parent;
        return ctx.parent.ruleIndex !== AntlrGlslParser.RULE_function_definition &&
            pp.ruleIndex !== AntlrGlslParser.RULE_selection_statement &&
            pp.ruleIndex !== AntlrGlslParser.RULE_for_iteration &&
            pp.ruleIndex !== AntlrGlslParser.RULE_while_iteration &&
            pp.ruleIndex !== AntlrGlslParser.RULE_do_while_iteration &&
            pp.ruleIndex !== AntlrGlslParser.RULE_switch_statement;
    }

    private createScope(currentScope: Scope, prc: ParserRuleContext): Scope {
        const interval = Helper.getIntervalFromParserRule(prc);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    //
    //folding range
    //
    private addFoldingRangeFromTokens(t: Token, t2: Token, endOffset = -2): void {
        const fr = new FoldingRegion(t.line - 1, t2.line + endOffset);
        this.addFoldingRange(fr);
    }

    private addFoldingRangeFromComment(t: Token, t2: Token): void {
        if (t === t2) {
            const fr = new FoldingRegion(t.line - 1, this.di.getLineCount() - 1, FoldingRangeKind.Comment);
            this.addFoldingRange(fr);
        } else {
            const fr = new FoldingRegion(t.line - 1, t2.line - 1, FoldingRangeKind.Comment);
            this.addFoldingRange(fr);
        }
    }

    private addFoldingRange(foldingRegion: FoldingRegion): void {
        if (!this.di.foldingRegions.some(fr => fr.startLine === foldingRegion.startLine && fr.stopLine === foldingRegion.stopLine)) {
            this.di.foldingRegions.push(foldingRegion);
        }
    }

    protected visitList(rules: Array<RuleNode>): void {
        for (const rule of rules) {
            this.visit(rule);
        }
    }

    protected defaultResult(): void { }

}

class CommentContext {
    public firstComment: Token;
    public lastComment: Token;
}