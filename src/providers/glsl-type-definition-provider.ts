import { TypeDefinitionProvider, TextDocument, Position, CancellationToken, ProviderResult, Location, LocationLink } from 'vscode';
import { GlslProcessor } from '../core/glsl-processor';
import { Helper } from '../helper/helper';
import { PositionalProviderBase } from './positional-provider-base';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { VariableUsage } from '../scope/variable/variable-usage';

export class GlslTypeDefinitionProvider extends PositionalProviderBase<Location> implements TypeDefinitionProvider {

    public provideTypeDefinition(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Location | Location[] | LocationLink[]> {
        return this.processElements(document, position);
    }

    protected processVariableDeclaration(vd: VariableDeclaration): Location {
        if (vd.type.declaration && !vd.type.declaration.builtin) {
            return Helper.intervalToLocation(vd.type.declaration.nameInterval, this.document);
        }
        return null;
    }

    protected processVariableUsage(vu: VariableUsage): Location {
        const vd = vu.declaration;
        return vd ? this.processVariableDeclaration(vd) : null;
    }

}
