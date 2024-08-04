import {
    Interface_block_declarationContext,
    Type_declarationContext,
    Variable_declarationContext,
} from '../_generated/AntlrGlslParser';
import { Constants } from '../core/constants';
import { DocumentInfo } from '../core/document-info';
import { ArrayUsage } from '../scope/array-usage';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { LogicalFunction } from '../scope/function/logical-function';
import { Interval } from '../scope/interval';
import { SemanticRegion, SemanticType } from '../scope/regions/semantic-region';
import { Scope } from '../scope/scope';
import { TypeBase } from '../scope/type/type-base';
import { TypeCategory } from '../scope/type/type-category';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { TypeUsage } from '../scope/type/type-usage';
import { Helper } from './helper';
import { VariableDeclarationProcessor } from './variable-declaration-processor';

export class TypeDeclarationProcessor {
    private di: DocumentInfo;
    private scope: Scope;

    private td: TypeDeclaration;

    private initialize(scope: Scope, documentInfo: DocumentInfo): void {
        this.di = documentInfo;
        this.scope = scope;
    }

    public static searchTypeDeclaration(
        name: string,
        nameInterval: Interval,
        scope: Scope,
        di: DocumentInfo
    ): TypeDeclaration {
        while (scope) {
            const td = scope.typeDeclarations.find(
                (td) => td.name === name && Helper.isALowerThanB(td.interval, nameInterval)
            );
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
        return (
            scope.variableDeclarations.some(
                (vd) => vd.name === name && Helper.isALowerThanB(vd.declarationInterval, nameInterval)
            ) ||
            scope.functionPrototypes.some(
                (fp) => fp.name === name && Helper.isALowerThanB(fp.interval, nameInterval)
            ) ||
            scope.functionDefinitions.some((fd) => fd.name === name && Helper.isALowerThanB(fd.interval, nameInterval))
        );
    }

    //
    //interface block
    //
    public getInterfaceBlockDeclaration(
        ibdc: Interface_block_declarationContext,
        scope: Scope,
        di: DocumentInfo
    ): TypeDeclaration {
        this.initialize(scope, di);
        const name = ibdc.IDENTIFIER() ? ibdc.IDENTIFIER().text : null;
        const nameInterval = Helper.getIntervalFromTerminalNode(ibdc.IDENTIFIER(), this.di);
        const interval = new Interval(ibdc.start.startIndex, ibdc.RCB().symbol.stopIndex + 1, this.di);
        const typeBase = TypeBase.NONE;
        const typeCategory = TypeCategory.CUSTOM;
        const td = new TypeDeclaration(
            name,
            nameInterval,
            scope,
            false,
            interval,
            Constants.INVALID,
            Constants.INVALID,
            typeBase,
            typeCategory,
            true
        );
        di.getRegions().typeDeclarationRegions.push(new Interval(ibdc.start.startIndex, ibdc.stop.stopIndex, di));
        scope.typeDeclarations.push(td);
        if (name) {
            this.di
                .getRegions()
                .semanticRegions.push(new SemanticRegion(ibdc.IDENTIFIER().symbol, SemanticType.USER_TYPE));
        }
        if (ibdc.identifier_optarray()) {
            this.createInnerScope(ibdc);
            this.addMembers(td, ibdc.variable_declaration());
            this.scope = this.scope.parent;
        } else {
            this.di
                .getRegions()
                .scopelessInterfaceBlockRegions.push(
                    new Interval(ibdc.LCB().symbol.stopIndex + 1, ibdc.RCB().symbol.startIndex, this.di)
                );
            for (const vdc of ibdc.variable_declaration()) {
                const vds = new VariableDeclarationProcessor().getDeclarations(vdc, this.scope, this.di);
                vds.forEach((vd) => td.interfaceMembers.push(vd));
            }
        }
        return td;
    }

    //
    //type declaration
    //
    public getTypeDeclaration(
        tdc: Type_declarationContext,
        scope: Scope,
        documentInfo: DocumentInfo,
        index: number,
        parameter: boolean,
        returnType: boolean
    ): TypeDeclaration {
        this.initialize(scope, documentInfo);
        Helper.addFoldingRegionFromTokens(this.di, tdc.KW_STRUCT().symbol, tdc.RCB().symbol);
        if (index !== 0) {
            return this.td;
        }
        const name = tdc.IDENTIFIER() ? tdc.IDENTIFIER().text : null;
        const nameInterval = Helper.getIntervalFromTerminalNode(tdc.IDENTIFIER(), this.di);
        const interval = Helper.getIntervalFromParserRule(tdc, this.di);
        const typeBase = TypeBase.NONE;
        const typeCategory = TypeCategory.CUSTOM;
        const td = new TypeDeclaration(
            name,
            nameInterval,
            scope,
            false,
            interval,
            Constants.INVALID,
            Constants.INVALID,
            typeBase,
            typeCategory,
            false,
            returnType || parameter
        );
        this.di
            .getRegions()
            .typeDeclarationRegions.push(new Interval(tdc.start.startIndex, tdc.stop.stopIndex, this.di));
        if (parameter) {
            this.di.getRootScope().typeDeclarations.push(td);
        } else {
            scope.typeDeclarations.push(td);
        }
        this.createInnerScope(tdc);
        this.addMembers(td, tdc.variable_declaration());
        this.scope = this.scope.parent;
        if (name) {
            this.createConstructor(td);
            this.di
                .getRegions()
                .semanticRegions.push(new SemanticRegion(tdc.IDENTIFIER().symbol, SemanticType.USER_TYPE));
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

    private createInnerScope(ctx: Type_declarationContext | Interface_block_declarationContext): void {
        const interval = new Interval(ctx.LCB().symbol.stopIndex + 1, ctx.RCB().symbol.startIndex, this.di);
        const innerScope = new Scope(interval, this.scope);
        this.scope.children.push(innerScope);
        this.scope = innerScope;
    }

    private addMembers(td: TypeDeclaration, vdcs: Array<Variable_declarationContext>): void {
        for (const vdc of vdcs) {
            const vds = new VariableDeclarationProcessor().getDeclarations(vdc, this.scope, this.di);
            vds.forEach((vd) => td.members.push(vd));
        }
    }
}
