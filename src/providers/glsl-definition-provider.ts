import {
    CancellationToken,
    DefinitionProvider,
    Location,
    LocationLink,
    Position,
    ProviderResult,
    TextDocument,
} from 'vscode';
import { FunctionCall } from '../scope/function/function-call';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { LogicalFunction } from '../scope/function/logical-function';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { TypeUsage } from '../scope/type/type-usage';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { VariableUsage } from '../scope/variable/variable-usage';
import { PositionalProviderBase } from './helper/positional-provider-base';

export class GlslDefinitionProvider
    extends PositionalProviderBase<Location | Array<Location>>
    implements DefinitionProvider
{
    public provideDefinition(
        document: TextDocument,
        position: Position,
        token: CancellationToken
    ): ProviderResult<Location | Location[] | LocationLink[]> {
        return this.processElements(document, position);
    }

    protected processFunctionPrototype(fp: FunctionDeclaration): Array<Location> | Location {
        return this.processFunction(fp.logicalFunction);
    }

    protected processFunctionDefinition(fd: FunctionDeclaration): Array<Location> | Location {
        return this.processFunction(fd.logicalFunction);
    }

    protected processFunctionCall(fc: FunctionCall): Array<Location> | Location {
        return this.processFunction(fc.logicalFunction);
    }

    protected processVariableDeclaration(vd: VariableDeclaration): Location {
        if (!vd.nameInterval.isInjected()) {
            return this.di.intervalToLocation(vd.nameInterval);
        }
        return null;
    }

    protected processVariableUsage(vu: VariableUsage): Location {
        return this.processUsage(vu);
    }

    protected processTypeDeclaration(td: TypeDeclaration): Location {
        if (!td.nameInterval.isInjected()) {
            return this.di.intervalToLocation(td.nameInterval);
        }
        return null;
    }

    protected processTypeUsage(tu: TypeUsage): Location {
        return this.processUsage(tu);
    }

    private processFunction(lf: LogicalFunction): Array<Location> | Location {
        const ret = new Array<Location>();
        if (!lf.getDeclaration().builtIn && !lf.getDeclaration().ctor) {
            for (const fd of lf.definitions) {
                this.addLocation(ret, fd.nameInterval);
            }
        }
        return ret;
    }

    private processUsage(element: TypeUsage | VariableUsage): Location {
        const declaration = element.declaration;
        if (declaration && !declaration.builtin && !declaration.nameInterval.isInjected()) {
            return this.di.intervalToLocation(declaration.nameInterval);
        }
        return null;
    }
}
