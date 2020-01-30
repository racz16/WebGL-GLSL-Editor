import { RenameProvider, TextDocument, Position, CancellationToken, ProviderResult, WorkspaceEdit, Range } from 'vscode';
import { Helper } from '../helper/helper';
import { LogicalFunction } from '../scope/function/logical-function';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { PositionalProviderBase } from './positional-provider-base';
import { Interval } from '../scope/interval';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { FunctionCall } from '../scope/function/function-call';
import { VariableUsage } from '../scope/variable/variable-usage';
import { TypeUsage } from '../scope/type/type-usage';
import { GlslProcessor } from '../core/glsl-processor';

export class GlslRenameProvider extends PositionalProviderBase<Range> implements RenameProvider {

    //TODO: validáció

    private lf: LogicalFunction;
    private vd: VariableDeclaration;
    private td: TypeDeclaration;

    public provideRenameEdits(document: TextDocument, position: Position, newName: string, token: CancellationToken): ProviderResult<WorkspaceEdit> {
        this.document = document;
        this.position = position;
        this.validateRenameGeneral(newName);

        if (this.lf) {
            this.validateFunction(newName);
            const we = new WorkspaceEdit();
            for (const fp of this.lf.prototypes) {
                we.replace(document.uri, this.di.intervalToRange(fp.nameInterval), newName);
            }
            for (const fd of this.lf.definitions) {
                we.replace(document.uri, this.di.intervalToRange(fd.nameInterval), newName);
            }
            for (const fc of this.lf.calls) {
                we.replace(document.uri, this.di.intervalToRange(fc.nameInterval), newName);
            }
            return we;
        }

        if (this.vd) {
            this.validateStructOrVariable(newName);
            const we = new WorkspaceEdit();
            we.replace(document.uri, this.di.intervalToRange(this.vd.nameInterval), newName);
            for (const vu of this.vd.usages) {
                we.replace(document.uri, this.di.intervalToRange(vu.nameInterval), newName);
            }
            return we;
        }

        if (this.td) {
            this.validateStructOrVariable(newName);
            const we = new WorkspaceEdit();
            we.replace(document.uri, this.di.intervalToRange(this.td.nameInterval), newName);
            for (const tu of this.td.usages) {
                we.replace(document.uri, this.di.intervalToRange(tu.nameInterval), newName);
            }
            return we;
        }

        return null;
    }

    private validateRenameGeneral(newName: string): void {
        if (!GlslProcessor.CONFIGURATIONS.getStrictRename()) {
            return;
        }
        if (newName.length > 1024) {
            throw new Error(`The length of identifier '${newName}' is greater than 1024`);
        }
        if (newName.startsWith('gl_')) {
            throw new Error(`Identifier '${newName}' starts with 'gl_'`);
        }
        if (!new RegExp('^[_a-zA-Z][_a-zA-Z0-9]*$').test(newName)) {
            throw new Error(`Identifier '${newName}' contains illegal character(s) or starts with a digit`);
        }
        this.validateAlreadyDefinedStructOrVariable(newName);
        this.validateBuiltin(newName);
    }

    private validateAlreadyDefinedStructOrVariable(newName: string): void {
        const scope = this.di.getScopeAt(this.position);
        if (scope.variableDeclarations.find(vd => vd.name === newName)) {
            throw new Error(`Variable '${newName}' is already definied`);
        }
        if (scope.typeDeclarations.find(td => td.name === newName)) {
            throw new Error(`Struct '${newName}' is already definied`);
        }
    }

    private validateBuiltin(newName: string): void {
        if (this.di.builtin.types.has(newName)) {
            throw new Error(`Identifier '${newName}' is the name of a builtin type`);
        }
        if (this.di.builtin.qualifiers.has(newName)) {
            throw new Error(`Identifier '${newName}' is the name of a qualifier`);
        }
        if (this.di.builtin.reservedWords.includes(newName)) {
            throw new Error(`Identifier '${newName}' is a reserved word`);
        }
        for (const keyword of this.di.builtin.keywords) {
            if (keyword.name === newName) {
                throw new Error(`Identifier '${newName}' is the name of a keyword`);
            }
        }
    }

    private validateStructOrVariable(newName: string): void {
        if (!GlslProcessor.CONFIGURATIONS.getStrictRename()) {
            return;
        }
        const scope = this.di.getScopeAt(this.position);
        if (scope.isGlobal() && this.di.functionPrototypes.find(fp => fp.name === newName)) {
            throw new Error(`Function '${newName}' is already definied`);
        }
        if (scope.isGlobal() && this.di.functionDefinitions.find(fd => fd.name === newName)) {
            throw new Error(`Function '${newName}' is already definied`);
        }
        if (scope.isGlobal() && this.di.builtin.functionSummaries.has(newName)) {
            throw new Error(`Function '${newName}' is already definied`);
        }
    }

    private validateFunction(newName: string): void {
        if (!GlslProcessor.CONFIGURATIONS.getStrictRename()) {
            return;
        }
        const fd = this.lf.definitions.length ? this.lf.definitions[0] : this.lf.prototypes[0];
        for (const lf2 of this.di.functions) {
            if (this.lf !== lf2) {
                const fd2 = lf2.definitions.length ? lf2.definitions[0] : lf2.prototypes[0];
                if (newName === fd2.name && fd.parameters.length === fd2.parameters.length && fd.areParametersConnectableWith(fd2)) {
                    if (this.lf.definitions.length && lf2.definitions.length) {
                        throw new Error(`Function '${newName}' is already definied`);
                    }
                    if (fd.returnType.declaration !== fd2.returnType.declaration) {
                        throw new Error(`Function '${newName}' has a different return type`);
                    }
                    for (let i = 0; i < fd.parameters.length; i++) {
                        const p = fd.parameters[i];
                        const p2 = fd2.parameters[i];
                        if (!p.type.qualifiersEqualsExceptPrecisionWith(p2.type)) {
                            throw new Error(`Function '${newName}' has different qualifiers`);
                        }
                    }
                }
            }
        }
        for (const fd2 of this.di.builtin.functions) {
            if (newName === fd2.name && fd.parameters.length === fd2.parameters.length && fd.areParametersConnectableWith(fd2)) {
                throw new Error(`Overriding built-in function '${newName}' is illegal`);
            }
        }
    }

    private validateParameter(): void { }

    //
    //prepare
    //
    public prepareRename(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Range | { range: Range, placeholder: string }> {
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
            this.processFunction(fc.logicalFunction, fc.nameInterval);
        }
        return this.defaultReturn();
    }

    protected processVariableDeclaration(vd: VariableDeclaration): Range {
        this.vd = vd;
        return this.di.intervalToRange(vd.nameInterval);
    }

    protected processVariableUsage(vu: VariableUsage): Range {
        if (vu.declaration && !vu.declaration.builtin) {
            this.vd = vu.declaration;
            return this.di.intervalToRange(vu.nameInterval);
        }
        return this.defaultReturn();
    }

    protected processTypeDeclaration(td: TypeDeclaration): Range {
        this.td = td;
        return this.di.intervalToRange(td.nameInterval);
    }

    protected processTypeUsage(tu: TypeUsage): Range {
        if (tu.declaration && !tu.declaration.builtin) {
            this.td = tu.declaration;
            return this.di.intervalToRange(tu.nameInterval);
        }
        return this.defaultReturn();
    }

    protected defaultReturn(): Range {
        throw new Error(`Can't rename this token`);
    }

    private processFunction(lf: LogicalFunction, nameInterval: Interval): Range {
        this.lf = lf;
        return this.di.intervalToRange(nameInterval);
    }

}