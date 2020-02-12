import { Element } from '../element';
import { LogicalFunction } from './logical-function';
import { Interval } from '../interval';
import { Scope } from '../scope';

export class FunctionCall extends Element {

    public readonly logicalFunction: LogicalFunction;
    public readonly interval: Interval;
    public readonly builtin: boolean;

    public constructor(name: string, nameInterval: Interval, scope: Scope, interval: Interval, logicalFunction: LogicalFunction, builtin: boolean) {
        super(name, nameInterval, scope);
        this.logicalFunction = logicalFunction;
        this.interval = interval;
        this.builtin = builtin;
    }

}
