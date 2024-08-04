import { Token } from 'antlr4ts';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { DocumentInfo } from '../core/document-info';
import { SemanticModifier, SemanticRegion, SemanticType } from '../scope/regions/semantic-region';
import { Scope } from '../scope/scope';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { VariableUsage } from '../scope/variable/variable-usage';
import { Helper } from './helper';
import { VariableDeclarationProcessor } from './variable-declaration-processor';

export class VariableUsageProcessor {
    private di: DocumentInfo;

    public getVariableUsage(identifier: TerminalNode, scope: Scope, di: DocumentInfo): VariableUsage {
        this.di = di;
        const interval = Helper.getIntervalFromTerminalNode(identifier, di);
        const name = identifier.text;
        const vd = VariableDeclarationProcessor.searchVariableDeclaration(name, interval, scope, di);
        const vu = new VariableUsage(name, scope, interval, vd);
        if (vd) {
            scope.variableUsages.push(vu);
            vd.usages.push(vu);
            this.addSemanticToken(vd, identifier.symbol);
        }
        return vu;
    }

    private addSemanticToken(vd: VariableDeclaration, token: Token): void {
        if (vd.name && !vd.builtin) {
            const modifiers = [];
            if (vd.type.qualifiers.some((q) => q.name === 'const')) {
                modifiers.push(SemanticModifier.CONST);
            }
            const sr = new SemanticRegion(token, SemanticType.VARIABLE, modifiers);
            this.di.getRegions().semanticRegions.push(sr);
        }
    }
}
