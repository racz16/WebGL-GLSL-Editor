import { TypeDeclaration } from '../scope/type/type-declaration';
import { Helper } from './helper';
import { TypeBase } from '../scope/type/type-base';
import { TypeCategory } from '../scope/type/type-category';
import { DocumentInfo } from '../core/document-info';
import { Scope } from '../scope/scope';
import { Interval } from '../scope/interval';
import { Type_declarationContext } from '../_generated/AntlrGlslParser';
import { VariableDeclarationProcessor } from './variable-declaration-processor';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { TypeUsage } from '../scope/type/type-usage';
import { ArrayUsage } from '../scope/array-usage';
import { LogicalFunction } from '../scope/function/logical-function';

export class TypeDeclarationProcessor {

    private static di: DocumentInfo;
    private static scope: Scope;

    private static tdc: Type_declarationContext;
    private static td: TypeDeclaration;

    private static initialize(scope: Scope, documentInfo: DocumentInfo, tdc: Type_declarationContext): void {
        this.di = documentInfo;
        this.scope = scope;
        this.tdc = tdc;
    }

    public static searchTypeDeclaration(name: string, nameInterval: Interval, scope: Scope, di: DocumentInfo): TypeDeclaration {
        while (scope) {
            const td = scope.typeDeclarations.find(td => td.name === name && Helper.isALowerThanB(td.interval, nameInterval));
            if (td) {
                return td;
            } else if (this.anyVariableOrFunction(name, nameInterval, scope)) {
                return null;
            }
            scope = scope.parent;
        }
        return di.builtin.types.get(name) ?? null;
    }

    private static anyVariableOrFunction(name: string, nameInterval: Interval, scope: Scope): boolean {
        return scope.variableDeclarations.some(vd => vd.name === name && Helper.isALowerThanB(vd.declarationInterval, nameInterval)) ||
            scope.functionPrototypes.some(fp => fp.name === name && Helper.isALowerThanB(fp.interval, nameInterval)) ||
            scope.functionDefinitions.some(fd => fd.name === name && Helper.isALowerThanB(fd.interval, nameInterval));
    }

    public static getTypeDeclaration(tdc: Type_declarationContext, scope: Scope, documentInfo: DocumentInfo, index: number): TypeDeclaration {
        this.initialize(scope, documentInfo, tdc);
        if (index !== 0) {
            return this.td;
        }
        const name = tdc.IDENTIFIER() ? tdc.IDENTIFIER().text : null;
        const nameInterval = Helper.getIntervalFromTerminalNode(tdc.IDENTIFIER());
        const interval = Helper.getIntervalFromParserRule(tdc);
        const typeBase = TypeBase.NONE;
        const typeCategory = TypeCategory.CUSTOM;
        const td = new TypeDeclaration(name, nameInterval, scope, false, interval, -1, -1, typeBase, typeCategory);
        scope.typeDeclarations.push(td);
        this.createInnerScope(interval);
        this.addMembers(td);
        this.scope = this.scope.parent;
        if (name) {
            this.createConstructor(td);
        }
        if (index === 0) {
            this.td = td;
        }
        return td;
    }

    private static createConstructor(td: TypeDeclaration): void {
        const tu = new TypeUsage(td.name, td.nameInterval, td.nameInterval, this.scope, td, new ArrayUsage());
        const ctor = new FunctionDeclaration(td.name, td.nameInterval, this.scope, tu, false, true, td.interval, null);
        for (const vd of td.members) {
            ctor.parameters.push(vd);
        }
        const lf = new LogicalFunction();
        lf.prototypes.push(ctor);
        ctor.logicalFunction = lf;
        this.scope.functions.push(lf);
        this.scope.functionPrototypes.push(ctor);
    }

    private static createInnerScope(interval: Interval): void {
        const innerScope = new Scope(interval, this.scope);
        this.scope.children.push(innerScope);
        this.scope = innerScope;
    }

    private static addMembers(td: TypeDeclaration): void {
        for (const vdc of this.tdc.variable_declaration()) {
            const vds = VariableDeclarationProcessor.getDeclarations(vdc, this.scope, this.di);
            vds.forEach(vd => td.members.push(vd));
        }
    }

}
