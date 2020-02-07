import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Array_subscriptContext, Identifier_optarrayContext, Function_prototypeContext, Function_definitionContext, Identifier_optarray_optassignmentContext, For_iterationContext, Selection_statementContext, While_iterationContext, Do_while_iterationContext } from '../_generated/AntlrGlslParser';
import { ParserRuleContext } from 'antlr4ts';
import { Scope } from '../scope/scope';
import { Interval } from '../scope/interval';
import { ArrayUsage } from '../scope/array-usage';
import { ExpressionProcessor, ExpressionType } from './expression-processor';
import { DocumentInfo } from '../core/document-info';

export class Helper {

    public static getArraySizeFromArraySubscript(ascs: Array<Array_subscriptContext>, scope: Scope, di: DocumentInfo): ArrayUsage {
        if (!ascs.length) {
            return new ArrayUsage();
        }
        const exp = new ExpressionProcessor().processExpression(ascs[0].expression(), scope, di);
        for (let i = 1; i < ascs.length; i++) {
            new ExpressionProcessor().processExpression(ascs[i].expression(), scope, di);
        }
        const tn = ascs[0].LSB();
        const tn2 = ascs[ascs.length - 1].RSB();
        const arraySize = exp && exp instanceof ExpressionType && exp.value ? exp.value : 0;
        return new ArrayUsage(arraySize, this.getIntervalFromTerminalNodes(tn, tn2), ascs.length > 1);
    }

    public static getArraySizeFromIdentifierOptarray(ioc: Identifier_optarrayContext, scope: Scope, di: DocumentInfo): ArrayUsage {
        if (!ioc) {
            return new ArrayUsage();
        }
        return this.getArraySizeFromArraySubscript(ioc.array_subscript(), scope, di);
    }

    public static getArraySizeFromIdentifierOptarrayOptassignment(iooc: Identifier_optarray_optassignmentContext, scope: Scope, di: DocumentInfo): ArrayUsage {
        if (!iooc) {
            return new ArrayUsage();
        }
        return this.getArraySizeFromIdentifierOptarray(iooc.identifier_optarray(), scope, di);
    }

    public static createScope(currentScope: Scope, prc: ParserRuleContext): Scope {
        const interval = Helper.getIntervalFromParserRule(prc);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    public static createScopeFromFunctionPrototype(currentScope: Scope, ctx: Function_prototypeContext): Scope {
        const interval = new Interval(ctx.function_header().LRB().symbol.startIndex, ctx.SEMICOLON().symbol.stopIndex + 1);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    public static createScopeFromFunctionDefinition(currentScope: Scope, ctx: Function_definitionContext): Scope {
        const interval = new Interval(ctx.function_header().LRB().symbol.startIndex, ctx.compound_statement().RCB().symbol.stopIndex + 1);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    public static createScopeFromForIteration(currentScope: Scope, ctx: For_iterationContext): Scope {
        const interval = new Interval(ctx.LRB().symbol.startIndex, ctx.statement().stop.stopIndex + 1);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    public static createScopeFromWhileIteration(currentScope: Scope, ctx: While_iterationContext | Do_while_iterationContext): Scope {
        const interval = this.getIntervalFromParserRule(ctx.statement());
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    public static createScopeFromIf(currentScope: Scope, ctx: Selection_statementContext): Scope {
        const interval = this.getIntervalFromParserRule(ctx.statement()[0]);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    public static createScopeFromElse(currentScope: Scope, ctx: Selection_statementContext): Scope {
        const interval = this.getIntervalFromParserRule(ctx.statement()[1]);
        const newScope = new Scope(interval, currentScope);
        currentScope.children.push(newScope);
        return newScope;
    }

    public static getIntervalFromParserRule(ctx: ParserRuleContext): Interval {
        return ctx ? new Interval(ctx.start.startIndex, ctx.stop.stopIndex + 1) : Interval.NONE;
    }

    public static getIntervalFromParserRules(startRule: ParserRuleContext, endRule: ParserRuleContext): Interval {
        return new Interval(startRule.start.startIndex, endRule.stop.stopIndex + 1);
    }

    public static getIntervalFromTerminalNode(tn: TerminalNode): Interval {
        return tn ? new Interval(tn.symbol.startIndex, tn.symbol.stopIndex + 1) : Interval.NONE;
    }

    public static getIntervalFromTerminalNodes(tn: TerminalNode, tn2: TerminalNode): Interval {
        return new Interval(tn.symbol.startIndex, tn2.symbol.stopIndex + 1);
    }

}
