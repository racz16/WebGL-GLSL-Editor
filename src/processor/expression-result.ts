import { TypeDeclaration } from "../scope/type/type-declaration";
import { ArrayUsage } from "../scope/array-usage";
import { FunctionCall } from "../scope/function/function-call";

export class ExpressionResult {
    public readonly type: TypeDeclaration;
    public readonly array: ArrayUsage;
    public readonly constant: boolean;
    public readonly value: number;
    public readonly numberLiteral: boolean;
    public readonly colorVariable: boolean;
    public readonly constructorCall: FunctionCall;
    public readonly constructorParameters: Array<number>;

    public constructor(type: TypeDeclaration, array = new ArrayUsage(), constant = false, value: number = null, floatLiteral = false, colorVariable = false, constructorCall: FunctionCall = null, constructorParameters = new Array<number>()) {
        this.type = type;
        this.array = array;
        this.constant = constant;
        this.value = value;
        this.numberLiteral = floatLiteral;
        this.colorVariable = colorVariable;
        this.constructorCall = constructorCall;
        this.constructorParameters = constructorParameters;
    }

}