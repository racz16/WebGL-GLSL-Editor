import {
    Function_definitionContext,
    Function_headerContext,
    Function_prototypeContext,
} from '../_generated/AntlrGlslParser';
import { DocumentInfo } from '../core/document-info';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { LogicalFunction } from '../scope/function/logical-function';
import { Interval } from '../scope/interval';
import { SemanticModifier, SemanticRegion, SemanticType } from '../scope/regions/semantic-region';
import { Scope } from '../scope/scope';
import { ExpressionResult } from './expression-result';
import { Helper } from './helper';
import { TypeUsageProcessor } from './type-usage-processor';
import { VariableDeclarationProcessor } from './variable-declaration-processor';

export class FunctionProcessor {
    private di: DocumentInfo;
    private scope: Scope;
    private fhc: Function_headerContext;

    private initialize(fhc: Function_headerContext, scope: Scope, di: DocumentInfo): void {
        this.fhc = fhc;
        this.di = di;
        this.scope = scope;
    }

    public static searchFunction(
        name: string,
        nameInterval: Interval,
        parameters: Array<ExpressionResult>,
        scope: Scope,
        di: DocumentInfo
    ): LogicalFunction {
        while (scope) {
            const lf = scope.functions.find((lf) => this.areFunctionsMatch(lf, name, nameInterval, parameters));
            if (lf) {
                return lf;
            } else if (this.anyTypeOrVariable(name, nameInterval, scope)) {
                return null;
            }
            scope = scope.parent;
        }
        return di.builtin.functions.find((lf) => this.areFunctionsMatch(lf, name, nameInterval, parameters)) ?? null;
    }

    private static areFunctionsMatch(
        lf: LogicalFunction,
        name: string,
        nameInterval: Interval,
        parameters: Array<ExpressionResult>
    ): boolean {
        const fd = lf.getDeclaration();
        return (
            fd.name === name &&
            fd.parameters.length === parameters.length &&
            this.areParametersMatch(fd, parameters) &&
            Helper.isALowerThanB(fd.interval, nameInterval)
        );
    }

    private static areParametersMatch(fd: FunctionDeclaration, parameters: Array<ExpressionResult>): boolean {
        for (let i = 0; i < parameters.length; i++) {
            if (fd.parameters[i].type?.declaration !== parameters[i].type) {
                return false;
            }
        }
        return true;
    }

    private static anyTypeOrVariable(name: string, nameInterval: Interval, scope: Scope): boolean {
        return (
            scope.typeDeclarations.some((td) => td.name === name && Helper.isALowerThanB(td.interval, nameInterval)) ||
            scope.variableDeclarations.some(
                (fd) => fd.name === name && Helper.isALowerThanB(fd.nameInterval, nameInterval)
            )
        );
    }

    //
    //function prototype
    //
    public getFunctionPrototype(fpc: Function_prototypeContext, scope: Scope, di: DocumentInfo): FunctionDeclaration {
        this.initialize(fpc.function_header(), scope, di);
        const interval = Helper.getIntervalFromParserRule(fpc, this.di);
        const nameInterval = Helper.getIntervalFromTerminalNode(this.fhc.IDENTIFIER(), this.di);
        const returnType = new TypeUsageProcessor().getReturnType(this.fhc.type_usage(), this.scope.parent, di);
        const name = this.fhc.IDENTIFIER().text;
        const fd = new FunctionDeclaration(
            name,
            nameInterval,
            this.scope.parent,
            returnType,
            false,
            false,
            interval,
            this.scope
        );
        this.addParameters(fd, true);
        this.getLogicalFunction(fd).prototypes.push(fd);
        this.di.getRootScope().functionPrototypes.push(fd);
        this.di
            .getRegions()
            .semanticRegions.push(
                new SemanticRegion(this.fhc.IDENTIFIER().symbol, SemanticType.FUNCTION, [SemanticModifier.DECLARATION])
            );
        return fd;
    }

    //
    //function definition
    //
    public getFunctionDefinition(fdc: Function_definitionContext, scope: Scope, di: DocumentInfo): FunctionDeclaration {
        this.initialize(fdc.function_header(), scope, di);
        const interval = Helper.getIntervalFromParserRule(fdc, this.di);
        const nameInterval = Helper.getIntervalFromTerminalNode(this.fhc.IDENTIFIER(), this.di);
        const returnType = new TypeUsageProcessor().getReturnType(this.fhc.type_usage(), this.scope.parent, di);
        const name = this.fhc.IDENTIFIER().text;
        const fd = new FunctionDeclaration(
            name,
            nameInterval,
            this.scope.parent,
            returnType,
            false,
            false,
            interval,
            this.scope
        );
        this.addParameters(fd, false);
        this.getLogicalFunction(fd).definitions.push(fd);
        this.di.getRootScope().functionDefinitions.push(fd);
        this.di
            .getRegions()
            .semanticRegions.push(
                new SemanticRegion(this.fhc.IDENTIFIER().symbol, SemanticType.FUNCTION, [SemanticModifier.DEFINITION])
            );
        return fd;
    }

    //
    //general
    //
    private getLogicalFunction(fd: FunctionDeclaration): LogicalFunction {
        let lf = this.di.getRootScope().functions.find((lf) => lf.connects(fd));
        if (!lf) {
            lf = new LogicalFunction();
            this.di.getRootScope().functions.push(lf);
        }
        fd.logicalFunction = lf;
        return lf;
    }

    private addParameters(fd: FunctionDeclaration, prototype: boolean): void {
        const fplc = this.fhc.function_parameter_list();
        if (fplc && fplc.single_variable_declaration()) {
            for (const svdc of fplc.single_variable_declaration()) {
                const vd = new VariableDeclarationProcessor().getParameterDeclaration(
                    svdc,
                    prototype,
                    this.scope,
                    this.di
                );
                fd.parameters.push(vd);
            }
        }
    }
}
