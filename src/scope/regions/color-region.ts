import { FunctionCall } from '../function/function-call';

export class ColorRegion {
    public readonly constructorCall: FunctionCall;
    public readonly parameters: Array<number>;

    public constructor(constructorCall: FunctionCall, parameters: Array<number>) {
        this.constructorCall = constructorCall;
        this.parameters = parameters;
    }
}
