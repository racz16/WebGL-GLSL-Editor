import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Array_subscriptContext, Compound_statementContext, Identifier_optarrayContext, Identifier_optarray_optassignmentContext, StatementContext } from '../_generated/AntlrGlslParser';
import { ParserRuleContext, Token } from 'antlr4ts';
import { Scope } from '../scope/scope';
import { ArrayUsage } from '../scope/array-usage';
import { ExpressionProcessor } from './expression-processor';
import { DocumentInfo } from '../core/document-info';
import { TypeBase } from '../scope/type/type-base';
import { TypeCategory } from '../scope/type/type-category';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { TypeUsage } from '../scope/type/type-usage';
import { FoldingRangeKind, MarkdownString, Position, Range } from 'vscode';
import { ShaderStage } from '../scope/shader-stage';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { ExpressionResult } from './expression-result';
import { Constants } from '../core/constants';
import { FoldingRegion } from '../scope/regions/folding-region';

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
        return new ArrayUsage(arraySize, this.getIntervalFromTerminalNodes(tn, tn2, di), ascs.length > 1);
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

    public static createVariableDeclaration(name: string, tu: TypeUsage, fpp: boolean, fdp: boolean, summary?: MarkdownString, stage = ShaderStage.DEFAULT, extension = ''): VariableDeclaration {
        return new VariableDeclaration(name, null, null, true, null, tu, fpp, fdp, summary, stage, extension);
    }

    public static createFunctionDeclaration(name: string, tu: TypeUsage, ctor: boolean, stage = ShaderStage.DEFAULT, extension = ''): FunctionDeclaration {
        return new FunctionDeclaration(name, null, null, tu, true, ctor, null, null, stage, extension);
    }

    public static getIntervalFromStatement(ctx: StatementContext, di: DocumentInfo): Range {
        if (ctx?.compound_statement()) {
            return this.getIntervalFromCompoundStatement(ctx.compound_statement(), di);
        } else {
            return this.getIntervalFromParserRule(ctx, di);
        }
    }

    public static getIntervalFromCompoundStatement(ctx: Compound_statementContext, di: DocumentInfo): Range {
        return ctx ? this.getRangeFromTokens(ctx.start, ctx.stop, di) : null;
    }

    public static getIntervalFromParserRule(ctx: ParserRuleContext, di: DocumentInfo): Range {
        return ctx ? this.getRangeFromTokens(ctx.start, ctx.stop, di) : null;
    }

    public static getIntervalFromParserRules(startRule: ParserRuleContext, endRule: ParserRuleContext, di: DocumentInfo): Range {
        return this.getRangeFromTokens(startRule.start, endRule.stop, di);
    }

    public static getIntervalFromTerminalNode(tn: TerminalNode, di: DocumentInfo): Range {
        return tn ? this.getRangeFromTokens(tn.symbol, tn.symbol, di) : null;
    }

    public static getIntervalFromTerminalNodes(tn: TerminalNode, tn2: TerminalNode, di: DocumentInfo): Range {
        return this.getRangeFromTokens(tn.symbol, tn2.symbol, di);
    }

    public static getRangeFromTokens(t1: Token, t2: Token, di: DocumentInfo): Range {
        return new Range(new Position(t1.line - 1, t1.charPositionInLine), new Position(t2.line - 1, t2.charPositionInLine + t2.text.length));
    }

    public static isInjected(range: Range): boolean {
        return range.start.line < 0;
    }

    public static addFoldingRegionFromTokens(di: DocumentInfo, t: Token, t2: Token, endOffset = -2): void {
        this.addFoldingRegion(di, t.line - 1, t2.line + endOffset);
    }

    public static addFoldingRegionFromComment(di: DocumentInfo, t: Token, t2: Token): void {
        if (t === t2) {
            this.addFoldingRegion(di, t.line - 1, di.getLineCount() - 1, FoldingRangeKind.Comment);
        } else {
            this.addFoldingRegion(di, t.line - 1, t2.line - 1, FoldingRangeKind.Comment);
        }
    }

    private static addFoldingRegion(di: DocumentInfo, startLine: number, stopLine: number, kind?: FoldingRangeKind): void {
        const realStartLine = startLine - di.getInjectionLineCount();
        const realStopLine = stopLine - di.getInjectionLineCount();
        if (realStartLine >= 0) {
            di.getRegions().foldingRegions.push(new FoldingRegion(realStartLine, realStopLine, kind));
        }
    }

    public static isALowerThanB(a: Range, b: Range): boolean {
        return !a || !b || a.end.isBefore(b.start);
    }

    public static isALowerThanOffset(a: Range, offset: Position): boolean {
        return a && offset && a.end.isBefore(offset);
    }

    public static isPositionInScope(scope: Scope, position: Position, di: DocumentInfo): boolean {
        return scope && (scope.interval.contains(position) || scope.isGlobal());
    }

    public static getTypeName(tb: TypeBase, width: number): string {
        if (width === 1) {
            return this.getScalarTypeName(tb);
        } else {
            return this.getVectorTypeName(tb, width);
        }
    }

    public static getVectorTypeName(tb: TypeBase, width: number): string {
        return `${Helper.typeBaseToPrefix(tb)}vec${width}`;
    }

    public static getScalarTypeName(bt: TypeBase): string {
        switch (bt) {
            case TypeBase.BOOL: return Constants.BOOL;
            case TypeBase.FLOAT: return Constants.FLOAT;
            case TypeBase.INT: return Constants.INT;
            case TypeBase.UINT: return Constants.UINT;
            default: return null;
        }
    }

    public static typeBaseToPrefix(tb: TypeBase): string {
        switch (tb) {
            case TypeBase.BOOL: return 'b';
            case TypeBase.FLOAT: return Constants.EMPTY;
            case TypeBase.INT: return 'i';
            case TypeBase.UINT: return 'u';
            default: return null;
        }
    }

    public static isInCorrectStage(stage: ShaderStage, di: DocumentInfo): boolean {
        return stage === ShaderStage.DEFAULT || stage === di.getShaderStage();
    }

}
