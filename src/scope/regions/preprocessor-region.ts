import { Interval } from "../interval";

export class PreprocessorRegion {
    public readonly text: string
    public readonly interval: Interval;

    public constructor(text: string, interval: Interval) {
        this.text = text;
        this.interval = interval;
    }
}