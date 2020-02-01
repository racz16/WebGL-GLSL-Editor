import { Helper } from './helper';
import { Interval } from '../scope/interval';
import { GlslDocumentInfo } from '../core/glsl-document-info';
import { Scope } from '../scope/scope';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { TypeUsageHelper } from './type-usage-helper';
import { Single_variable_declarationContext, Variable_declarationContext } from '../_generated/AntlrGlslParser';

export class VariableDeclarationHelper {

    private static di: GlslDocumentInfo;
    private static scope: Scope;

    private static initialize(scope: Scope, di: GlslDocumentInfo): void {
        this.di = di;
        this.scope = scope;
    }

    //
    //function parameter
    //
    public static getParameterDeclaration(svdc: Single_variable_declarationContext, scope: Scope, di: GlslDocumentInfo): VariableDeclaration {
        this.initialize(scope, di);
        const ioc = svdc.identifier_optarray_optassignment() ? svdc.identifier_optarray_optassignment().identifier_optarray() : null;
        const name = ioc ? ioc.IDENTIFIER().text : null;
        const nameInterval = ioc ? Helper.getIntervalFromTerminalNode(ioc.IDENTIFIER()) : Interval.NONE;
        const declarationInterval = Helper.getIntervalFromParserRule(svdc);
        const arrayDepth = Helper.getArrayDepthFromIdentifierOptarray(ioc);
        const tu = TypeUsageHelper.getParameterType(svdc.type_usage(), arrayDepth, scope, di);
        const vd = new VariableDeclaration(name, nameInterval, scope, false, declarationInterval, tu);
        scope.variableDeclarations.push(vd);
        return vd;
    }

    //
    //struct member
    //
    public static getMemberDeclarations(vdc: Variable_declarationContext, scope: Scope, di: GlslDocumentInfo): Array<VariableDeclaration> {
        this.initialize(scope, di);
        const ioocs = vdc.identifier_optarray_optassignment();
        const vds = new Array<VariableDeclaration>();
        if (ioocs.length) {
            for (let i = 0; i < ioocs.length; i++) {
                const iooc = ioocs[i];
                const arrayDepth = Helper.getArrayDepthFromIdentifierOptarrayOptassignment(iooc);
                const tu = TypeUsageHelper.getMemberType(vdc.type_usage(), arrayDepth, this.scope, this.di, i);
                const name = iooc.identifier_optarray().IDENTIFIER().text;
                const nameInterval = Helper.getIntervalFromTerminalNode(iooc.identifier_optarray().IDENTIFIER());
                const declarationInterval = Helper.getIntervalFromParserRules(vdc, iooc);
                const vd = new VariableDeclaration(name, nameInterval, this.scope, false, declarationInterval, tu);
                this.scope.variableDeclarations.push(vd);
                vds.push(vd);
            }
        } else {
            const tu = TypeUsageHelper.getMemberType(vdc.type_usage(), 0, this.scope, this.di, 0);
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
