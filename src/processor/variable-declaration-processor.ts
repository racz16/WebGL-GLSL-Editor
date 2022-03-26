import { Helper } from './helper';
import { Interval } from '../scope/interval';
import { DocumentInfo } from '../core/document-info';
import { Scope } from '../scope/scope';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { TypeUsageProcessor } from './type-usage-processor';
import { Single_variable_declarationContext, Variable_declarationContext, Interface_block_declarationContext } from '../_generated/AntlrGlslParser';
import { ArrayUsage } from '../scope/array-usage';
import { ExpressionProcessor } from './expression-processor';
import { ColorRegion } from '../scope/regions/color-region';
import { ExpressionResult } from './expression-result';
import { SemanticModifier, SemanticRegion, SemanticType } from '../scope/regions/semantic-region';
import { Token } from 'antlr4ts';

export class VariableDeclarationProcessor {

    private di: DocumentInfo;
    private scope: Scope;

    private initialize(scope: Scope, di: DocumentInfo): void {
        this.di = di;
        this.scope = scope;
    }

    public static searchVariableDeclaration(name: string, nameInterval: Interval, scope: Scope, di: DocumentInfo): VariableDeclaration {
        while (scope) {
            const td = scope.variableDeclarations.find(td => td.name === name && Helper.isALowerThanB(td.nameInterval, nameInterval));
            if (td) {
                return td;
            } else if (this.anyTypeOrFunction(name, nameInterval, scope)) {
                return null;
            }
            scope = scope.parent;
        }
        return di.builtin.variables.get(name) ?? null;
    }

    private static anyTypeOrFunction(name: string, nameInterval: Interval, scope: Scope): boolean {
        return scope.typeDeclarations.some(td => td.name === name && Helper.isALowerThanB(td.interval, nameInterval)) ||
            scope.functionPrototypes.some(fp => fp.name === name && Helper.isALowerThanB(fp.interval, nameInterval)) ||
            scope.functionDefinitions.some(fd => fd.name === name && Helper.isALowerThanB(fd.interval, nameInterval));
    }

    //
    //function parameter
    //
    public getParameterDeclaration(svdc: Single_variable_declarationContext, prototype: boolean, scope: Scope, di: DocumentInfo): VariableDeclaration {
        this.initialize(scope, di);
        const ioc = svdc.identifier_optarray_optassignment() ? svdc.identifier_optarray_optassignment().identifier_optarray() : null;
        const name = ioc ? ioc.IDENTIFIER().text : null;
        const nameInterval = ioc ? Helper.getIntervalFromTerminalNode(ioc.IDENTIFIER(), this.di) : null;
        const declarationInterval = Helper.getIntervalFromParserRule(svdc, this.di);
        const arraySize = Helper.getArraySizeFromIdentifierOptarray(ioc, this.scope, this.di);
        const tu = new TypeUsageProcessor().getParameterType(svdc.type_usage(), arraySize, scope, di);
        const vd = new VariableDeclaration(name, nameInterval, scope, false, declarationInterval, tu, prototype, !prototype);
        if (svdc.type_usage().type_declaration()) {
            tu.declaration.usages.push(tu);
        }
        scope.variableDeclarations.push(vd);
        this.addSemanticToken(vd, ioc?.IDENTIFIER().symbol);
        return vd;
    }

    private addSemanticToken(vd: VariableDeclaration, token: Token): void {
        if (vd.name) {
            const modifiers = [SemanticModifier.DECLARATION];
            if (vd.type.qualifiers.some(q => q.name === 'const')) {
                modifiers.push(SemanticModifier.CONST);
            }
            const sr = new SemanticRegion(token, SemanticType.VARIABLE, modifiers);
            this.di.getRegions().semanticRegions.push(sr);
        }
    }

    //
    //interface block
    //
    public getInterfaceBlockVariableDeclaration(ibdc: Interface_block_declarationContext, scope: Scope, di: DocumentInfo): VariableDeclaration {
        this.initialize(scope, di);
        const variable = !!ibdc.identifier_optarray();
        const tu = new TypeUsageProcessor().getInterfaceBlockType(ibdc, scope, di);
        if (variable) {
            const name = ibdc.identifier_optarray().IDENTIFIER().text;
            const nameInterval = Helper.getIntervalFromTerminalNode(ibdc.identifier_optarray().IDENTIFIER(), this.di);
            const declarationInterval = Helper.getIntervalFromParserRule(ibdc, this.di);
            const vd = new VariableDeclaration(name, nameInterval, this.scope, false, declarationInterval, tu, false, false);
            this.scope.variableDeclarations.push(vd);
            tu.declaration.usages.push(tu);
            this.addSemanticToken(vd, ibdc?.identifier_optarray().IDENTIFIER().symbol);
            return vd;
        }
        return null;
    }

    //
    //variable declaration, struct member
    //
    public getDeclarations(vdc: Variable_declarationContext, scope: Scope, di: DocumentInfo): Array<VariableDeclaration> {
        this.initialize(scope, di);
        const ioocs = vdc.identifier_optarray_optassignment();
        const vds = new Array<VariableDeclaration>();
        if (ioocs.length) {
            for (let i = 0; i < ioocs.length; i++) {
                const iooc = ioocs[i];
                const array = Helper.getArraySizeFromIdentifierOptarrayOptassignment(iooc, this.scope, this.di);
                const tu = new TypeUsageProcessor().getMemberType(vdc.type_usage(), array, this.scope, this.di, i);
                const name = iooc.identifier_optarray().IDENTIFIER().text;
                const nameInterval = Helper.getIntervalFromTerminalNode(iooc.identifier_optarray().IDENTIFIER(), this.di);
                const declarationInterval = Helper.getIntervalFromParserRules(vdc, iooc, this.di);
                const vd = new VariableDeclaration(name, nameInterval, this.scope, false, declarationInterval, tu, false, false);
                const right = new ExpressionProcessor().processExpression(iooc.expression(), this.scope, this.di);
                this.scope.variableDeclarations.push(vd);
                this.addSemanticToken(vd, iooc?.identifier_optarray().IDENTIFIER().symbol);
                this.handleColorRegion(vd, right);
                vds.push(vd);
            }
            if (vdc.type_usage().type_declaration()) {
                const tu = vds[0].type;
                tu.declaration.usages.push(tu);
            }
        } else {
            const tu = new TypeUsageProcessor().getMemberType(vdc.type_usage(), new ArrayUsage(), this.scope, this.di, 0);
            if (!tu.qualifiers.some(q => q.name.startsWith('layout'))) {
                const name = null;
                const nameInterval = null;
                const declarationInterval = Helper.getIntervalFromParserRule(vdc, this.di);
                const vd = new VariableDeclaration(name, nameInterval, this.scope, false, declarationInterval, tu, false, false);
                this.scope.variableDeclarations.push(vd);
                vds.push(vd);
            }
        }
        return vds;
    }

    private handleColorRegion(vd: VariableDeclaration, right: ExpressionResult | ExpressionResult[]): void {
        if (right instanceof ExpressionResult && vd.isColorVariable() && right.constructorCall) {
            const cr = new ColorRegion(right.constructorCall, right.constructorParameters);
            this.di.getRegions().colorRegions.push(cr);
        }
    }

}
