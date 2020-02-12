import { ShaderStage } from "./shader-stage";

export class Keyword {

    public readonly name: string;
    public readonly stage: ShaderStage;

    public constructor(name: string, stage: ShaderStage) {
        this.name = name;
        this.stage = stage;
    }

    public toString(): string {
        return this.name;
    }

}