import { GlslDocumentInfo } from '../../core/glsl-document-info';
import { VariableDeclaration } from '../../scope/variable/variable-declaration';
import { DiagnosticSeverity, DiagnosticTag } from 'vscode';
import { DiagnosticExtension } from '../diagnostic-extension';
import { UniqueDiagnostic } from '../unique-diagnostic';
import { Interval } from '../../scope/interval';
import { GeneralValidator } from './general-validator';
import { TypeUsageValidator } from './type-usage-validator';
import { Scope } from '../../scope/scope';
import { TypeDeclaration } from '../../scope/type/type-declaration';

export class DeclarationValidator {

    private static di: GlslDocumentInfo;

    //
    //function parameter declaration
    //
    public static validateParameter(vd: VariableDeclaration, di: GlslDocumentInfo): void {
        this.di = di;
        //TODO: nem lehet inicializálva
        TypeUsageValidator.validateParameterType(vd.type, di);
        GeneralValidator.validateIdentifier(vd, this.di);
    }

    //
    //struct member
    //
    public static validateMember(vd: VariableDeclaration, di: GlslDocumentInfo): void {
        this.di = di;
        //TODO: nem lehet inicializálva
        TypeUsageValidator.validateMemberType(vd.type, di);
        GeneralValidator.validateIdentifier(vd, di);
        if (vd.name === null) {
            this.addError(DiagnosticSeverity.Error, 'Struct member has no name', vd.declarationInterval);
        }
    }

    //
    //type declarations
    //
    public static validateTypeDeclarations(scope: Scope, di: GlslDocumentInfo): void {
        this.di = di;
        for (const td of scope.typeDeclarations) {
            this.validateTypeDeclaration(td, di);
        }
    }

    public static validateTypeDeclaration(td: TypeDeclaration, di: GlslDocumentInfo): void {
        this.di = di;
        GeneralValidator.validateIdentifier(td, this.di);
        for (const vd of td.members) {
            this.validateMember(vd, di);
        }
        if (td.members.length === 0) {
            this.addError(DiagnosticSeverity.Error, `Struct '${td.name}' has no members`, td.nameInterval);
        }
    }

    private static addError(severity: DiagnosticSeverity, message: string, interval: Interval, errorCode?: string, tag?: DiagnosticTag, ...extensions: Array<DiagnosticExtension>): void {
        this.di.errors.push(new UniqueDiagnostic(severity, message, interval, errorCode, tag, extensions));
    }

}