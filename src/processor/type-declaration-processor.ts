import { TypeDeclaration } from '../scope/type/type-declaration';
import { Helper } from './helper';
import { TypeBase } from '../scope/type/type-base';
import { TypeCategory } from '../scope/type/type-category';
import { DocumentInfo } from '../core/document-info';
import { Scope } from '../scope/scope';
import { Interval } from '../scope/interval';
import { Type_declarationContext, Interface_block_declarationContext, Variable_declarationContext } from '../_generated/AntlrGlslParser';
import { VariableDeclarationProcessor } from './variable-declaration-processor';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { TypeUsage } from '../scope/type/type-usage';
import { ArrayUsage } from '../scope/array-usage';
import { LogicalFunction } from '../scope/function/logical-function';

export class TypeDeclarationProcessor {

    private di: DocumentInfo;
    private scope: Scope;

    private td: TypeDeclaration;

    private initialize(scope: Scope, documentInfo: DocumentInfo): void {
        this.di = documentInfo;
        this.scope = scope;
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

    //
    //interface block
    //
    public getInterfaceBlockDeclaration(ibdc: Interface_block_declarationContext, scope: Scope, di: DocumentInfo): TypeDeclaration {
        this.initialize(scope, di);
        const name = ibdc.IDENTIFIER() ? ibdc.IDENTIFIER().text : null;
        const nameInterval = Helper.getIntervalFromTerminalNode(ibdc.IDENTIFIER());
        const interval = new Interval(ibdc.start.startIndex, ibdc.RCB().symbol.stopIndex + 1);
        const typeBase = TypeBase.NONE;
        const typeCategory = TypeCategory.CUSTOM;
        const td = new TypeDeclaration(name, nameInterval, scope, false, interval, -1, -1, typeBase, typeCategory, true);
        scope.typeDeclarations.push(td);
        if (ibdc.identifier_optarray()) {
            this.createInnerScope(interval);
            this.addMembers(td, ibdc.variable_declaration());
            this.scope = this.scope.parent;
        } else {
            for (const vd of ibdc.variable_declaration()) {
                this.di.getVIsitor().visit(vd);
            }
        }
        return td;
    }

    //
    //type declaration
    //
    public getTypeDeclaration(tdc: Type_declarationContext, scope: Scope, documentInfo: DocumentInfo, index: number): TypeDeclaration {
        this.initialize(scope, documentInfo);
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
        this.addMembers(td, tdc.variable_declaration());
        this.scope = this.scope.parent;
        if (name) {
            this.createConstructor(td);
        }
        if (index === 0) {
            this.td = td;
        }
        return td;
    }

    private createConstructor(td: TypeDeclaration): void {
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

    private createInnerScope(interval: Interval): void {
        const innerScope = new Scope(interval, this.scope);
        this.scope.children.push(innerScope);
        this.scope = innerScope;
    }

    private addMembers(td: TypeDeclaration, vdcs: Array<Variable_declarationContext>): void {
        for (const vdc of vdcs) {
            const vds = new VariableDeclarationProcessor().getDeclarations(vdc, this.scope, this.di);
            vds.forEach(vd => td.members.push(vd));
        }
    }

}
