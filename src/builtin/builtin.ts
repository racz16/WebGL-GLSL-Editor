import { FunctionDeclaration } from '../scope/function/function-declaration';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { Keyword } from '../scope/keyword';
import { Qualifier } from '../scope/qualifier/qualifier';
import { TypeCategory } from '../scope/type/type-category';
import { TypeBase } from '../scope/type/type-base';
import { TypeUsage } from '../scope/type/type-usage';
import { QualifierUsage } from '../scope/qualifier/qualifier-usage';
import { MarkdownString } from 'vscode';
import { ShaderStage } from '../scope/shader-stage';
import { GlslCommandProvider } from '../providers/glsl-command-provider';
import { Constants } from '../core/constants';
import { FunctionInfo } from '../scope/function/function-info';
import { GenericTypeProcessor } from './generic-type-processor';
import { ArrayUsage } from '../scope/array-usage';
import { LogicalFunction } from '../scope/function/logical-function';
import { ConstructorProcessor } from './constructor-processor';
import { Helper } from '../processor/helper';
import { LayoutParameter } from '../scope/qualifier/layout-parameter';
import { reservedWords } from './info/reserved';
import { keywords } from './info/keywords';
import { qualifiers } from './info/qualifiers';
import { preprocessorDirectives, preprocessorMacros } from './info/preprocessor';
import { layoutParameters } from './info/layout-parameters';
import {
    ICustomType,
    IFunction,
    IFunctionSummary,
    IOpaqueType,
    IParameter,
    ITransparentType,
    ITypeMember,
    IVariable,
} from './interfaces';
import { genericTypes } from './info/generic_types';
import { variables } from './info/variables';
import { functions } from './info/functions';
import { functionSummaries } from './info/function-summaries';
import { importantFunctions } from './info/important-functions';
import {
    customTypes,
    floatingPointOpaqueTypes,
    signedIntegerOpaqueTypes,
    transparentTypes,
    unsignedIntegerOpaqueTypes,
} from './info/types';

export class Builtin {
    private static builtin_100: Builtin;
    private static builtin_300: Builtin;

    private version: '100' | '300';

    public readonly functions = new Array<LogicalFunction>();
    public readonly functionSummaries = new Map<string, FunctionInfo>();
    public readonly importantFunctions = new Array<string>();
    public readonly variables = new Map<string, VariableDeclaration>();
    public readonly types = new Map<string, TypeDeclaration>();
    public readonly keywords = new Array<Keyword>();
    public readonly preprocessor = new Array<Array<Array<string>>>();
    public readonly qualifiers = new Map<string, Qualifier>();
    public readonly layoutParameters = new Array<LayoutParameter>();
    public readonly qualifierRules = new Array<Set<Qualifier>>();
    public readonly reservedWords = new Array<string>();
    public readonly genericTypes = new Map<string, Array<string>>();
    public readonly macros = new Array<string>();

    private constructor() {}

    public setValues(version: '100' | '300'): void {
        this.version = version;
        this.loadReservedWords();
        this.loadKeywords();
        this.loadQualifiers();
        this.loadPreprocessor();
        this.loadLayoutParameters();
        this.loadTypes();
        this.loadGenericTypes();
        this.addConstructors();
        this.loadVariables();
        this.loadFunctions();
        this.loadFunctionSummaries();
        this.loadImportantFunctions();
    }

    //
    //reserved
    //
    private loadReservedWords(): void {
        for (const reserved of reservedWords.get(this.version)) {
            this.reservedWords.push(reserved);
        }
    }

    //
    //keywords
    //
    private loadKeywords(): void {
        for (const keyword of keywords.get(this.version)) {
            const stage = this.getStage(keyword.stage);
            this.keywords.push(new Keyword(keyword.name, stage));
        }
    }

    //
    //qualifiers
    //
    private loadQualifiers(): void {
        for (const qualifier of qualifiers.get(this.version)) {
            this.qualifiers.set(qualifier.name, new Qualifier(qualifier.name, qualifier.order));
        }
    }

    //
    //preprocessor
    //
    private loadPreprocessor(): void {
        for (const preprocessorDirective of preprocessorDirectives) {
            this.preprocessor.push(preprocessorDirective);
        }
        for (const macro of preprocessorMacros) {
            this.macros.push(macro);
        }
    }

    //
    //layout parameters
    //
    private loadLayoutParameters(): void {
        if (this.version !== '100') {
            for (const param of layoutParameters) {
                this.layoutParameters.push(new LayoutParameter(param.name, param.assignable, param.extension));
            }
        }
    }

