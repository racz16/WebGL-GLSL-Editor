import { TextDocument, Position, CancellationToken, ProviderResult, Declaration, Location, DeclarationProvider } from 'vscode';
import { Helper } from '../helper/helper';
import { PositionalProviderBase } from './positional-provider-base';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { FunctionCall } from '../scope/function/function-call';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { VariableUsage } from '../scope/variable/variable-usage';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { TypeUsage } from '../scope/type/type-usage';
import { LogicalFunction } from '../scope/function/logical-function';

export class GlslDeclarationProvider extends PositionalProviderBase<Declaration> implements DeclarationProvider {

    public provideDeclaration(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Declaration> {
        return this.processElements(document, position);
    }

    protected processFunctionPrototype(fp: FunctionDeclaration): Declaration {
        return this.processFunction(fp.logicalFunction);
    }

    protected processFunctionDefinition(fd: FunctionDeclaration): Declaration {
        return this.processFunction(fd.logicalFunction);
    }

    protected processFunctionCall(fc: FunctionCall): Declaration {
        return this.processFunction(fc.logicalFunction);
    }

    protected processVariableDeclaration(vd: VariableDeclaration): Declaration {
        return Helper.intervalToLocation(vd.nameInterval, this.document);
    }

    protected processVariableUsage(vu: VariableUsage): Declaration {
        return this.processUsage(vu);
    }

    protected processTypeDeclaration(td: TypeDeclaration): Declaration {
        return Helper.intervalToLocation(td.nameInterval, this.document);
    }

    protected processTypeUsage(tu: TypeUsage): Declaration {
        return this.processUsage(tu);
    }

    private processFunction(lf: LogicalFunction): Declaration {
        const ret = new Array<Location>();
        for (const fp of lf.prototypes) {
            ret.push(Helper.intervalToLocation(fp.nameInterval, this.document));
        }
        return ret;
    }

    private processUsage(element: VariableUsage | TypeUsage): Declaration {
        const declaration = element.declaration;
        if (declaration && !declaration.builtin) {
            return Helper.intervalToLocation(declaration.nameInterval, this.document);
        }
        return null;
    }


}
