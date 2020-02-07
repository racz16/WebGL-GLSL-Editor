import { DefinitionProvider, TextDocument, Position, CancellationToken, ProviderResult, Location, LocationLink } from 'vscode';
import { PositionalProviderBase } from './positional-provider-base';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { FunctionCall } from '../scope/function/function-call';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { VariableUsage } from '../scope/variable/variable-usage';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { TypeUsage } from '../scope/type/type-usage';
import { LogicalFunction } from '../scope/function/logical-function';

export class GlslDefinitionProvider extends PositionalProviderBase<Location | Array<Location>> implements DefinitionProvider {

    public provideDefinition(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Location | Location[] | LocationLink[]> {
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

    protected processVariableDeclaration(vd: VariableDeclaration): Location {
        return this.di.intervalToLocation(vd.nameInterval);
    }

    protected processVariableUsage(vu: VariableUsage): Location {
        return this.processUsage(vu);
    }

    protected processTypeDeclaration(td: TypeDeclaration): Location {
        return this.di.intervalToLocation(td.nameInterval);
    }

    protected processTypeUsage(tu: TypeUsage): Location {
        return this.processUsage(tu);
    }

    private processFunction(lf: LogicalFunction): Array<Location> {
        const ret = new Array<Location>();
        if (!lf.getDeclaration().builtIn) {
            for (const fd of lf.definitions) {
                ret.push(this.di.intervalToLocation(fd.nameInterval));
            }
        }
        return ret;
    }

    private processUsage(element: TypeUsage | VariableUsage): Location {
        const declaration = element.declaration;
        if (declaration && !declaration.builtin) {
            return this.di.intervalToLocation(declaration.nameInterval);
        }
        return null;
    }

}