import { TypeUsage } from '../scope/type/type-usage';
import { Helper } from './helper';
import { TypeDeclarationProcessor } from './type-declaration-processor';
import { DocumentInfo } from '../core/document-info';
import { Scope } from '../scope/scope';
import { Type_usageContext, QualifierContext, Interface_block_declarationContext, TypeContext } from '../_generated/AntlrGlslParser';
import { QualifierUsage } from '../scope/qualifier/qualifier-usage';
import { ArrayUsage } from '../scope/array-usage';
import { SemanticElement, SemanticType } from '../scope/semantic-element';
import { Token } from 'antlr4ts';

export class TypeUsageProcessor {

    private di: DocumentInfo;
    private scope: Scope;

    private tuc: Type_usageContext;

    private initialize(scope: Scope, di: DocumentInfo, tuc: Type_usageContext): void {
        this.di = di;
        this.scope = scope;
        this.tuc = tuc;
    }

    //
    //function return type
    //
    public getReturnType(tuc: Type_usageContext, scope: Scope, di: DocumentInfo): TypeUsage {
        this.initialize(scope, di, tuc);
        const tu = this.getType(0, new ArrayUsage());
        return tu;
    }

    //
    //function parameter
    //
    public getParameterType(tuc: Type_usageContext, variableArray: ArrayUsage, scope: Scope, di: DocumentInfo): TypeUsage {
        this.initialize(scope, di, tuc);
        const tu = this.getType(0, variableArray);
        this.addImplicitParameterQualifiers(tu);
        return tu;
    }

    private addImplicitParameterQualifiers(tu: TypeUsage): void {
        if (!tu.qualifiers.some(qu => qu.isParameterQualifier())) {
            tu.implicitQualifiers.push(this.di.builtin.qualifiers.get('in'));
        }
    }

    //
    //interface block
    //
    public getInterfaceBlockType(ibdc: Interface_block_declarationContext, scope: Scope, di: DocumentInfo): TypeUsage {
        this.di = di;
        this.scope = scope;
        const array = ibdc.identifier_optarray() ? Helper.getArraySizeFromIdentifierOptarray(ibdc.identifier_optarray(), this.scope, this.di) : null;
        const ibd = new TypeDeclarationProcessor().getInterfaceBlockDeclaration(ibdc, this.scope, this.di);
        const tu = new TypeUsage(ibd.name, ibd.interval, null, this.scope, ibd, array, true);
        this.addQualifiers(tu, ibdc.qualifier());
        return tu;
    }

    //
    //multiple variable declaration
    //
    public getMemberType(tuc: Type_usageContext, variableArray: ArrayUsage, scope: Scope, di: DocumentInfo, index: number): TypeUsage {
        this.initialize(scope, di, tuc);
        const tu = this.getType(index, variableArray);
        return tu;
    }

    //
    //general
    //
    private getType(index: number, variableArray: ArrayUsage): TypeUsage {
        if (this.tuc.type()) {
            return this.getRealType(index, variableArray);
        } else {
            return this.getStructType(index, variableArray);
        }
    }

    private getRealType(index: number, variableArray: ArrayUsage): TypeUsage {
        const name = this.tuc.type().text;
        const nameInterval = Helper.getIntervalFromParserRule(this.tuc.type());
        const interval = Helper.getIntervalFromParserRule(this.tuc);
        const au = Helper.getArraySizeFromArraySubscript(this.tuc.array_subscript(), this.scope, this.di).mergeArrays(variableArray);
        const td = TypeDeclarationProcessor.searchTypeDeclaration(name, nameInterval, this.scope, this.di);
        const tu = new TypeUsage(name, interval, nameInterval, this.scope, td, au);
        const token = this.getToken(this.tuc.type());
        if ((!td || (td && !td.builtin)) && token) {
            this.di.semanticElements.push(new SemanticElement(token, SemanticType.TYPE, this.di));
        }
        this.addQualifiers(tu, this.tuc.qualifier());
        if (index === 0) {
            this.scope.typeUsages.push(tu);
            if (td) {
                td.usages.push(tu);
            }
        }
        return tu;
    }

    private getToken(tc: TypeContext): Token {
        if (tc.TYPE()) {
            return tc.TYPE().symbol;
        } else if (tc.IDENTIFIER()) {
            return tc.IDENTIFIER().symbol;
        } else {
            return null;
        }
    }

    private getStructType(index: number, variableArray: ArrayUsage): TypeUsage {
        const tdc = this.tuc.type_declaration();
        const au = Helper.getArraySizeFromArraySubscript(this.tuc.array_subscript(), this.scope, this.di).mergeArrays(variableArray);
        const td = new TypeDeclarationProcessor().getTypeDeclaration(tdc, this.scope, this.di, index);
        const tu = new TypeUsage(td.name, td.interval, null, this.scope, td, au, true);
        this.addQualifiers(tu, this.tuc.qualifier());
        return tu;
    }

    private addQualifiers(tu: TypeUsage, qualifiers: Array<QualifierContext>): void {
        for (const qc of qualifiers) {
            const qu = this.getQualifierUsage(qc, this.scope);
            if (qu) {
                tu.qualifiers.push(qu);
            }
        }
    }

    private getQualifierUsage(qc: QualifierContext, scope: Scope): QualifierUsage {
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
