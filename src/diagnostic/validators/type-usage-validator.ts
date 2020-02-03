import { TypeUsage } from '../../scope/type/type-usage';
import { DocumentInfo } from '../../core/document-info';
import { DiagnosticSeverity, DiagnosticTag } from 'vscode';
import { DiagnosticExtension } from '../diagnostic-extension';
import { UniqueDiagnostic } from '../unique-diagnostic';
import { Interval } from '../../scope/interval';
import { TypeBase } from '../../scope/type/type-base';
import { TypeCategory } from '../../scope/type/type-category';
import { QualifierUsage } from '../../scope/qualifier/qualifier-usage';
import { DeclarationValidator } from './declaration-validator';

export class TypeUsageValidator {

    private static tu: TypeUsage;
    private static di: DocumentInfo;

    private static initialize(tu: TypeUsage, di: DocumentInfo): void {
        this.tu = tu;
        this.di = di;
    }

    //
    //return type
    //
    public static validateReturnType(tu: TypeUsage, di: DocumentInfo): void {
        this.initialize(tu, di);
        this.validateType();
        if (tu.declaration && tu.declaration.isOpaque()) {
            this.addError(DiagnosticSeverity.Error, `Return type '${tu.name}' is an opaque type`, tu.nameInterval);
        }
        if (tu.isVoid() && tu.isArray()) {
            this.addError(DiagnosticSeverity.Error, `Return type '${tu.toString()}' contains array declaration(s)`, tu.nameInterval);
        }
        if (di.isGlsl100es() && tu.isArray()) {
            this.addError(DiagnosticSeverity.Error, `Return type '${tu.toString()}' is an array`, tu.interval, 'S0041');
        }
        if (di.isGlsl100es() && tu.declaration && tu.declaration.containsArrayDeclaration()) {
            this.addError(DiagnosticSeverity.Error, `Return type '${tu.toString()}' contains array declaration(s)`, tu.interval);
        }
        this.validateReturnTypeQualifiers();
    }

    private static validateReturnTypeQualifiers(): void {
        if (this.tu.isVoid() && this.tu.qualifiers.length > 0) {
            this.addError(DiagnosticSeverity.Error, `Qualifier(s) used with 'void' return type`, this.tu.interval);
        }
        for (let i = 0; i < this.tu.qualifiers.length; i++) {
            const qu = this.tu.qualifiers[i];
            this.validateQualifier(qu);
            if (!qu.isPrecisionQualifier()) {
                this.addError(DiagnosticSeverity.Error, `Qualifier '${qu.name}' used before a function return type`, qu.nameInterval);
            }
            this.validateReturnTypeQualifierWithOtherQualifiers(qu, i);
        }
    }

    private static validateReturnTypeQualifierWithOtherQualifiers(qu: QualifierUsage, i: number): void {
        for (let i2 = 0; i2 < this.tu.qualifiers.length; i2++) {
            const qu2 = this.tu.qualifiers[i2];
            this.validateQualifierWithOtherQualifiers(qu, i, qu2, i2);
        }
    }



    //
    //function parameter
    //
    public static validateParameterType(tu: TypeUsage, di: DocumentInfo): void {
        this.initialize(tu, di);
        this.validateType();
        if (tu.inlineStructDeclaration) {
            this.addError(DiagnosticSeverity.Error, `Parameter type is an inline struct`, tu.interval);
        }
        this.validateParameterQualifiers();
    }

    private static validateParameterQualifiers(): void {
        for (let i = 0; i < this.tu.qualifiers.length; i++) {
            const qu = this.tu.qualifiers[i];
            this.validateQualifier(qu);
            if ((qu.name === 'out' || qu.name === 'inout') && this.tu.declaration && this.tu.declaration.isOpaque()) {
                this.addError(DiagnosticSeverity.Error, `Opaque type '${this.tu.name}' has '${qu.name}' qualifier`, this.tu.nameInterval);
            }
            if (!qu.isConstQualifier() && !qu.isParameterQualifier() && !qu.isPrecisionQualifier()) {
                this.addError(DiagnosticSeverity.Error, `Qualifier '${qu.name}' used before a function parameter type`, qu.nameInterval);
            }
            this.validateParameterQualifierWithOtherQualifiers(qu, i);
        }
    }

