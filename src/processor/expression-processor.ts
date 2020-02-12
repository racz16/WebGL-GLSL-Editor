import { ExpressionContext } from '../_generated/AntlrGlslParser';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { DocumentInfo } from '../core/document-info';
import { Helper } from './helper';
import { Scope } from '../scope/scope';
import { VariableUsage } from '../scope/variable/variable-usage';
import { ArrayUsage } from '../scope/array-usage';
import { TypeBase } from '../scope/type/type-base';
import { FunctionCall } from '../scope/function/function-call';
import { FunctionProcessor } from './function-processor';
import { VariableUsageProcessor } from './variable-usage-processor';

export class ExpressionProcessor {

    private ctx: ExpressionContext;
    private scope: Scope;
    private di: DocumentInfo;

    private initialize(ctx: ExpressionContext, scope: Scope, di: DocumentInfo): void {
        this.ctx = ctx;
        this.scope = scope;
        this.di = di;
    }

    public processExpression(ctx: ExpressionContext, scope: Scope, di: DocumentInfo): ExpressionType | Array<ExpressionType> {
        this.initialize(ctx, scope, di);
        if (!ctx) {
            return null;
        } else if (this.isLiteral()) {
            return this.processLiteral();
        } else if (this.isIdentifier()) {
            return this.processIdentifier();
        } else if (this.isParenthesizedExpression()) {
            return this.processParenthesizedExpression();
        } else if (this.isArrayExpression()) {
            return this.processArrayExpression();
        } else if (this.isLengthExpression()) {
            return this.processLengthExpression();
        } else if (this.isMemberExpression()) {
            return this.processMemberExpression();
        } else if (this.isFunctionExpression()) {
            return this.processFunctionExpression();
        } else if (this.isComplementExpression()) {
            return this.processComplementExpression();
        } else if (this.isBitExpression()) {
            return this.processBitExpression();
        } else if (this.isLogicalUnaryExpression()) {
            return this.processLogicalUnaryExpression();
        } else if (this.isRelationalExpression()) {
            return this.processRelationalExpression();
        } else if (this.isEqualityExpression()) {
            return this.processEqualityExpression();
        } else if (this.isLogicalBinaryExpression()) {
            return this.processLogicalBinaryExpression();
        } else if (this.isTernaryExpression()) {
            return this.processTernaryExpression();
        } else if (this.isShiftExpression()) {
            return this.processShiftExpression();
        } else if (this.isAssignmentOrModifyExpression()) {
            return this.processAssignmentOrModifyExpression();
        } else {
            for (const exp of this.ctx.expression()) {
                new ExpressionProcessor().processExpression(exp, this.scope, this.di);
            }
            return null;
        }
    }

    private isLiteral(): boolean {
        return !!this.ctx.literal();
    }

    private processLiteral(): ExpressionType {
        if (this.ctx.literal().BOOL_LITERAL()) {
            return new ExpressionType(this.di.builtin.types.get('bool'), new ArrayUsage(), true);
        } else {
            if (this.ctx.literal().number_literal().FLOAT_LITERAL()) {
                return new ExpressionType(this.di.builtin.types.get('float'), new ArrayUsage(), true);
            } else {
                if (this.ctx.literal().text.toLowerCase().endsWith('u')) {
                    return new ExpressionType(this.di.builtin.types.get('uint'), new ArrayUsage(), true, +this.ctx.literal().text.substring(0, this.ctx.literal().text.length - 1));
                } else {
                    return new ExpressionType(this.di.builtin.types.get('int'), new ArrayUsage(), true, +this.ctx.literal().text);
                }
            }
        }
    }

    private isIdentifier(): boolean {
        return this.ctx.IDENTIFIER() && !this.ctx.DOT();
    }

    private processIdentifier(): ExpressionType {
        const vu = VariableUsageProcessor.getVariableUsage(this.ctx.IDENTIFIER(), this.scope, this.di);
        if (vu.declaration) {
            const constant = vu.declaration.type.containsQualifier(this.di.builtin.qualifiers.get('const'));
            return new ExpressionType(vu.declaration.type.declaration, vu.declaration.type.array, constant);
        } else {
            return null;
        }
    }

