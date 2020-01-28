import { GlslVisitor } from '../../core/glsl-visitor';
import { ExpressionContext, LiteralContext, Function_callContext, Array_subscriptContext } from '../../_generated/AntlrGlslParser';
import { VariableHelper } from './variable-helper';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { TypeHelper } from './type-helper';
import { Builtin } from '../../builtin/builtin';
import { Scope } from '../../scope/scope';
import { TypeUsage } from '../../scope/type/type-usage';
import { TypeDeclaration } from '../../scope/type/type-declaration';
import { LogicalFunction } from '../../scope/function/logical-function';
import { FunctionCall } from '../../scope/function/function-call';
import { TypeCategory } from '../../scope/type/type-category';
import { Interval } from '../../scope/interval';

export class OldExpressionHelper {

    private static visitor: GlslVisitor;
    private static scope: Scope;

    public static expression(ctx: ExpressionContext, visitor: GlslVisitor, scope: Scope): TypeUsage {
        OldExpressionHelper.visitor = visitor;
        OldExpressionHelper.scope = scope;
        /*if (this.isLiteral(ctx)) {
            return this.literal(ctx);
        } else if (this.isParentheticalExpression(ctx)) {
            return this.parentheticalExpression(ctx);
        } else if (this.isIdentifier(ctx)) {
            return this.identifier(ctx);
        } else if (this.isArithmeticUnaryExpression(ctx)) {
            return this.arithmeticUnaryExpression(ctx);
        } else if (this.isRelationalExpression(ctx)) {
            return this.relationalExpression(ctx);
        } else if (this.isEqualityExpression(ctx)) {
            return this.equalityExpression(ctx);
        } else if (this.isLogicalBinaryExpression(ctx)) {
            return this.logicalBinaryExpression(ctx);
        } else if (this.isLogicalUnaryExpression(ctx)) {
            return this.logicalUnaryExpression(ctx);
        } else if (this.isBitUnaryExpression(ctx)) {
            return this.bitUnaryExpression(ctx);
        } else if (this.isShiftExpression(ctx)) {
            return this.shiftExpression(ctx);
        } else if (this.isBitBinaryExpression(ctx)) {
            return this.bitBinaryExpression(ctx);
        } else if (this.isModuloExpression(ctx)) {
            return this.moduloExpression(ctx);
        } else if (this.isLengthExpression(ctx)) {
            return this.lengthExpression(ctx);
        } else if (this.isArithmeticBinaryExpression(ctx)) {
            return this.arithmeticBinaryExpression(ctx);
        } else if (this.isTernaryExpression(ctx)) {
            return this.ternaryExpression(ctx);
        } else if (this.isArraySubscript(ctx)) {
            return this.arraySubscript(ctx);
        } else if (this.isFunctionCall(ctx)) {
            return this.functionCall(ctx);
        } else if (this.isAssignment(ctx)) {
            return this.assignment(ctx);
        } else {
            if (ctx.children) {
                for (const pt of ctx.children) {
                    this.visitor.visit(pt);
                }
            }
        }*/
        return null;
    }

