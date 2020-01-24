import { HoverProvider, TextDocument, Position, CancellationToken, ProviderResult, Hover } from 'vscode';
import { PositionalProviderBase } from './positional-provider-base';
import { FunctionCall } from '../scope/function/function-call';
import { VariableUsage } from '../scope/variable/variable-usage';
import { TypeUsage } from '../scope/type/type-usage';
import { TypeCategory } from '../scope/type/type-category';

export class GlslHoverProvider extends PositionalProviderBase<Hover> implements HoverProvider {

    //TODO:
    //online dokumentáció bevarázslása
    //amíg ez nincs, az aljára oda lehetne írni, hogy ez csak offline

    public provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover> {
        return this.processElements(document, position);
    }

    protected processFunctionCall(fc: FunctionCall): Hover {
        if (fc.hasDeclaration()) {
            if (fc.builtin) {
                const md = null;
                if (md) {
                    return new Hover(md);
                }
            }
        }
        return null;
    }

    protected processVariableUsage(vu: VariableUsage): Hover {
        if (vu.declaration) {
            if (vu.declaration.builtin) {
                const md = vu?.declaration.summary;
                if (md) {
                    return new Hover(md);
                }
            }
            return new Hover(vu.declaration.toStringDocumentation());
        }
        return null;
    }

    protected processTypeUsage(tu: TypeUsage): Hover {
        if (tu.declaration && (!tu.declaration.builtin || tu.declaration.typeCategory === TypeCategory.CUSTOM)) {
            return new Hover(tu.declaration.toStringDocumentation());
        }
        return null;
    }

}
