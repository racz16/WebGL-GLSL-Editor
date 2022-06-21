import { TextDocument, Position, CancellationToken, ProviderResult, Declaration, Location, DeclarationProvider } from 'vscode';
import { PositionalProviderBase } from './helper/positional-provider-base';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { FunctionCall } from '../scope/function/function-call';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { VariableUsage } from '../scope/variable/variable-usage';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { TypeUsage } from '../scope/type/type-usage';
import { LogicalFunction } from '../scope/function/logical-function';
import { Helper } from '../processor/helper';

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
        if (!Helper.isInjected(vd.nameInterval)) {
            return this.di.intervalToLocation(vd.nameInterval);
        }
        return null;
    }

    protected processVariableUsage(vu: VariableUsage): Declaration {
        return this.processUsage(vu);
    }

    protected processTypeDeclaration(td: TypeDeclaration): Declaration {
        if (!Helper.isInjected(td.nameInterval)) {
            return this.di.intervalToLocation(td.nameInterval);
        }
        return null;

    }

    protected processTypeUsage(tu: TypeUsage): Declaration {
        return this.processUsage(tu);
    }

    private processFunction(lf: LogicalFunction): Declaration {
        const ret = new Array<Location>();
        if (!lf.getDeclaration().builtIn) {
            if (lf.getDeclaration().ctor) {
                return this.processTypeDeclaration(lf.getDeclaration().returnType.declaration);
            } else {
                for (const fp of lf.prototypes) {
                    this.addLocation(ret, fp.nameInterval);
                }
            }
        }
        return ret;
    }

    private processUsage(element: VariableUsage | TypeUsage): Declaration {
        const declaration = element.declaration;
        if (declaration && !declaration.builtin && !Helper.isInjected(declaration.nameInterval)) {
            return this.di.intervalToLocation(declaration.nameInterval);
        }
        return null;
    }

}
