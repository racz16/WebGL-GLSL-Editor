import { CallHierarchyIncomingCall, CallHierarchyItem, CallHierarchyOutgoingCall, Range } from 'vscode';
import { LogicalFunction } from '../../scope/function/logical-function';

export class HierarchyElement {
    private item: CallHierarchyItem;
    private logicalFunction: LogicalFunction;
    private ranges = new Array<Range>();

    public constructor(item: CallHierarchyItem, logicalFunction: LogicalFunction) {
        this.item = item;
        this.logicalFunction = logicalFunction;
    }

    public getItem(): CallHierarchyItem {
        return this.item;
    }

    public getLogicalFunction(): LogicalFunction {
        return this.logicalFunction;
    }

    public getRanges(): Array<Range> {
        return this.ranges;
    }

    public toIncomingCall(): CallHierarchyIncomingCall {
        return new CallHierarchyIncomingCall(this.item, this.ranges);
    }

    public toOutgoingCall(): CallHierarchyOutgoingCall {
        return new CallHierarchyOutgoingCall(this.item, this.ranges);
    }
}
