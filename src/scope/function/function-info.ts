import { MarkdownString } from "vscode";
import { ShaderStage } from "../shader-stage";

export class FunctionInfo {

    public readonly name: string;
    public readonly summary: MarkdownString;
    public readonly stage: ShaderStage;
    public readonly ctor: boolean;
    public readonly parameters = new Map<string, string>();
    public readonly extension;

    public constructor(name: string, summary: MarkdownString, stage: ShaderStage, ctor: boolean, extension: string) {
        this.name = name;
        this.summary = summary;
        this.stage = stage;
        this.ctor = ctor;
        this.extension = extension;
    }

}