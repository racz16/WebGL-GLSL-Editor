import { Interval } from '../../scope/interval';

export class VariableHelper {

    private static readonly rgba = ['r', 'g', 'b', 'a'];
    private static readonly xyzw = ['x', 'y', 'z', 'w'];
    private static readonly stpq = ['s', 't', 'p', 'q'];

    /*public static createVariableUsage(tn: TerminalNode, previousTu: TypeUsage, currentScope: Scope): VariableUsage {
        const name = tn.text;
        const interval = new Interval(tn.symbol.startIndex, tn.symbol.stopIndex + 1);
        const declaration = this.getVariableDeclaration(name, previousTu, currentScope);
        const vu = new VariableUsage(name, interval, declaration);
        this.setDeclarationUsage(vu);
        return vu;
    }

    private static getVariableDeclaration(variableName: string, previousTu: TypeUsage, currentScope: Scope): VariableDeclaration {
        if (previousTu === null) {
            const ret = this.getBuiltinVariableDeclaration(variableName);
            return ret === null ? this.getUserVariableDeclarationInScopes(variableName, currentScope) : ret;
        } else if (previousTu.declaration !== null) {
            const ret = this.getUserStructMemberVariableDeclaration(variableName, previousTu);
            return ret === null ? this.getSwizzleDeclaration(variableName, previousTu) : ret;
        }
        return null;
    }

    private static getBuiltinVariableDeclaration(variableName: string): VariableDeclaration {
        for (const vd of Builtin.VARIABLES.values()) {
            if (vd.name === variableName) {
                return vd;
            }
        }
        return null;
    }

    private static getUserVariableDeclarationInScopes(variableName: string, currentScope: Scope): VariableDeclaration {
        let scope: Scope = currentScope;
        while (scope !== null) {
            const vd = this.getUserVariableDeclarationInScope(variableName, scope);
            if (vd !== null) {
                return vd;
            }
            scope = scope.parent;
        }
        return null;
    }

    private static getUserVariableDeclarationInScope(variableName: string, currentScope: Scope): VariableDeclaration {
        for (const vd of currentScope.variableDeclarations) {
            if (vd.name === variableName) {
                return vd;
            }
        }
        return null;
    }

    private static getUserStructMemberVariableDeclaration(variableName: string, previousTu: TypeUsage): VariableDeclaration {
        const td = previousTu.declaration as TypeDeclaration;
        for (const vd of td.members) {
            if (variableName === vd.name) {
                return vd;
            }
        }
        return null;
    }

    private static getSwizzleDeclaration(variableName: string, previousTu: TypeUsage): VariableDeclaration {
        const declaration = previousTu.declaration as TypeDeclaration;
        if (declaration.typeCategory !== TypeCategory.TRANSPARENT || !declaration.isVector() || !this.isSwizzle(variableName, declaration.width)) {
            return null;
        }
        let typeName: string;
        if (variableName.length > 1) {
            const prefix = TypeHelper.typebaseToPrefix(declaration.typeBase);
            typeName = prefix + 'vec' + variableName.length;
        } else {
            typeName = declaration.typeBase.toString().toLowerCase();
        }
        const tu = null;//TypeHelper.createTypeUsageFromBuiltInTypeName(typeName, 0);
        const vd = new VariableDeclaration(variableName, Interval.NONE, true, true, tu, Interval.NONE);
        return vd;
    }

    private static isSwizzle(str: string, dimension: number): boolean {
        if (str.length < 1 || str.length > 4) {
            return false;
        }
        return this.allCharacterIsOneOf(str, this.stpq, dimension) +
            this.allCharacterIsOneOf(str, this.rgba, dimension) +
            this.allCharacterIsOneOf(str, this.xyzw, dimension) === 1;
    }

    private static allCharacterIsOneOf(str: string, chars: Array<string>, dim: number): number {
        for (let i = 0; i < str.length; i++) {
            let valid = false;
            for (let j = 0; j < dim; j++) {
                if (str.charAt(i) === chars[j]) {
                    valid = true;
                    break;
                }
            }
            if (!valid) {
                return 0;
            }
        }
        return 1;
    }

    private static setDeclarationUsage(vu: VariableUsage): void {
        if (vu.declaration) {
            vu.declaration.usages.push(vu);
        } else {
            if (!Scope.MACRO_DEFINITIONS.includes(vu.name)) {
                //ErrorHelper.addUndeclaredVariableUsageError(vu);
            }
        }
    }

    //
    //variable declaration------------------------------------------------------
    //

    public static createVariableDeclarationWithoutQualifiers(tu: TypeUsage, ctx: Variable_declarationContext, iooc: Identifier_optarray_optassignmentContext): VariableDeclaration {
        const nameInterval = new Interval(iooc.identifier_optarray().IDENTIFIER().symbol.startIndex, iooc.identifier_optarray().IDENTIFIER().symbol.stopIndex + 1);
        const declarationInterval = new Interval(ctx.start.startIndex, ctx.stop.stopIndex + 1);
        return new VariableDeclaration(iooc.identifier_optarray().IDENTIFIER().text, nameInterval, false, false, tu, declarationInterval);
    }

    public static createVariableDeclarationFromFunctionParameterWithoutQualifiers(tu: TypeUsage, fpc: Function_parameterContext): VariableDeclaration {
        let name: string = '';
        let nameInterval: Interval = Interval.NONE;
        if (fpc.identifier_optarray()) {
            const ioa = fpc.identifier_optarray() as Identifier_optarrayContext;
            name = ioa.IDENTIFIER().text;
            nameInterval = new Interval(ioa.IDENTIFIER().symbol.startIndex, ioa.IDENTIFIER().symbol.stopIndex + 1);
        }
        const declarationInterval = new Interval(fpc.start.startIndex, fpc.stop.stopIndex + 1);
        return new VariableDeclaration(name, nameInterval, false, false, tu, declarationInterval);
    }

    public static createMembers(currentScope: Scope, mdcs: Array<Member_declarationContext>): Array<VariableDeclaration> {
        const vds = new Array<VariableDeclaration>();
        for (const mdc of mdcs) {
            for (const ioc of mdc.member_declarator().identifier_optarray()) {
                vds.push(VariableHelper.createStructVariableDeclarationWithoutQualifiers(currentScope, mdc, ioc));
            }
        }
        return vds;
    }

    private static createStructVariableDeclarationWithoutQualifiers(currentScope: Scope, mdc: Member_declarationContext, ioc: Identifier_optarrayContext): VariableDeclaration {
        const tu = null;///TypeHelper.createTypeUsageWithoutQualifiers(currentScope, mdc.type(), mdc.array_subscript());
        //tu.setArrayDepth(tu.arrayDepth + Helper.getArrayDepth(ioc.array_subscript()));
        TypeHelper.addTypeUsageToScopeIfCustom(tu, currentScope);

        const name = ioc.IDENTIFIER().text;
        const nameInterval = new Interval(ioc.IDENTIFIER().symbol.startIndex, ioc.IDENTIFIER().symbol.stopIndex + 1);
        const declarationInterval = new Interval(mdc.start.startIndex, mdc.stop.stopIndex + 1);
        return new VariableDeclaration(name, nameInterval, false, false, tu, declarationInterval);
    }*/

}
