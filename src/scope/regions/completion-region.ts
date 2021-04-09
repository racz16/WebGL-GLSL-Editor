import { Interval } from "../interval";
import { TypeUsage } from "../type/type-usage";

export class CompletionRegion {
    public readonly type: TypeUsage;
    public readonly interval: Interval;
    public readonly text: string;

    public constructor(tu: TypeUsage, interval: Interval, text: string) {
        this.type = tu;
        this.interval = interval;
        this.text = text;
    }
}