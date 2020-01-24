import { Helper } from './helper';
import { GlslDocumentInfo } from '../core/glsl-document-info';
import { Function_prototypeContext, Function_definitionContext, Function_headerContext } from '../_generated/AntlrGlslParser';
import { Scope } from '../scope/scope';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { LogicalFunction } from '../scope/function/logical-function';
import { TypeUsageHelper } from './type-usage-helper';
import { VariableDeclarationHelper } from './variable-declaration-helper';

export abstract class FunctionHelper {

    private static di: GlslDocumentInfo;
    private static scope: Scope;
    private static fhc: Function_headerContext;

    private static initialize(fhc: Function_headerContext, scope: Scope, di: GlslDocumentInfo): void {
        this.fhc = fhc;
        this.di = di;
        this.scope = scope;
    }

    //
    //function prototype
    //
    public static getFunctionPrototype(fpc: Function_prototypeContext, scope: Scope, di: GlslDocumentInfo): FunctionDeclaration {
        this.initialize(fpc.function_header(), scope, di);
        const interval = Helper.getIntervalFromParserRule(fpc);
        const nameInterval = Helper.getIntervalFromTerminalNode(this.fhc.IDENTIFIER());
        const signatureInterval = Helper.getIntervalFromParserRule(this.fhc);
        const returnType = TypeUsageHelper.getReturnType(this.fhc.type_usage(), this.scope.parent, di);
        const name = this.fhc.IDENTIFIER().text;
        const fd = new FunctionDeclaration(name, nameInterval, this.scope.parent, returnType, false, false, interval, signatureInterval);
        this.addParameters(fd);
        this.getLogicalFunction(fd).prototypes.push(fd);
        this.di.functionPrototypes.push(fd);
        return fd;
    }

    //
    //function definition
    //
    public static getFunctionDefinition(fdc: Function_definitionContext, scope: Scope, di: GlslDocumentInfo): FunctionDeclaration {
        this.initialize(fdc.function_header(), scope, di);
        const interval = Helper.getIntervalFromParserRule(fdc);
        const nameInterval = Helper.getIntervalFromTerminalNode(this.fhc.IDENTIFIER());
        const signatureInterval = Helper.getIntervalFromParserRule(this.fhc);
        const returnType = TypeUsageHelper.getReturnType(this.fhc.type_usage(), this.scope.parent, di);
        const name = this.fhc.IDENTIFIER().text;
        const fd = new FunctionDeclaration(name, nameInterval, this.scope.parent, returnType, false, false, interval, signatureInterval);
        this.addParameters(fd);
        this.getLogicalFunction(fd).definitions.push(fd);
        this.di.functionDefinitions.push(fd);
        return fd;
    }

    //
    //general
    //
    private static getLogicalFunction(fd: FunctionDeclaration): LogicalFunction {
        let lf = this.di.functions.find(lf => lf.connects(fd));
        if (!lf) {
            lf = new LogicalFunction();
            this.di.functions.push(lf);
        }
        fd.logicalFunction = lf;
        return lf;
    }

    private static addParameters(fd: FunctionDeclaration): void {
        const fplc = this.fhc.function_parameter_list();
        if (fplc && fplc.single_variable_declaration()) {
            for (const svdc of fplc.single_variable_declaration()) {
                const vd = VariableDeclarationHelper.getParameterDeclaration(svdc, this.scope, this.di);
                fd.parameters.push(vd);
            }
        }
    }

}
