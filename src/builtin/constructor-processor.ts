import { LogicalFunction } from "../scope/function/logical-function";
import { Helper } from "../processor/helper";
import { ArrayUsage } from "../scope/array-usage";
import { TypeCategory } from "../scope/type/type-category";
import { TypeDeclaration } from "../scope/type/type-declaration";

export class ConstructorProcessor {

    private static result: Array<LogicalFunction>;
    private static td: TypeDeclaration;
    private static typeSize: number;
    private static types: Map<string, TypeDeclaration>;

    private static initialize(td: TypeDeclaration, types: Map<string, TypeDeclaration>): void {
        this.result = new Array<LogicalFunction>();
        this.td = td;
        this.typeSize = td.width * td.height;
        this.types = types;
    }

    public static getConstructors(td: TypeDeclaration, types: Map<string, TypeDeclaration>): Array<LogicalFunction> {
        this.initialize(td, types);
        if (td.isScalar()) {
            this.addScalarConstructors();
        } else if (td.isVector()) {
            this.addVectorConstructors();
        } else if (td.typeCategory === TypeCategory.CUSTOM) {
            this.addConstructor(this.td.members.map(vd => vd.type.declaration));
        }
        return this.result;
    }

    private static addScalarConstructors(): void {
        for (const type of this.types) {
            if (this.canBeParameter(type)) {
                const parameters = new Array<TypeDeclaration>(type[1]);
                this.addConstructor(parameters);
            }
        }
    }

    private static addVectorConstructors(parameters = new Array<TypeDeclaration>()): void {
        const paramSize = this.getParametersSize(parameters);
        if (parameters.length === 1) {
            const param = parameters[0];
            if (param.isScalar() || paramSize >= this.typeSize) {
                this.addConstructor(parameters);
            }
        } else if (parameters.length > 1) {
            if (paramSize === this.typeSize) {
                this.addConstructor(parameters);
            }
        }
        if (paramSize < this.typeSize) {
            for (const type of this.types) {
                if (this.canBeParameter(type)) {
                    parameters.push(type[1]);
                    this.addVectorConstructors(parameters);
                    parameters.pop();
                }
            }
        }
    }

    private static addConstructor(parameters: Array<TypeDeclaration>): void {
        const rtu = Helper.createTypeUsage(this.td.name, this.td, new ArrayUsage());
        const fd = Helper.createFunctionDeclaration(this.td.name, rtu, true);
        for (let i = 0; i < parameters.length; i++) {
            const ptd = parameters[i];
            const ptu = Helper.createTypeUsage(ptd.name, ptd, new ArrayUsage());
            const name = this.getParameterName(parameters, i);
            const vd = Helper.createVariableDeclaration(name, ptu, true);
            fd.parameters.push(vd);
        }
        const lf = new LogicalFunction();
        lf.prototypes.push(fd);
        fd.logicalFunction = lf;
        this.result.push(lf);
    }

    private static getParameterName(parameters: Array<TypeDeclaration>, i: number): string {
        if (this.td.typeCategory === TypeCategory.CUSTOM) {
            return this.td.members[i].name;
        } else if (parameters.length === 1) {
            return 'value';
        } else {
            return `v${i}`;
        }
    }

    private static canBeParameter([name, td]: [string, TypeDeclaration]): boolean {
        return td.typeCategory === TypeCategory.TRANSPARENT &&
            name !== 'mat2x2' && name !== 'mat3x3' && name !== 'mat4x4';
    }

    private static getParametersSize(parameters: Array<TypeDeclaration>): number {
        let result = 0;
        for (const td of parameters) {
            result += td.width * td.height;
        }
        return result;
    }

}