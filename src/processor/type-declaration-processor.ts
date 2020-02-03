import { TypeDeclaration } from '../scope/type/type-declaration';
import { Helper } from './helper';
import { TypeBase } from '../scope/type/type-base';
import { TypeCategory } from '../scope/type/type-category';
import { DocumentInfo } from '../core/document-info';
import { Scope } from '../scope/scope';
import { Interval } from '../scope/interval';
import { Type_declarationContext } from '../_generated/AntlrGlslParser';
import { VariableDeclarationProcessor } from './variable-declaration-processor';

export class TypeDeclarationProcessor {

    private static di: DocumentInfo;
    private static scope: Scope;

    private static tdc: Type_declarationContext;
    private static td: TypeDeclaration;

    private static initialize(scope: Scope, documentInfo: DocumentInfo): void {
        this.di = documentInfo;
        this.scope = scope;
    }

    public static getTypeDeclarationFrom(name: string, nameInterval: Interval, scope: Scope, di: DocumentInfo): TypeDeclaration {
        while (scope) {
            const td = scope.typeDeclarations.find(td => td.name === name && td.structInterval.stopIndex < nameInterval.startIndex);
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
        return scope.variableDeclarations.some(vd => vd.name === name && vd.declarationInterval.stopIndex < nameInterval.startIndex) ||
            scope.functionPrototypes.some(fp => fp.name === name && fp.signatureInterval.stopIndex < nameInterval.startIndex) ||
            scope.functionDefinitions.some(fd => fd.name === name && fd.signatureInterval.stopIndex < nameInterval.startIndex);
    }

    public static getTypeDeclaration(tdc: Type_declarationContext, scope: Scope, documentInfo: DocumentInfo, index: number): TypeDeclaration {
        this.initialize(scope, documentInfo);
        this.tdc = tdc;
        if (index !== 0) {
            return this.td;
        }
        const name = tdc.IDENTIFIER() ? tdc.IDENTIFIER().text : null;
        const nameInterval = Helper.getIntervalFromTerminalNode(tdc.IDENTIFIER());
        const structInterval = Helper.getIntervalFromParserRule(tdc);
        const typeBase = TypeBase.NONE;
        const typeCategory = TypeCategory.CUSTOM;
        const td = new TypeDeclaration(name, nameInterval, scope, false, structInterval, -1, -1, typeBase, typeCategory);
        scope.typeDeclarations.push(td);
        this.createInnerScope(structInterval);
        this.addMembers(td);
        if (index === 0) {
            this.td = td;
        }
        return td;
    }

    private static createInnerScope(structInterval: Interval): void {
        const innerScope = new Scope(structInterval, this.scope);
        this.scope.children.push(innerScope);
        this.scope = innerScope;
    }

    private static addMembers(td: TypeDeclaration): void {
        for (const vdc of this.tdc.variable_declaration()) {
            const vds = VariableDeclarationProcessor.getMemberDeclarations(vdc, this.scope, this.di);
            vds.forEach(vd => td.members.push(vd));
        }
    }

}
