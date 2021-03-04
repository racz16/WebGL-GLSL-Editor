import { DocumentInfo } from "../core/document-info";

export class Interval {

    private readonly _startIndex: number;
    private readonly _stopIndex: number;

    public constructor(startIndex: number, stopIndex: number, di: DocumentInfo) {
        this._startIndex = startIndex - di.getInjectionOffset();
        this._stopIndex = stopIndex - di.getInjectionOffset();
    }

    public get startIndex(): number {
        return this._startIndex;
    }

    public get stopIndex(): number {
        return this._stopIndex;
    }

    public isInjected(): boolean {
        return this.startIndex < 0;
    }

}