import {
    CancellationToken,
    CompletionContext,
    CompletionItem,
    CompletionItemKind,
    CompletionItemLabel,
    CompletionItemProvider,
    CompletionList,
    CompletionTriggerKind,
    MarkdownString,
    Position,
    ProviderResult,
    TextDocument,
} from 'vscode';
import { AntlrGlslLexer } from '../_generated/AntlrGlslLexer';
import { Constants } from '../core/constants';
import { DocumentInfo } from '../core/document-info';
import { GlslEditor } from '../core/glsl-editor';
import { Helper } from '../processor/helper';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { FunctionInfo } from '../scope/function/function-info';
import { LogicalFunction } from '../scope/function/logical-function';
import { CompletionRegion } from '../scope/regions/completion-region';
import { PreprocessorRegion } from '../scope/regions/preprocessor-region';
import { Scope } from '../scope/scope';
import { ShaderStage } from '../scope/shader-stage';
import { TypeCategory } from '../scope/type/type-category';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { PreprocessorCompletionContext } from './helper/preprocessor-completion-context';

export class GlslCompletionProvider implements CompletionItemProvider {
    private di: DocumentInfo;
    private position: Position;
    private context: CompletionContext;
    private offset: number;
    private items: Array<CompletionItem>;

    private initialize(document: TextDocument, position: Position, context: CompletionContext): void {
        GlslEditor.processElements(document);
        this.di = GlslEditor.getDocumentInfo(document.uri);
        this.position = position;
        this.context = context;
        this.offset = this.di.positionToOffset(this.position);
        this.items = new Array<CompletionItem>();
    }

    public provideCompletionItems(
        document: TextDocument,
        position: Position,
        token: CancellationToken,
        context: CompletionContext
    ): ProviderResult<CompletionItem[] | CompletionList> {
        this.initialize(document, position, context);
        if (!this.isCompletionTriggeredByFloatingPoint() && !this.isInCommentRegion()) {
            this.addCompletionItems();
        }
        return this.items;
    }

    private addCompletionItems(): void {
        const mr = this.getPreprocessorRegion();
        if (mr) {
            this.addPreprocessorCompletionItems(mr);
        } else if (this.isInLayoutQualifier()) {
            this.addLayoutQualifierParameterCompletionItems();
        } else {
            this.addGeneralCompletionItems();
        }
    }

    private addGeneralCompletionItems(): void {
        const cr = this.getCompletionExpression();
        if (cr) {
            this.completeAfterDot(cr);
        } else {
            const scope = this.di.getScopeAt(this.position);
            this.addLanguageElements();
            this.addMacros();
            this.addItems(scope);
        }
    }

    private addPreprocessorCompletionItems(mr: PreprocessorRegion): void {
        const mcc = this.getPreprocessorCompletionContext(mr);
        if (mcc.nextWordIndex === 0) {
            this.addPreprocessorDirectives();
        } else {
            const pd = this.di.builtin.preprocessor.find((pd) => pd[0][0] === mcc.words[1]);
            this.addPreprocessorArguments(mcc, pd);
            this.addPreprocessorSelectionArguments(pd);
        }
    }

    private addPreprocessorDirectives(): void {
        for (const pd of this.di.builtin.preprocessor) {
            const ci = new CompletionItem(`#${pd[0][0]}`, CompletionItemKind.Value);
            ci.filterText = `${pd[0][0]}`;
            ci.insertText = `${pd[0][0]}`;
            this.items.push(ci);
        }
    }

    private addPreprocessorSelectionArguments(pd: Array<Array<string>>): void {
        if (pd[0][0] === 'if' || pd[0][0] === 'ifdef' || pd[0][0] === 'ifndef' || pd[0][0] === 'elif') {
            this.addMacros();
            if (pd[0][0] === 'if' || pd[0][0] === 'elif') {
                this.items.push(new CompletionItem('defined', CompletionItemKind.Value));
            }
        }
    }

    private addPreprocessorArguments(mcc: PreprocessorCompletionContext, pd: Array<Array<string>>): void {
        if (pd && pd.length > mcc.nextWordIndex) {
            for (const arg of pd[mcc.nextWordIndex]) {
                if (this.isArgumentValid(mcc, arg)) {
                    this.addPreprocessorArgument(mcc, pd, arg);
                }
            }
        }
    }

    private addPreprocessorArgument(mcc: PreprocessorCompletionContext, pd: Array<Array<string>>, arg: string): void {
        const ci = new CompletionItem(arg, CompletionItemKind.Value);
        if (pd[0][0] === 'extension' && mcc.nextWordIndex === 1) {
            ci.insertText = `${arg} : `;
        } else if (
            pd[0][0] === 'extension' &&
            mcc.nextWordIndex === 2 &&
            (mcc.words.length === 3 || (mcc.words.length === 4 && mcc.words[3] !== ':'))
        ) {
            ci.insertText = `: ${arg}`;
        }
        this.items.push(ci);
    }

