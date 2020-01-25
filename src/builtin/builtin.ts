import { Types, OpaqueType, CustomType, TypeMember } from './types';
import { Keywords } from './keywords';
import { Qualifiers } from './qualifiers';
import { QualifierRules } from './qualifier-rules';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { Keyword } from '../scope/keyword';
import { Qualifier } from '../scope/qualifier/qualifier';
import { TypeCategory } from '../scope/type/type-category';
import { TypeBase } from '../scope/type/type-base';
import { TypeUsage } from '../scope/type/type-usage';
import { Interval } from '../scope/interval';
import { Variables, Variable } from './variables';
import { QualifierUsage } from '../scope/qualifier/qualifier-usage';
import { ReservedWords } from './reserved-words';
import { Functions, Parameter, FunctionSummaries } from './functions';
import { MarkdownString } from 'vscode';

export class Builtin {

    private static readonly RESOURCES_PATH = '../../res';
    private static builtin_100: Builtin;
    private static builtin_300: Builtin;

    private postfix: string;

    public readonly functions = new Array<FunctionDeclaration>();
    public readonly functionSummaries = new Map<string, MarkdownString>();
    public readonly variables = new Map<string, VariableDeclaration>();
    public readonly types = new Map<string, TypeDeclaration>();
    public readonly keywords = new Array<Keyword>();
    public readonly qualifiers = new Map<string, Qualifier>();
    public readonly qualifierRules = new Array<Set<Qualifier>>();
    public readonly reservedWords = new Array<string>();

    private constructor() { }

    //
    //reserved------------------------------------------------------------------
    //
    private loadReservedWords(): void {
        const reservedWords: ReservedWords = require(this.getPath('reserved'));
        for (const reserved of reservedWords.reservedWords) {
            this.reservedWords.push(reserved);
        }
    }

    //
    //keywords------------------------------------------------------------------
    //
    private loadKeywords(): void {
        const keywords: Keywords = require(this.getPath('keywords'));
        for (const keyword of keywords.keywords) {
            this.keywords.push(new Keyword(keyword.name));
        }
    }

    //
    //qualifiers----------------------------------------------------------------
    //
    private loadQualifiers(): void {
        const qualifiers: Qualifiers = require(this.getPath('qualifiers'));
        for (const qualifier of qualifiers.qualifiers) {
            this.qualifiers.set(qualifier.name, new Qualifier(qualifier.name, qualifier.order));
        }
    }

    private loadQualifierRules(): void {
        const qualifierRules: QualifierRules = require(this.getPath('qualifier-rules'));
        for (const qualifierRule of qualifierRules.qualifierRules) {
            const qualifierSet = new Set<Qualifier>();
            for (const qualifier of qualifierRule.qualifierRule) {
                qualifierSet.add(this.qualifiers.get(qualifier));
            }
            this.qualifierRules.push(qualifierSet);
        }
    }

    //
    //types---------------------------------------------------------------------
    //
    private loadTypes(): void {
        const types: Types = require(this.getPath('types'));
        this.loadTransparentTypes(types);
        this.loadOpaqueTypes(types.floatingPointOpaque, TypeCategory.FLOATING_POINT_OPAQUE, TypeBase.FLOAT);
        this.loadOpaqueTypes(types.signedIntegerOpaque, TypeCategory.SIGNED_INTEGER_OPAQUE, TypeBase.INT);
        this.loadOpaqueTypes(types.unsignedIntegerOpaque, TypeCategory.UNSIGNED_INTEGER_OPAQUE, TypeBase.UINT);
        this.loadCustomTypes(types);
    }

    private loadTransparentTypes(types: Types): void {
        for (const type of types.transparent) {
            const tb = this.stringToTypeBase(type.base);
            const td = new TypeDeclaration(type.name, Interval.NONE, null, true, Interval.NONE, type.width, type.height, tb, TypeCategory.TRANSPARENT);
            td.summary = type.summary;
            this.types.set(type.name, td);
        }
    }

    private stringToTypeBase(str: string): TypeBase {
        switch (str) {
            case 'bool': return TypeBase.BOOL;
            case 'int': return TypeBase.INT;
            case 'uint': return TypeBase.UINT;
            case 'float': return TypeBase.FLOAT;
            default: return TypeBase.NONE;
        }
    }

    private loadOpaqueTypes(opaqueTypes: Array<OpaqueType>, typeCategory: TypeCategory, typeBase: TypeBase): void {
        for (const type of opaqueTypes) {
            const td = new TypeDeclaration(type.name, Interval.NONE, null, true, Interval.NONE, -1, -1, typeBase, typeCategory);
            this.types.set(type.name, td);
        }
    }

