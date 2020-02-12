import { Interval } from "./interval";

export class ArrayUsage {

    public readonly arraySize: number;
    public readonly interval: Interval;
    public readonly multidimensional: boolean;

    public constructor(arraySize = -1, interval = null, multidimensional = false) {
        this.arraySize = arraySize;
        this.interval = interval;
        this.multidimensional = multidimensional;
    }

    public isArray(): boolean {
        return this.arraySize !== -1;
    }

    public isUndefinedSize(): boolean {
        return this.arraySize === 0;
    }

    public mergeArrays(au: ArrayUsage): ArrayUsage {
        if (!au || (this.isArray() && !au.isArray())) {
            return this;
        } else if (!this.isArray() && au.isArray()) {
            return au;
        } else {
            return new ArrayUsage(this.arraySize, this.interval, true);
        }
    }

    public toString(): string {
        if (!this.isArray()) {
            return '';
        } else if (this.isUndefinedSize()) {
            return '[]';
        } else {
            return `[${this.arraySize}]`;
        }
    }

}