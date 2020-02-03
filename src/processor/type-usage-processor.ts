import { TypeUsage } from '../scope/type/type-usage';
import { Helper } from './helper';
import { TypeDeclarationProcessor } from './type-declaration-processor';
import { Interval } from '../scope/interval';
import { DocumentInfo } from '../core/document-info';
import { Scope } from '../scope/scope';
import { Type_usageContext, QualifierContext } from '../_generated/AntlrGlslParser';
import { QualifierUsage } from '../scope/qualifier/qualifier-usage';

export class TypeUsageProcessor {

    private static di: DocumentInfo;
    private static scope: Scope;

    private static tuc: Type_usageContext;

    private static initialize(scope: Scope, di: DocumentInfo): void {
        this.di = di;
        this.scope = scope;
    }

    //
    //function return type
    //
    public static getReturnType(tuc: Type_usageContext, scope: Scope, di: DocumentInfo): TypeUsage {
        this.initialize(scope, di);
        this.tuc = tuc;
        const tu = this.getType(0, new Array<number>());
        //TODO: implicit precision qualifier
        return tu;
    }

    //
    //function parameter
    //
    public static getParameterType(tuc: Type_usageContext, variableArraySize: Array<number>, scope: Scope, di: DocumentInfo): TypeUsage {
        this.initialize(scope, di);
        this.tuc = tuc;
        const tu = this.getType(0, variableArraySize);
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
    public static getMemberType(tuc: Type_usageContext, variableArraySize: Array<number>, scope: Scope, di: DocumentInfo, index: number): TypeUsage {
        this.initialize(scope, di);
        this.tuc = tuc;
        const tu = this.getType(index, variableArraySize);
        //TODO: implicit precision qualifier
        return tu;
    }

    //
    //general
    //
    private static getType(index: number, variableArraySize: Array<number>): TypeUsage {
        if (this.tuc.type()) {
            return this.getRealType(index, variableArraySize);
        } else {
            return this.getStructType(index, variableArraySize);
        }
    }

    private static getRealType(index: number, variableArraySize: Array<number>): TypeUsage {
        const name = this.tuc.type().text;
        const arrayInterval = Helper.getIntervalFromParserRule(this.tuc.array_subscript());
        const nameInterval = Helper.getIntervalFromParserRule(this.tuc.type());
        const interval = Helper.getIntervalFromParserRule(this.tuc);
        const arraySize = Helper.getArraySizeFromArraySubscript(this.tuc.array_subscript()).concat(variableArraySize);
        const td = TypeDeclarationProcessor.getTypeDeclarationFrom(name, nameInterval, this.scope, this.di);
        const tu = new TypeUsage(name, interval, nameInterval, this.scope, arrayInterval, td, arraySize);
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

    private static getStructType(index: number, variableArraySize: Array<number>): TypeUsage {
        const tdc = this.tuc.type_declaration();
        const arrayInterval = Helper.getIntervalFromParserRule(this.tuc.array_subscript());
        const arraySize = Helper.getArraySizeFromArraySubscript(this.tuc.array_subscript()).concat(variableArraySize);
        const td = TypeDeclarationProcessor.getTypeDeclaration(tdc, this.scope, this.di, index);
        const tu = new TypeUsage(td.name, td.structInterval, Interval.NONE, this.scope, arrayInterval, td, arraySize, true);
        this.addQualifiers(tu);
        return tu;
    }

    private static addQualifiers(tu: TypeUsage): void {
        for (const qc of this.tuc.qualifier()) {
            const qu = this.getQualifierUsage(qc, this.scope);
            if (qu) {
                tu.qualifiers.push(qu);
            }
        }
    }

    private static getQualifierUsage(qc: QualifierContext, scope: Scope): QualifierUsage {
        const name = qc.text;
        const nameInterval = Helper.getIntervalFromParserRule(qc);
        const q = this.di.builtin.qualifiers.get(name);
        const qu = new QualifierUsage(name, nameInterval, scope, q);
        if (q) {
            q.usages.push(qu);
        }
        return qu;
    }

}