    //
    //ltieral-------------------------------------------------------------------
    //
    /*private static isLiteral(ctx: ExpressionContext): boolean {
        return ctx.literal() !== null;
    }

    private static literal(ctx: ExpressionContext): TypeUsage {
        return this.visitor.visitLiteral(ctx.literal() as LiteralContext);
    }

    //
    //parenthetical expression--------------------------------------------------
    //
    private static isParentheticalExpression(ctx: ExpressionContext): boolean {
        return ctx.LRB() !== null && ctx.RRB !== null;
    }

    private static parentheticalExpression(ctx: ExpressionContext): TypeUsage {
        return this.visitor.visitExpression(ctx.expression(0));
    }

    //
    //identifier----------------------------------------------------------------
    //
    private static isIdentifier(ctx: ExpressionContext): boolean {
        return ctx.IDENTIFIER() !== null;
    }

    private static identifier(ctx: ExpressionContext): TypeUsage {
        const previousTu = ctx.DOT() === null ? null : this.visitor.visitExpression(ctx.expression(0));
        const vu = VariableHelper.createVariableUsage(ctx.IDENTIFIER() as TerminalNode, previousTu, this.scope);
        this.scope.variableUsages.push(vu);
        return vu.declaration === null ? null : vu.declaration.type;
    }

    //
    //arithmetic unary expression-----------------------------------------------
    //
    private static isArithmeticUnaryExpression(ctx: ExpressionContext): boolean {
        return ctx.expression().length === 1 && (ctx.OP_INC() !== null || ctx.OP_DEC() !== null || ctx.OP_ADD() !== null || ctx.OP_SUB() !== null);
    }

    private static arithmeticUnaryExpression(ctx: ExpressionContext): TypeUsage {
        const tu = this.visitor.visitExpression(ctx.expression(0));
        if (this.usable(tu) && tu.declaration.typeCategory !== TypeCategory.TRANSPARENT) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'not transparent type', ctx.start.startIndex, ctx.stop.stopIndex + 1);
        }
        if (tu !== null && tu.isArray()) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'array', ctx.start.startIndex, ctx.stop.stopIndex + 1);
        }
        return tu;
    }

    //
    //relational expression-----------------------------------------------------
    //
    private static isRelationalExpression(ctx: ExpressionContext): boolean {
        return ctx.OP_RELATIONAL() !== null;
    }

    private static relationalExpression(ctx: ExpressionContext): TypeUsage {
        const tu1 = this.visitor.visitExpression(ctx.expression(0));
        const tu2 = this.visitor.visitExpression(ctx.expression(1));
        if (this.usable(tu1) && tu1.declaration.typeCategory !== TypeCategory.CUSTOM && tu1.declaration.typeCategory !== TypeCategory.TRANSPARENT) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'opaque type', ctx.expression(0).start.startIndex, ctx.expression(0).stop.stopIndex + 1);
        }
        if (this.usable(tu2) && tu2.declaration.typeCategory !== TypeCategory.CUSTOM && tu2.declaration.typeCategory !== TypeCategory.TRANSPARENT) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'opaque type', ctx.expression(1).start.startIndex, ctx.expression(1).stop.stopIndex + 1);
        }
        if (this.usable(tu1, tu2)
            && !(TypeHelper.areConvertible(tu1.declaration, tu2.declaration) && tu1.arrayDepth === tu2.arrayDepth)) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'not convertible', ctx.start.startIndex, ctx.stop.stopIndex + 1);
        }
        if (tu1 !== null && tu1.isArray() || tu2 !== null && tu2.isArray()) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'array', ctx.start.startIndex, ctx.stop.stopIndex + 1);
        }
        return TypeHelper.createTypeUsageFromBuiltInTypeName('bool', 0);
        return null;
    }

    //
    //equalit expression--------------------------------------------------------
    //
    private static isEqualityExpression(ctx: ExpressionContext): boolean {
        return ctx.OP_EQUALITY() !== null;
    }

    private static equalityExpression(ctx: ExpressionContext): TypeUsage {
        const tu1 = this.visitor.visitExpression(ctx.expression(0));
        const tu2 = this.visitor.visitExpression(ctx.expression(1));
        if (this.usable(tu1) && (tu1.declaration.typeCategory !== TypeCategory.TRANSPARENT)) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'not transparent type', ctx.expression(0).start.startIndex, ctx.expression(0).stop.stopIndex + 1);
        }
        if (this.usable(tu2) && (tu2.declaration.typeCategory !== TypeCategory.TRANSPARENT)) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'not transparent type', ctx.expression(1).start.startIndex, ctx.expression(1).stop.stopIndex + 1);
        }
        if (tu1 !== null && tu1.isArray() || tu2 !== null && tu2.isArray()) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'array', ctx.start.startIndex, ctx.stop.stopIndex + 1);
        }
        //return TypeHelper.createTypeUsageFromBuiltInTypeName('bool', 0);
        return null;
    }

    //
    //logical binary expression-------------------------------------------------
    //
    private static isLogicalBinaryExpression(ctx: ExpressionContext): boolean {
        return ctx.OP_LOGICAL_AND() !== null || ctx.OP_LOGICAL_XOR() !== null || ctx.OP_LOGICAL_OR() !== null;
    }

    private static logicalBinaryExpression(ctx: ExpressionContext): TypeUsage {
        const tu1 = this.visitor.visitExpression(ctx.expression(0));
        const tu2 = this.visitor.visitExpression(ctx.expression(1));
        if (tu1 !== null && tu1.name !== 'bool') {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'not bool', ctx.expression(0).start.startIndex, ctx.expression(0).stop.stopIndex + 1);
        }
        if (tu2 !== null && tu2.name !== 'bool') {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'not bool', ctx.expression(1).start.startIndex, ctx.expression(1).stop.stopIndex + 1);
        }
        if (tu1 !== null && tu1.isArray() || tu2 !== null && tu2.isArray()) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'array', ctx.start.startIndex, ctx.stop.stopIndex + 1);
        }
        return TypeHelper.createTypeUsageFromBuiltInTypeName('bool', 0);
        return null;
    }

    //
    //logical unary expression--------------------------------------------------
    //
    private static isLogicalUnaryExpression(ctx: ExpressionContext): boolean {
        return ctx.OP_LOGICAL_UNARY() !== null;
    }

    private static logicalUnaryExpression(ctx: ExpressionContext): TypeUsage {
        const tu1 = this.visitor.visitExpression(ctx.expression(0));
        if (tu1 !== null && tu1.name !== 'bool') {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'not bool', ctx.expression(0).start.startIndex, ctx.expression(0).stop.stopIndex + 1);
        }
        if (tu1 !== null && tu1.isArray()) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'array', ctx.start.startIndex, ctx.stop.stopIndex + 1);
        }
        return TypeHelper.createTypeUsageFromBuiltInTypeName('bool', 0);
        return null;
    }

    //
    //bit unary expression------------------------------------------------------
    //
    private static isBitUnaryExpression(ctx: ExpressionContext): boolean {
        return ctx.OP_BIT_UNARY() !== null;
    }

    private static bitUnaryExpression(ctx: ExpressionContext): TypeUsage {
        const tu = this.visitor.visitExpression(ctx.expression(0));
        if (this.usable(tu) && this.isOpaqueOrMatrixOrFloatingPoint(tu)) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'opaqu type, matrix or floating point', ctx.start.startIndex, ctx.stop.stopIndex + 1);
        }
        if (tu !== null && tu.isArray()) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'array', ctx.start.startIndex, ctx.stop.stopIndex + 1);
        }
        return tu;
    }

    //
    //shift expression----------------------------------------------------------
    //
    private static isShiftExpression(ctx: ExpressionContext): boolean {
        return ctx.OP_SHIFT() !== null;
    }

    private static shiftExpression(ctx: ExpressionContext): TypeUsage {
        const tu1 = this.visitor.visitExpression(ctx.expression(0));
        const tu2 = this.visitor.visitExpression(ctx.expression(1));
        if (this.usable(tu1) && this.isOpaqueOrMatrixOrFloatingPoint(tu1)) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'opaqu type, matrix or floating point', ctx.expression(0).start.startIndex, ctx.expression(0).stop.stopIndex + 1);
        }
        if (this.usable(tu1, tu2) && (tu2.declaration.typeCategory !== TypeCategory.TRANSPARENT
            || tu2.declaration.isMatrix()
            || tu1.declaration.isScalar() && !(TypeHelper.areConvertible(tu1.declaration, tu2.declaration) && tu1.arrayDepth === tu2.arrayDepth)
            || tu1.declaration.isVector() && !(TypeHelper.areConvertible(tu1.declaration, tu2.declaration) && tu1.arrayDepth === tu2.arrayDepth) && tu2.name !== 'int' && tu2.name !== 'uint')) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'opaqu type, matrix, floating point or wrong size', ctx.expression(1).start.startIndex, ctx.expression(1).stop.stopIndex + 1);
        }
        if (tu1 !== null && tu1.isArray() || tu2 !== null && tu2.isArray()) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'array', ctx.start.startIndex, ctx.stop.stopIndex + 1);
        }
        return tu1;
    }

    //
    //bit binary expression-----------------------------------------------------
    //
    private static isBitBinaryExpression(ctx: ExpressionContext): boolean {
        return ctx.OP_BIT_AND() !== null || ctx.OP_BIT_XOR() !== null || ctx.OP_BIT_OR() !== null;
    }

    private static bitBinaryExpression(ctx: ExpressionContext): TypeUsage {
        const tu1 = this.visitor.visitExpression(ctx.expression(0));
        const tu2 = this.visitor.visitExpression(ctx.expression(1));
        if (this.usable(tu1) && this.isOpaqueOrMatrixOrFloatingPoint(tu1)) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'opaqu type, matrix or floating point', ctx.expression(0).start.startIndex, ctx.expression(0).stop.stopIndex + 1);
        }
        if (this.usable(tu2) && this.isOpaqueOrMatrixOrFloatingPoint(tu2)) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'opaqu type, matrix or floating point', ctx.expression(0).start.startIndex, ctx.expression(0).stop.stopIndex + 1);
        }
        if (tu1 !== null && tu1.isArray() || tu2 !== null && tu2.isArray()) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'array', ctx.start.startIndex, ctx.stop.stopIndex + 1);
        }
        if (tu1 && tu2 && tu1.declaration && tu2.declaration) {
            if (tu1.declaration.isScalar() && tu2.declaration.isVector()) {
                return tu2;
            } else if (tu1.declaration.isVector() && tu2.declaration.isScalar()) {
                return tu1;
            } else if (tu1.declaration.isVector() && tu2.declaration.isVector()) {
                if (tu1.declaration.width !== tu2.declaration.width) {
                    ErrorHelper.addError(DiagnosticSeverity.Error, 'different dimension', ctx.start.startIndex, ctx.stop.stopIndex + 1);
                }
                const td = TypeHelper.getConversion(tu1.declaration, tu2.declaration);
                if (td !== null) {
                    return null;//new TypeUsage(td.name, Interval.NONE, 0, td);
                } else {
                    //ErrorHelper.addError(DiagnosticSeverity.Error, 'can\'t convert operands', ctx.start.startIndex, ctx.stop.stopIndex + 1);
                    return null;
                }
            } else {
                const td = TypeHelper.getConversion(tu1.declaration, tu2.declaration);
                if (td) {
                    return null;// new TypeUsage(td.name, Interval.NONE, 0, td);
                }
            }
        }
        return null;
    }

    //
    //modulo expression---------------------------------------------------------
    //
    private static isModuloExpression(ctx: ExpressionContext): boolean {
        return ctx.OP_MOD() !== null;
    }

    private static moduloExpression(ctx: ExpressionContext): TypeUsage {
        const tu1 = this.visitor.visitExpression(ctx.expression(0));
        const tu2 = this.visitor.visitExpression(ctx.expression(1));
        if (this.usable(tu1) && this.isOpaqueOrMatrixOrFloatingPoint(tu1)) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'opaqu type, matrix or floating point', ctx.expression(0).start.startIndex, ctx.expression(0).stop.stopIndex + 1);
        }
        if (this.usable(tu2) && this.isOpaqueOrMatrixOrFloatingPoint(tu2)) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'opaqu type, matrix or floating point', ctx.expression(0).start.startIndex, ctx.expression(0).stop.stopIndex + 1);
        }
        if (tu1 !== null && tu1.isArray() || tu2 !== null && tu2.isArray()) {
            ErrorHelper.addError(DiagnosticSeverity.Error, 'array', ctx.start.startIndex, ctx.stop.stopIndex + 1);
        }
        if (tu1 && tu2 && tu1.declaration && tu2.declaration) {
            if (tu1.declaration.isScalar() && tu2.declaration.isVector()) {
                return tu2;
            } else if (tu1.declaration.isVector() && tu2.declaration.isScalar()) {
                return tu1;
            } else if (tu1.declaration.isVector() && tu2.declaration.isVector()) {
                if (tu1.declaration.width !== tu2.declaration.width) {
                    ErrorHelper.addError(DiagnosticSeverity.Error, 'different dimension', ctx.start.startIndex, ctx.stop.stopIndex + 1);
                }
                const td = TypeHelper.getConversion(tu1.declaration, tu2.declaration);
                if (td !== null) {
                    return null;// new TypeUsage(td.name, Interval.NONE, 0, td);
                } else {
                    //ErrorHelper.addError(DiagnosticSeverity.Error, 'can\'t convert operands', ctx.start.startIndex, ctx.stop.stopIndex + 1);
                    return null;
                }
            } else {
                const td = TypeHelper.getConversion(tu1.declaration, tu2.declaration);
                if (td) {
                    return null;// new TypeUsage(td.name, Interval.NONE, 0, td);
                }
            }
        }
        return null;
    }

    //
    //length expression---------------------------------------------------------
    //
    private static isLengthExpression(ctx: ExpressionContext): boolean {
        return ctx.DOT() !== null && ctx.function_call() !== null;
    }

    private static lengthExpression(ctx: ExpressionContext): TypeUsage {
        const functionCallContext = ctx.function_call() as Function_callContext;
        if (functionCallContext.text === 'length()') {
            const tu1 = this.visitor.visitExpression(ctx.expression(0));
            if (!tu1.declaration.isMatrix() && !tu1.declaration.isVector() && !tu1.isArray()) {
                ErrorHelper.addError(DiagnosticSeverity.Error, 'not vector, matrix or array', ctx.function_call().start.startIndex, ctx.function_call().stop.stopIndex + 1);
            }
            return TypeHelper.createTypeUsageFromBuiltInTypeName('int', 0);
            return null;
        } else {
            //ErrorHelper.addError(DiagnosticSeverity.Error, 'structs don\'t have functions', ctx.function_call().start.startIndex, ctx.function_call().stop.stopIndex + 1);
            return null;
        }
    }

    //
    //arithmetic binary expression----------------------------------------------
    //
    private static isArithmeticBinaryExpression(ctx: ExpressionContext): boolean {
        return ctx.expression().length === 2 && (ctx.OP_ADD() !== null || ctx.OP_SUB() !== null || ctx.OP_DIV() !== null || ctx.OP_MUL() !== null);
    }

    private static arithmeticBinaryExpression(ctx: ExpressionContext): TypeUsage {
        const tu1 = this.visitor.visitExpression(ctx.expression(0));
        const tu2 = this.visitor.visitExpression(ctx.expression(1));
        if (tu1 && tu2 && tu1.declaration && tu2.declaration) {
            if (tu1.declaration.typeCategory !== TypeCategory.TRANSPARENT) {
                ErrorHelper.addError(DiagnosticSeverity.Error, 'not transparent type', ctx.expression(0).start.startIndex, ctx.expression(0).stop.stopIndex + 1);
            }
            if (tu2.declaration.typeCategory !== TypeCategory.TRANSPARENT) {
                ErrorHelper.addError(DiagnosticSeverity.Error, 'not transparent type', ctx.expression(1).start.startIndex, ctx.expression(1).stop.stopIndex + 1);
            }
            if (tu1.declaration.isScalar() && tu2.declaration.isScalar()) {
                const td = TypeHelper.getConversion(tu1.declaration, tu2.declaration);
                if (td) {
                    return null;// new TypeUsage(td.name, Interval.NONE, 0, td);
                }
            } else if (tu1.declaration.isScalar() && !tu2.declaration.isScalar()) {
                return tu2;
            } else if (!tu1.declaration.isScalar() && tu2.declaration.isScalar()) {
                return tu1;
            } else if (tu1.declaration.isVector() && tu2.declaration.isVector()) {
                if (tu1.declaration.width !== tu2.declaration.width) {
                    ErrorHelper.addError(DiagnosticSeverity.Error, 'different dimensions', ctx.start.startIndex, ctx.stop.stopIndex + 1);
                }
                return tu1;
            } else if (tu1.declaration.isMatrix() && tu2.declaration.isMatrix()
                || tu1.declaration.isMatrix() && tu2.declaration.isVector()
                || tu1.declaration.isVector() && tu2.declaration.isMatrix()) {
                if (ctx.OP_MUL() !== null) {
                    if (tu1.declaration.isMatrix() && tu2.declaration.isMatrix() && tu1.declaration.width !== tu2.declaration.height) {
                        ErrorHelper.addError(DiagnosticSeverity.Error, 'wrong dimensions', ctx.start.startIndex, ctx.stop.stopIndex + 1);
                    }
                    if (tu1.declaration.isMatrix() && tu2.declaration.isVector() && tu1.declaration.width !== tu2.declaration.width) {
                        ErrorHelper.addError(DiagnosticSeverity.Error, 'wrong dimensions', ctx.start.startIndex, ctx.stop.stopIndex + 1);
                    }
                    if (tu1.declaration.isVector() && tu2.declaration.isMatrix() && tu1.declaration.width !== tu2.declaration.height) {
                        ErrorHelper.addError(DiagnosticSeverity.Error, 'wrong dimensions', ctx.start.startIndex, ctx.stop.stopIndex + 1);
                    }
                    let name: string;
                    if (tu1.declaration.isMatrix() && tu2.declaration.isMatrix()) {
                        name = 'mat' + tu1.declaration.height + 'x' + tu2.declaration.width;
                    } else if (tu1.declaration.isVector()) {
                        name = 'vec' + tu2.declaration.width;
                    } else {
                        name = 'vec' + tu1.declaration.height;
                    }
                    const td = Builtin.TYPES.get(name) as TypeDeclaration;
                    return null;// new TypeUsage(td.name, Interval.NONE, 0, td);
                } else {
                    if (tu1.declaration.width !== tu2.declaration.width || tu1.declaration.height !== tu2.declaration.height) {
                        ErrorHelper.addError(DiagnosticSeverity.Error, 'different dimensions', ctx.start.startIndex, ctx.stop.stopIndex + 1);
                    }
                    return tu1;
                }
            }
        }
        return null;
    }

    //
    //ternary expression--------------------------------------------------------
    //
    private static isTernaryExpression(ctx: ExpressionContext): boolean {
        return ctx.QUESTION() !== null;
    }

    private static ternaryExpression(ctx: ExpressionContext): TypeUsage {
        this.visitor.visitExpression(ctx.expression(0));
        const tu1 = this.visitor.visitExpression(ctx.expression_list(0).expression(ctx.expression_list(0).expression().length - 1));
        const tu2 = this.visitor.visitExpression(ctx.expression_list(1).expression(ctx.expression_list(1).expression().length - 1));
        if (tu1 && tu2 && tu1.declaration && tu2.declaration) {
            const td = TypeHelper.getConversion(tu1.declaration, tu2.declaration);
            if (td !== null) {
                return null;// new TypeUsage(td.name, Interval.NONE, 0, td);
            } else {
                ErrorHelper.addError(DiagnosticSeverity.Error, 'different types', ctx.start.startIndex, ctx.stop.stopIndex + 1);
            }
        }
        return null;
    }

    //
    //array subscript-----------------------------------------------------------
    //
    private static isArraySubscript(ctx: ExpressionContext): boolean {
        return ctx.array_subscript() !== null;
    }

    private static arraySubscript(ctx: ExpressionContext): TypeUsage {
        const arrayCtx = ctx.array_subscript() as Array_subscriptContext;
        const tu = this.visitor.visitExpression(ctx.expression(0));
        for (const ec of arrayCtx.expression()) {
            this.visitor.visitExpression(ec);
        }
        return this.array(ctx, tu, arrayCtx.LSB().length);
    }

    private static array(ctx: ExpressionContext, tu1: TypeUsage, array: number): TypeUsage {
        if (tu1 && tu1.declaration) {
            if (tu1.isArray() || tu1.declaration.isVector() || tu1.declaration.isMatrix()) {
                if (tu1.isArray()) {
                    const depth = tu1.arrayDepth;
                    const tu = null;// new TypeUsage(tu1.name, Interval.NONE, depth - 1, tu1.declaration);
                    return array > 1 ? this.array(ctx, tu, array - 1) : tu;
                } else if (tu1.declaration.isVector()) {
                    const name = tu1.declaration.typeBase.toString().toLowerCase();
                    const td = Builtin.TYPES.get(name) as TypeDeclaration;
                    const tu = null;// new TypeUsage(name, Interval.NONE, 0, td);
                    return array > 1 ? this.array(ctx, tu, array - 1) : tu;
                } else {
                    const prefix = TypeHelper.typebaseToPrefix(tu1.declaration.typeBase);
                    const typeName = prefix + 'vec' + tu1.declaration.width;
                    const tu = null;//TypeHelper.createTypeUsageFromBuiltInTypeName(typeName, 0);
                    return array > 1 ? this.array(ctx, tu, array - 1) : tu;
                }
            } else {
                ErrorHelper.addError(DiagnosticSeverity.Error, 'not an array', ctx.array_subscript().start.startIndex, ctx.array_subscript().stop.stopIndex + 1);
            }
        }
        return null;
    }

    //
    //function call-------------------------------------------------------------
    //
    private static isFunctionCall(ctx: ExpressionContext): boolean {
        return ctx.function_call() !== null && ctx.array_subscript() === null;
    }

    private static functionCall(ctx: ExpressionContext): TypeUsage {
        const fcc = ctx.function_call() as Function_callContext;
        const name = fcc.IDENTIFIER() !== null ? fcc.IDENTIFIER().text : fcc.TYPE().text;
        const parameters = new Array<TypeUsage>();
        const fpl = fcc.function_call_parameter_list();
        if (fpl && fpl.expression_list()) {
            for (const ec of fpl.expression_list().expression()) {
                const tu = this.visitor.visitExpression(ec);
                if (tu === null) {
                    return null;
                }
                parameters.push(tu);
            }
        }

        let func: LogicalFunction = null;
        let conversions = new Array<number>();
        for (const f of Scope.FUNCTIONS) {
            if (f.name === name && f.parameters.length === parameters.length) {
                const conv = new Array<number>();
                let valid = true;
                for (let i = 0; valid && i < parameters.length; i++) {
                    const tu1 = parameters[i];
                    const tu2 = f.parameters[i].type;
                    if (tu1.declaration.isConvertibleTo(tu2.declaration)) {
                        if (tu1.name === tu2.name) {
                            conv.push(0);
                        } else if ((tu1.name === 'int' || tu1.name === 'uint') && tu2.name === 'float') {
                            conv.push(2);
                        } else {
                            conv.push(4);
                        }
                        if (conversions.length !== 0 && conv[conv.length - 1] > conversions[conv.length - 1]) {
                            valid = false;
                            break;
                        }
                    } else {
                        valid = false;
                        break;
                    }
                }
                if (valid) {
                    func = f;
                    conversions = conv;
                }
            }
        }
        if (func === null) {
            for (const f of Builtin.FUNCTIONS) {
                if (f.name === name && f.parameters.length === parameters.length) {
                    const conv = new Array<number>();
                    let valid = true;
                    for (let i = 0; valid && i < parameters.length; i++) {
                        const tu1 = parameters[i];
                        const tu2 = f.parameters[i].type;
                        if (tu1.declaration.isConvertibleTo(tu2.declaration)) {
                            if (tu1.name === tu2.name) {
                                conv.push(0);
                            } else if (tu1.name === 'float' && tu2.name === 'double') {
                                conv.push(1);
                            } else if ((tu1.name === 'int' || tu1.name === 'uint') && tu2.name === 'float') {
                                conv.push(2);
                            } else if ((tu1.name === 'int' || tu1.name === 'uint') && tu2.name === 'double') {
                                conv.push(3);
                            } else {
                                conv.push(4);
                            }
                            if (conversions.length !== 0 && conv[conv.length - 1] > conversions[conv.length - 1]) {
                                valid = false;
                                break;
                            }
                        } else {
                            valid = false;
                            break;
                        }
                    }
                    if (valid) {
                        func = f;
                        conversions = conv;
                    }
                }
            }
        }
        if (func !== null) {
            const interval = new Interval(ctx.start.startIndex, ctx.stop.stopIndex + 1);
            const identifier = fcc.IDENTIFIER();
            const nameInterval = new Interval(identifier ? identifier.symbol.startIndex : fcc.TYPE().symbol.startIndex, identifier ? identifier.symbol.stopIndex + 1 : fcc.TYPE().symbol.stopIndex + 1);
            const fc = new FunctionCall(name, nameInterval, interval, func);
            func.calls.push(fc);
            this.scope.functionCalls.push(fc);

            return null;// func.returnType;
        } else {
            //if (!Scope.MACRO_DEFINITIONS.includes(name)) {
            //ErrorHelper.addError(DiagnosticSeverity.Error, 'there is no such a function', ctx.start.startIndex, ctx.stop.stopIndex + 1);
            //}
            return null;
        }
    }

    //
    //assignment----------------------------------------------------------------
    //
    private static isAssignment(ctx: ExpressionContext): boolean {
        return ctx.OP_ASSIGN() !== null;
    }

    private static assignment(ctx: ExpressionContext): TypeUsage {
        const tu1 = this.visitor.visitExpression(ctx.expression(0));
        const tu2 = this.visitor.visitExpression(ctx.expression(1));
        if (!tu2.declaration.isConvertibleTo(tu1.declaration)) {
            ErrorHelper.addCannotConvertError(tu1.declaration, tu2.declaration, ctx.expression(1).start.startIndex, ctx.expression(1).stop.stopIndex + 1);
        }
        return null;
    }

    //
    //misc----------------------------------------------------------------------
    //
    private static isOpaqueOrMatrixOrFloatingPoint(tu: TypeUsage): boolean {
        if (!tu.declaration) {
            return false;
        }
        return tu.declaration.typeCategory !== TypeCategory.TRANSPARENT
            || tu.declaration.isMatrix()
            || tu.declaration.isScalar() && tu.declaration.typeBase !== TypeBase.INT && tu.declaration.typeBase !== TypeBase.UINT
            || tu.declaration.isVector() && tu.declaration.typeBase !== TypeBase.INT && tu.declaration.typeBase !== TypeBase.UINT;
    }*/
}
