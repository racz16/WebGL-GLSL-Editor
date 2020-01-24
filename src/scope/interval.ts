export class Interval {

    public static readonly NONE = new Interval(-1, -1);

    public readonly startIndex: number;
    public readonly stopIndex: number;

    public constructor(startIndex: number, stopIndex: number) {
        this.startIndex = startIndex;
        this.stopIndex = stopIndex;
    }

}