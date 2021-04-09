import { CancellationToken, CodeLens, CodeLensProvider, Event, Position, ProviderResult, Range, TextDocument } from "vscode";
import { GlslEditor } from "../core/glsl-editor";

export class GlslInjectionErrorProvider implements CodeLensProvider {

    public provideCodeLenses(document: TextDocument, token: CancellationToken): ProviderResult<CodeLens[]> {
        GlslEditor.processElements(document);
        const di = GlslEditor.getDocumentInfo(document.uri);
        if (di.hasInjectionError()) {
            const range = document.lineAt(0).range;
            const cl = new CodeLens(range, { title: 'The injected code contains errors.', command: null, arguments: null, tooltip: '' })
            return [cl];
        } else {
            return [];
        }
    }

}