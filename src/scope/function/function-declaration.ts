import { Constants } from '../../core/constants';
import { DocumentInfo } from '../../core/document-info';
import { Element } from '../element';
import { Interval } from '../interval';
import { Scope } from '../scope';
import { ShaderStage } from '../shader-stage';
import { TypeUsage } from '../type/type-usage';
import { VariableDeclaration } from '../variable/variable-declaration';
import { FunctionCall } from './function-call';
import { LogicalFunction } from './logical-function';

export class FunctionDeclaration extends Element {
    public logicalFunction: LogicalFunction;
    public readonly interval: Interval;
    public readonly returnType: TypeUsage;
    public readonly parameters = new Array<VariableDeclaration>();
    public readonly builtIn: boolean;
    public readonly ctor: boolean;
    public readonly functionScope: Scope;
    public readonly stage: ShaderStage;
    public readonly outgoingCalls = new Array<FunctionCall>();
    public readonly extension: string;

    public constructor(
        name: string,
        nameInterval: Interval,
        scope: Scope,
        returnType: TypeUsage,
        builtIn: boolean,
        ctor: boolean,
        interval: Interval,
        functionScope: Scope,
        stage = ShaderStage.DEFAULT,
        extension = ''
    ) {
        super(name, nameInterval, scope);
        this.interval = interval;
        this.returnType = returnType;
        this.builtIn = builtIn;
        this.ctor = ctor;
        this.functionScope = functionScope;
        this.stage = stage;
        this.extension = extension;
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
            if (
                !vd.type.declaration ||
                !vd2.type.declaration ||
                vd.type.declaration !== vd2.type.declaration ||
                !vd.type.areArrayDimensionsMatch(vd2.type)
            ) {
                return false;
            }
        }
        return true;
    }

    public isDuplicateOf(element: Element, di: DocumentInfo): boolean {
        if (element instanceof FunctionDeclaration) {
            const fd = element;
            const prototypes = this.logicalFunction.prototypes;
            const definitions = this.logicalFunction.definitions;
            return (
                element !== this &&
                ((definitions.includes(fd) && definitions.includes(this)) ||
                    (di.isGlsl100es() && prototypes.includes(fd) && prototypes.includes(this)))
            );
        }
        return super.isDuplicateOf(element, di);
    }

    //
    //toString
    //
    public toStringSignature(showParameters: boolean): string {
        const arrayCtor =
            this.returnType.array.isArray && this.ctor ? this.returnType.array.toString() : Constants.EMPTY;
        let ret = this.name + arrayCtor + Constants.LRB;
        if (showParameters) {
            ret += this.toStringParameters();
        }
        ret += Constants.RRB;
        return ret;
    }

    public toStringParameters(): string {
        let ret = Constants.EMPTY;
        for (let i = 0; i < this.parameters.length; i++) {
            ret += this.toStringParameter(i);
        }
        return ret;
    }

    private toStringParameter(index: number): string {
        let ret = this.parameters[index].toString();
        if (index !== this.parameters.length - 1) {
            ret += ', ';
        }
        return ret;
    }

    public toString(): string {
        if (this.ctor) {
            return this.toStringSignature(true);
        } else {
            return this.returnType + Constants.SPACE + this.toStringSignature(true);
        }
    }

    public toStringDocumentation(): string {
        return `\t${this.toString()};`;
    }
}
