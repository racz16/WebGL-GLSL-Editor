import { FoldingRangeProvider, FoldingRange, TextDocument, FoldingContext, CancellationToken, ProviderResult } from "vscode";

import { GlslEditor } from "../core/glsl-editor";

export class GlslFoldingProvider implements FoldingRangeProvider {

    public provideFoldingRanges(document: TextDocument, context: FoldingContext, token: CancellationToken): ProviderResult<FoldingRange[]> {
        GlslEditor.processElements(document);
        const di = GlslEditor.getDocumentInfo(document.uri);
        const results = new Array<FoldingRange>();
        for (const fr of di.foldingRegions) {
            results.push(new FoldingRange(fr.startLine, fr.stopLine, fr.kind));
        }
        return results;
    }

}