    //
    //types
    //
    private loadTypes(): void {
        this.loadTransparentTypes(transparentTypes.get(this.version));
        this.loadOpaqueTypes(
            floatingPointOpaqueTypes.get(this.version),
            TypeCategory.FLOATING_POINT_OPAQUE,
            TypeBase.FLOAT
        );
        this.loadOpaqueTypes(
            signedIntegerOpaqueTypes.get(this.version),
            TypeCategory.SIGNED_INTEGER_OPAQUE,
            TypeBase.INT
        );
        this.loadOpaqueTypes(
            unsignedIntegerOpaqueTypes.get(this.version),
            TypeCategory.UNSIGNED_INTEGER_OPAQUE,
            TypeBase.UINT
        );
        this.loadCustomTypes(customTypes.get(this.version));
    }

    private loadTransparentTypes(types: Array<ITransparentType>): void {
        for (const type of types) {
            let td: TypeDeclaration;
            if (type.alias) {
                td = this.types.get(type.alias);
            } else {
                const tb = this.stringToTypeBase(type.base);
                td = Helper.createTypeDeclaration(type.name, type.width, type.height, tb, TypeCategory.TRANSPARENT);
            }
            this.types.set(type.name, td);
        }
    }

    private stringToTypeBase(str: string): TypeBase {
        switch (str) {
            case Constants.BOOL:
                return TypeBase.BOOL;
            case Constants.INT:
                return TypeBase.INT;
            case Constants.UINT:
                return TypeBase.UINT;
            case Constants.FLOAT:
                return TypeBase.FLOAT;
            default:
                return TypeBase.NONE;
        }
    }

    private loadOpaqueTypes(opaqueTypes: Array<IOpaqueType>, typeCategory: TypeCategory, typeBase: TypeBase): void {
        for (const type of opaqueTypes) {
            const td = Helper.createTypeDeclaration(
                type.name,
                Constants.INVALID,
                Constants.INVALID,
                typeBase,
                typeCategory
            );
            this.types.set(type.name, td);
        }
    }

    private loadCustomTypes(types: Array<ICustomType>): void {
        for (const type of types) {
            const td = Helper.createTypeDeclaration(
                type.name,
                Constants.INVALID,
                Constants.INVALID,
                TypeBase.NONE,
                TypeCategory.CUSTOM
            );
            this.addMembers(td, type);
            this.types.set(type.name, td);
        }
    }

    private addMembers(td: TypeDeclaration, type: ICustomType): void {
        for (const member of type.members) {
            const td2 = this.types.get(member.memberType);
            const tu = Helper.createTypeUsage(member.memberType, td2, new ArrayUsage());
            const vd = Helper.createVariableDeclaration(member.memberName, tu, false, false);
            this.addMemberPrecisionQualifier(tu, member);
            td.members.push(vd);
        }
    }

    private addMemberPrecisionQualifier(tu: TypeUsage, member: ITypeMember): void {
        if (member.memberPrecision) {
            const q = this.qualifiers.get(member.memberPrecision);
            const qu = new QualifierUsage(member.memberPrecision, null, null, q);
            tu.qualifiers.push(qu);
        }
    }

    //
    //generic types
    //
    private loadGenericTypes(): void {
        for (const genType of genericTypes.get(this.version)) {
            const generic = genType.generic;
            const reals = new Array<string>();
            for (const real of genType.real) {
                reals.push(real);
            }
            this.genericTypes.set(generic, reals);
        }
    }

    //
    //constructors
    //
    private addConstructors(): void {
        for (const [name, td] of this.types) {
            if (!td.isOpaque()) {
                this.functionSummaries.set(name, new FunctionInfo(name, null, ShaderStage.DEFAULT, true, ''));
                const ctors = ConstructorProcessor.getConstructors(td, this.types);
                for (const ctor of ctors) {
                    this.functions.push(ctor);
                }
            }
        }
    }

    //
    //variables
    //
    private loadVariables(): void {
        for (const variable of variables.get(this.version)) {
            const array = variable.array === undefined ? Constants.INVALID : variable.array;
            const td = this.types.get(variable.type);
            const tu = Helper.createTypeUsage(variable.type, td, new ArrayUsage(array));
            this.addVariableQualifiers(tu, variable);
            const summary = this.createVariableSummary(variable, tu);
            const stage = this.getStage(variable.stage);
            const vd = Helper.createVariableDeclaration(
                variable.name,
                tu,
                false,
                false,
                summary,
                stage,
                variable.extension
            );
            this.variables.set(variable.name, vd);
        }
    }

