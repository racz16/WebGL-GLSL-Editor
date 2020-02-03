import { MarkdownString } from "vscode";
import { ShaderStage } from "../shader-stage";

export class FunctionInfo {
    name: string;
    summary: MarkdownString;
    stage: ShaderStage;
    ctor: boolean;

    public constructor(name: string, summary: MarkdownString, stage: ShaderStage, ctor: boolean) {
        this.name = name;
        this.summary = summary;
        this.stage = stage;
        this.ctor = ctor;
    }
}