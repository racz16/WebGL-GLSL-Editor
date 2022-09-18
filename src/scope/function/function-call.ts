import { Element } from '../element';
import { LogicalFunction } from './logical-function';
import { Interval } from '../interval';
import { Scope } from '../scope';
import { FunctionDeclaration } from './function-declaration';

export class FunctionCall extends Element {
    public readonly logicalFunction: LogicalFunction;
    public readonly interval: Interval;
    public readonly builtin: boolean;
    public readonly incomingCall: FunctionDeclaration;
    public readonly parametersStartOffset = new Array<number>();

    public constructor(
        name: string,
        nameInterval: Interval,
        scope: Scope,
        interval: Interval,
        logicalFunction: LogicalFunction,
        builtin: boolean,
        incomingCall: FunctionDeclaration
    ) {
        super(name, nameInterval, scope);
        this.logicalFunction = logicalFunction;
        this.interval = interval;
        this.builtin = builtin;
        this.incomingCall = incomingCall;
    }
}
