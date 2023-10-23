import {
    CancellationToken,
    ImplementationProvider,
    Location,
    LocationLink,
    Position,
    ProviderResult,
    TextDocument,
} from 'vscode';
import { FunctionCall } from '../scope/function/function-call';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { LogicalFunction } from '../scope/function/logical-function';
import { PositionalProviderBase } from './helper/positional-provider-base';

export class GlslImplementationProvider
    extends PositionalProviderBase<Array<Location>>
    implements ImplementationProvider
{
    public provideImplementation(
        document: TextDocument,
        position: Position,
        token: CancellationToken
    ): ProviderResult<Location | Location[] | LocationLink[]> {
        return this.processElements(document, position);
    }

    protected processFunctionPrototype(fp: FunctionDeclaration): Array<Location> {
        return this.processFunction(fp.logicalFunction);
    }

    protected processFunctionDefinition(fd: FunctionDeclaration): Array<Location> {
        return this.processFunction(fd.logicalFunction);
    }

    protected processFunctionCall(fc: FunctionCall): Array<Location> {
        return this.processFunction(fc.logicalFunction);
    }

    private processFunction(lf: LogicalFunction): Array<Location> {
        const ret = new Array<Location>();
        if (!lf.getDeclaration().builtIn) {
            for (const fd of lf.definitions) {
                this.addLocation(ret, fd.nameInterval);
            }
        }
        return ret;
    }
}
