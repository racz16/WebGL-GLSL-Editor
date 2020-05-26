import { Element } from '../element';
import { TypeUsage } from '../type/type-usage';
import { VariableUsage } from './variable-usage';
import { Interval } from '../interval';
import { MarkdownString } from 'vscode';
import { Scope } from '../scope';
import { ShaderStage } from '../shader-stage';

export class VariableDeclaration extends Element {

    public readonly builtin: boolean;
    public readonly type: TypeUsage;
    public readonly usages = new Array<VariableUsage>();
    public readonly declarationInterval: Interval;
    public readonly summary: MarkdownString;
    public readonly stage: ShaderStage;
    public readonly functionPrototypeParameter: boolean;
    public readonly functionDefinitionParameter: boolean;

    public constructor(name: string, nameInterval: Interval, scope: Scope, builtIn: boolean, declarationInterval: Interval, type: TypeUsage, fpp: boolean, fdp: boolean, summary?: MarkdownString, stage = ShaderStage.DEFAULT) {
        super(name, nameInterval, scope);
        this.builtin = builtIn;
        this.type = type;
        this.declarationInterval = declarationInterval;
        this.functionPrototypeParameter = fpp;
        this.functionDefinitionParameter = fdp;
        this.summary = summary;
        this.stage = stage;
    }

    public toString(): string {
        return this.type.toString() + ' ' + this.name;
    }

    public toStringDocumentation(): string {
        return `\t${this.toString()};`;
    }

}