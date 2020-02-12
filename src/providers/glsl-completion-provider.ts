import { CompletionItemProvider, TextDocument, Position, CancellationToken, CompletionContext, ProviderResult, CompletionItem, CompletionList, CompletionItemKind, MarkdownString } from 'vscode';
import { GlslEditor } from '../core/glsl-editor';
import { DocumentInfo } from '../core/document-info';
import { LogicalFunction } from '../scope/function/logical-function';
import { Scope } from '../scope/scope';
import { TypeCategory } from '../scope/type/type-category';
import { ShaderStage } from '../scope/shader-stage';
import { Helper } from '../processor/helper';

export class GlslCompletionProvider implements CompletionItemProvider {

    private di: DocumentInfo;
    private position: Position;
    private offset: number;
    private items: Array<CompletionItem>;

    //TODO:
    //struct members, swizzle

    //context based completion

    private initialize(document: TextDocument, position: Position): void {
        GlslEditor.processDocument(document);
        this.di = GlslEditor.getDocumentInfo(document.uri);
        this.position = position;
        this.offset = document.offsetAt(position);
    }

    public provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): ProviderResult<CompletionItem[] | CompletionList> {
        this.initialize(document, position);
        this.items = new Array<CompletionItem>();
        const scope = this.di.getScopeAt(this.position);
        this.addKeywordAndQualifierItems();
        this.addItems(scope);
        return this.items;
    }

    //
    //builtin items
    //
    private addKeywordAndQualifierItems(): void {
        this.addKeywordItems();
        this.addQualifierItems();
    }

    private addBuiltinItems(localItems: Array<CompletionItem>): void {
        this.addBuiltinTypes(localItems);
        this.addBuiltinVariables(localItems);
        this.addBuiltinFunctionItems(localItems);
    }

    //
    //keywords
    //
    private addKeywordItems(): void {
        for (const kw of this.di.builtin.keywords) {
            if (this.isAvailableInThisStage(kw.stage)) {
                const ci = new CompletionItem(kw.name, CompletionItemKind.Keyword);
                this.items.push(ci);
            }
        }
    }

    //
    //qualifiers
    //
    private addQualifierItems(): void {
        for (const q of this.di.builtin.qualifiers.values()) {
            const ci = new CompletionItem(q.name, CompletionItemKind.Keyword);
            this.items.push(ci);
        }
        for (const param of this.di.builtin.layoutParameters) {
            const ci = new CompletionItem(param, CompletionItemKind.EnumMember);
            this.items.push(ci);
        }
    }

    //
    //builtin types
    //
    private addBuiltinTypes(localItems: Array<CompletionItem>): void {
        for (const td of this.di.builtin.types.values()) {
            if (!this.items.some(ci => this.getName(ci) === td.name)) {
                const ci = new CompletionItem(td.name, CompletionItemKind.Class);
                if (td.typeCategory === TypeCategory.CUSTOM) {
                    ci.documentation = new MarkdownString(td.toStringDocumentation());
                    ci.detail = 'Built-In Type';
                }
                localItems.push(ci);
            }
        }
    }

    //
    //builtin variables
    //
    private addBuiltinVariables(localItems: Array<CompletionItem>): void {
        for (const vd of this.di.builtin.variables.values()) {
            if (this.isAvailableInThisStage(vd.stage) && !this.items.some(ci => this.getName(ci) === vd.name)) {
                const ci = new CompletionItem(vd.name, CompletionItemKind.Variable);
                ci.documentation = vd.summary;
                ci.detail = 'Built-In Variable';
                localItems.push(ci);
            }
        }
    }

    //
    //builtin functions
    //
    private addBuiltinFunctionItems(localItems: Array<CompletionItem>): void {
        for (const func of this.di.builtin.functionSummaries.values()) {
            if (this.isAvailableInThisStage(func.stage) && !this.items.some(ci => this.getName(ci) === func.name)) {
                const kind = func.ctor ? CompletionItemKind.Constructor : CompletionItemKind.Function;
                const ci = new CompletionItem(func.name, kind);
                if (this.di.builtin.importantFunctions.includes(ci.label)) {
                    this.makeItImportant(ci);
                }
                ci.detail = func.ctor ? null : 'Built-In Function';
                ci.documentation = func.summary;
                localItems.push(ci);
            }
        }
    }

    private makeItImportant(ci: CompletionItem): void {
        ci.insertText = ci.label;
        ci.filterText = ci.label;
        ci.sortText = '*' + ci.label;
        ci.label = '★ ' + ci.label;
    }

    //
    //user items
    //
    private addItems(scope: Scope): void {
        if (scope) {
            const localItems = new Array<CompletionItem>();
            this.addUserTypeItems(scope, localItems);
            this.addUserVariableItems(scope, localItems);
            this.addUserFunctionItems(scope, localItems);
            if (scope.isGlobal()) {
                this.addBuiltinItems(localItems);
            }
            this.items = this.items.concat(localItems);
            this.addItems(scope.parent);
        }
    }

    //
    //user types
    //
    private addUserTypeItems(scope: Scope, localItems: Array<CompletionItem>): void {
        for (const td of scope.typeDeclarations) {
            if (Helper.isALowerThanOffset(td.interval, this.offset) && !this.items.some(ci => this.getName(ci) === td.name)) {
                const ci = new CompletionItem(td.name, CompletionItemKind.Struct);
                ci.documentation = new MarkdownString(td.toStringDocumentation());
                ci.detail = 'Type';
                localItems.push(ci);
            }
        }
    }

    //
    //user variables
    //
    private addUserVariableItems(scope: Scope, localItems: Array<CompletionItem>): void {
        for (const vd of scope.variableDeclarations) {
            if (Helper.isALowerThanOffset(vd.declarationInterval, this.offset) && !this.items.some(ci => this.getName(ci) === vd.name)) {
                const ci = new CompletionItem(vd.name, CompletionItemKind.Variable);
                ci.documentation = new MarkdownString(vd.toStringDocumentation());
                ci.detail = 'Variable';
                localItems.push(ci);
            }
        }
    }

    //
    //user functions
    //
    private addUserFunctionItems(scope: Scope, localItems: Array<CompletionItem>): void {
        for (const lf of scope.functions) {
            if (!this.items.some(ci => this.getName(ci) === lf.getDeclaration().name)) {
                const ci = this.getFunctionCompletionItem(lf);
                if (ci) {
                    localItems.push(ci);
                }
            }
        }
    }

    private getFunctionCompletionItem(lf: LogicalFunction): CompletionItem {
        for (const fd of lf.definitions) {
            if (Helper.isALowerThanOffset(fd.interval, this.offset)) {
                return new CompletionItem(fd.name, CompletionItemKind.Function);
            }
        }
        for (const fp of lf.prototypes) {
            if (Helper.isALowerThanOffset(fp.interval, this.offset)) {
                return new CompletionItem(fp.name, CompletionItemKind.Function);
            }
        }
        return null;
    }

    //
    //general
    //
    private isAvailableInThisStage(stage: ShaderStage): boolean {
        return stage === ShaderStage.DEFAULT || stage === this.di.getShaderStage();
    }

    private getName(ci: CompletionItem): string {
        return ci.filterText ?? ci.label;
    }

}