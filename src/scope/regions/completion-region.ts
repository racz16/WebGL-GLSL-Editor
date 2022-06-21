import { Range } from "vscode";
import { TypeUsage } from "../type/type-usage";

export class CompletionRegion {
    public readonly type: TypeUsage;
    public readonly interval: Range;
    public readonly text: string;

    public constructor(tu: TypeUsage, interval: Range, text: string) {
        this.type = tu;
        this.interval = interval;
        this.text = text;
    }
}