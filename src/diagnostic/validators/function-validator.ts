import { DiagnosticSeverity, DiagnosticTag } from 'vscode';
import { DocumentInfo } from '../../core/document-info';
import { FunctionDeclaration } from '../../scope/function/function-declaration';
import { DiagnosticExtension } from '../diagnostic-extension';
import { UniqueDiagnostic } from '../unique-diagnostic';
import { Interval } from '../../scope/interval';
import { GeneralValidator } from './general-validator';
import { TypeUsageValidator } from './type-usage-validator';
import { DeclarationValidator } from './declaration-validator';

export class FunctionValidator {

    //TODO:
    //a tömb belsejére meghívni a visitort
    //warning, ha a default precision-re állítjuk a qualifier-t
    //beépített függvényeket ne lehessen overloadolni
    //konstruktorok (beépített és felhasználói struct-ok, primitív típusok)
    //tömb méretét fordítási időben meg kell adni
    //rekurzió (explicit és DAG)
    //void esetén nem lehet return érték;
    //nem void esetén mindenképpen térjünk vissza és meglfelelő típussal
    //függvényhívások

    private static di: DocumentInfo;
    private static fd: FunctionDeclaration;
    private static mainExists: boolean;

    public static validateFunctions(di: DocumentInfo): void {
        this.di = di;
        for (const fp of di.getRootScope().functionPrototypes) {
            this.validateFunction(fp);
        }
        this.mainExists = false;
        for (const fd of di.getRootScope().functionDefinitions) {
            this.validateFunction(fd);
        }
        if (!this.mainExists) {
            this.addError(DiagnosticSeverity.Error,
                'There is no main function in this shader. ' +
                'Every shader has to contain a main function with void return type and no parameters. ' +
                'The main function is not overloadable.',
                new Interval(0, 0));
        }
    }

    private static validateFunction(fd: FunctionDeclaration): void {
        this.fd = fd;
        this.validateMain();
        TypeUsageValidator.validateReturnType(this.fd.returnType, this.di);
        GeneralValidator.validateIdentifier(this.fd, this.di);
        this.validateParameters();
        this.validateConnection();
    }

    private static validateMain(): void {
        if (this.fd.name === 'main') {
            this.mainExists = true;
            if (this.fd.parameters.length > 0) {
                this.addError(DiagnosticSeverity.Error, `The main function has parameters`, this.fd.nameInterval, 'S0029');
            }
            if (!this.fd.returnType.isVoid()) {
                this.addError(DiagnosticSeverity.Error, `The main function's return type '${this.fd.returnType.name}' isn't void`, this.fd.returnType.interval, 'S0029');
            }
        }
    }

    private static validateParameters(): void {
        for (const vd of this.fd.parameters) {
            DeclarationValidator.validateParameter(vd, this.di);
        }
    }

    private static validateConnection(): void {
        for (const fp of this.fd.logicalFunction.prototypes) {
            this.validateWithOtherFunction(fp);
        }
        for (const fd of this.fd.logicalFunction.definitions) {
            this.validateWithOtherFunction(fd);
        }
    }

    private static validateWithOtherFunction(fd: FunctionDeclaration): void {
        if (fd !== this.fd) {
            if (this.fd.returnType.declaration !== fd.returnType.declaration ||
                !this.fd.returnType.areArrayDimensionsMatch(fd.returnType)) {
                this.addError(DiagnosticSeverity.Error, `Not all declarations of function '${this.fd.name}' has the same return type`, this.fd.nameInterval);
            }
            for (let i = 0; i < this.fd.parameters.length; i++) {
                const p = this.fd.parameters[i];
                const p2 = fd.parameters[i];
                if (!p.type.qualifiersEqualsExceptPrecisionWith(p2.type)) {
                    this.addError(DiagnosticSeverity.Error, `Not all declarations of this parameter has the same const and parameter qualifiers`, p.declarationInterval);
                }
            }
        }
    }

    private static addError(severity: DiagnosticSeverity, message: string, interval: Interval, errorCode?: string, tag?: DiagnosticTag, ...extensions: Array<DiagnosticExtension>): void {
        this.di.errors.push(new UniqueDiagnostic(severity, message, interval, errorCode, tag, extensions));
    }

}
