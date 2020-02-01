import { TypeUsage } from '../scope/type/type-usage';
import { Helper } from './helper';
import { TypeHelper } from './old/type-helper';
import { TypeDeclarationHelper } from './type-declaration-helper';
import { Interval } from '../scope/interval';
import { GlslDocumentInfo } from '../core/glsl-document-info';
import { Scope } from '../scope/scope';
import { Type_usageContext } from '../_generated/AntlrGlslParser';

export class TypeUsageHelper {

    private static di: GlslDocumentInfo;
    private static scope: Scope;

    private static tuc: Type_usageContext;

    private static initialize(scope: Scope, di: GlslDocumentInfo): void {
        this.di = di;
        this.scope = scope;
    }

    //
    //function return type
    //
    public static getReturnType(tuc: Type_usageContext, scope: Scope, di: GlslDocumentInfo): TypeUsage {
        this.initialize(scope, di);
        this.tuc = tuc;
        const tu = this.getType(0, 0);
        //TODO: implicit precision qualifier
        return tu;
    }

    //
    //function parameter
    //
    public static getParameterType(tuc: Type_usageContext, variableArrayDepth: number, scope: Scope, di: GlslDocumentInfo): TypeUsage {
        this.initialize(scope, di);
        this.tuc = tuc;
        const tu = this.getType(0, variableArrayDepth);
        this.addImplicitParameterQualifiers(tu);
        //TODO: implicit precision qualifier
        return tu;
    }

    private static addImplicitParameterQualifiers(tu: TypeUsage): void {
        if (!tu.qualifiers.some(qu => qu.isParameterQualifier())) {
            tu.implicitQualifiers.push(this.di.builtin.qualifiers.get('in'));
        }
    }

    //
    //multiple variable declaration
    //
    public static getMemberType(tuc: Type_usageContext, variableArrayDepth: number, scope: Scope, di: GlslDocumentInfo, index: number): TypeUsage {
        this.initialize(scope, di);
        this.tuc = tuc;
        const tu = this.getType(index, variableArrayDepth);
        //TODO: implicit precision qualifier
        return tu;
    }

    //
    //general
    //
    private static getType(index: number, variableArrayDepth: number): TypeUsage {
        //TODO: array depth jelenleg szar
        if (this.tuc.type()) {
            return this.getRealType(index, variableArrayDepth);
        } else {
            return this.getStructType(index, variableArrayDepth);
        }
    }

    private static getRealType(index: number, variableArrayDepth: number): TypeUsage {
        const name = this.tuc.type().text;
        const arrayInterval = Helper.getIntervalFromParserRule(this.tuc.array_subscript());
        const nameInterval = Helper.getIntervalFromParserRule(this.tuc.type());
        const interval = Helper.getIntervalFromParserRule(this.tuc);
        //TODO: array size
        const arrayDepth = Helper.getArrayDepthFromArraySubscript(this.tuc.array_subscript()) + variableArrayDepth;
        const td = Helper.getTypeDeclaration(name, nameInterval, this.scope, this.di);
        const tu = new TypeUsage(name, interval, nameInterval, this.scope, arrayInterval, td);
        this.addQualifiers(tu);
        if (index === 0) {
            if (!tu.isVoid()) {
                this.scope.typeUsages.push(tu);
            }
            if (td) {
                td.usages.push(tu);
            }
        }
        return tu;
    }

    private static getStructType(index: number, variableArrayDepth: number): TypeUsage {
        const tdc = this.tuc.type_declaration();
        const arrayInterval = Helper.getIntervalFromParserRule(this.tuc.array_subscript());
        //TODO: array size
        const arrayDepth = Helper.getArrayDepthFromArraySubscript(this.tuc.array_subscript()) + variableArrayDepth;
        const td = TypeDeclarationHelper.getTypeDeclaration(tdc, this.scope, this.di, index);
        const tu = new TypeUsage(td.name, td.structInterval, Interval.NONE, this.scope, arrayInterval, td, true);
        this.addQualifiers(tu);
        return tu;
    }

    private static addQualifiers(tu: TypeUsage): void {
        for (const qc of this.tuc.qualifier()) {
            const qu = Helper.getQualifierUsageFromParserRule(qc, this.scope, this.di);
            if (qu) {
                tu.qualifiers.push(qu);
            }
        }
    }

}
