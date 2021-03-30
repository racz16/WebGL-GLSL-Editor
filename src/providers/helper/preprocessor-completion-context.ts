export class PreprocessorCompletionContext {

    public readonly nextWordIndex: number;
    public readonly words: Array<string>;

    public constructor(nextWordIndex: number, words: Array<string>) {
        this.nextWordIndex = nextWordIndex;
        this.words = words;
    }

}