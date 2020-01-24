import { Interval } from '../../scope/interval';
import { GlslDocumentInfo } from '../../core/glsl-document-info';
import { DiagnosticSeverity, DiagnosticTag } from 'vscode';
import { DiagnosticExtension } from '../diagnostic-extension';
import { UniqueDiagnostic } from '../unique-diagnostic';
import { Element } from '../../scope/element';

export class GeneralValidator {

    private static di: GlslDocumentInfo;
    private static element: Element;

    private static initialize(element: Element, di: GlslDocumentInfo): void {
        this.di = di;
        this.element = element;
    }

    public static validateIdentifier(element: Element, di: GlslDocumentInfo): void {
        this.initialize(element, di);
        const identifier = element.name;
        if (identifier) {
            if (identifier.startsWith('__')) {
                this.addError(DiagnosticSeverity.Warning, `Identifier '${identifier}' starts with '__'`, element.nameInterval);
            }
            if (identifier.startsWith('gl_')) {
                this.addError(DiagnosticSeverity.Error, `Identifier '${identifier}' starts with 'gl_'`, element.nameInterval);
            }
            if (identifier.length > 1024) {
                this.addError(DiagnosticSeverity.Error, `The length of identifier '${identifier}' is greater than 1024`, element.nameInterval);
            }
            if (di.builtin.reservedWords.includes(identifier)) {
                this.addError(DiagnosticSeverity.Error, `Identifier '${identifier}' is a reserved word`, element.nameInterval);
            }
            this.validateIdentifierDuplication();
        }
    }

    private static validateIdentifierDuplication(): void {
        this.validateIdentifierDuplicationWithOthers(this.element.scope.typeDeclarations);
        this.validateIdentifierDuplicationWithOthers(this.element.scope.variableDeclarations);
        if (this.element.scope.isGlobal()) {
            this.validateIdentifierDuplicationWithOthers(this.di.functionPrototypes);
            this.validateIdentifierDuplicationWithOthers(this.di.functionDefinitions);
        }
    }

    private static validateIdentifierDuplicationWithOthers(elements: Array<Element>): void {
        for (const element2 of elements) {
            if (this.element.isDuplicateOf(element2, this.di)) {
                this.addError(DiagnosticSeverity.Error, `Identifier '${this.element.name}' is declared multiple times`, this.element.nameInterval);
            }
        }
    }

    private static addError(severity: DiagnosticSeverity, message: string, interval: Interval, errorCode?: string, tag?: DiagnosticTag, ...extensions: Array<DiagnosticExtension>): void {
        this.di.errors.push(new UniqueDiagnostic(severity, message, interval, errorCode, tag, extensions));
    }

}