    private static validateParameterQualifierWithOtherQualifiers(qu: QualifierUsage, i: number): void {
        for (let i2 = 0; i2 < this.tu.qualifiers.length; i2++) {
            const qu2 = this.tu.qualifiers[i2];
            this.validateQualifierWithOtherQualifiers(qu, i, qu2, i2);
        }
    }



    //
    //member type
    //
    public static validateMemberType(tu: TypeUsage, di: DocumentInfo): void {
        this.initialize(tu, di);
        this.validateType();
        this.validateMemberQualifiers();
        if (tu.inlineStructDeclaration) {
            this.addError(DiagnosticSeverity.Error, `Member type is an inline struct`, tu.interval);
        }
    }

    private static validateMemberQualifiers(): void {
        for (let i = 0; i < this.tu.qualifiers.length; i++) {
            const qu = this.tu.qualifiers[i];
            this.validateQualifier(qu);
            if (!qu.isPrecisionQualifier()) {
                this.addError(DiagnosticSeverity.Error, `Qualifier '${qu.name}' is not a precision qualifier`, qu.nameInterval);
            }
            this.validateMemberQualifierWithOtherQualifiers(qu, i);
        }
    }

    private static validateMemberQualifierWithOtherQualifiers(qu: QualifierUsage, i: number): void {
        for (let i2 = 0; i2 < this.tu.qualifiers.length; i2++) {
            const qu2 = this.tu.qualifiers[i2];
            this.validateQualifierWithOtherQualifiers(qu, i, qu2, i2);
        }
    }

    //
    //general
    //
    private static validateType(): void {
        if (this.tu.inlineStructDeclaration) {
            DeclarationValidator.validateTypeDeclaration(this.tu.declaration, this.di);
        }
        //TODO: itt ellenőrizni, hogy az arraysize >=1 és constant expression vagy a  feldolgozáskor?
        if (!this.tu.declaration && !this.tu.isVoid()) {
            this.addError(DiagnosticSeverity.Error, `Type '${this.tu.name}' is undeclared or hidden`, this.tu.nameInterval);
        }
        if (this.tu.isMultidimensionalArray()) {
            this.addError(DiagnosticSeverity.Error, `Type '${this.tu.toString()}' is a multidimensional array`, this.tu.interval);
        }
    }

    private static validateQualifier(qu: QualifierUsage): void {
        if (qu.isPrecisionQualifier() && this.tu.declaration &&
            (this.tu.declaration.typeBase === TypeBase.BOOL || this.tu.declaration.typeCategory === TypeCategory.CUSTOM)) {
            const type = this.tu.declaration.typeBase === TypeBase.BOOL ? 'bool' : 'struct';
            this.addError(DiagnosticSeverity.Error, `Precision qualifier '${qu.name}' used with ${type} type '${this.tu.name}'`, qu.nameInterval, 'S0028');
        }
    }

    private static validateQualifierWithOtherQualifiers(qu: QualifierUsage, i: number, qu2: QualifierUsage, i2: number): void {
        if (i !== i2 && !qu.qualifier.isCompatibleWith(qu2.qualifier, this.di)) {
            const extension = new DiagnosticExtension(qu2.nameInterval, `'${qu2.name}' qualifier`);
            this.addError(DiagnosticSeverity.Error, `Qualifier '${qu.name}' used togeather with qualifier '${qu2.name}'`, qu.nameInterval, '', null, extension);
        } else if (i < i2 && qu.qualifier.order > qu2.qualifier.order) {
            this.addError(DiagnosticSeverity.Error, `Qualifier '${qu.name}' appears before qualifier '${qu2.name}'`, qu.nameInterval);
        } else if (i > i2 && qu.qualifier.order < qu2.qualifier.order) {
            this.addError(DiagnosticSeverity.Error, `Qualifier '${qu.name}' appears after qualifier '${qu2.name}'`, qu.nameInterval);
        }
    }

    private static addError(severity: DiagnosticSeverity, message: string, interval: Interval, errorCode?: string, tag?: DiagnosticTag, ...extensions: Array<DiagnosticExtension>): void {
        this.di.errors.push(new UniqueDiagnostic(severity, message, interval, errorCode, tag, extensions));
    }

}
