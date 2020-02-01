import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Position, TextDocument, Range, Location } from 'vscode';
import { Array_subscriptContext, Identifier_optarrayContext, Function_prototypeContext, Function_definitionContext, Identifier_optarray_optassignmentContext } from '../_generated/AntlrGlslParser';
import { ParserRuleContext } from 'antlr4ts';
import { Scope } from '../scope/scope';
import { QualifierUsage } from '../scope/qualifier/qualifier-usage';
import { Interval } from '../scope/interval';
import { GlslDocumentInfo } from '../core/glsl-document-info';
import { TypeDeclaration } from '../scope/type/type-declaration';

export class Helper {

    public static getArrayDepthFromArraySubscript(asc: Array_subscriptContext): number {
        return asc ? asc.LSB().length : 0;
    }

    public static getArrayDepthFromIdentifierOptarray(ioc: Identifier_optarrayContext): number {
        return ioc ? this.getArrayDepthFromArraySubscript(ioc.array_subscript()) : 0;
    }

    public static getArrayDepthFromIdentifierOptarrayOptassignment(iooc: Identifier_optarray_optassignmentContext): number {
        return iooc ? this.getArrayDepthFromIdentifierOptarray(iooc.identifier_optarray()) : 0;
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

    public static getTypeDeclaration(name: string, nameInterval: Interval, scope: Scope, di: GlslDocumentInfo): TypeDeclaration {
        while (scope) {
            const td = scope.typeDeclarations.find(td => td.name === name && td.structInterval.stopIndex < nameInterval.startIndex);
            if (td) {
                return td;
            } else if (scope.variableDeclarations.find(vd => vd.name === name && vd.declarationInterval.stopIndex < nameInterval.startIndex)) {
                return null;
            }
            scope = scope.parent;
        }
        return di.builtin.types.get(name) ?? null;
    }

    public static getQualifierUsageFromParserRule(prc: ParserRuleContext, scope: Scope, di: GlslDocumentInfo): QualifierUsage {
        if (prc) {
            const name = prc.text;
            const nameInterval = Helper.getIntervalFromParserRule(prc);
            const q = di.builtin.qualifiers.get(name);
            const qu = new QualifierUsage(name, nameInterval, scope, q);
            if (q) {
                q.usages.push(qu);
            }
            return qu;
        }
        return null;
    }

}
