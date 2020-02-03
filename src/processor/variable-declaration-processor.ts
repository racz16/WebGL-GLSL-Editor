import { Helper } from './helper';
import { Interval } from '../scope/interval';
import { DocumentInfo } from '../core/document-info';
import { Scope } from '../scope/scope';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { TypeUsageProcessor } from './type-usage-processor';
import { Single_variable_declarationContext, Variable_declarationContext } from '../_generated/AntlrGlslParser';

export class VariableDeclarationProcessor {

    private static di: DocumentInfo;
    private static scope: Scope;

    private static initialize(scope: Scope, di: DocumentInfo): void {
        this.di = di;
        this.scope = scope;
    }

    //
    //function parameter
    //
    public static getParameterDeclaration(svdc: Single_variable_declarationContext, scope: Scope, di: DocumentInfo): VariableDeclaration {
        this.initialize(scope, di);
        const ioc = svdc.identifier_optarray_optassignment() ? svdc.identifier_optarray_optassignment().identifier_optarray() : null;
        const name = ioc ? ioc.IDENTIFIER().text : null;
        const nameInterval = ioc ? Helper.getIntervalFromTerminalNode(ioc.IDENTIFIER()) : Interval.NONE;
        const declarationInterval = Helper.getIntervalFromParserRule(svdc);
        const arraySize = Helper.getArraySizeFromIdentifierOptarray(ioc);
        const tu = TypeUsageProcessor.getParameterType(svdc.type_usage(), arraySize, scope, di);
        const vd = new VariableDeclaration(name, nameInterval, scope, false, declarationInterval, tu);
        scope.variableDeclarations.push(vd);
        return vd;
    }

    //
    //struct member
    //
    public static getMemberDeclarations(vdc: Variable_declarationContext, scope: Scope, di: DocumentInfo): Array<VariableDeclaration> {
        this.initialize(scope, di);
        const ioocs = vdc.identifier_optarray_optassignment();
        const vds = new Array<VariableDeclaration>();
        if (ioocs.length) {
            for (let i = 0; i < ioocs.length; i++) {
                const iooc = ioocs[i];
                const arraySize = Helper.getArraySizeFromIdentifierOptarrayOptassignment(iooc);
                const tu = TypeUsageProcessor.getMemberType(vdc.type_usage(), arraySize, this.scope, this.di, i);
                const name = iooc.identifier_optarray().IDENTIFIER().text;
                const nameInterval = Helper.getIntervalFromTerminalNode(iooc.identifier_optarray().IDENTIFIER());
                const declarationInterval = Helper.getIntervalFromParserRules(vdc, iooc);
                const vd = new VariableDeclaration(name, nameInterval, this.scope, false, declarationInterval, tu);
                this.scope.variableDeclarations.push(vd);
                vds.push(vd);
            }
        } else {
            const tu = TypeUsageProcessor.getMemberType(vdc.type_usage(), new Array<number>(), this.scope, this.di, 0);
            const name = null;
            const nameInterval = Interval.NONE;
            const declarationInterval = Helper.getIntervalFromParserRule(vdc);
            const vd = new VariableDeclaration(name, nameInterval, this.scope, false, declarationInterval, tu);
            this.scope.variableDeclarations.push(vd);
            vds.push(vd);
        }
        return vds;
    }

}
