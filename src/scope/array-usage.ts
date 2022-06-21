import { Range } from "vscode";
import { Constants } from "../core/constants";

export class ArrayUsage {

    public readonly arraySize: number;
    public readonly interval: Range;
    public readonly multidimensional: boolean;

    public constructor(arraySize = Constants.INVALID, interval = null, multidimensional = false) {
        this.arraySize = arraySize;
        this.interval = interval;
        this.multidimensional = multidimensional;
    }

    public isArray(): boolean {
        return this.arraySize !== Constants.INVALID;
    }

    public isUndefinedSize(): boolean {
        return this.arraySize === 0;
    }

    public mergeArrays(au: ArrayUsage): ArrayUsage {
        if (!au || (this.isArray() && !au.isArray())) {
            return this;
        } else if (!this.isArray() && au.isArray()) {
            return au;
        } else if (!this.isArray() && !au.isArray()) {
            return new ArrayUsage();
        } else {
            return new ArrayUsage(this.arraySize, this.interval, true);
        }
    }

    public specifyArraySize(arraySize: number): ArrayUsage {
        if (arraySize <= 0 || this.arraySize > 0) {
            return this;
        } else {
            return new ArrayUsage(arraySize, this.interval, this.multidimensional);
        }
    }

    public toString(): string {
        if (!this.isArray()) {
            return Constants.EMPTY;
        } else if (this.isUndefinedSize()) {
            return '[]';
        } else {
            return `[${this.arraySize}]`;
        }
    }

}