    private isParenthesizedExpression(): boolean {
        return !!this.ctx.LRB();
    }

    private processParenthesizedExpression(): ExpressionType | Array<ExpressionType> {
        return new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
    }

    private isArrayExpression(): boolean {
        return !!this.ctx.array_subscript();
    }

    private processArrayExpression(): ExpressionType {
        const exp = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        new ExpressionProcessor().processExpression(this.ctx.array_subscript().expression(), this.scope, this.di);
        if (exp && exp instanceof ExpressionType) {
            if (exp.array.isArray()) {
                return new ExpressionType(exp.type, new ArrayUsage(), exp.constant);
            } else if (exp.type.isVector()) {
                return new ExpressionType(this.typeBaseToType(exp.type.typeBase), new ArrayUsage(), exp.constant);
            } else if (exp.type.isMatrix()) {
                return new ExpressionType(this.di.builtin.types.get(`vec${exp.type.height}`), new ArrayUsage(), exp.constant);
            }
        }
        return null;
    }

    private isLengthExpression(): boolean {
        return this.ctx.DOT() && !!this.ctx.function_call();
    }

    private processLengthExpression(): ExpressionType {
        const exp = new ExpressionProcessor().processExpression(this.ctx.expression[0], this.scope, this.di);
        if (exp && exp instanceof ExpressionType && exp.array.isArray()) {
            return new ExpressionType(this.di.builtin.types.get('int'), new ArrayUsage(), true, exp.array.arraySize);
        }
        return null;
    }

    private isFunctionExpression(): boolean {
        return this.ctx.function_call() && !this.ctx.DOT();
    }

    private processFunctionExpression(): ExpressionType {
        const parameters = new Array<ExpressionType>();
        if (this.ctx.function_call().function_call_parameter_list()?.expression_list()) {
            for (const exp of this.ctx.function_call().function_call_parameter_list().expression_list().expression()) {
                const parameter = new ExpressionProcessor().processExpression(exp, this.scope, this.di);
                if (parameter && parameter instanceof ExpressionType) {
                    parameters.push(parameter);
                } else if (parameter && parameter instanceof Array) {
                    for (const param of parameter) {
                        parameters.push(param);
                    }
                }
            }
        }
        const tn = this.ctx.function_call().IDENTIFIER() ? this.ctx.function_call().IDENTIFIER() : this.ctx.function_call().TYPE();
        const name = tn.text;
        const interval = Helper.getIntervalFromParserRule(this.ctx.function_call());
        const nameInterval = Helper.getIntervalFromTerminalNode(tn);
        const lf = FunctionProcessor.searchFunction(name, nameInterval, parameters, this.scope, this.di);
        //TODO: matrix ctors
        if (lf) {
            const fd = lf.getDeclaration();
            const fc = new FunctionCall(name, nameInterval, this.scope, interval, lf, fd.builtIn);
            lf.calls.push(fc);
            this.scope.functionCalls.push(fc);
            if (fd.returnType.declaration) {
                if (fd.ctor) {
                    fd.returnType.declaration.ctorCalls.push(fc);
                }
                return new ExpressionType(fd.returnType.declaration, fd.returnType.array);
            } else {
                return null;
            }
        }
        return null;
    }

    private isMemberExpression(): boolean {
        return this.ctx.DOT() && !!this.ctx.IDENTIFIER();
    }

    private processMemberExpression(): ExpressionType {
        const exp = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        if (exp && exp instanceof ExpressionType && !exp.array.isArray()) {
            const name = this.ctx.IDENTIFIER().text;
            const member = exp.type.members.find(vd => vd.name === name);
            if (member) {
                const interval = Helper.getIntervalFromTerminalNode(this.ctx.IDENTIFIER());
                const vu = new VariableUsage(name, this.scope, interval, member);
                this.scope.variableUsages.push(vu);
                member.usages.push(vu);
                return new ExpressionType(member.type.declaration, member.type.array, exp.constant);
            } else if (exp.type.isVector() && this.isSwizzle(name)) {
                if (name.length === 1) {
                    return new ExpressionType(this.typeBaseToType(exp.type.typeBase), new ArrayUsage(), exp.constant);
                } else if (name.length <= 4) {
                    const typeName = `${this.typeBaseToPrefix(exp.type.typeBase)}vec${name.length}`;
                    return new ExpressionType(this.di.builtin.types.get(typeName), new ArrayUsage(), exp.constant);
                }
            }
        }
        return null;
    }