    private isArgumentValid(mcc: PreprocessorCompletionContext, argument: string): boolean {
        return (
            !(
                mcc.words[1] === 'extension' &&
                mcc.nextWordIndex === 2 &&
                mcc.words[2] === 'all' &&
                (argument === 'require' || argument === 'enable')
            ) && !(mcc.words[1] === 'version' && mcc.words[2] === '100')
        );
    }

    private addMacros(): void {
        for (const macro of this.di.builtin.macros) {
            const label = this.createMacroLabel(macro);
            const ci = new CompletionItem(label, CompletionItemKind.Value);
            this.items.push(ci);
        }
    }

    private createMacroLabel(macro: string): CompletionItemLabel {
        const label: CompletionItemLabel = {
            label: macro,
        };
        if (macro === '__VERSION__') {
            label.description = this.di.getVersion().toString();
        } else if (macro === '__LINE__') {
            label.description = `${this.position.line + this.di.getInjectionLineCount() + 1}`;
        }
        return label;
    }

    private getPreprocessorCompletionContext(mr: PreprocessorRegion): PreprocessorCompletionContext {
        const text = mr.text.substring(0, this.position.character);
        const words = new Array<string>();
        let startNewWord = true;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            startNewWord = this.addCharacter(words, char, startNewWord);
        }
        const nextWordIndex = this.computeNextWordIndex(words, startNewWord);
        return new PreprocessorCompletionContext(nextWordIndex, words);
    }

    private addCharacter(words: Array<string>, char: string, startNewWord: boolean): boolean {
        if (char === Constants.SPACE || char === Constants.TAB) {
            return true;
        } else {
            return this.addNonWhitespaceCharacter(words, char, startNewWord);
        }
    }

    private addNonWhitespaceCharacter(words: Array<string>, char: string, startNewWord: boolean): boolean {
        if (startNewWord || char === ':') {
            words.push(char);
        } else {
            words[words.length - 1] += char;
        }
        if (char === '#' || char === ':') {
            return true;
        } else {
            return false;
        }
    }

    private computeNextWordIndex(words: Array<string>, startNewWord: boolean): number {
        const nextWordIndex = words.length + (startNewWord ? 1 : 0) - 2;
        if (words[1] === 'extension' && nextWordIndex === 3) {
            return nextWordIndex - 1;
        } else {
            return nextWordIndex;
        }
    }

    private isCompletionTriggeredByFloatingPoint(): boolean {
        return (
            this.context.triggerKind === CompletionTriggerKind.TriggerCharacter &&
            this.di.getTokenAt(this.position).type === AntlrGlslLexer.FLOAT_LITERAL
        );
    }

    private isInCommentRegion(): boolean {
        const offset = this.di.positionToOffset(this.position);
        for (const cr of this.di.getRegions().commentRegions) {
            if (offset > cr.startIndex && offset <= cr.stopIndex) {
                return true;
            }
        }
        return false;
    }

    private getPreprocessorRegion(): PreprocessorRegion {
        const offset = this.di.positionToOffset(this.position);
        for (const mr of this.di.getRegions().preprocessorRegions) {
            if (offset > mr.interval.startIndex && offset <= mr.interval.stopIndex) {
                return mr;
            }
        }
        return null;
    }

    private isInLayoutQualifier(): boolean {
        const offset = this.di.positionToOffset(this.position);
        for (const interval of this.di.getRegions().layoutRegions) {
            if (offset > interval.startIndex && offset <= interval.stopIndex) {
                return true;
            }
        }
        return false;
    }

    private completeAfterDot(cr: CompletionRegion): void {
        const offset = this.di.positionToOffset(this.position);
        const text = cr.text.substring(0, offset - cr.interval.startIndex);
        if (cr.type.array.isArray()) {
            if ('length'.startsWith(text)) {
                const ci = new CompletionItem(this.createLabel('length', '', '()'), CompletionItemKind.Function);
                ci.insertText = 'length()';
                this.items.push(ci);
            }
        } else if (cr.type.declaration.isVector()) {
            this.addSwizzles(cr.type.declaration, Constants.xyzw, 0, text);
            this.addSwizzles(cr.type.declaration, Constants.rgba, 1, text);
            this.addSwizzles(cr.type.declaration, Constants.stpq, 2, text);
        } else {
            for (const member of cr.type.declaration.members) {
                if (member.name.startsWith(text)) {
                    this.items.push(
                        new CompletionItem(
                            this.createLabel(member.name, member.type?.name),
                            CompletionItemKind.Property
                        )
                    );
                }
            }
        }
    }

    private addSwizzles(
        td: TypeDeclaration,
        swizzleCharacters: Array<string>,
        swizzleCharactersPriority: number,
        startsWith: string,
        swizzle = ''
    ): void {
        if (swizzle.length < 4) {
            for (let i = 0; i < td.width; i++) {
                const char = swizzleCharacters[i];
                const newSwizzle = swizzle + char;
                if (newSwizzle.startsWith(startsWith)) {
                    const ci = new CompletionItem(
                        this.createLabel(newSwizzle, Helper.getTypeName(td.typeBase, newSwizzle.length)),
                        CompletionItemKind.Property
                    );
                    ci.sortText = this.getSwizzleSortText(swizzleCharacters, swizzleCharactersPriority, newSwizzle);
                    this.items.push(ci);
                }
                this.addSwizzles(td, swizzleCharacters, swizzleCharactersPriority, startsWith, newSwizzle);
            }
        }
    }

    private getSwizzleSortText(
        swizzleCharacters: Array<string>,
        swizzleCharactersPriority: number,
        swizzle: string
    ): string {
        let sortText = `${swizzle.length}${swizzleCharactersPriority}`;
        for (const char of swizzle) {
            sortText += swizzleCharacters.indexOf(char);
        }
        return sortText;
    }

    private getCompletionExpression(): CompletionRegion {
        const offset = this.di.positionToOffset(this.position);
        for (const cr of this.di.getRegions().completionRegions) {
            if (cr.interval.startIndex <= offset && cr.interval.stopIndex >= offset && this.isIdentifier(cr.text)) {
                return cr;
            }
        }
        return null;
    }

    private isIdentifier(text: string): boolean {
        for (const char of text) {
            const lowerCase = char >= 'a' && char <= 'z';
            const upperCase = char >= 'A' && char <= 'Z';
            const digit = char >= '0' && char <= '9';
            const underScore = char === '_';
            if (!lowerCase && !upperCase && !digit && !underScore) {
                return false;
            }
        }
        return true;
    }

    //
    //builtin items
    //
    private addLanguageElements(): void {
        this.addKeywordItems();
        this.addQualifiers();
        this.addPreprocessorGlobal();
    }

    private addBuiltinItems(localItems: Array<CompletionItem>): void {
        this.addBuiltinTypeItems(localItems);
        this.addBuiltinVariableItems(localItems);
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
    private addQualifiers(): void {
        for (const q of this.di.builtin.qualifiers.values()) {
            const ci = new CompletionItem(q.name, CompletionItemKind.Keyword);
            this.items.push(ci);
        }
    }

    private addLayoutQualifierParameterCompletionItems(): void {
        for (const param of this.di.builtin.layoutParameters) {
            if (this.di.isExtensionAvailable(param.extension, this.offset)) {
                const ci = new CompletionItem(param.name, CompletionItemKind.EnumMember);
                if (param.assignable) {
                    ci.insertText = param.name + ' = ';
                }
                this.items.push(ci);
            }
        }
    }

    //
    //preprocessor
    //
    private addPreprocessorGlobal(): void {
        for (const pd of this.di.builtin.preprocessor) {
            const ci = new CompletionItem(`#${pd[0][0]}`, CompletionItemKind.Value);
            this.items.push(ci);
        }
        const ci = new CompletionItem('#', CompletionItemKind.Value);
        this.items.push(ci);
    }

    //
    //builtin types
    //
    private addBuiltinTypeItems(localItems: Array<CompletionItem>): void {
        for (const [name, td] of this.di.builtin.types) {
            if (!this.items.some((ci) => this.getName(ci) === name)) {
                const ci = new CompletionItem(name, CompletionItemKind.Class);
                if (td.typeCategory === TypeCategory.CUSTOM) {
                    ci.documentation = new MarkdownString(td.toStringDocumentation());
                }
                localItems.push(ci);
            }
        }
    }

    //
    //builtin variables
    //
    private addBuiltinVariableItems(localItems: Array<CompletionItem>): void {
        for (const vd of this.di.builtin.variables.values()) {
            if (
                this.isAvailableInThisStage(vd.stage) &&
                !this.items.some((ci) => this.getName(ci) === vd.name) &&
                this.di.isExtensionAvailable(vd.extension, this.offset)
            ) {
                const ci = new CompletionItem(this.createLabel(vd.name, vd.type?.name), CompletionItemKind.Variable);
                ci.documentation = vd.summary;
                localItems.push(ci);
            }
        }
    }

    //
    //builtin functions
    //
    private addBuiltinFunctionItems(localItems: Array<CompletionItem>): void {
        for (const func of this.di.builtin.functionSummaries.values()) {
            if (
                this.isAvailableInThisStage(func.stage) &&
                !this.items.some((ci) => this.getName(ci) === func.name) &&
                this.di.isExtensionAvailable(func.extension, this.offset)
            ) {
                const ci = this.createBuiltinFunctionCompletionItem(func);
                localItems.push(ci);
            }
        }
    }

    private createBuiltinFunctionCompletionItem(func: FunctionInfo): CompletionItem {
        const kind = func.ctor ? CompletionItemKind.Constructor : CompletionItemKind.Function;
        const hasParameters = func.parameters.size || func.ctor;
        const parameters = hasParameters ? '(...)' : '()';
        const ci = new CompletionItem(this.createLabel(func.name, '', parameters), kind);
        if (this.di.builtin.importantFunctions.includes(ci.label.toString())) {
            this.makeItImportant(ci);
        }
        ci.documentation = func.summary;
        return ci;
    }

    private makeItImportant(ci: CompletionItem): void {
        ci.insertText = ci.label.toString();
        ci.filterText = ci.label.toString();
        ci.sortText = ' ' + ci.label;
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
            this.items = this.items.concat(localItems);
            if (scope.isGlobal()) {
                localItems.length = 0;
                this.addBuiltinItems(localItems);
                this.items = this.items.concat(localItems);
            }
            this.addItems(scope.parent);
        }
    }

    //
    //user types
    //
    private addUserTypeItems(scope: Scope, localItems: Array<CompletionItem>): void {
        for (const td of scope.typeDeclarations) {
            if (
                Helper.isALowerThanOffset(td.interval, this.offset) &&
                td.name &&
                !this.items.some((ci) => this.getName(ci) === td.name) &&
                !td.interfaceBlock
            ) {
                const ci = new CompletionItem(td.name, CompletionItemKind.Struct);
                ci.documentation = new MarkdownString(td.toStringDocumentation());
                localItems.push(ci);
            }
        }
    }

    //
    //user variables
    //
    private addUserVariableItems(scope: Scope, localItems: Array<CompletionItem>): void {
        for (const vd of scope.variableDeclarations) {
            if (
                Helper.isALowerThanOffset(vd.declarationInterval, this.offset) &&
                vd.name &&
                !this.items.some((ci) => this.getName(ci) === vd.name)
            ) {
                const ci = new CompletionItem(
                    this.createLabel(vd.name, vd.type?.toStringWithoutQualifiers()),
                    CompletionItemKind.Variable
                );
                ci.documentation = new MarkdownString(vd.toStringDocumentation());
                localItems.push(ci);
            }
        }
    }

    //
    //user functions
    //
    private addUserFunctionItems(scope: Scope, localItems: Array<CompletionItem>): void {
        for (const lf of scope.functions) {
            if (!this.isAdded(this.items, lf) && !this.isAdded(localItems, lf)) {
                const ci = this.getFunctionCompletionItem(lf);
                if (ci) {
                    localItems.push(ci);
                }
            }
        }
    }

    private isAdded(list: Array<CompletionItem>, lf: LogicalFunction): boolean {
        return list.some(
            (ci) =>
                this.getName(ci) === lf.getDeclaration().name &&
                (this.items === list ||
                    ci.kind === CompletionItemKind.Function ||
                    ci.kind === CompletionItemKind.Constructor)
        );
    }

    private getFunctionCompletionItem(lf: LogicalFunction): CompletionItem {
        for (const fd of lf.definitions) {
            if (Helper.isALowerThanOffset(fd.interval, this.offset)) {
                return this.createUserFunctionCompletionItem(fd);
            }
        }
        for (const fp of lf.prototypes) {
            if (Helper.isALowerThanOffset(fp.interval, this.offset)) {
                return this.createUserFunctionCompletionItem(fp);
            }
        }
        return null;
    }

    private createUserFunctionCompletionItem(f: FunctionDeclaration): CompletionItem {
        const hasParameters = f.parameters.length || f.ctor;
        const parameters = hasParameters ? '(...)' : '()';
        const ci = new CompletionItem(this.createLabel(f.name, '', parameters), CompletionItemKind.Function);
        if (!hasParameters) {
            ci.insertText = f.name + '()';
        }
        return ci;
    }

    //
    //general
    //
    private createLabel(label: string, rightText?: string, leftText?: string): CompletionItemLabel {
        return { label, detail: leftText, description: rightText };
    }

    private isAvailableInThisStage(stage: ShaderStage): boolean {
        return stage === ShaderStage.DEFAULT || stage === this.di.getShaderStage();
    }

    private getName(ci: CompletionItem): string {
        if (ci.filterText) {
            return ci.filterText;
        } else if (typeof ci.label === 'string') {
            return ci.label;
        } else {
            return ci.label.label;
        }
    }
}
