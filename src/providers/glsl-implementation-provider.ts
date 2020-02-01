import { ImplementationProvider, TextDocument, Position, CancellationToken, ProviderResult, Location, LocationLink } from 'vscode';
import { PositionalProviderBase } from './positional-provider-base';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { FunctionCall } from '../scope/function/function-call';
import { LogicalFunction } from '../scope/function/logical-function';

export class GlslImplementationProvider extends PositionalProviderBase<Array<Location>> implements ImplementationProvider {

    public provideImplementation(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Location | Location[] | LocationLink[]> {
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
        for (const fd of lf.definitions) {
            ret.push(this.di.intervalToLocation(fd.nameInterval));
        }
        return ret;
    }

}