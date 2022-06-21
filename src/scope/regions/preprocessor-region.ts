import { Range } from "vscode";

export class PreprocessorRegion {
    public readonly text: string
    public readonly interval: Range;
    public readonly extension: string;
    public readonly extensionState: string;

    public constructor(text: string, interval: Range, extension: string, extensionState: string) {
        this.text = text;
        this.interval = interval;
        this.extension = extension;
        this.extensionState = extensionState;
    }
}