import { FoldingRangeKind } from "vscode";

export class FoldingRegion {
    public readonly startLine: number;
    public readonly stopLine: number;
    public readonly kind: FoldingRangeKind;

    public constructor(startLine: number, stopLine: number, kind = FoldingRangeKind.Region) {
        this.startLine = startLine;
        this.stopLine = stopLine;
        this.kind = kind;
    }

}