    private createVariableSummary(variable: IVariable, tu: TypeUsage): MarkdownString {
        const mds = new MarkdownString();
        mds.appendCodeblock(`${tu.toString()} ${variable.name};`);
        mds.appendText(Constants.NEW_LINE);
        if (variable.summary) {
            mds.appendText(variable.summary);
            if (!variable.notDocumented) {
                mds.appendText(Constants.NEW_LINE);
                const parameter = encodeURIComponent(JSON.stringify(variable.name));
                mds.appendMarkdown(
                    `[Open documentation](command:${Constants.EXTENSION_NAME}.${GlslCommandProvider.OPEN_DOC}?${parameter})`
                );
                mds.isTrusted = true;
            }
        } else if (variable.min) {
            mds.appendText(`The actual value used is implementation dependent, but must be at least ${variable.min}.`);
        }
        return mds;
    }

    private addVariableQualifiers(tu: TypeUsage, variable: IVariable | IParameter): void {
        if (variable.qualifiers) {
            for (const qualifier of variable.qualifiers) {
                const q = this.qualifiers.get(qualifier);
                const qu = new QualifierUsage(qualifier, null, null, q);
                tu.qualifiers.push(qu);
            }
        }
    }

    //
    //functions
    //
    private loadFunctions(): void {
        for (const genericFunc of functions.get(this.version)) {
            for (const realFunc of GenericTypeProcessor.getFunctions(genericFunc, this.genericTypes)) {
                const td = this.types.get(realFunc.returnType);
                const tu = Helper.createTypeUsage(realFunc.returnType, td, new ArrayUsage());
                this.addReturnTypeQualifiers(realFunc, tu);
                const stage = this.getStage(realFunc.stage);
                const fp = Helper.createFunctionDeclaration(realFunc.name, tu, false, stage, realFunc.extension);
                this.addParameters(realFunc, fp);
                const lf = new LogicalFunction();
                lf.prototypes.push(fp);
                fp.logicalFunction = lf;
                this.functions.push(lf);
            }
        }
    }

    private addReturnTypeQualifiers(realFunc: IFunction, tu: TypeUsage): void {
        if (realFunc.qualifiers) {
            for (const qualifier of realFunc.qualifiers) {
                const q = this.qualifiers.get(qualifier);
                const qu = new QualifierUsage(qualifier, null, null, q);
                tu.qualifiers.push(qu);
            }
        }
    }

    private addParameters(realFunc: IFunction, fp: FunctionDeclaration): void {
        for (const parameter of realFunc.parameters) {
            const td = this.types.get(parameter.type);
            const tu = Helper.createTypeUsage(parameter.type, td, new ArrayUsage());
            const vd = Helper.createVariableDeclaration(parameter.name, tu, true, false);
            this.addVariableQualifiers(tu, parameter);
            fp.parameters.push(vd);
        }
    }

    private loadFunctionSummaries(): void {
        for (const func of functionSummaries.get(this.version)) {
            const summary = this.createFunctionSummary(func);
            const stage = this.getStage(func.stage);
            const fi = new FunctionInfo(func.name, summary, stage, false, func.extension);
            for (const funcParam of func.parameters) {
                fi.parameters.set(funcParam.name, funcParam.summary);
            }
            this.functionSummaries.set(func.name, fi);
        }
    }

    private createFunctionSummary(func: IFunctionSummary): MarkdownString {
        if (!func.summary) {
            return null;
        }
        const mds = new MarkdownString();
        mds.appendText(func.summary);
        mds.appendText(Constants.NEW_LINE);
        const parameter = encodeURIComponent(JSON.stringify(func.name));
        mds.appendMarkdown(
            `[Open documentation](command:${Constants.EXTENSION_NAME}.${GlslCommandProvider.OPEN_DOC}?${parameter})`
        );
        mds.isTrusted = true;
        return mds;
    }

    private loadImportantFunctions(): void {
        for (const func of importantFunctions) {
            this.importantFunctions.push(func);
        }
    }

    //
    //general
    //
    private getStage(stage: string): ShaderStage {
        switch (stage) {
            case 'vertex':
                return ShaderStage.VERTEX;
            case 'fragment':
                return ShaderStage.FRAGMENT;
            default:
                return ShaderStage.DEFAULT;
        }
    }

