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
import { TypeCategory } from '../scope/type/type-category';
import { TypeUsage } from '../scope/type/type-usage';
import { LogicalFunction } from '../scope/function/logical-function';
import { TypeDeclarationProcessor } from './type-declaration-processor';
import { Interval } from '../scope/interval';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { Constants } from '../core/constants';
import { SemanticElement, SemanticType } from '../scope/semantic-element';
import { ColorRegion } from '../scope/color-region';
import { ExpressionResult } from './expression-result';
import { SignatureRegion } from '../scope/signature-region';
import { SignatureParameterRegion } from '../scope/signature-parameter-region';

export class ExpressionProcessor {

    private ctx: ExpressionContext;
    private scope: Scope;
    private di: DocumentInfo;

    private initialize(ctx: ExpressionContext, scope: Scope, di: DocumentInfo): void {
        this.ctx = ctx;
        this.scope = scope;
        this.di = di;
    }

    public processExpression(ctx: ExpressionContext, scope: Scope, di: DocumentInfo): ExpressionResult | Array<ExpressionResult> {
        this.initialize(ctx, scope, di);
        if (!ctx) {
            return null;
        } else if (this.isLiteral()) {
            return this.processLiteral();
        } else if (this.isIdentifier()) {
            return this.processIdentifier();
        } else if (this.isParenthesizedExpression()) {
            return this.processParenthesizedExpression();
        } else if (this.isModuloExpression()) {
            return this.processModuloExpression();
        } else if (this.isArithmeticUnaryExpression()) {
            return this.processArithmeticUnaryExpression();
        } else if (this.isArithmeticBinaryExpression()) {
            return this.processArithmeticBinaryExpression();
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
        } else if (this.isCompletionExpression()) {
            return this.processCompletionExpression();
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

    private processLiteral(): ExpressionResult {
        if (this.ctx.literal().BOOL_LITERAL()) {
            return new ExpressionResult(this.di.builtin.types.get(Constants.BOOL), new ArrayUsage(), true);
        } else {
            if (this.ctx.literal().number_literal().FLOAT_LITERAL()) {
                return new ExpressionResult(this.di.builtin.types.get(Constants.FLOAT), new ArrayUsage(), true, this.computeNumber(this.ctx.literal().text), true);
            } else {
                if (this.ctx.literal().text.toLowerCase().endsWith('u')) {
                    return new ExpressionResult(this.di.builtin.types.get(Constants.UINT), new ArrayUsage(), true, this.computeNumber(this.ctx.literal().text), true);
                } else {
                    return new ExpressionResult(this.di.builtin.types.get(Constants.INT), new ArrayUsage(), true, this.computeNumber(this.ctx.literal().text), true);
                }
            }
        }
    }

    private computeNumber(num: string): number {
        if (num.toLowerCase().endsWith('f') || num.toLowerCase().endsWith('u')) {
            return +(num.substring(0, num.length - 1));
        } else {
            return +num;
        }
    }

    private isIdentifier(): boolean {
        return this.ctx.IDENTIFIER() && !this.ctx.DOT();
    }

    private processIdentifier(): ExpressionResult {
        const vu = new VariableUsageProcessor().getVariableUsage(this.ctx.IDENTIFIER(), this.scope, this.di);
        if (vu.declaration) {
            const constant = vu.declaration.type.containsQualifier(this.di.builtin.qualifiers.get('const'));
            return new ExpressionResult(vu.declaration.type.declaration, vu.declaration.type.array, constant, null, false, vu.declaration.isColorVariable());
        }
        return null;
    }

    private isParenthesizedExpression(): boolean {
        return !!this.ctx.LRB();
    }

    private processParenthesizedExpression(): ExpressionResult | Array<ExpressionResult> {
        return new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
    }

    private isModuloExpression(): boolean {
        return !!this.ctx.OP_MOD();
    }

    private processModuloExpression(): ExpressionResult {
        const left = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        const right = new ExpressionProcessor().processExpression(this.ctx.expression()[1], this.scope, this.di);
        if (left && right && left instanceof ExpressionResult && right instanceof ExpressionResult &&
            left.type && right.type &&
            !left.array.isArray() && !right.array.isArray() && left.type.typeBase === right.type.typeBase &&
            (left.type.typeBase === TypeBase.INT || left.type.typeBase === TypeBase.UINT) &&
            (left.type.isScalar() || right.type.isScalar() || left.type.width === right.type.width)) {
            if (left.type.isVector()) {
                return new ExpressionResult(left.type, left.array, left.constant && right.constant);
            } else {
                return new ExpressionResult(right.type, right.array, left.constant && right.constant);
            }
        }
        return null;
    }

    private isArithmeticBinaryExpression(): boolean {
        return this.ctx.expression().length === 2 && (!!this.ctx.OP_ADD() || !!this.ctx.OP_SUB() || !!this.ctx.OP_DIV() || !!this.ctx.OP_MUL());
    }

    private processArithmeticBinaryExpression(): ExpressionResult {
        const left = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        const right = new ExpressionProcessor().processExpression(this.ctx.expression()[1], this.scope, this.di);
        if (left && right && left instanceof ExpressionResult && right instanceof ExpressionResult &&
            left.type && right.type &&
            (left.type.typeBase === TypeBase.INT || left.type.typeBase === TypeBase.UINT || left.type.typeBase === TypeBase.FLOAT) &&
            (right.type.typeBase === TypeBase.INT || right.type.typeBase === TypeBase.UINT || right.type.typeBase === TypeBase.FLOAT) &&
            ((left.type.typeBase === TypeBase.FLOAT && right.type.typeBase === TypeBase.FLOAT) || left.type.typeBase === right.type.typeBase) &&
            !left.array.isArray() && !right.array.isArray()) {
            if (left.type.isScalar() && right.type.isScalar()) {
                return left;
            } else if (left.type.isScalar() && !right.type.isScalar()) {
                return right;
            } else if (!left.type.isScalar() && right.type.isScalar()) {
                return left;
            } else if (left.type.isVector() && right.type.isVector() && left.type.width === right.type.width) {
                return left;
            } else if (!this.ctx.OP_MUL() && left.type.isMatrix() && right.type.isMatrix() &&
                left.type.width === right.type.width && left.type.height === right.type.height) {
                return left;
            } else if (this.ctx.OP_MUL() && ((left.type.isMatrix() && !right.type.isScalar()) || (!left.type.isScalar() && right.type.isMatrix()))) {
                const leftSize = left.type.width;
                const rightSize = right.type.isMatrix() ? right.type.height : right.type.width;
                if (leftSize === rightSize) {
                    if (left.type.isVector()) {
                        const td = this.di.builtin.types.get(`vec${right.type.width}`);
                        return new ExpressionResult(td, new ArrayUsage(), left.constant && right.constant);
                    } else if (right.type.isVector()) {
                        const td = this.di.builtin.types.get(`vec${left.type.height}`);
                        return new ExpressionResult(td, new ArrayUsage(), left.constant && right.constant);
                    } else {
                        const td = this.di.builtin.types.get(`mat${right.type.width}x${left.type.height}`);
                        return new ExpressionResult(td, new ArrayUsage(), left.constant && right.constant);
                    }

                }
            }
        }
        return null;
    }

    private isArithmeticUnaryExpression(): boolean {
        return this.ctx.expression().length === 1 && (!!this.ctx.OP_INC() || !!this.ctx.OP_DEC() || !!this.ctx.OP_SUB() || !!this.ctx.OP_ADD());
    }

    private processArithmeticUnaryExpression(): ExpressionResult {
        this.di.unaryExpressionRegions.push(Helper.getIntervalFromParserRule(this.ctx, this.di));
        const exp = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        if (exp && exp instanceof ExpressionResult && !exp.array.isArray() && exp.type &&
            (exp.type.typeBase === TypeBase.INT || exp.type.typeBase === TypeBase.UINT || exp.type.typeBase === TypeBase.FLOAT)) {
            return exp;
        }
        return null;
    }

    private isArrayExpression(): boolean {
        return !!this.ctx.array_subscript();
    }

    private processArrayExpression(): ExpressionResult {
        const exp = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        new ExpressionProcessor().processExpression(this.ctx.array_subscript().expression(), this.scope, this.di);
        if (exp && exp instanceof ExpressionResult && exp.type) {
            if (exp.array.isArray()) {
                return new ExpressionResult(exp.type, new ArrayUsage(), exp.constant);
            } else if (exp.type.isVector()) {
                return new ExpressionResult(this.typeBaseToType(exp.type.typeBase), new ArrayUsage(), exp.constant);
            } else if (exp.type.isMatrix()) {
                return new ExpressionResult(this.di.builtin.types.get(`vec${exp.type.height}`), new ArrayUsage(), exp.constant);
            }
        }
        return null;
    }

    private isLengthExpression(): boolean {
        return this.ctx.DOT() && !!this.ctx.function_call();
    }

    private processLengthExpression(): ExpressionResult {
        const exp = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        this.processCompletionRegion(exp);
        if (exp && exp instanceof ExpressionResult && exp.array.isArray()) {
            return new ExpressionResult(this.di.builtin.types.get(Constants.INT), new ArrayUsage(), true, exp.array.arraySize);
        }
        return null;
    }

    private isFunctionExpression(): boolean {
        return this.ctx.function_call() && !this.ctx.DOT();
    }

    private processFunctionExpression(): ExpressionResult {
        const parameters = this.getParameters();
        const tn = this.ctx.function_call().IDENTIFIER() ? this.ctx.function_call().IDENTIFIER() : this.ctx.function_call().TYPE();
        const name = tn.text;
        const interval = Helper.getIntervalFromParserRule(this.ctx.function_call(), this.di);
        const nameInterval = Helper.getIntervalFromTerminalNode(tn, this.di);
        const lf = this.getLogicalFunction(name, nameInterval, parameters);
        this.di.semanticElements.push(new SemanticElement(tn.symbol, SemanticType.FUNCTION));
        this.addSignatureRegion(name, parameters);
        if (lf) {
            const fd = lf.getDeclaration();
            const currentFunction = this.di.getVisitor().getCurrentFunction();
            const fc = new FunctionCall(name, nameInterval, this.scope, interval, lf, fd.builtIn, currentFunction);
            currentFunction?.outgoingCalls.push(fc);
            lf.calls.push(fc);
            this.scope.functionCalls.push(fc);
            for (let i = 0; i < parameters.length; i++) {
                const param = parameters[i];
                if (param && param.constructorCall &&
                    (lf.prototypes.some(fp => fp.parameters[i].isColorVariable()) || lf.definitions.some(fd => fd.parameters[i].isColorVariable()))) {
                    const cr = new ColorRegion(param.constructorCall, param.constructorParameters);
                    this.di.colorRegions.push(cr);
                }
            }
            if (fd.returnType.declaration) {
                if (fd.ctor) {
                    fd.returnType.declaration.ctorCalls.push(fc);
                }
                const constant = fd.builtIn && name !== 'dFdx' && name !== 'dFdy' && name !== 'fwidth' && parameters.every(param => param && param.constant);
                const colorConstructor = this.isColorConstructor(fd, parameters);
                const constructorCall = colorConstructor ? fc : null;
                const parameterValues = colorConstructor ? parameters.map(p => p.value) : null;
                return new ExpressionResult(fd.returnType.declaration, fd.returnType.array, constant, null, false, false, constructorCall, parameterValues);
            } else {
                return null;
            }
        }
        return null;
    }

    private addSignatureRegion(name: string, parameters: Array<ExpressionResult>): void {
        const fc = this.ctx.function_call();
        const paramsInterval = new Interval(fc.LRB().symbol.startIndex + 1, fc.RRB().symbol.stopIndex, this.di);
        const sr = new SignatureRegion(name, paramsInterval);
        for (let i = 0; i < fc.function_call_parameter_list()?.expression_list()?.COMMA().length + 1; i++) {
            const param = parameters.length > i ? parameters[i] : null;
            const interval = this.computeParameterInterval(i);
            const spr = new SignatureParameterRegion(param?.type, param?.array, interval);
            sr.parameters.push(spr);
        }
        if (!fc.function_call_parameter_list() || !fc.function_call_parameter_list().expression_list()) {
            const start = fc.LRB().symbol.stopIndex;
            const stop = fc.RRB().symbol.startIndex;
            const interval = new Interval(start, stop, this.di);
            const spr = new SignatureParameterRegion(null, null, interval);
            sr.parameters.push(spr);
        }
        this.di.signatureRegions.push(sr);
    }

    private computeParameterInterval(index: number): Interval {
        const fc = this.ctx.function_call();
        const expList = fc.function_call_parameter_list().expression_list();
        const start = index === 0 ? fc.LRB().symbol.startIndex : expList.COMMA()[index - 1].symbol.startIndex;
        const stop = index >= expList.COMMA().length ? fc.RRB().symbol.startIndex : expList.COMMA()[index].symbol.startIndex;
        return new Interval(start, stop, this.di);
    }

    private isColorConstructor(fd: FunctionDeclaration, parameters: Array<ExpressionResult>): boolean {
        const constructorAndAllParametersNumber = fd.ctor && parameters.every(p => p && p.numberLiteral);
        const vec3 = fd.name === Constants.VEC3 && (parameters.length === 1 || parameters.length === 3);
        const vec4 = fd.name === Constants.VEC4 && (parameters.length === 1 || parameters.length === 4);
        return constructorAndAllParametersNumber && (vec3 || vec4);
    }

    private getParameters(): Array<ExpressionResult> {
        const parameters = new Array<ExpressionResult>();
        if (this.ctx.function_call().function_call_parameter_list()?.expression_list()) {
            for (const exp of this.ctx.function_call().function_call_parameter_list().expression_list().expression()) {
                const parameter = new ExpressionProcessor().processExpression(exp, this.scope, this.di);
                if (parameter && parameter instanceof ExpressionResult) {
                    parameters.push(parameter);
                } else if (parameter && parameter instanceof Array) {
                    for (const param of parameter) {
                        parameters.push(param);
                    }
                } else {
                    parameters.push(null);
                }
            }
        }
        return parameters;
    }

    private getLogicalFunction(name: string, nameInterval: Interval, parameters: Array<ExpressionResult>): LogicalFunction {
        if (parameters.some(param => !param || !param.type)) {
            return null;
        }
        const lf = FunctionProcessor.searchFunction(name, nameInterval, parameters, this.scope, this.di);
        if (lf) {
            return lf;
        }
        const array = Helper.getArraySizeFromArraySubscript(this.ctx.function_call().array_subscript(), this.scope, this.di);
        if (array.isArray()) {
            const td = TypeDeclarationProcessor.searchTypeDeclaration(name, nameInterval, this.scope, this.di);
            if (td && parameters.every(param => param && param.type === td) && parameters.length) {
                return this.createLogicalFunction(name, nameInterval, td, array.specifyArraySize(parameters.length), parameters);
            }
        } else {
            const td = TypeDeclarationProcessor.searchTypeDeclaration(name, nameInterval, this.scope, this.di);
            if (this.isMatrixCtor(td, parameters)) {
                return this.createLogicalFunction(name, nameInterval, td, array, parameters);
            }
        }
        return null;
    }

    private createLogicalFunction(name: string, nameInterval: Interval, td: TypeDeclaration, array: ArrayUsage, parameters: Array<ExpressionResult>): LogicalFunction {
        const tu = new TypeUsage(name, nameInterval, nameInterval, null, td, array);
        const fp = new FunctionDeclaration(name, td.nameInterval, null, tu, td.builtin, true, td.interval, null);
        for (let i = 0; i < parameters.length; i++) {
            const tu2 = new TypeUsage(parameters[i].type.name, null, null, null, parameters[i].type, new ArrayUsage());
            const vd = new VariableDeclaration(`v${i}`, null, null, td.builtin, null, tu2, true, false);
            fp.parameters.push(vd);
        }
        const lf = new LogicalFunction();
        fp.logicalFunction = lf;
        lf.prototypes.push(fp);
        this.di.getRootScope().functions.push(lf);
        return lf;
    }

    private isMatrixCtor(td: TypeDeclaration, parameters: Array<ExpressionResult>): boolean {
        if (!td || !td.isMatrix()) {
            return false;
        }
        if (parameters.length === 1 && (parameters[0].type.isScalar() || parameters[0].type.isMatrix())) {
            return true;
        }
        const matrixSize = td.width * td.height;
        let paramsSize = 0;
        for (const param of parameters) {
            if (param.type.typeCategory !== TypeCategory.TRANSPARENT || param.type.isMatrix()) {
                return false;
            }
            paramsSize += param.type.width * param.type.height;
        }
        return matrixSize === paramsSize;
    }

    private isMemberExpression(): boolean {
        return this.ctx.DOT() && !!this.ctx.IDENTIFIER();
    }

    private processMemberExpression(): ExpressionResult {
        const exp = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        this.processCompletionRegion(exp);
        if (exp && exp instanceof ExpressionResult && !exp.array.isArray()) {
            const name = this.ctx.IDENTIFIER().text;
            const member = exp.type?.members.find(vd => vd.name === name);
            if (member) {
                const interval = Helper.getIntervalFromTerminalNode(this.ctx.IDENTIFIER(), this.di);
                const vu = new VariableUsage(name, this.scope, interval, member);
                this.scope.variableUsages.push(vu);
                member.usages.push(vu);
                return new ExpressionResult(member.type.declaration, member.type.array, exp.constant);
            } else if (exp.type?.isVector() && this.isSwizzle(name)) {
                if (name.length === 1) {
                    return new ExpressionResult(this.typeBaseToType(exp.type.typeBase), new ArrayUsage(), exp.constant);
                } else if (name.length <= 4) {
                    const typeName = Helper.getVectorTypeName(exp.type.typeBase, name.length);
                    return new ExpressionResult(this.di.builtin.types.get(typeName), new ArrayUsage(), exp.constant);
                }
            }
        }
        return null;
    }

    private isComplementExpression(): boolean {
        return !!this.ctx.OP_BIT_UNARY();
    }

    private processComplementExpression(): ExpressionResult {
        this.di.unaryExpressionRegions.push(Helper.getIntervalFromParserRule(this.ctx, this.di));
        const exp = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        if (exp && exp instanceof ExpressionResult && exp.type &&
            (exp.type.typeBase === TypeBase.INT || exp.type.typeBase === TypeBase.UINT)) {
            return exp;
        }
        return null;
    }

    private isBitExpression(): boolean {
        return !!this.ctx.OP_BIT_AND() ||
            !!this.ctx.OP_BIT_OR() ||
            !!this.ctx.OP_BIT_XOR();
    }

    private processBitExpression(): ExpressionResult {
        const left = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        const right = new ExpressionProcessor().processExpression(this.ctx.expression()[1], this.scope, this.di);
        if (left && left instanceof ExpressionResult && right && right instanceof ExpressionResult &&
            left.type && right.type &&
            left.type.typeBase === right.type.typeBase && !left.array.isArray() && !right.array.isArray() &&
            (left.type.typeBase === TypeBase.INT || left.type.typeBase === TypeBase.UINT)) {
            if (left.type.isVector() && right.type.isVector()) {
                if (left.type.width === right.type.width) {
                    return new ExpressionResult(left.type, new ArrayUsage(), left.constant && right.constant);
                }
            } else {
                const type = left.type?.isVector() ? left.type : right.type;
                return new ExpressionResult(type, new ArrayUsage(), left.constant && right.constant);
            }
        }
        return null;
    }

    private isLogicalBinaryExpression(): boolean {
        return !!this.ctx.OP_LOGICAL_AND() ||
            !!this.ctx.OP_LOGICAL_OR() ||
            !!this.ctx.OP_LOGICAL_XOR();
    }

    private processLogicalBinaryExpression(): ExpressionResult {
        const left = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        const right = new ExpressionProcessor().processExpression(this.ctx.expression()[1], this.scope, this.di);
        if (left && right && left instanceof ExpressionResult && right instanceof ExpressionResult &&
            left.type && right.type &&
            left.type.name === Constants.BOOL && left.type.name === right.type.name && !left.array.isArray() && !right.array.isArray()) {
            return new ExpressionResult(this.di.builtin.types.get(Constants.BOOL), new ArrayUsage(), left.constant && right.constant);
        }
        return null;
    }

    private isLogicalUnaryExpression(): boolean {
        return !!this.ctx.OP_LOGICAL_UNARY();
    }

    private processLogicalUnaryExpression(): ExpressionResult {
        this.di.unaryExpressionRegions.push(Helper.getIntervalFromParserRule(this.ctx, this.di));
        const exp = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        if (exp && exp instanceof ExpressionResult && exp.type && exp.type.name === Constants.BOOL && !exp.array.isArray()) {
            return new ExpressionResult(this.di.builtin.types.get(Constants.BOOL), new ArrayUsage(), exp.constant);
        }
        return null;
    }

    private isRelationalExpression(): boolean {
        return !!this.ctx.OP_RELATIONAL();
    }

    private processRelationalExpression(): ExpressionResult {
        const left = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        const right = new ExpressionProcessor().processExpression(this.ctx.expression()[1], this.scope, this.di);
        if (left && right && left instanceof ExpressionResult && right instanceof ExpressionResult &&
            left.type && right.type &&
            left.type.name === right.type.name && !left.array.isArray() && !right.array.isArray() && left.type.isScalar() &&
            (left.type.typeBase === TypeBase.INT || left.type.typeBase === TypeBase.UINT || left.type.typeBase === TypeBase.FLOAT)) {
            return new ExpressionResult(this.di.builtin.types.get(Constants.BOOL), new ArrayUsage(), left.constant && right.constant);
        }
        return null;
    }

    private isEqualityExpression(): boolean {
        return !!this.ctx.OP_EQUALITY();
    }

    private processEqualityExpression(): ExpressionResult {
        const left = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        const right = new ExpressionProcessor().processExpression(this.ctx.expression()[1], this.scope, this.di);
        if (left && right && left instanceof ExpressionResult && right instanceof ExpressionResult) {
            return new ExpressionResult(this.di.builtin.types.get(Constants.BOOL), new ArrayUsage(), left.constant && right.constant);
        }
        return null;
    }

    private isShiftExpression(): boolean {
        return !!this.ctx.OP_SHIFT();
    }

    private processShiftExpression(): ExpressionResult {
        const left = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        const right = new ExpressionProcessor().processExpression(this.ctx.expression()[1], this.scope, this.di);
        if (left && right && left instanceof ExpressionResult && right instanceof ExpressionResult &&
            left.type && right.type &&
            !left.array.isArray() && !right.array.isArray() &&
            (left.type.typeBase === TypeBase.INT || left.type.typeBase === TypeBase.UINT) &&
            (right.type.typeBase === TypeBase.INT || right.type.typeBase === TypeBase.UINT) &&
            ((left.type.isScalar() && right.type.isScalar()) || (left.type.isVector() && (right.type.isScalar() || left.type.width === right.type.width)))) {
            return new ExpressionResult(left.type, new ArrayUsage(), left.constant && right.constant);
        }
        return null;
    }

    private isTernaryExpression(): boolean {
        return !!this.ctx.QUESTION();
    }

    private processTernaryExpression(): Array<ExpressionResult> {
        new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        const el = this.ctx.expression_list()[0];
        const el2 = this.ctx.expression_list()[1];
        for (const exp of el2.expression()) {
            new ExpressionProcessor().processExpression(exp, this.scope, this.di);
        }
        const results = new Array<ExpressionResult>();
        for (const exp of el.expression()) {
            const result = new ExpressionProcessor().processExpression(exp, this.scope, this.di);
            if (result) {
                if (result instanceof ExpressionResult) {
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

    private processAssignmentOrModifyExpression(): ExpressionResult | Array<ExpressionResult> {
        const left = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        const right = new ExpressionProcessor().processExpression(this.ctx.expression()[1], this.scope, this.di);
        if (left instanceof ExpressionResult && right instanceof ExpressionResult && left.colorVariable && right.constructorCall) {
            const cr = new ColorRegion(right.constructorCall, right.constructorParameters);
            this.di.colorRegions.push(cr);
        }
        return left;
    }

    private isCompletionExpression(): boolean {
        return !!this.ctx.DOT();
    }

    private processCompletionExpression(): ExpressionResult {
        const exp = new ExpressionProcessor().processExpression(this.ctx.expression()[0], this.scope, this.di);
        this.processCompletionRegion(exp);
        return null;
    }

    private processCompletionRegion(exp: ExpressionResult | Array<ExpressionResult>): void {
        if (exp && exp instanceof ExpressionResult && (exp.array.isArray() || exp.type?.isVector() || exp.type?.typeCategory === TypeCategory.CUSTOM)) {
            const interval = Helper.getIntervalFromParserRule(this.ctx.expression()[0], this.di);
            const tu = new TypeUsage(exp.type.name, interval, null, this.scope, exp.type, exp.array);
            this.di.completionRegions.push(tu);
        }
    }

    //
    //general
    //
    private typeBaseToType(tb: TypeBase): TypeDeclaration {
        const name = Helper.getScalarTypeName(tb);
        const types = this.di.builtin.types;
        return types.get(name);
    }

    private isSwizzle(str: string): boolean {
        if (str.length < 1 || str.length > 4) {
            return false;
        }
        return this.allCharactersFromSet(str, Constants.rgba) || this.allCharactersFromSet(str, Constants.xyzw) || this.allCharactersFromSet(str, Constants.stpq);
    }

    private allCharactersFromSet(str: string, set: Array<string>): boolean {
        for (const char of str) {
            if (!set.includes(char)) {
                return false;
            }
        }
        return true;
    }

}
