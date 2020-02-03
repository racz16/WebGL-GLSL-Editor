import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Array_subscriptContext, Identifier_optarrayContext, Function_prototypeContext, Function_definitionContext, Identifier_optarray_optassignmentContext } from '../_generated/AntlrGlslParser';
import { ParserRuleContext } from 'antlr4ts';
import { Scope } from '../scope/scope';
import { Interval } from '../scope/interval';

export class Helper {

    public static getArraySizeFromArraySubscript(asc: Array_subscriptContext): Array<number> {
        //TODO
        //parameter may be null
        return new Array<number>();
    }

    public static getArraySizeFromIdentifierOptarray(ioc: Identifier_optarrayContext): Array<number> {
        //TODO
        return new Array<number>();
    }

    public static getArraySizeFromIdentifierOptarrayOptassignment(iooc: Identifier_optarray_optassignmentContext): Array<number> {
        //TODO
        return new Array<number>();
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

    public static getIntervalFromParserRule(ctx: ParserRuleContext): Interval {
        return ctx ? new Interval(ctx.start.startIndex, ctx.stop.stopIndex + 1) : Interval.NONE;
    }

    public static getIntervalFromParserRules(startRule: ParserRuleContext, endRule: ParserRuleContext): Interval {
        return new Interval(startRule.start.startIndex, endRule.stop.stopIndex + 1);
    }

    public static getIntervalFromTerminalNode(tn: TerminalNode): Interval {
        return tn ? new Interval(tn.symbol.startIndex, tn.symbol.stopIndex + 1) : Interval.NONE;
    }

}
