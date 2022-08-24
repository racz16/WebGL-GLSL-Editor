import { RenameProvider, TextDocument, Position, CancellationToken, ProviderResult, WorkspaceEdit, Range } from 'vscode';
import { LogicalFunction } from '../scope/function/logical-function';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { PositionalProviderBase } from './helper/positional-provider-base';
import { Interval } from '../scope/interval';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { FunctionCall } from '../scope/function/function-call';
import { VariableUsage } from '../scope/variable/variable-usage';
import { TypeUsage } from '../scope/type/type-usage';
import { GlslEditor } from '../core/glsl-editor';
import { Scope } from '../scope/scope';

export class GlslRenameProvider extends PositionalProviderBase<Range> implements RenameProvider {
    private lf: LogicalFunction;
    private vd: VariableDeclaration;
    private td: TypeDeclaration;
    private scope: Scope;
    private newName: string;

    private initializeRename(document: TextDocument, position: Position, newName: string): void {
        this.initialize(document, position);
        this.newName = newName;
    }

    public provideRenameEdits(
        document: TextDocument,
        position: Position,
        newName: string,
        token: CancellationToken
    ): ProviderResult<WorkspaceEdit> {
        this.initializeRename(document, position, newName);
        this.validateGeneral();
        if (this.lf) {
            return this.renameFunction();
        } else if (this.vd) {
            return this.renameVariable();
        } else if (this.td) {
            return this.renameType();
        }
        return null;
    }

    //
    //rename
    //
    private renameFunction(): WorkspaceEdit {
        this.validateFunction();
        const we = new WorkspaceEdit();
        for (const fp of this.lf.prototypes) {
            this.rename(we, fp.nameInterval);
        }
        for (const fd of this.lf.definitions) {
            this.rename(we, fd.nameInterval);
        }
        for (const fc of this.lf.calls) {
            this.rename(we, fc.nameInterval);
        }
        return we;
    }

    private renameVariable(): WorkspaceEdit {
        this.validateStructOrVariable();
        const we = new WorkspaceEdit();
        this.rename(we, this.vd.nameInterval);
        for (const vu of this.vd.usages) {
            this.rename(we, vu.nameInterval);
        }
        return we;
    }

    private renameType(): WorkspaceEdit {
        this.validateStructOrVariable();
        const we = new WorkspaceEdit();
        this.rename(we, this.td.nameInterval);
        for (const tu of this.td.usages) {
            this.rename(we, tu.nameInterval);
        }
        for (const fc of this.td.ctorCalls) {
            this.rename(we, fc.nameInterval);
        }
        return we;
    }

    private rename(we: WorkspaceEdit, interval: Interval): void {
        if (interval && !interval.isInjected()) {
            we.replace(this.document.uri, this.di.intervalToRange(interval), this.newName);
        }
    }

    //
    //validate
    //
    private validateGeneral(): void {
        if (!GlslEditor.CONFIGURATIONS.getStrictRename()) {
            return;
        }
        if (this.newName.length > 1024) {
            throw new Error(`The length of identifier '${this.newName}' is greater than 1024`);
        }
        if (this.newName.startsWith('gl_')) {
            throw new Error(`Identifier '${this.newName}' starts with 'gl_'`);
        }
        if (!new RegExp('^[_a-zA-Z][_a-zA-Z0-9]*$').test(this.newName)) {
            throw new Error(`Identifier '${this.newName}' contains illegal character(s) or starts with a digit`);
        }
        this.validateDefinedStructOrVariable();
        this.validateBuiltin();
    }

    private validateDefinedStructOrVariable(): void {
        if (this.scope.variableDeclarations.find((vd) => vd.name === this.newName)) {
            throw new Error(`Variable '${this.newName}' is already definied`);
        }
        if (this.scope.typeDeclarations.find((td) => td.name === this.newName)) {
            throw new Error(`Struct '${this.newName}' is already definied`);
        }
    }

    private validateBuiltin(): void {
        if (this.di.builtin.types.has(this.newName)) {
            throw new Error(`Identifier '${this.newName}' is the name of a builtin type`);
        }
        if (this.di.builtin.qualifiers.has(this.newName)) {
            throw new Error(`Identifier '${this.newName}' is the name of a qualifier`);
        }
        if (this.di.builtin.reservedWords.includes(this.newName)) {
            throw new Error(`Identifier '${this.newName}' is a reserved word`);
        }
        for (const keyword of this.di.builtin.keywords) {
            if (keyword.name === this.newName) {
                throw new Error(`Identifier '${this.newName}' is the name of a keyword`);
            }
        }
    }

    private validateStructOrVariable(): void {
        if (!GlslEditor.CONFIGURATIONS.getStrictRename()) {
            return;
        }
        if (this.scope.isGlobal() && this.di.getRootScope().functionPrototypes.find((fp) => fp.name === this.newName)) {
            throw new Error(`Function '${this.newName}' is already definied`);
        }
        if (this.scope.isGlobal() && this.di.getRootScope().functionDefinitions.find((fd) => fd.name === this.newName)) {
            throw new Error(`Function '${this.newName}' is already definied`);
        }
        if (this.scope.isGlobal() && this.di.builtin.functionSummaries.has(this.newName)) {
            throw new Error(`Function '${this.newName}' is already definied`);
        }
    }

