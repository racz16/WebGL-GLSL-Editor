import { DocumentInfo } from '../../core/document-info';
import { FunctionValidator } from './function-validator';
import { DeclarationValidator } from './declaration-validator';

export class Validator {

    public static validate(di: DocumentInfo): void {
        FunctionValidator.validateFunctions(di);
        DeclarationValidator.validateTypeDeclarations(di.getRootScope(), di);
    }

}