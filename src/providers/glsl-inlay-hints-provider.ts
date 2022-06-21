import { CancellationToken, InlayHint, InlayHintKind, InlayHintsProvider, ProviderResult, Range, TextDocument } from "vscode";
import { DocumentInfo } from "../core/document-info";
import { GlslEditor } from "../core/glsl-editor";
import { FunctionCall } from "../scope/function/function-call";
import { FunctionDeclaration } from "../scope/function/function-declaration";
import { Scope } from "../scope/scope";

export class GlslInlayHintsProvider implements InlayHintsProvider {

    private di: DocumentInfo;
    private range: Range;
    private result: Array<InlayHint>;

    private initialize(document: TextDocument, range: Range): void {
        GlslEditor.processElements(document);
        this.range = range;
        this.di = GlslEditor.getDocumentInfo(document.uri);
        this.result = new Array<InlayHint>();
    }

    public provideInlayHints(document: TextDocument, range: Range, token: CancellationToken): ProviderResult<InlayHint[]> {
        if (!GlslEditor.CONFIGURATIONS.getInlayHints()) {
            return null;
        }
        this.initialize(document, range);
        this.addHintsFromScope(this.di.getRootScope());
        return this.result;
    }

    private addHintsFromScope(scope: Scope): void {
        for (const fc of scope.functionCalls) {
            this.addHintsFromFunctionCall(fc);
        }
        for (const childScope of scope.children) {
            this.addHintsFromScope(childScope);
        }
    }

    private addHintsFromFunctionCall(fc: FunctionCall): void {
        if (this.isInsideTheRegion(fc) && fc.logicalFunction) {
            const declaration = fc.logicalFunction.getDeclaration();
            for (let i = 0; i < fc.parametersStartOffset.length && i < declaration.parameters.length; i++) {
                this.addHint(fc, declaration, i);
            }
        }
    }

    private isInsideTheRegion(fc: FunctionCall): boolean {
        const functionCallRange = fc.interval;
        return !!functionCallRange.intersection(this.range);
    }

    private addHint(fc: FunctionCall, declaration: FunctionDeclaration, i: number): void {
        /*const startIndex = fc.parametersStartOffset[i];
        const name = `${declaration.parameters[i].name}:`;
        const position = this.di.offsetToPosition(startIndex - this.di.getInjectionOffset());
        const ih = new InlayHint(position, name, InlayHintKind.Parameter);
        ih.paddingRight = true;
        this.result.push(ih);*/
    }

}