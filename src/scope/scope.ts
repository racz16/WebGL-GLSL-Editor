import { FunctionCall } from './function/function-call';
import { VariableDeclaration } from './variable/variable-declaration';
import { VariableUsage } from './variable/variable-usage';
import { TypeDeclaration } from './type/type-declaration';
import { TypeUsage } from './type/type-usage';
import { Interval } from './interval';
import { LogicalFunction } from './function/logical-function';
import { FunctionDeclaration } from './function/function-declaration';

export class Scope {

    public readonly parent: Scope;
    public readonly children = new Array<Scope>();
    public readonly interval: Interval;

    public readonly functions = new Array<LogicalFunction>();
    public readonly functionPrototypes = new Array<FunctionDeclaration>();
    public readonly functionDefinitions = new Array<FunctionDeclaration>();
    public readonly functionCalls = new Array<FunctionCall>();

    public readonly variableDeclarations = new Array<VariableDeclaration>();
    public readonly variableUsages = new Array<VariableUsage>();

    public readonly typeDeclarations = new Array<TypeDeclaration>();
    public readonly typeUsages = new Array<TypeUsage>();

    public readonly elseIfScope: boolean

    public constructor(interval: Interval, parent: Scope, elseIfScope = false) {
        this.interval = interval;
        this.parent = parent;
        this.elseIfScope = elseIfScope;
    }

    public isGlobal(): boolean {
        return !this.parent;
    }

}