    private isComplementExpression(): boolean {
        return !!this.ctx.OP_BIT_UNARY();
    }

    private processComplementExpression(): ExpressionType {
        const exp = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        if (exp && exp instanceof ExpressionType && (exp.type.typeBase === TypeBase.INT || exp.type.typeBase === TypeBase.UINT)) {
            return exp;
        }
        return null;
    }

    private isBitExpression(): boolean {
        return !!this.ctx.OP_BIT_AND() ||
            !!this.ctx.OP_BIT_OR() ||
            !!this.ctx.OP_BIT_XOR();
    }

    private processBitExpression(): ExpressionType {
        const left = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        const right = new ExpressionProcessor().processExpression(this.ctx.expression()[1], this.scope, this.di);
        if (left && left instanceof ExpressionType && right && right instanceof ExpressionType &&
            left.type.typeBase === right.type.typeBase && !left.array.isArray() && !right.array.isArray() &&
            (left.type.typeBase === TypeBase.INT || left.type.typeBase === TypeBase.UINT)) {
            if (left.type.isVector() && right.type.isVector()) {
                if (left.type.width === right.type.width) {
                    return new ExpressionType(left.type, new ArrayUsage(), left.constant && right.constant);
                }
            } else {
                const type = left.type.isVector() ? left.type : right.type;
                return new ExpressionType(type, new ArrayUsage(), left.constant && right.constant);
            }
        }
        return null;
    }

    private isLogicalBinaryExpression(): boolean {
        return !!this.ctx.OP_LOGICAL_AND() ||
            !!this.ctx.OP_LOGICAL_OR() ||
            !!this.ctx.OP_LOGICAL_XOR();
    }

    private processLogicalBinaryExpression(): ExpressionType {
        const left = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        const right = new ExpressionProcessor().processExpression(this.ctx.expression()[1], this.scope, this.di);
        if (left && right && left instanceof ExpressionType && right instanceof ExpressionType &&
            left.type.name === 'bool' && left.type.name === right.type.name && !left.array.isArray() && !right.array.isArray()) {
            return new ExpressionType(this.di.builtin.types.get('bool'), new ArrayUsage(), left.constant && right.constant);
        }
        return null;
    }

    private isLogicalUnaryExpression(): boolean {
        return !!this.ctx.OP_LOGICAL_UNARY();
    }

    private processLogicalUnaryExpression(): ExpressionType {
        const exp = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        if (exp && exp instanceof ExpressionType && exp.type.name === 'bool' && !exp.array.isArray()) {
            return new ExpressionType(this.di.builtin.types.get('bool'), new ArrayUsage(), exp.constant);
        }
        return null;
    }

    private isRelationalExpression(): boolean {
        return !!this.ctx.OP_RELATIONAL();
    }

    private processRelationalExpression(): ExpressionType {
        const left = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        const right = new ExpressionProcessor().processExpression(this.ctx.expression()[1], this.scope, this.di);
        if (left && right && left instanceof ExpressionType && right instanceof ExpressionType &&
            left.type.name === right.type.name && !left.array.isArray() && !right.array.isArray() && left.type.isScalar() &&
            (left.type.typeBase === TypeBase.INT || left.type.typeBase === TypeBase.UINT || left.type.typeBase === TypeBase.FLOAT)) {
            return new ExpressionType(this.di.builtin.types.get('bool'), new ArrayUsage(), left.constant && right.constant);
        }
        return null;
    }

    private isEqualityExpression(): boolean {
        return !!this.ctx.OP_EQUALITY();
    }

