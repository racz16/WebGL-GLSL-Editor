import { TypeDefinitionProvider, TextDocument, Position, CancellationToken, ProviderResult, Location, LocationLink } from 'vscode';
import { PositionalProviderBase } from './positional-provider-base';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { VariableUsage } from '../scope/variable/variable-usage';
import { FunctionCall } from '../scope/function/function-call';
import { TypeDeclarationProcessor } from '../processor/type-declaration-processor';

export class GlslTypeDefinitionProvider extends PositionalProviderBase<Location> implements TypeDefinitionProvider {

    public provideTypeDefinition(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Location | Location[] | LocationLink[]> {
        return this.processElements(document, position);
    }

    protected processFunctionCall(fc: FunctionCall): Location {
        const scope = this.di.getScopeAt(this.position);
        const td = TypeDeclarationProcessor.searchTypeDeclaration(fc.name, fc.nameInterval, scope, this.di);
        if (td && !td.builtin) {
            return this.di.intervalToLocation(td.nameInterval);
        }
        return null;
    }

    protected processVariableDeclaration(vd: VariableDeclaration): Location {
        if (vd.type.declaration && !vd.type.declaration.builtin) {
            return this.di.intervalToLocation(vd.type.declaration.nameInterval);
        }
        return null;
    }

    protected processVariableUsage(vu: VariableUsage): Location {
        const vd = vu.declaration;
        return vd ? this.processVariableDeclaration(vd) : null;
    }

}
