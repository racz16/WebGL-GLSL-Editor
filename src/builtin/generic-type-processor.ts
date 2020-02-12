import { Function, Parameter } from "./interfaces/functions";

export class GenericTypeProcessor {

    private static func: Function;
    private static genTypes: Map<string, Array<string>>;

    private static initialize(func: Function, genTypes: Map<string, Array<string>>): void {
        this.func = func;
        this.genTypes = genTypes;
    }

    public static getFunctions(func: Function, genTypes: Map<string, Array<string>>): Array<Function> {
        this.initialize(func, genTypes);
        const gtg = this.getGenericTypeGroup();
        const ret = new Array<Function>();
        if (gtg === GenericTypeGroup.NONE) {
            ret.push(func);
            return ret;
        } else {
            const vc = this.getVariantCount(gtg);
            for (let i = 0; i < vc; i++) {
                const f = this.createFunction(i);
                ret.push(f);
            }
            return ret;
        }
    }

    private static createFunction(i: number): Function {
        const f: Function = {
            name: this.func.name,
            qualifiers: this.func.qualifiers,
            stage: this.func.stage,
            returnType: this.getType(this.func.returnType, i),
            parameters: new Array<Parameter>()
        };
        this.addParameters(f, i);
        return f;
    }

    private static addParameters(func: Function, i: number): void {
        for (const param of this.func.parameters) {
            const p: Parameter = {
                name: param.name,
                qualifiers: param.qualifiers,
                type: this.getType(param.type, i)
            };
            func.parameters.push(p);
        }
    }

    private static getType(type: string, index: number): string {
        const realType = this.genTypes.get(type);
        return realType ? realType[index] : type;
    }

    private static getGenericTypeGroup(): GenericTypeGroup {
        const rgtg = this.getGenericTypeGroupOf(this.func.returnType);
        if (rgtg !== GenericTypeGroup.NONE) {
            return rgtg;
        }
        for (const parameter of this.func.parameters) {
            const pgtg = this.getGenericTypeGroupOf(parameter.type);
            if (pgtg !== GenericTypeGroup.NONE) {
                return pgtg;
            }
        }
        return GenericTypeGroup.NONE;
    }

    private static getGenericTypeGroupOf(type: string): GenericTypeGroup {
        switch (type) {
            case 'genType':
            case 'genIType':
            case 'genUType':
            case 'genBType':
                return GenericTypeGroup.GEN_TYPE;
            case 'vec':
            case 'ivec':
            case 'uvec':
            case 'bvec':
                return GenericTypeGroup.X_VEC;
            case 'gvec2':
            case 'gvec3':
            case 'gvec4':
            case 'gsampler2D':
            case 'gsampler3D':
            case 'gsamplerCube':
            case 'gsampler2DArray':
                return GenericTypeGroup.G_SAMPLER;
            case 'mat':
                return GenericTypeGroup.MAT;
            default:
                return GenericTypeGroup.NONE;
        }
    }

    private static getVariantCount(gtg: GenericTypeGroup): number {
        switch (gtg) {
            case GenericTypeGroup.GEN_TYPE: return this.genTypes.get('genType').length;
            case GenericTypeGroup.X_VEC: return this.genTypes.get('vec').length;
            case GenericTypeGroup.G_SAMPLER: return this.genTypes.get('gsampler2D').length;
            case GenericTypeGroup.MAT: return this.genTypes.get('mat').length;
            default: throw new Error();
        }
    }

}

export enum GenericTypeGroup {
    GEN_TYPE,
    X_VEC,
    G_SAMPLER,
    MAT,
    NONE
}