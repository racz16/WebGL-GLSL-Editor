import { CompletionItemProvider, TextDocument, Position, CancellationToken, CompletionContext, ProviderResult, CompletionItem, CompletionList, CompletionItemKind, CompletionItemTag, MarkdownString } from 'vscode';
import { GlslProcessor } from '../core/glsl-processor';
import { GlslDocumentInfo } from '../core/glsl-document-info';
import { LogicalFunction } from '../scope/function/logical-function';
import { Scope } from '../scope/scope';
import { TypeCategory } from '../scope/type/type-category';
import { Helper } from '../helper/helper';

export class GlslCompletionProvider implements CompletionItemProvider {

    private documentInfo: GlslDocumentInfo;
    private document: TextDocument;
    private position: Position;
    private offset: number;
    private items: Array<CompletionItem>;

    //TODO:
    //online dokumentáció bevarázslása
    //amíg ez nincs, az aljára oda lehetne írni, hogy ez csak offline
    //kontextusfüggő ajánlás
    //például függvényen kívül ne ajánljunk függvényeket, úgyse tudjuk meghívni stb.
    //de legalább annyit, hogy a struct-ok memberjeit és a swizzle-ket elérjük

    public provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): ProviderResult<CompletionItem[] | CompletionList> {
        this.initialize(document, position);
        this.items = new Array<CompletionItem>();
        this.addFunctionCompletionItems();
        this.addKeywordCompletionItems();
        this.addQualifierCompletionItems();
        this.addTypeCompletionItems();
        this.addVariableCompletionItems();
        return this.items;
    }

    private initialize(document: TextDocument, position: Position): void {
        GlslProcessor.processDocument(document);
        this.documentInfo = GlslProcessor.getDocumentInfo(document.uri);
        this.document = document;
        this.position = position;
        this.offset = document.offsetAt(position);
    }

    //
    //function
    //
    private addFunctionCompletionItems(): void {
        for (const lf of this.documentInfo.functions) {
            const ci = this.getFunctionCompletionItem(lf);
            if (ci) {
                this.items.push(ci);
            }
        }
        const fs = new Set<string>();
        for (const fd of this.documentInfo.builtin.functions) {
            if (fs.has(fd.name)) {
                continue;
            }
            const kind = fd.ctor ? CompletionItemKind.Constructor : CompletionItemKind.Function;
            const ci = new CompletionItem(fd.name, kind);
            if (ci.label === 'dot' || ci.label === 'cross' || ci.label === 'texture') {
                ci.insertText = ci.label;
                ci.sortText = '*' + ci.label;
                ci.label = '★ ' + ci.label;
            }
            //ci.documentation = Helper.getSummary(fd);
            this.items.push(ci);
            fs.add(fd.name);
        }
    }

    private getFunctionCompletionItem(lf: LogicalFunction): CompletionItem {
        for (const fd of lf.definitions) {
            if (this.offset > fd.interval.stopIndex) {
                const ci = new CompletionItem(fd.name, CompletionItemKind.Function);
                ci.documentation = fd.toStringDocumentation();
                return ci;
            }
        }
        for (const fp of lf.prototypes) {
            if (this.offset > fp.interval.stopIndex) {
                const ci = new CompletionItem(fp.name, CompletionItemKind.Function);
                ci.documentation = fp.toStringDocumentation();
                return ci;
            }
        }
        return null;
    }

    //
    //keyword
    //
    private addKeywordCompletionItems(): void {
        for (const kw of this.documentInfo.builtin.keywords) {
            const ci = new CompletionItem(kw.name, CompletionItemKind.Keyword);
            ci.detail = 'Keyword';
            this.items.push(ci);
        }
    }

    //
    //qualifier
    //
    private addQualifierCompletionItems(): void {
        for (const q of this.documentInfo.builtin.qualifiers.values()) {
            const ci = new CompletionItem(q.name, CompletionItemKind.Keyword);
            ci.detail = 'Qualifier';
            this.items.push(ci);
        }
    }

    //
    //type
    //
    private addTypeCompletionItems(): void {
        this.addUserTypeCompletionItems(this.documentInfo.getRootScope());
        for (const td of this.documentInfo.builtin.types.values()) {
            const ci = new CompletionItem(td.name, CompletionItemKind.Class);
            if (td.typeCategory === TypeCategory.CUSTOM) {
                ci.documentation = new MarkdownString(td.toStringDocumentation());
            } else if (td.summary) {
                ci.documentation = td.summary;
            }
            ci.detail = 'Built-In Type';
            this.items.push(ci);
        }
    }

    private addUserTypeCompletionItems(scope: Scope): void {
        if (scope && (Helper.intervalToRange(scope.interval, this.document).contains(this.position) || scope.parent === null)) {
            for (const td of scope.typeDeclarations) {
                if (this.offset > td.structInterval.stopIndex) {
                    const ci = new CompletionItem(td.name, CompletionItemKind.Struct);
                    ci.documentation = new MarkdownString(td.toStringDocumentation());
                    ci.detail = 'Type';
                    this.items.push(ci);
                }
            }
            for (const childScope of scope.children) {
                this.addUserTypeCompletionItems(childScope);
            }
        }
    }

    //
    //variable
    //
    private addVariableCompletionItems(): void {
        this.addUserVariableCompletionItems(this.documentInfo.getRootScope());
        for (const vd of this.documentInfo.builtin.variables.values()) {
            const ci = new CompletionItem(vd.name, CompletionItemKind.Variable);
            ci.documentation = vd.summary;
            ci.detail = 'Built-In Variable';
            this.items.push(ci);
        }
    }

    private addUserVariableCompletionItems(scope: Scope): void {
        if (scope && (Helper.intervalToRange(scope.interval, this.document).contains(this.position) || scope.parent === null)) {
            for (const vd of scope.variableDeclarations) {
                if (this.offset > vd.declarationInterval.stopIndex) {
                    const ci = new CompletionItem(vd.name, CompletionItemKind.Variable);
                    ci.documentation = new MarkdownString(vd.toStringDocumentation());
                    ci.detail = 'Variable';
                    this.items.push(ci);
                }
            }
            for (const childScope of scope.children) {
                this.addUserVariableCompletionItems(childScope);
            }
        }
    }

}