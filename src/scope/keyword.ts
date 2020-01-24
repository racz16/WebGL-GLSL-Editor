export class Keyword {

    public readonly name: string;

    public constructor(name: string) {
        this.name = name;
    }

    /*public equals(kw: Keyword): boolean {
        if (!kw) {
            return false;
        }
        return this.name === kw.name;
    }*/


    public toString(): string {
        return this.name;
    }

}