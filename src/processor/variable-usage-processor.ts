import { Helper } from "./helper";
import { VariableDeclarationProcessor } from "./variable-declaration-processor";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { DocumentInfo } from "../core/document-info";
import { Scope } from "../scope/scope";
import { VariableUsage } from "../scope/variable/variable-usage";

export class VariableUsageProcessor {

    public getVariableUsage(identifier: TerminalNode, scope: Scope, di: DocumentInfo): VariableUsage {
        const interval = Helper.getIntervalFromTerminalNode(identifier);
        const name = identifier.text;
        const vd = VariableDeclarationProcessor.searchVariableDeclaration(name, interval, scope, di);
        const vu = new VariableUsage(name, scope, interval, vd);
        if (vd) {
            scope.variableUsages.push(vu);
            vd.usages.push(vu);
        }
        return vu;
    }

}