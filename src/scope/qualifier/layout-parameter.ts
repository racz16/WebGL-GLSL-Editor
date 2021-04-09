export class LayoutParameter {
    public readonly name: string;
    public readonly assignable: boolean;
    public readonly extension: string;

    public constructor(name: string, assignable: boolean, extension: string) {
        this.name = name;
        this.assignable = assignable;
        this.extension = extension;
    }
}