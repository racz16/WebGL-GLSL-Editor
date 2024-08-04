import {
    CancellationToken,
    Location,
    LocationLink,
    Position,
    ProviderResult,
    TextDocument,
    TypeDefinitionProvider,
} from 'vscode';
import { TypeDeclarationProcessor } from '../processor/type-declaration-processor';
import { FunctionCall } from '../scope/function/function-call';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { VariableUsage } from '../scope/variable/variable-usage';
import { PositionalProviderBase } from './helper/positional-provider-base';

export class GlslTypeDefinitionProvider extends PositionalProviderBase<Location> implements TypeDefinitionProvider {
    public provideTypeDefinition(
        document: TextDocument,
        position: Position,
        token: CancellationToken
    ): ProviderResult<Location | Location[] | LocationLink[]> {
        return this.processElements(document, position);
    }

    protected processFunctionCall(fc: FunctionCall): Location {
        const scope = this.di.getScopeAt(this.position);
        const td = TypeDeclarationProcessor.searchTypeDeclaration(fc.name, fc.nameInterval, scope, this.di);
        if (td && !td.builtin && !td.nameInterval.isInjected()) {
            return this.di.intervalToLocation(td.nameInterval);
        }
        return null;
    }

    protected processVariableDeclaration(vd: VariableDeclaration): Location {
        const td = vd.type.declaration;
        if (td && !td.builtin) {
            if (td.nameInterval && !td.nameInterval.isInjected()) {
                return this.di.intervalToLocation(td.nameInterval);
            } else {
                return this.di.intervalToLocation(td.interval);
            }
        }
        return null;
    }

    protected processVariableUsage(vu: VariableUsage): Location {
        const vd = vu.declaration;
        return vd ? this.processVariableDeclaration(vd) : null;
    }
}
