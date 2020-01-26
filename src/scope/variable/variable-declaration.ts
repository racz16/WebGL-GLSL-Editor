import { Element } from '../element';
import { TypeUsage } from '../type/type-usage';
import { VariableUsage } from './variable-usage';
import { Interval } from '../interval';
import { MarkdownString } from 'vscode';
import { Scope } from '../scope';
import { ShaderStage } from '../../core/shader-stage';

export class VariableDeclaration extends Element {

    public readonly builtin: boolean;
    public readonly global: boolean;
    public readonly type: TypeUsage;
    public readonly usages = new Array<VariableUsage>();
    public readonly declarationInterval: Interval;
    public summary: MarkdownString;
    public readonly stage: ShaderStage;

    public constructor(name: string, nameInterval: Interval, scope: Scope, builtIn: boolean, global: boolean, declarationInterval: Interval, type: TypeUsage, stage = ShaderStage.DEFAULT) {
        super(name, nameInterval, scope);
        this.builtin = builtIn;
        this.global = global;
        this.type = type;
        this.declarationInterval = declarationInterval;
        this.stage = stage;
    }

    /*public equals(vd: VariableDeclaration): boolean {
        if (!vd) {
            return false;
        }
        return (this.name === vd.name && this.type.equals(vd.type));
    }*/

    public toString(): string {
        return this.type.toString() + ' ' + this.name;
    }

    public toStringDocumentation(): string {
        return `\t${this.toString()};`;
    }

}