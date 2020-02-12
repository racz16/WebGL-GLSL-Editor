import { Helper } from './helper';
import { DocumentInfo } from '../core/document-info';
import { Function_prototypeContext, Function_definitionContext, Function_headerContext } from '../_generated/AntlrGlslParser';
import { Scope } from '../scope/scope';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { LogicalFunction } from '../scope/function/logical-function';
import { TypeUsageProcessor } from './type-usage-processor';
import { VariableDeclarationProcessor } from './variable-declaration-processor';
import { ExpressionType } from './expression-processor';
import { Interval } from '../scope/interval';

export abstract class FunctionProcessor {

    private static di: DocumentInfo;
    private static scope: Scope;
    private static fhc: Function_headerContext;

    private static initialize(fhc: Function_headerContext, scope: Scope, di: DocumentInfo): void {
        this.fhc = fhc;
        this.di = di;
        this.scope = scope;
    }

    public static searchFunction(name: string, nameInterval: Interval, parameters: Array<ExpressionType>, scope: Scope, di: DocumentInfo): LogicalFunction {
        while (scope) {
            const lf = scope.functions.find(lf => this.areFunctionsMatch(lf, name, nameInterval, parameters));
            if (lf) {
                return lf;
            } else if (this.anyTypeOrVariable(name, nameInterval, scope)) {
                return null;
            }
            scope = scope.parent;
        }
        return di.builtin.functions.find(lf => this.areFunctionsMatch(lf, name, nameInterval, parameters)) ?? null;
    }

    private static areFunctionsMatch(lf: LogicalFunction, name: string, nameInterval: Interval, parameters: Array<ExpressionType>): boolean {
        const fd = lf.getDeclaration();
        return fd.name === name && fd.parameters.length === parameters.length &&
            this.areParametersMatch(fd, parameters) &&
            Helper.isALowerThanB(fd.interval, nameInterval);
    }

    private static areParametersMatch(fd: FunctionDeclaration, parameters: Array<ExpressionType>): boolean {
        for (let i = 0; i < parameters.length; i++) {
            if (fd.parameters[i].type?.declaration !== parameters[i].type) {
                return false;
            }
        }
        return true;
    }

    private static anyTypeOrVariable(name: string, nameInterval: Interval, scope: Scope): boolean {
        return scope.typeDeclarations.some(td => td.name === name && Helper.isALowerThanB(td.interval, nameInterval)) ||
            scope.variableDeclarations.some(fd => fd.name === name && Helper.isALowerThanB(fd.nameInterval, nameInterval));
    }

    //
    //function prototype
    //
    public static getFunctionPrototype(fpc: Function_prototypeContext, scope: Scope, di: DocumentInfo): FunctionDeclaration {
        this.initialize(fpc.function_header(), scope, di);
        const interval = Helper.getIntervalFromParserRule(fpc);
        const nameInterval = Helper.getIntervalFromTerminalNode(this.fhc.IDENTIFIER());
        const returnType = TypeUsageProcessor.getReturnType(this.fhc.type_usage(), this.scope.parent, di);
        const name = this.fhc.IDENTIFIER().text;
        const fd = new FunctionDeclaration(name, nameInterval, this.scope.parent, returnType, false, false, interval, this.scope);
        this.addParameters(fd);
        this.getLogicalFunction(fd).prototypes.push(fd);
        this.di.getRootScope().functionPrototypes.push(fd);
        return fd;
    }

    //
    //function definition
    //
    public static getFunctionDefinition(fdc: Function_definitionContext, scope: Scope, di: DocumentInfo): FunctionDeclaration {
        this.initialize(fdc.function_header(), scope, di);
        const interval = Helper.getIntervalFromParserRule(fdc);
        const nameInterval = Helper.getIntervalFromTerminalNode(this.fhc.IDENTIFIER());
        const returnType = TypeUsageProcessor.getReturnType(this.fhc.type_usage(), this.scope.parent, di);
        const name = this.fhc.IDENTIFIER().text;
        const fd = new FunctionDeclaration(name, nameInterval, this.scope.parent, returnType, false, false, interval, this.scope);
        this.addParameters(fd);
        this.getLogicalFunction(fd).definitions.push(fd);
        this.di.getRootScope().functionDefinitions.push(fd);
        return fd;
    }

    //
    //general
    //
    private static getLogicalFunction(fd: FunctionDeclaration): LogicalFunction {
        let lf = this.di.getRootScope().functions.find(lf => lf.connects(fd));
        if (!lf) {
            lf = new LogicalFunction();
            this.di.getRootScope().functions.push(lf);
        }
        fd.logicalFunction = lf;
        return lf;
    }

    private static addParameters(fd: FunctionDeclaration): void {
        const fplc = this.fhc.function_parameter_list();
        if (fplc && fplc.single_variable_declaration()) {
            for (const svdc of fplc.single_variable_declaration()) {
                const vd = VariableDeclarationProcessor.getParameterDeclaration(svdc, this.scope, this.di);
                fd.parameters.push(vd);
            }
        }
    }

}
