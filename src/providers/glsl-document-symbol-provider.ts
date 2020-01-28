import { DocumentSymbolProvider, TextDocument, CancellationToken, ProviderResult, SymbolInformation, DocumentSymbol, SymbolKind } from 'vscode';
import { GlslProcessor } from '../core/glsl-processor';
import { Helper } from '../helper/helper';

export class GlslDocumentSymbolProvider implements DocumentSymbolProvider {

    //TODO:
    //interface blokkok, változódeklarációk

    public provideDocumentSymbols(document: TextDocument, token: CancellationToken): ProviderResult<SymbolInformation[] | DocumentSymbol[]> {
        GlslProcessor.processDocument(document);
        const di = GlslProcessor.getDocumentInfo(document.uri);
        const ret = new Array<DocumentSymbol>();
        for (const td of di.getRootScope().typeDeclarations) {
            const range = di.intervalToRange(td.structInterval);
            const selectionRange = di.intervalToRange(td.nameInterval);
            const ds = new DocumentSymbol(td.name, null, SymbolKind.Struct, range, selectionRange);
            for (const vd of td.members) {
                const range2 = di.intervalToRange(vd.declarationInterval);
                const selectionRange2 = di.intervalToRange(vd.nameInterval);
                const ds2 = new DocumentSymbol(vd.name, null, SymbolKind.Property, range2, selectionRange2);
                ds.children.push(ds2);
            }
            ret.push(ds);
        }
        for (const fd of di.functionDefinitions) {
            const range = di.intervalToRange(fd.interval);
            const selectionRange = di.intervalToRange(fd.nameInterval);
            ret.push(new DocumentSymbol(fd.name, fd.returnType.toString(), SymbolKind.Function, range, selectionRange));
        }
        return ret;
    }

}
