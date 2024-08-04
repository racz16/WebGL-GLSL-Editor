import { MarkdownString } from 'vscode';
import { Constants } from '../../core/constants';
import { Element } from '../element';
import { Interval } from '../interval';
import { Scope } from '../scope';
import { ShaderStage } from '../shader-stage';
import { TypeUsage } from '../type/type-usage';
import { VariableUsage } from './variable-usage';

export class VariableDeclaration extends Element {
    public readonly builtin: boolean;
    public readonly type: TypeUsage;
    public readonly usages = new Array<VariableUsage>();
    public readonly declarationInterval: Interval;
    public readonly summary: MarkdownString;
    public readonly stage: ShaderStage;
    public readonly functionPrototypeParameter: boolean;
    public readonly functionDefinitionParameter: boolean;
    public readonly extension: string;

    public constructor(
        name: string,
        nameInterval: Interval,
        scope: Scope,
        builtIn: boolean,
        declarationInterval: Interval,
        type: TypeUsage,
        fpp: boolean,
        fdp: boolean,
        summary?: MarkdownString,
        stage = ShaderStage.DEFAULT,
        extension = ''
    ) {
        super(name, nameInterval, scope);
        this.builtin = builtIn;
        this.type = type;
        this.declarationInterval = declarationInterval;
        this.functionPrototypeParameter = fpp;
        this.functionDefinitionParameter = fdp;
        this.summary = summary;
        this.stage = stage;
        this.extension = extension;
    }

    public isColorVariable(): boolean {
        return (
            (this.type?.declaration?.name === Constants.VEC3 || this.type?.declaration?.name === Constants.VEC4) &&
            (this.name?.toLowerCase().includes(Constants.COLOR) || this.name?.toLowerCase().includes(Constants.COLOUR))
        );
    }

    public toString(): string {
        const name = this.name ? Constants.SPACE + this.name : Constants.EMPTY;
        return this.type.toString() + name;
    }

    public toStringDocumentation(): string {
        return `\t${this.toString()};`;
    }
}