    private loadCustomTypes(types: Types): void {
        for (const type of types.custom) {
            const td = new TypeDeclaration(type.name, Interval.NONE, null, true, Interval.NONE, -1, -1, TypeBase.NONE, TypeCategory.CUSTOM);
            this.addMembers(td, type);
            this.types.set(type.name, td);
        }
    }

    private addMembers(td: TypeDeclaration, type: CustomType): void {
        for (const member of type.members) {
            const td2 = this.types.get(member.memberType);
            const tu = new TypeUsage(member.memberType, Interval.NONE, Interval.NONE, null, Interval.NONE, 0, td2);
            const vd = new VariableDeclaration(member.memberName, Interval.NONE, null, true, false, Interval.NONE, tu);
            this.addMemberPrecisionQualifier(tu, member);
            td.members.push(vd);
        }
    }

    private addMemberPrecisionQualifier(tu: TypeUsage, member: TypeMember): void {
        if (member.memberPrecision) {
            const q = this.qualifiers.get(member.memberPrecision);
            const qu = new QualifierUsage(member.memberPrecision, Interval.NONE, null, q);
            tu.qualifiers.push(qu);
        }
    }

    //
    //variables-----------------------------------------------------------------
    //
    private loadVariables(): void {
        const variables: Variables = require(this.getPath('variables'));
        for (const variable of variables.variables) {
            const array = variable.array ?? 0;
            const td = this.types.get(variable.type);
            const tu = new TypeUsage(variable.type, Interval.NONE, Interval.NONE, null, Interval.NONE, array, td);
            const vd = new VariableDeclaration(variable.name, Interval.NONE, null, true, true, Interval.NONE, tu);
            this.addVariableQualifiers(tu, variable);
            vd.summary = this.createVariableSummary(variable, vd);
            this.variables.set(variable.name, vd);
        }
    }

    private createVariableSummary(variable: Variable, vd: VariableDeclaration): MarkdownString {
        const mds = new MarkdownString(vd.toStringDocumentation());
        mds.appendText('\r\n');
        mds.appendText(`${variable.name} — `);
        if (variable.summary) {
            mds.appendText(variable.summary);
        } else if (variable.customSummary) {
            mds.appendText(variable.customSummary);
        } else if (variable.min) {
            mds.appendText(`the actual value used is implementation dependent, but must be at least ${variable.min}`);
        } else {
            mds.appendText('documentation is not available');
        }
        mds.appendText('\r\n');
        if (variable.summary) {
            mds.appendMarkdown(`[Open documentation](command:webglglsleditor.opendoc?${encodeURIComponent(JSON.stringify(variable.name))})`);
            mds.isTrusted = true;
        }
        return mds;
    }

    private addVariableQualifiers(tu: TypeUsage, variable: Variable | Parameter): void {
        if (variable.qualifiers) {
            for (const qualifier of variable.qualifiers) {
                const q = this.qualifiers.get(qualifier);
                const qu = new QualifierUsage(qualifier, Interval.NONE, null, q);
                tu.qualifiers.push(qu);
            }
        }
    }

    //
    //functions-----------------------------------------------------------------
    //
    private loadFunctions(): void {
        const functions: Functions = require(this.getPath('functions'));
        for (const func of functions.functions) {
            const td = this.types.get(func.returnType);
            const tu = new TypeUsage(func.returnType, Interval.NONE, Interval.NONE, null, Interval.NONE, 0, td);
            if (func.qualifiers) {
                for (const qualifier of func.qualifiers) {
                    const q = this.qualifiers.get(qualifier);
                    const qu = new QualifierUsage(qualifier, Interval.NONE, null, q);
                    tu.qualifiers.push(qu);
                }
            }
            const fp = new FunctionDeclaration(func.name, Interval.NONE, null, tu, true, false, Interval.NONE, Interval.NONE);
            for (const parameter of func.parameters) {
                const td = this.types.get(parameter.type);
                const tu = new TypeUsage(parameter.type, Interval.NONE, Interval.NONE, null, Interval.NONE, 0, td);
                const vd = new VariableDeclaration(parameter.name, Interval.NONE, null, true, true, Interval.NONE, tu);
                this.addVariableQualifiers(tu, parameter);
                fp.parameters.push(vd);
            }
            this.functions.push(fp);
        }
    }

    private loadFunctionSummaries(): void {
        const functions: FunctionSummaries = require(this.getPath('function_summaries'));
        for (const func of functions.functions) {
            const summary = this.createFunctionSummary(func.name, func.summary);
            this.functionSummaries.set(func.name, summary);
        }
    }

    private createFunctionSummary(name: string, summary: string): MarkdownString {
        const mds = new MarkdownString();
        mds.appendText(`${name} — `);
        if (summary) {
            mds.appendText(summary);
        } else {
            mds.appendText('documentation is not available');
        }
        mds.appendText('\r\n');
        if (summary) {
            mds.appendMarkdown(`[Open documentation](command:webglglsleditor.opendoc?${encodeURIComponent(JSON.stringify(name))})`);
            mds.isTrusted = true;
        }
        return mds;
    }