    private processEqualityExpression(): ExpressionType {
        const left = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        const right = new ExpressionProcessor().processExpression(this.ctx.expression()[1], this.scope, this.di);
        if (left && right && left instanceof ExpressionType && right instanceof ExpressionType) {
            return new ExpressionType(this.di.builtin.types.get('bool'), new ArrayUsage(), left.constant && right.constant);
        }
        return null;
    }

    private isShiftExpression(): boolean {
        return !!this.ctx.OP_SHIFT();
    }

    private processShiftExpression(): ExpressionType {
        const left = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        const right = new ExpressionProcessor().processExpression(this.ctx.expression()[1], this.scope, this.di);
        if (left && right && left instanceof ExpressionType && right instanceof ExpressionType &&
            !left.array.isArray() && !right.array.isArray() &&
            (left.type.typeBase === TypeBase.INT || left.type.typeBase === TypeBase.UINT) &&
            (right.type.typeBase === TypeBase.INT || right.type.typeBase === TypeBase.UINT) &&
            ((left.type.isScalar() && right.type.isScalar()) || (left.type.isVector() && (right.type.isScalar() || left.type.width === right.type.width)))) {
            return new ExpressionType(left.type, new ArrayUsage(), left.constant && right.constant);
        }
        return null;
    }

    private isTernaryExpression(): boolean {
        return !!this.ctx.QUESTION();
    }

    private processTernaryExpression(): Array<ExpressionType> {
        //TODO
        new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        const el = this.ctx.expression_list()[0];
        const el2 = this.ctx.expression_list()[1];
        for (const exp of el2.expression()) {
            new ExpressionProcessor().processExpression(exp, this.scope, this.di);
        }
        const results = new Array<ExpressionType>();
        for (const exp of el.expression()) {
            const result = new ExpressionProcessor().processExpression(exp, this.scope, this.di);
            if (result) {
                if (result instanceof ExpressionType) {
                    results.push(result);
                } else {
                    for (const res of result) {
                        results.push(res);
                    }
                }
            }
        }
        return results;
    }

    private isAssignmentOrModifyExpression(): boolean {
        return !!this.ctx.OP_ASSIGN() || !!this.ctx.OP_MODIFY();
    }

    private processAssignmentOrModifyExpression(): ExpressionType | Array<ExpressionType> {
        const left = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        new ExpressionProcessor().processExpression(this.ctx.expression()[1], this.scope, this.di);
        return left;
    }

    //
    //general
    //
    private typeBaseToType(bt: TypeBase): TypeDeclaration {
        const types = this.di.builtin.types;
        switch (bt) {
            case TypeBase.BOOL: return types.get('bool');
            case TypeBase.FLOAT: return types.get('float');
            case TypeBase.INT: return types.get('int');
            case TypeBase.UINT: return types.get('uint');
            default: return null;
        }
    }

    private typeBaseToPrefix(bt: TypeBase): string {
        switch (bt) {
            case TypeBase.BOOL: return 'b';
            case TypeBase.FLOAT: return '';
            case TypeBase.INT: return 'i';
            case TypeBase.UINT: return 'u';
            default: return null;
        }
    }

    private isSwizzle(str: string): boolean {
        if (str.length < 1 || str.length > 4) {
            return false;
        }
        const rgba = new Set<string>(['r', 'g', 'b', 'a']);
        const xyzw = new Set<string>(['x', 'y', 'z', 'w']);
        const stpq = new Set<string>(['s', 't', 'p', 'q']);
        return this.allCharactersFromSet(str, rgba) || this.allCharactersFromSet(str, xyzw) || this.allCharactersFromSet(str, stpq);
    }

    private allCharactersFromSet(str: string, set: Set<string>): boolean {
        for (const char of str) {
            if (!set.has(char)) {
                return false;
            }
        }
        return true;
    }

}

export class ExpressionType {
    public readonly type: TypeDeclaration;
    public readonly array: ArrayUsage;
    public readonly constant: boolean;
    public readonly value: number;

    public constructor(type: TypeDeclaration, array = new ArrayUsage(), constant = false, value: number = null) {
        this.type = type;
        this.array = array;
        this.constant = constant;
        this.value = value;
    }

}