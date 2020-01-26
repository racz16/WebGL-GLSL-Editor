import { ShaderStage } from '../core/shader-stage';
import { MarkdownString } from 'vscode';

export interface Functions {
    functions: Array<Function>;
}

export interface Function {
    qualifiers: Array<string>;
    returnType: string;
    name: string;
    parameters: Array<Parameter>;
    stage: string;
}

export interface Parameter {
    qualifiers: Array<string>;
    type: string;
    name: string;
}

export interface FunctionSummaries {
    functions: Array<FunctionSummary>;
}

export interface FunctionSummary {
    name: string;
    summary: string;
    customSummary: string;
    stage: string;
}

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