import { Helper } from "./helper";
import { VariableDeclarationProcessor } from "./variable-declaration-processor";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { DocumentInfo } from "../core/document-info";
import { Scope } from "../scope/scope";
import { VariableUsage } from "../scope/variable/variable-usage";
import { SemanticModifier, SemanticRegion, SemanticType } from "../scope/regions/semantic-region";

export class VariableUsageProcessor {

    public getVariableUsage(identifier: TerminalNode, scope: Scope, di: DocumentInfo): VariableUsage {
        const interval = Helper.getIntervalFromTerminalNode(identifier, di);
        const name = identifier.text;
        const vd = VariableDeclarationProcessor.searchVariableDeclaration(name, interval, scope, di);
        const vu = new VariableUsage(name, scope, interval, vd);
        if (vd) {
            scope.variableUsages.push(vu);
            vd.usages.push(vu);
            if (vd.type.qualifiers.some(q => q.name === 'const') && vd.name) {
                const sr = new SemanticRegion(identifier.symbol, SemanticType.VARIABLE, [SemanticModifier.CONST]);
                di.getRegions().semanticRegions.push(sr);
            }
        }
        return vu;
    }

}