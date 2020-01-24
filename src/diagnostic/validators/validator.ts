import { GlslDocumentInfo } from '../../core/glsl-document-info';
import { FunctionValidator } from './function-validator';
import { DeclarationValidator } from './declaration-validator';

export class Validator {

    public static validate(di: GlslDocumentInfo): void {
        FunctionValidator.validateFunctions(di);
        DeclarationValidator.validateTypeDeclarations(di.getRootScope(), di);
    }

}