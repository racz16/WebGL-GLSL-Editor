import { TypeDeclaration } from '../../scope/type/type-declaration';
import { TypeBase } from '../../scope/type/type-base';
import { TypeUsage } from '../../scope/type/type-usage';
import { Scope } from '../../scope/scope';
import { Interval } from '../../scope/interval';
import { GlslDocumentInfo } from '../../core/glsl-document-info';


export class TypeHelper {

    /*public static typebaseToPrefix(typeBase: TypeBase): string {
        switch (typeBase) {
            case TypeBase.BOOL:
                return 'b';
            case TypeBase.INT:
                return 'i';
            case TypeBase.UINT:
                return 'u';
            default:
                return '';
        }
    }

    public static addTypeUsageToScopeIfCustom(tu: TypeUsage, currentScope: Scope): void {
        if (tu && tu.declaration && !tu.declaration.builtin) {
            currentScope.typeUsages.push(tu);
        }
    }

    public static areConvertible(td1: TypeDeclaration, td2: TypeDeclaration): boolean {
        return td1 !== null && td2 !== null && (td1.isConvertibleTo(td2) || td2.isConvertibleTo(td1));
    }

    public static getConversion(td1: TypeDeclaration, td2: TypeDeclaration): TypeDeclaration {
        if (td1 === null || td2 === null) {
            return null;
        }
        return this.getConversionUnsafe(td1, td2);
    }

    private static getConversionUnsafe(td1: TypeDeclaration, td2: TypeDeclaration): TypeDeclaration {
        if (td1.name === td2.name || td2.implicitConversions.includes(td1)) {
            return td1;
        }
        if (td1.implicitConversions.includes(td2)) {
            return td2;
        }
        return null;
    }*/

    //
    //type usage----------------------------------------------------------------
    //
    /*public static createTypeUsageFromBuiltInTypeName(typeName: string, arrayDepth: number): TypeUsage {
        const td = Builtin.TYPES.get(typeName);
        return new TypeUsage(typeName, Interval.NONE, arrayDepth, td ?? null);
    }

    public static createTypeUsageWithoutQualifiers(currentScope: Scope, vdc: Variable_declarationContext, asc: Array_subscriptContext): TypeUsage {
        const type = vdc.type();
        if (type) {
            return TypeHelper.createTypeUsageWithoutQualifiers2(currentScope, type, asc);
        } else {
            return TypeHelper.createTypeUsageWithoutQualifiers3(currentScope, vdc.struct_declaration().IDENTIFIER(), asc);
        }
    }

    public static createTypeUsageWithoutQualifiers2(scope: Scope, tc: TypeContext, asc: Array_subscriptContext): TypeUsage {
        const tn = tc.IDENTIFIER() !== null ? tc.IDENTIFIER() : tc.TYPE();
        return TypeHelper.createTypeUsageWithoutQualifiers3(scope, tn, asc);
    }

    public static createTypeUsageWithoutQualifiers3(scope: Scope, tn: TerminalNode, asc: Array_subscriptContext): TypeUsage {
        const arrayDepth = Helper.getArrayDepth(asc);
        const tu = new TypeUsage(tn.text, arrayDepth);
        tu.setNameStartIndex(tn.symbol.startIndex);
        tu.setNameStopIndex(tn.symbol.stopIndex + 1);
        this.setDeclaration(scope, tu);
        return tu;
    }*/



    /*public static setDeclaration(s: Scope, tu: TypeUsage): void {
        const td = this.getTypeDeclaration(s, tu.name);
        if (td === null) {
            //ErrorHelper.addUndeclaredTypeUsageError(tu);
        } else {
            //tu.setDeclaration(td);
            td.usages.push(tu);
        }
    }*/

    /*public static getTypeDeclaration(scope: Scope, type: string, di: GlslDocumentInfo): TypeDeclaration {
        while (scope !== null) {
            for (const td of scope.typeDeclarations) {
                if (td.name === type) {
                    return td;
                }
            }
            scope = scope.parent;
        }
        return di.builtin.types.get(type) ?? null;
    }*/

    //
    //type declaration----------------------------------------------------------
    //
    /*public static createTypeDeclaration(currentScope: Scope, ctx: Struct_declarationContext): TypeDeclaration {
        const nameInterval = new Interval(ctx.IDENTIFIER().symbol.startIndex, ctx.IDENTIFIER().symbol.stopIndex + 1);
        const structInterval = new Interval(ctx.start.startIndex, ctx.stop.stopIndex + 1);
        const td = new TypeDeclaration(ctx.IDENTIFIER().text, nameInterval, false, structInterval, -1, -1, TypeBase.NONE);
        this.setMembers(currentScope, td, ctx.member_declaration());
        //ErrorHelper.addIdentifierWarnings(td);
        return td;
    }

    private static setMembers(currentScope: Scope, td: TypeDeclaration, mdcs: Array<Member_declarationContext>): void {
        for (const vd of VariableHelper.createMembers(currentScope, mdcs)) {
            currentScope.variableDeclarations.push(vd);
            td.members.push(vd);
        }
    }*/

}
