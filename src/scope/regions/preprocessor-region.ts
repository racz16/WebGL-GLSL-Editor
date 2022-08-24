import { Interval } from '../interval';

export class PreprocessorRegion {
    public readonly text: string;
    public readonly interval: Interval;
    public readonly extension: string;
    public readonly extensionState: string;

    public constructor(text: string, interval: Interval, extension: string, extensionState: string) {
        this.text = text;
        this.interval = interval;
        this.extension = extension;
        this.extensionState = extensionState;
    }
}
