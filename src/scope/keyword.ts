export class Keyword {

    public readonly name: string;

    public constructor(name: string) {
        this.name = name;
    }

    public toString(): string {
        return this.name;
    }

}