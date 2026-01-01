import { DocumentInfo } from '../core/document-info';

export class Interval {
    private readonly _startIndex: number;
    private readonly _stopIndex: number;
    private readonly _injected: boolean;

    public constructor(startIndex: number, stopIndex: number, di: DocumentInfo) {
        if (di.hasSourceMap()) {
            this._startIndex = startIndex;
            this._stopIndex = stopIndex;
            this._injected = di.isVirtualOffsetInjected(startIndex);
        } else {
            this._startIndex = startIndex - di.getInjectionOffset();
            this._stopIndex = stopIndex - di.getInjectionOffset();
            this._injected = this._startIndex < 0;
        }
    }

    public get startIndex(): number {
        return this._startIndex;
    }

    public get stopIndex(): number {
        return this._stopIndex;
    }

    public isInjected(): boolean {
        return this._injected;
    }
}
