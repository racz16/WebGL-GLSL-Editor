import { Element } from '../element';
import { LogicalFunction } from './logical-function';
import { Interval } from '../interval';
import { TypeUsage } from '../type/type-usage';
import { VariableDeclaration } from '../variable/variable-declaration';
import { GlslDocumentInfo } from '../../core/glsl-document-info';
import { Scope } from '../scope';
import { ShaderStage } from '../../core/shader-stage';

export class FunctionDeclaration extends Element {

    public logicalFunction: LogicalFunction;
    public readonly interval: Interval;
    public readonly signatureInterval: Interval;
    public readonly returnType: TypeUsage;
    public readonly parameters = new Array<VariableDeclaration>();
    public readonly builtIn: boolean;
    public readonly ctor: boolean;
    public readonly stage: ShaderStage;

    public constructor(name: string, nameInterval: Interval, scope: Scope, returnType: TypeUsage, builtIn: boolean, ctor: boolean, interval: Interval, signatureInterval: Interval, stage = ShaderStage.DEFAULT) {
        super(name, nameInterval, scope);
        this.interval = interval;
        this.signatureInterval = signatureInterval;
        this.returnType = returnType;
        this.builtIn = builtIn;
        this.ctor = ctor;
        this.stage = stage;
    }

    public isConnectableWith(fd: FunctionDeclaration): boolean {
        if (!fd || this.name !== fd.name || this.parameters.length !== fd.parameters.length) {
            return false;
        }
        return this.areParametersConnectableWith(fd);
    }

    public areParametersConnectableWith(fd: FunctionDeclaration): boolean {
        for (let i = 0; i < this.parameters.length; i++) {
            const vd = this.parameters[i];
            const vd2 = fd.parameters[i];
            if (!vd.type.declaration || !vd2.type.declaration ||
                vd.type.declaration !== vd2.type.declaration ||
                vd.type.arrayDepth !== vd2.type.arrayDepth
                //TODO: tömb méretének is meg kéne egyeznie
            ) {
                return false;
            }
        }
        return true;
    }

    /*public equals(f: FunctionDeclaration): boolean {
        if (!f) {
            return false;
        }
        return this.equalsSignature(f) && this.returnType.equals(f.returnType);
    }

    public equalsSignature(f: FunctionDeclaration): boolean {
        if (this.name !== f.name || this.parameters.length !== f.parameters.length) {
            return false;
        }
        return this.equalsParameters(f);
    }

    private equalsParameters(func: FunctionDeclaration): boolean {
        for (let i = 0; i < this.parameters.length; i++) {
            if (!this.parameters[i].type.equals(func.parameters[i].type)) {
                return false;
            }
        }
        return true;
    }*/

    public toStringSignature(showParameters: boolean): string {
        let ret = this.name + '(';
        if (showParameters) {
            ret += this.toStringParameterArray();
        }
        ret += ')';
        return ret;
    }

    public toStringParameterArray(): string {
        let ret = '';
        for (let i = 0; i < this.parameters.length; i++) {
            ret += this.toStringParameter(i);
        }
        return ret;
    }

    private toStringParameter(index: number): string {
        let ret = '';
        ret += this.parameters[index].toString();
        if (index !== this.parameters.length - 1) {
            ret += ', ';
        }
        return ret;
    }

    public toString(): string {
        return this.returnType + ' ' + this.toStringSignature(true);
    }

    public toStringDocumentation(): string {
        return `\t${this.toString()};`;
    }

    public isDuplicateOf(element: Element, di: GlslDocumentInfo): boolean {
        if (element instanceof FunctionDeclaration) {
            const fd = element;
            const prototypes = this.logicalFunction.prototypes;
            const definitions = this.logicalFunction.definitions;
            return element !== this &&
                ((definitions.includes(fd) && definitions.includes(this)) ||
                    (di.isGlsl100es() && prototypes.includes(fd) && prototypes.includes(this)));
        }
        return super.isDuplicateOf(element, di);
    }

}
