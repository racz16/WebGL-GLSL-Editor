import { Constants } from '../../core/constants';
import { Element } from '../element';
import { FunctionCall } from '../function/function-call';
import { Interval } from '../interval';
import { Scope } from '../scope';
import { VariableDeclaration } from '../variable/variable-declaration';
import { TypeBase } from './type-base';
import { TypeCategory } from './type-category';
import { TypeUsage } from './type-usage';

export class TypeDeclaration extends Element {
    public readonly builtin: boolean;
    public readonly interval: Interval;
    public readonly typeBase: TypeBase;
    public readonly typeCategory: TypeCategory;
    public readonly width: number;
    public readonly height: number;
    public readonly interfaceBlock: boolean;
    public readonly members = new Array<VariableDeclaration>();
    public readonly interfaceMembers = new Array<VariableDeclaration>();
    public readonly usages = new Array<TypeUsage>();
    public readonly ctorCalls = new Array<FunctionCall>();
    public readonly inline: boolean;

    public constructor(
        name: string,
        nameInterval: Interval,
        scope: Scope,
        builtIn: boolean,
        interval: Interval,
        width: number,
        height: number,
        typeBase: TypeBase,
        typeCategory = TypeCategory.CUSTOM,
        interfaceBlock = false,
        inline = false
    ) {
        super(name, nameInterval, scope);
        this.builtin = builtIn;
        this.interval = interval;
        this.width = width;
        this.height = height;
        this.typeBase = typeBase;
        this.typeCategory = typeCategory;
        this.interfaceBlock = interfaceBlock;
        this.inline = inline;
    }

    public isScalar(): boolean {
        return this.width === 1 && this.height === 1;
    }

    public isVector(): boolean {
        return this.width > 1 && this.height === 1;
    }

    public isMatrix(): boolean {
        return this.width > 1 && this.height > 1;
    }

    public isOpaque(): boolean {
        return (
            this.typeCategory === TypeCategory.FLOATING_POINT_OPAQUE ||
            this.typeCategory === TypeCategory.SIGNED_INTEGER_OPAQUE ||
            this.typeCategory === TypeCategory.UNSIGNED_INTEGER_OPAQUE
        );
    }

    public toStringName(toOutline = false): string {
        if (this.name) {
            return this.name;
        } else {
            if (toOutline) {
                return this.interfaceBlock ? '<unnamed interface block>' : '<unnamed type>';
            } else {
                return this.interfaceBlock ? 'uniform {...}' : 'struct {...}';
            }
        }
    }

    public toString(): string {
        let result = `struct ${this.name} {`;
        for (const vd of this.members) {
            result += `${vd.toString()};`;
        }
        result += '};';
        return result;
    }

    public toStringDocumentation(): string {
        let result = `\tstruct ${this.name} {${Constants.NEW_LINE}`;
        for (const vd of this.members) {
            result += `\t\t${vd.toString()};${Constants.NEW_LINE}`;
        }
        result += '\t};';
        return result;
    }

    public toStringConstructorParameters(): string {
        let ret = Constants.EMPTY;
        for (let i = 0; i < this.members.length; i++) {
            ret += this.members[i].toString();
            if (i !== this.members.length - 1) {
                ret += ', ';
            }
        }
        return ret;
    }
}
