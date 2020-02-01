import { HoverProvider, TextDocument, Position, CancellationToken, ProviderResult, Hover, MarkdownString } from 'vscode';
import { PositionalProviderBase } from './positional-provider-base';
import { FunctionCall } from '../scope/function/function-call';
import { VariableUsage } from '../scope/variable/variable-usage';
import { TypeUsage } from '../scope/type/type-usage';
import { TypeCategory } from '../scope/type/type-category';
import { Constants } from '../core/constants';

export class GlslHoverProvider extends PositionalProviderBase<Hover> implements HoverProvider {

    public provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover> {
        return this.processElements(document, position);
    }

    protected processFunctionCall(fc: FunctionCall): Hover {
        const fd = fc.logicalFunction?.getDeclaration();
        if (fd) {
            let md = new MarkdownString(fd.toStringDocumentation());
            const fi = this.di.builtin.functionSummaries.get(fd.name);
            if (fi && fi.summary) {
                md = new MarkdownString(md + Constants.CRLF + Constants.CRLF + '---' + Constants.CRLF + fi.summary);
            }
            return new Hover(md);
        }
        return null;
    }

    protected processVariableUsage(vu: VariableUsage): Hover {
        if (vu.declaration) {
            let md = new MarkdownString(vu.declaration.toStringDocumentation());
            if (vu.declaration.summary) {
                md = new MarkdownString(md + Constants.CRLF + Constants.CRLF + '---' + Constants.CRLF + vu.declaration.summary);
            }
            return new Hover(md);
        }
        return null;
    }

    protected processTypeUsage(tu: TypeUsage): Hover {
        if (tu.declaration && tu.declaration.typeCategory === TypeCategory.CUSTOM) {
            let md = new MarkdownString(tu.declaration.toStringDocumentation());
            return new Hover(md);
        }
        return null;
    }

}
