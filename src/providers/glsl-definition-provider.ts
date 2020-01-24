import { DefinitionProvider, TextDocument, Position, CancellationToken, ProviderResult, Location, LocationLink } from 'vscode';
import { Helper } from '../helper/helper';
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
        return Helper.intervalToLocation(vd.nameInterval, this.document);
    }

    protected processVariableUsage(vu: VariableUsage): Location {
        return this.processUsage(vu);
    }

    protected processTypeDeclaration(td: TypeDeclaration): Location {
        return Helper.intervalToLocation(td.nameInterval, this.document);
    }

    protected processTypeUsage(tu: TypeUsage): Location {
        return this.processUsage(tu);
    }

    private processFunction(lf: LogicalFunction): Array<Location> {
        const ret = new Array<Location>();
        for (const fd of lf.definitions) {
            ret.push(Helper.intervalToLocation(fd.nameInterval, this.document));
        }
        return ret;
    }

    private processUsage(element: TypeUsage | VariableUsage): Location {
        const declaration = element.declaration;
        if (declaration && !declaration.builtin) {
            return Helper.intervalToLocation(declaration.nameInterval, this.document);
        }
        return null;
    }

}