    public clone(): Builtin {
        const bi = new Builtin();
        for (const reserved of this.reservedWords) {
            bi.reservedWords.push(reserved);
        }
        for (const keyword of this.keywords) {
            bi.keywords.push(keyword);
        }
        for (const qualifier of this.qualifiers.values()) {
            bi.qualifiers.set(qualifier.name, new Qualifier(qualifier.name, qualifier.order));
        }
        for (const pd of this.preprocessor) {
            bi.preprocessor.push(pd);
        }
        for (const param of this.layoutParameters) {
            bi.layoutParameters.push(param);
        }
        for (const qualifierRule of this.qualifierRules) {
            const qr = new Set<Qualifier>();
            for (const qualifier of qualifierRule) {
                qr.add(bi.qualifiers.get(qualifier.name));
            }
            bi.qualifierRules.push(qr);
        }
        for (const [name, type] of this.types) {
            if (name === 'mat2x2' || name === 'mat3x3' || name === 'mat4x4') {
                const td = bi.types.get(type.name);
                bi.types.set(name, td);
            } else {
                const td = new TypeDeclaration(
                    type.name,
                    type.nameInterval,
                    null,
                    type.builtin,
                    type.interval,
                    type.width,
                    type.height,
                    type.typeBase,
                    type.typeCategory
                );
                for (const member of type.members) {
                    const td2 = bi.types.get(member.type.name);
                    const tu = new TypeUsage(
                        member.type.name,
                        member.type.interval,
                        member.type.nameInterval,
                        null,
                        td2,
                        member.type.array
                    );
                    for (const qu of member.type.qualifiers) {
                        const qu2 = new QualifierUsage(qu.name, qu.nameInterval, null, qu.qualifier);
                        tu.qualifiers.push(qu2);
                    }
                    const vd = new VariableDeclaration(
                        member.name,
                        member.nameInterval,
                        null,
                        member.builtin,
                        member.declarationInterval,
                        tu,
                        false,
                        false
                    );
                    td.members.push(vd);
                }
                bi.types.set(type.name, td);
            }
        }
        for (const type of this.genericTypes) {
            bi.genericTypes.set(type[0], type[1]);
        }
        for (const variable of this.variables.values()) {
            const td = bi.types.get(variable.type.name);
            const tu = new TypeUsage(
                variable.type.name,
                variable.type.interval,
                variable.type.nameInterval,
                null,
                td,
                variable.type.array
            );
            for (const qu of variable.type.qualifiers) {
                const qu2 = new QualifierUsage(qu.name, qu.nameInterval, null, qu.qualifier);
                tu.qualifiers.push(qu2);
            }
            const vd = new VariableDeclaration(
                variable.name,
                variable.nameInterval,
                null,
                variable.builtin,
                variable.declarationInterval,
                tu,
                false,
                false,
                variable.summary,
                variable.stage,
                variable.extension
            );
            bi.variables.set(variable.name, vd);
        }
        for (const olf of this.functions) {
            const ofp = olf.getDeclaration();
            const td = bi.types.get(ofp.returnType.name);
            const tu = new TypeUsage(ofp.returnType.name, null, null, null, td, ofp.returnType.array);
            for (const qualifier of ofp.returnType.qualifiers) {
                const q = bi.qualifiers.get(qualifier.name);
                const qu = new QualifierUsage(qualifier.name, null, null, q);
                tu.qualifiers.push(qu);
            }
            const fp = new FunctionDeclaration(
                ofp.name,
                ofp.nameInterval,
                null,
                tu,
                ofp.builtIn,
                ofp.ctor,
                ofp.interval,
                null,
                ofp.stage,
                ofp.extension
            );
            for (const parameter of ofp.parameters) {
                const td = bi.types.get(parameter.type.name);
                const tu = new TypeUsage(parameter.type.name, null, null, null, td, parameter.type.array);
                const vd = new VariableDeclaration(parameter.name, null, null, true, null, tu, true, false);
                for (const qualifier of parameter.type.qualifiers) {
                    const q = bi.qualifiers.get(qualifier.name);
                    const qu = new QualifierUsage(qualifier.name, null, null, q);
                    tu.qualifiers.push(qu);
                }
                fp.parameters.push(vd);
            }
            const lf = new LogicalFunction();
            lf.prototypes.push(fp);
            fp.logicalFunction = lf;
            bi.functions.push(lf);
        }
        for (const func of this.functionSummaries) {
            bi.functionSummaries.set(func[0], func[1]);
        }
        for (const func of this.importantFunctions) {
            bi.importantFunctions.push(func);
        }
        for (const macro of this.macros) {
            bi.macros.push(macro);
        }
        return bi;
    }

    public reset(): void {
        for (const qualifier of this.qualifiers.values()) {
            qualifier.usages.length = 0;
        }
        for (const type of this.types.values()) {
            type.usages.length = 0;
            type.ctorCalls.length = 0;
        }
        for (const variable of this.variables.values()) {
            variable.usages.length = 0;
        }
        for (const func of this.functions.values()) {
            func.calls.length = 0;
        }
    }

    public static get100(): Builtin {
        if (!this.builtin_100) {
            this.builtin_100 = new Builtin();
            this.builtin_100.setValues('100');
        }
        return this.builtin_100.clone();
    }

    public static get300(): Builtin {
        if (!this.builtin_300) {
            this.builtin_300 = new Builtin();
            this.builtin_300.setValues('300');
        }
        return this.builtin_300.clone();
    }
}