    private validateFunction(): void {
        if (!GlslEditor.CONFIGURATIONS.getStrictRename()) {
            return;
        }
        const fd = this.lf.definitions.length ? this.lf.definitions[0] : this.lf.prototypes[0];
        for (const lf2 of this.di.getRootScope().functions) {
            if (this.lf !== lf2) {
                const fd2 = lf2.definitions.length ? lf2.definitions[0] : lf2.prototypes[0];
                this.validateFunctionWithOtherFunction(fd, fd2);
            }
        }
        for (const lf of this.di.builtin.functions) {
            const fd2 = lf.getDeclaration();
            if (this.newName === fd2.name && fd.parameters.length === fd2.parameters.length && fd.areParametersConnectableWith(fd2)) {
                throw new Error(`Overriding built-in function '${this.newName}' is illegal`);
            }
        }
    }

    private validateFunctionWithOtherFunction(fd: FunctionDeclaration, fd2: FunctionDeclaration): void {
        if (this.newName === fd2.name && fd.parameters.length === fd2.parameters.length && fd.areParametersConnectableWith(fd2)) {
            if (this.lf.definitions.length && fd2.logicalFunction.definitions.length) {
                throw new Error(`Function '${this.newName}' is already definied`);
            }
            if (this.di.isGlsl100es() && this.lf.prototypes.length && fd2.logicalFunction.prototypes.length) {
                throw new Error(`Function '${this.newName}' is already declared`);
            }
            if (fd.returnType.declaration !== fd2.returnType.declaration) {
                throw new Error(`Function '${this.newName}' has a different return type`);
            }
            for (let i = 0; i < fd.parameters.length; i++) {
                const p = fd.parameters[i];
                const p2 = fd2.parameters[i];
                if (!p.type.qualifiersEqualsExceptPrecisionWith(p2.type)) {
                    throw new Error(`Function '${this.newName}' has different qualifiers`);
                }
            }
        }
    }

    //
    //prepare
    //
    public prepareRename(
        document: TextDocument,
        position: Position,
        token: CancellationToken
    ): ProviderResult<Range | { range: Range; placeholder: string }> {
        this.lf = null;
        this.vd = null;
        this.td = null;
        return this.processElements(document, position);
    }

    protected processFunctionPrototype(fp: FunctionDeclaration): Range {
        return this.processFunction(fp.logicalFunction, fp.nameInterval);
    }

    protected processFunctionDefinition(fd: FunctionDeclaration): Range {
        return this.processFunction(fd.logicalFunction, fd.nameInterval);
    }

    protected processFunctionCall(fc: FunctionCall): Range {
        if (!fc.builtin) {
            const fd = fc.logicalFunction.getDeclaration();
            if (fd.ctor) {
                return this.processTypeDeclaration(fd.returnType.declaration, fc.nameInterval);
            } else {
                return this.processFunction(fc.logicalFunction, fc.nameInterval);
            }
        }
        return this.defaultReturn();
    }

    protected processVariableDeclaration(vd: VariableDeclaration): Range {
        if (!vd.declarationInterval.isInjected()) {
            this.vd = vd;
            this.scope = vd.scope;
            return this.di.intervalToRange(vd.nameInterval);
        }
        return this.defaultReturn();
    }

    protected processVariableUsage(vu: VariableUsage): Range {
        if (vu.declaration && !vu.declaration.builtin && !vu.declaration.nameInterval.isInjected()) {
            this.vd = vu.declaration;
            this.scope = vu.scope;
            return this.di.intervalToRange(vu.nameInterval);
        }
        return this.defaultReturn();
    }

    protected processTypeDeclaration(td: TypeDeclaration, interval: Interval = null): Range {
        if (!td.interval.isInjected()) {
            this.td = td;
            this.scope = td.scope;
            return this.di.intervalToRange(interval || td.nameInterval);
        }
        return this.defaultReturn();
    }

    protected processTypeUsage(tu: TypeUsage): Range {
        if (tu.declaration && !tu.declaration.builtin && !tu.declaration.interval.isInjected()) {
            this.td = tu.declaration;
            this.scope = tu.scope;
            return this.di.intervalToRange(tu.nameInterval);
        }
        return this.defaultReturn();
    }

    private processFunction(lf: LogicalFunction, nameInterval: Interval): Range {
        if (!lf.prototypes.some((fp) => fp.interval.isInjected()) && !lf.definitions.some((fd) => fd.interval.isInjected())) {
            this.lf = lf;
            this.scope = lf.getDeclaration().scope;
            return this.di.intervalToRange(nameInterval);
        }
        return this.defaultReturn();
    }

    protected defaultReturn(): Range {
        throw new Error(`Can't rename this token`);
    }
}
