import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Array_subscriptContext, Identifier_optarrayContext, Identifier_optarray_optassignmentContext } from '../_generated/AntlrGlslParser';
import { ParserRuleContext } from 'antlr4ts';
import { Scope } from '../scope/scope';
import { Interval } from '../scope/interval';
import { ArrayUsage } from '../scope/array-usage';
import { ExpressionProcessor } from './expression-processor';
import { DocumentInfo } from '../core/document-info';
import { TypeBase } from '../scope/type/type-base';
import { TypeCategory } from '../scope/type/type-category';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { TypeUsage } from '../scope/type/type-usage';
import { MarkdownString, Position } from 'vscode';
import { ShaderStage } from '../scope/shader-stage';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { ExpressionResult } from './expression-result';

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
        const arraySize = exp && exp instanceof ExpressionResult && exp.value ? exp.value : 0;
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

    public static createTypeDeclaration(name: string, width: number, height: number, typeBase: TypeBase, typeCategory: TypeCategory): TypeDeclaration {
        return new TypeDeclaration(name, null, null, true, null, width, height, typeBase, typeCategory);
    }

    public static createTypeUsage(name: string, td: TypeDeclaration, array: ArrayUsage): TypeUsage {
        return new TypeUsage(name, null, null, null, td, array, false);
    }

    public static createVariableDeclaration(name: string, tu: TypeUsage, fpp: boolean, fdp: boolean, summary?: MarkdownString, stage = ShaderStage.DEFAULT): VariableDeclaration {
        return new VariableDeclaration(name, null, null, true, null, tu, fpp, fdp, summary, stage);
    }

    public static createFunctionDeclaration(name: string, tu: TypeUsage, ctor: boolean, stage = ShaderStage.DEFAULT): FunctionDeclaration {
        return new FunctionDeclaration(name, null, null, tu, true, ctor, null, null, stage);
    }

    public static getIntervalFromParserRule(ctx: ParserRuleContext): Interval {
        return ctx ? new Interval(ctx.start.startIndex, ctx.stop.stopIndex + 1) : null;
    }

    public static getIntervalFromParserRules(startRule: ParserRuleContext, endRule: ParserRuleContext): Interval {
        return new Interval(startRule.start.startIndex, endRule.stop.stopIndex + 1);
    }

    public static getIntervalFromTerminalNode(tn: TerminalNode): Interval {
        return tn ? new Interval(tn.symbol.startIndex, tn.symbol.stopIndex + 1) : null;
    }

    public static getIntervalFromTerminalNodes(tn: TerminalNode, tn2: TerminalNode): Interval {
        return new Interval(tn.symbol.startIndex, tn2.symbol.stopIndex + 1);
    }

    public static isALowerThanB(a: Interval, b: Interval): boolean {
        return !a || !b || a.stopIndex < b.startIndex;
    }

    public static isALowerThanOffset(a: Interval, offset: number): boolean {
        return a && a.stopIndex < offset;
    }

    public static isPositionInScope(scope: Scope, position: Position, di: DocumentInfo): boolean {
        return scope && (di.intervalToRange(scope.interval)?.contains(position) || scope.isGlobal());
    }

}
