import {
    CancellationToken,
    Hover,
    HoverProvider,
    MarkdownString,
    Position,
    ProviderResult,
    TextDocument,
} from 'vscode';
import { Constants } from '../core/constants';
import { Helper } from '../processor/helper';
import { FunctionCall } from '../scope/function/function-call';
import { TypeCategory } from '../scope/type/type-category';
import { TypeUsage } from '../scope/type/type-usage';
import { VariableUsage } from '../scope/variable/variable-usage';
import { PositionalProviderBase } from './helper/positional-provider-base';

export class GlslHoverProvider extends PositionalProviderBase<Hover> implements HoverProvider {
    public provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover> {
        return this.processElements(document, position);
    }

    protected processFunctionCall(fc: FunctionCall): Hover {
        const fd = fc.logicalFunction?.getDeclaration();
        if (fd && Helper.isInCorrectStage(fd.stage, this.di)) {
            const fi = this.di.builtin.functionSummaries.get(fd.name);
            const md = new MarkdownString(fd.toStringDocumentation());
            if (fi && fi.summary) {
                md.appendText(Constants.NEW_LINE);
                md.appendMarkdown(fi.summary.value);
                md.isTrusted = true;
            }
            return new Hover(md);
        }
        return null;
    }

    protected processVariableUsage(vu: VariableUsage): Hover {
        if (vu.declaration && Helper.isInCorrectStage(vu.declaration.stage, this.di)) {
            if (vu.declaration.summary) {
                return new Hover(vu.declaration.summary);
            } else {
                const md = new MarkdownString(vu.declaration.toStringDocumentation());
                return new Hover(md);
            }
        }
        return null;
    }

    protected processTypeUsage(tu: TypeUsage): Hover {
        if (tu.declaration && tu.declaration.typeCategory === TypeCategory.CUSTOM && !tu.declaration.interfaceBlock) {
            const md = new MarkdownString(tu.declaration.toStringDocumentation());
            return new Hover(md);
        }
        return null;
    }
}