    //
    //
    //

    public setValues(postfix: string) {
        this.postfix = postfix;
        this.loadReservedWords();
        this.loadKeywords();
        this.loadQualifiers();
        this.loadQualifierRules();
        this.loadTypes();
        this.loadVariables();
        this.loadFunctions();
        this.loadFunctionSummaries();
    }

    private getPath(name: string): string {
        return `${Builtin.RESOURCES_PATH}/${name}_${this.postfix}.json`;
    }

    public createNewInstance(): Builtin {
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
        for (const qualifierRule of this.qualifierRules) {
            const qr = new Set<Qualifier>();
            for (const qualifier of qualifierRule) {
                qr.add(bi.qualifiers.get(qualifier.name));
            }
            bi.qualifierRules.push(qr);
        }
        for (const type of this.types.values()) {
            const td = new TypeDeclaration(type.name, type.nameInterval, null, type.builtin, type.structInterval, type.width, type.height, type.typeBase, type.typeCategory);
            for (const member of type.members) {
                const td2 = bi.types.get(member.type.name);
                const tu = new TypeUsage(member.type.name, member.type.interval, member.type.nameInterval, null, member.type.arrayInterval, member.type.arrayDepth, td2);
                for (const qu of member.type.qualifiers) {
                    const qu2 = new QualifierUsage(qu.name, qu.nameInterval, null, qu.qualifier);
                    tu.qualifiers.push(qu2);
                }
                const vd = new VariableDeclaration(member.name, member.nameInterval, null, member.builtin, member.global, member.declarationInterval, tu);
                td.members.push(vd);
            }
            td.summary = type.summary;
            bi.types.set(type.name, td);
        }
        for (const variable of this.variables.values()) {
            const td = bi.types.get(variable.type.name);
            const tu = new TypeUsage(variable.type.name, variable.type.interval, variable.type.nameInterval, null, variable.type.arrayInterval, variable.type.arrayDepth, td);
            for (const qu of variable.type.qualifiers) {
                const qu2 = new QualifierUsage(qu.name, qu.nameInterval, null, qu.qualifier);
                tu.qualifiers.push(qu2);
            }
            const vd = new VariableDeclaration(variable.name, variable.nameInterval, null, variable.builtin, variable.global, variable.declarationInterval, tu);
            vd.summary = variable.summary;
            bi.variables.set(variable.name, vd);
        }
        for (const func of this.functions) {
            const td = this.types.get(func.returnType.name);
            const tu = new TypeUsage(func.returnType.name, Interval.NONE, Interval.NONE, null, Interval.NONE, 0, td);
            for (const qualifier of func.returnType.qualifiers) {
                const q = this.qualifiers.get(qualifier.name);
                const qu = new QualifierUsage(qualifier.name, Interval.NONE, null, q);
                tu.qualifiers.push(qu);
            }
            const fp = new FunctionDeclaration(func.name, func.nameInterval, null, tu, func.builtIn, func.ctor, func.interval, func.signatureInterval);
            for (const parameter of func.parameters) {
                const td = this.types.get(parameter.type.name);
                const tu = new TypeUsage(parameter.type.name, Interval.NONE, Interval.NONE, null, Interval.NONE, 0, td);
                const vd = new VariableDeclaration(parameter.name, Interval.NONE, null, true, true, Interval.NONE, tu);
                for (const qualifier of parameter.type.qualifiers) {
                    const q = this.qualifiers.get(qualifier.name);
                    const qu = new QualifierUsage(qualifier.name, Interval.NONE, null, q);
                    tu.qualifiers.push(qu);
                }
                fp.parameters.push(vd);
            }
            bi.functions.push(fp);
        }
        for (const func of this.functionSummaries) {
            bi.functionSummaries.set(func[0], func[1]);
        }
        return bi;
    }

    public reset(): void {
        for (const qualifier of this.qualifiers.values()) {
            qualifier.usages.length = 0;
        }
        for (const type of this.types.values()) {
            type.usages.length = 0;
        }
        for (const variable of this.variables.values()) {
            variable.usages.length = 0;
        }
    }


    public static get100(): Builtin {
        if (!this.builtin_100) {
            this.builtin_100 = new Builtin();
            this.builtin_100.setValues('100');
        }
        return this.builtin_100.createNewInstance();
    }

    public static get300(): Builtin {
        if (!this.builtin_300) {
            this.builtin_300 = new Builtin();
            this.builtin_300.setValues('300');
        }
        return this.builtin_300.createNewInstance();
    }

}