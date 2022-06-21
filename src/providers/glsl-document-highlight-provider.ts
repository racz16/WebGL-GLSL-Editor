import { DocumentHighlightProvider, TextDocument, Position, CancellationToken, ProviderResult, DocumentHighlight, DocumentHighlightKind } from 'vscode';
import { LogicalFunction } from '../scope/function/logical-function';
import { Element } from '../scope/element';
import { PositionalProviderBase } from './helper/positional-provider-base';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { FunctionCall } from '../scope/function/function-call';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { VariableUsage } from '../scope/variable/variable-usage';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { TypeUsage } from '../scope/type/type-usage';
import { Helper } from '../processor/helper';

export class GlslDocumentHighlightProvider extends PositionalProviderBase<Array<DocumentHighlight>> implements DocumentHighlightProvider {

    public provideDocumentHighlights(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<DocumentHighlight[]> {
        return this.processElements(document, position);
    }

    protected processFunctionPrototype(fp: FunctionDeclaration): Array<DocumentHighlight> {
        return this.processFunction(fp.logicalFunction);
    }

    protected processFunctionDefinition(fd: FunctionDeclaration): Array<DocumentHighlight> {
        return this.processFunction(fd.logicalFunction);
    }

    protected processFunctionCall(fc: FunctionCall): Array<DocumentHighlight> {
        return this.processFunction(fc.logicalFunction);
    }

    protected processVariableDeclaration(vd: VariableDeclaration): Array<DocumentHighlight> {
        return this.processDeclaration(vd);
    }

    protected processVariableUsage(vu: VariableUsage): Array<DocumentHighlight> {
        return this.processUsage(vu);
    }

    protected processTypeDeclaration(td: TypeDeclaration): Array<DocumentHighlight> {
        return this.processDeclaration(td);
    }

    protected processTypeUsage(tu: TypeUsage): Array<DocumentHighlight> {
        return this.processUsage(tu);
    }

    private processFunction(lf: LogicalFunction): Array<DocumentHighlight> {
        const ret = new Array<DocumentHighlight>();
        if (!lf.getDeclaration().builtIn && !lf.getDeclaration().ctor) {
            this.addHighlight(ret, lf.prototypes, DocumentHighlightKind.Write);
            this.addHighlight(ret, lf.definitions, DocumentHighlightKind.Read);
        }
        this.addHighlight(ret, lf.calls, DocumentHighlightKind.Text);
        return ret;
    }

    private processDeclaration(element: VariableDeclaration | TypeDeclaration): Array<DocumentHighlight> {
        const ret = new Array<DocumentHighlight>();
        if (!(element instanceof TypeDeclaration && (element.interfaceBlock || element.builtin))) {
            if (!element.builtin && !Helper.isInjected(element.nameInterval)) {
                const range = element.nameInterval;
                ret.push(new DocumentHighlight(range, DocumentHighlightKind.Read));
            }
            this.addHighlight(ret, element.usages, DocumentHighlightKind.Text);
        }
        return ret;
    }

    private processUsage(element: VariableUsage | TypeUsage): Array<DocumentHighlight> {
        if (element.declaration) {
            return this.processDeclaration(element.declaration);
        } else if (element.name !== 'void') {
            const range = element.nameInterval;
            return new Array<DocumentHighlight>(new DocumentHighlight(range, DocumentHighlightKind.Text));
        } else {
            return null;
        }
    }

    private addHighlight(ret: Array<DocumentHighlight>, elements: Array<Element>, dhk: DocumentHighlightKind): void {
        for (const element of elements) {
            if (element.nameInterval && !Helper.isInjected(element.nameInterval)) {
                const range = element.nameInterval;
                ret.push(new DocumentHighlight(range, dhk));
            }
        }
    }

}
