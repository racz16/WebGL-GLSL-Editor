import {
    DocumentFormattingEditProvider,
    TextDocument,
    FormattingOptions,
    CancellationToken,
    ProviderResult,
    TextEdit,
    Range,
    Position,
    DocumentRangeFormattingEditProvider,
} from 'vscode';
import { DocumentInfo } from '../core/document-info';
import { Token } from 'antlr4ts';
import { AntlrGlslLexer } from '../_generated/AntlrGlslLexer';
import { GlslEditor } from '../core/glsl-editor';
import { Constants } from '../core/constants';
import { FormattingContext } from './helper/formatting-context';

export class GlslDocumentFormattingProvider implements DocumentFormattingEditProvider, DocumentRangeFormattingEditProvider {
    private di: DocumentInfo;
    private options: FormattingOptions;
    private range: Range;
    private tokens: Array<Token>;
    private ctx: FormattingContext;
    private results: Array<TextEdit>;

    private initialize(document: TextDocument, options: FormattingOptions, range: Range): void {
        GlslEditor.processElements(document);
        this.di = GlslEditor.getDocumentInfo(document.uri);
        this.options = options;
        this.range = range;
        this.tokens = this.di.getTokens();
        this.ctx = new FormattingContext();
        this.results = new Array<TextEdit>();
    }

    public provideDocumentFormattingEdits(
        document: TextDocument,
        options: FormattingOptions,
        token: CancellationToken
    ): ProviderResult<TextEdit[]> {
        this.initialize(document, options, null);
        return this.format();
    }

    public provideDocumentRangeFormattingEdits(
        document: TextDocument,
        range: Range,
        options: FormattingOptions,
        token: CancellationToken
    ): ProviderResult<TextEdit[]> {
        this.initialize(document, options, range);
        return this.format();
    }

    private format(): Array<TextEdit> {
        this.ctx.currentTokenIndex = this.getFirstTokenIndex();
        if (this.ctx.currentTokenIndex !== Constants.INVALID) {
            while (this.ctx.currentTokenIndex < this.tokens.length) {
                this.process();
                this.ctx.currentTokenIndex++;
            }
        }
        return this.results;
    }

    private getFirstTokenIndex(): number {
        for (let i = 0; i < this.tokens.length; i++) {
            if (this.tokens[i].line - this.di.getInjectionLineCount() - 1 >= 0) {
                return i;
            }
        }
        return Constants.INVALID;
    }

    private process(): void {
        const ct = this.tokens[this.ctx.currentTokenIndex];
        if (this.isT3(ct.type)) {
            this.processT3(ct);
        } else if (this.isT2(ct.type)) {
            this.processT2(ct);
        } else {
            this.processT1(ct);
        }
    }

    private isT3(type: number): boolean {
        return type === AntlrGlslLexer.NEW_LINE || type === AntlrGlslLexer.TAB || type === AntlrGlslLexer.SPACE;
    }

    private isT2(type: number): boolean {
        return (
            type === AntlrGlslLexer.SINGLE_LINE_COMMENT ||
            type === AntlrGlslLexer.MULTI_LINE_COMMENT ||
            type === AntlrGlslLexer.PREPROCESSOR
        );
    }

    private processT3(ct: Token): void {
        if (ct.type === AntlrGlslLexer.NEW_LINE) {
            this.newLine();
        }
        if (this.isTheLastToken()) {
            this.addMaxOneNewLineAtTheEndTextEdit(ct);
        }
    }

    private isTheLastToken(): boolean {
        return this.ctx.currentTokenIndex === this.tokens.length - 1;
    }

    private addMaxOneNewLineAtTheEndTextEdit(ct: Token): void {
        const result = this.ctx.t2NewLineCount > 0 ? Constants.NEW_LINE : Constants.EMPTY;
        const t1 = this.tokens[this.ctx.lastt2TokenIndex];
        const p1 = this.di.offsetToPosition(t1.stopIndex - this.di.getInjectionOffset() + 1);
        const p2 = this.di.offsetToPosition(ct.stopIndex - this.di.getInjectionOffset() + 1);
        this.addTextEdit(new TextEdit(new Range(p1, p2), result));
    }

    private processT2(ct: Token): void {
        if (this.isNewLineCountMoreThanOne()) {
            this.addMaxTwoNewLinesTextEdit();
        } else if (this.isT1BeforePreprocessorWithoutNewLine(ct)) {
            this.addNewLineBeforePreprocessorTextEdit(ct);
        }
        this.afterProcessT2();
    }

    private isNewLineCountMoreThanOne(): boolean {
        return this.ctx.firstNewLineIndex !== this.ctx.lastNewLineIndex;
    }

    private addMaxTwoNewLinesTextEdit(): void {
        const fnl = this.tokens[this.ctx.firstNewLineIndex];
        const lnl = this.tokens[this.ctx.lastNewLineIndex];
        const p1 = this.di.offsetToPosition(fnl.startIndex - this.di.getInjectionOffset());
        const p2 = this.di.offsetToPosition(lnl.startIndex - this.di.getInjectionOffset());
        const text = this.ctx.t2NewLineCount > 1 ? Constants.NEW_LINE : Constants.EMPTY;
        this.addTextEdit(new TextEdit(new Range(p1, p2), text));
    }

    private isT1BeforePreprocessorWithoutNewLine(ct: Token): boolean {
        return !this.ctx.t1NewLine && ct.type === AntlrGlslLexer.PREPROCESSOR && this.ctx.lastt1TokenIndex !== Constants.INVALID;
    }

    private addNewLineBeforePreprocessorTextEdit(ct: Token): void {
        const p1 = this.di.offsetToPosition(ct.startIndex - this.di.getInjectionOffset());
        this.addTextEdit(new TextEdit(new Range(p1, p1), Constants.NEW_LINE));
    }

    private afterProcessT2(): void {
        this.ctx.lastt2TokenIndex = this.ctx.currentTokenIndex;
        this.ctx.t2NewLineCount = 0;
        this.ctx.firstNewLineIndex = Constants.INVALID;
        this.ctx.lastNewLineIndex = Constants.INVALID;
    }

    private processT1(ct: Token): void {
        this.refreshScopelessInterfaceBlock(ct);
        if (this.isTheFirstNotT3Token()) {
            this.addClearT3BeforeTheFirstT1TextEdit(ct);
        } else if (this.isT2(this.tokens[this.ctx.lastt2TokenIndex].type)) {
            this.processT2T1(ct);
        } else {
            this.refreshState(ct);
            this.processT1T1(ct);
        }
        this.afterProcessT1();
    }

    private isTheFirstNotT3Token(): boolean {
        return this.ctx.lastt2TokenIndex === Constants.INVALID;
    }

    private addClearT3BeforeTheFirstT1TextEdit(ct: Token): void {
        const p1 = new Position(0, 0);
        const p2 = this.di.offsetToPosition(ct.startIndex - this.di.getInjectionOffset());
        this.addTextEdit(new TextEdit(new Range(p1, p2), Constants.EMPTY));
    }

    private processT2T1(ct: Token): void {
        if (this.isNewLineCountMoreThanOne()) {
            this.addMaxTwoNewLinesTextEdit();
        }
        if (this.isNewLineRequiredAfterT2(ct)) {
            this.addRequiredNewLineBeforeT1TextEdit(ct);
        } else if (this.isNewLineCountMoreThanZeroAfterT2()) {
            this.addCommentedOperatorSplitOrMultilineFunctionParametersTextEdit(ct);
        }
    }

    private isNewLineRequiredAfterT2(ct: Token): boolean {
        return this.isNewLineRequired(ct) && !this.ctx.t1NewLine;
    }

    private isNewLineRequired(t2: Token): boolean {
        const t1 = this.tokens[this.ctx.lastt1TokenIndex];
        if (this.ctx.lastt1TokenIndex === Constants.INVALID || this.ctx.inlineStruct) {
            return false;
        }
        return (
            (this.ctx.functionParameters &&
                (t1.type === AntlrGlslLexer.COMMA || t1.type === AntlrGlslLexer.LRB || t2.type === AntlrGlslLexer.RRB)) ||
            ((t1.type === AntlrGlslLexer.LCB || t1.type === AntlrGlslLexer.SEMICOLON) && !this.ctx.forHeader) ||
            (t1.type === AntlrGlslLexer.RCB &&
                !this.ctx.forHeader &&
                t2.type !== AntlrGlslLexer.SEMICOLON &&
                (!this.ctx.typeDeclaration || GlslEditor.CONFIGURATIONS.getBracesOnSeparateLine()) &&
                ((t2.type !== AntlrGlslLexer.KW_ELSE && t2.type !== AntlrGlslLexer.KW_WHILE) ||
                    GlslEditor.CONFIGURATIONS.getBracesOnSeparateLine())) ||
            (t2.type === AntlrGlslLexer.LCB && GlslEditor.CONFIGURATIONS.getBracesOnSeparateLine()) ||
            (this.isScopeStarter(t2) &&
                t1.type !== AntlrGlslLexer.LRB &&
                t2.type !== AntlrGlslLexer.LRB &&
                (t1.type !== AntlrGlslLexer.KW_ELSE || t2.type !== AntlrGlslLexer.KW_IF)) ||
            (this.ctx.caseStatementsStart && (t2.type !== AntlrGlslLexer.LCB || GlslEditor.CONFIGURATIONS.getBracesOnSeparateLine()))
        );
    }

    private isScopeStarter(t: Token): boolean {
        const scope = this.di.getScopeAt(new Position(t.line - this.di.getInjectionLineCount() - 1, t.charPositionInLine));
        return scope.interval && scope.interval.startIndex === t.startIndex - this.di.getInjectionOffset();
    }

    private addRequiredNewLineBeforeT1TextEdit(t2: Token): void {
        const result = this.getNewLineAndIndentation(t2, 1);
        const p2 = this.di.offsetToPosition(t2.startIndex - this.di.getInjectionOffset());
        this.addTextEdit(new TextEdit(new Range(p2, p2), result));
    }

    private isNewLineCountMoreThanZeroAfterT2(): boolean {
        return this.ctx.t2NewLineCount > 0;
    }

    private addCommentedOperatorSplitOrMultilineFunctionParametersTextEdit(t2: Token): void {
        const t1 = this.tokens[this.ctx.lastNewLineIndex];
        let depthIncrement = 0;
        if (this.isOperatorSplitRequired()) {
            depthIncrement = 1;
        } else if (this.ctx.functionParameters && t2.type === AntlrGlslLexer.RRB) {
            depthIncrement = -1;
        }
        const result = this.getNewLineAndIndentation(t2, 1, depthIncrement);
        const p1 = this.di.offsetToPosition(t1.startIndex - this.di.getInjectionOffset());
        const p2 = this.di.offsetToPosition(t2.startIndex - this.di.getInjectionOffset());
        this.addTextEdit(new TextEdit(new Range(p1, p2), result));
    }

    private processT1T1(ct: Token): void {
        if (this.isNewLineRequired(ct)) {
            this.addNewLineTextEdit(ct);
        } else if (this.isNothingRequired(ct)) {
            this.addNothingTextEdit(ct);
        } else if (this.isOperatorSplitRequired()) {
            this.addOperatorSplitTextEdit(ct);
        } else {
            this.addSpaceTextEdit(ct);
        }
    }

    private isNothingRequired(t2: Token): boolean {
        const t1 = this.tokens[this.ctx.lastt2TokenIndex];
        return (
            (this.ctx.unaryExpression && !GlslEditor.CONFIGURATIONS.getSpaceAroundUnaryOperators()) ||
            (!GlslEditor.CONFIGURATIONS.getSpacesAroundBinaryOperators() && !this.ctx.unaryExpression && this.isBinaryOperator(t1.type)) ||
            (!GlslEditor.CONFIGURATIONS.getSpacesAroundBinaryOperators() &&
                !this.ctx.unaryExpression &&
                this.isBinaryOperator(t2.type) &&
                (t2.type !== AntlrGlslLexer.OP_SUB ||
                    !(
                        t1.type === AntlrGlslLexer.KW_RETURN ||
                        t1.type === AntlrGlslLexer.KW_CASE ||
                        t1.type === AntlrGlslLexer.LSB ||
                        t1.type === AntlrGlslLexer.LRB ||
                        this.isOperator(t1.type)
                    ))) ||
            (!GlslEditor.CONFIGURATIONS.getSpacesAroundTernaryOperators() &&
                !this.ctx.caseHeader &&
                (t1.type === AntlrGlslLexer.QUESTION ||
                    t2.type === AntlrGlslLexer.QUESTION ||
                    t1.type === AntlrGlslLexer.COLON ||
                    t2.type === AntlrGlslLexer.COLON)) ||
            (t2.type === AntlrGlslLexer.SEMICOLON &&
                (!GlslEditor.CONFIGURATIONS.getSpaceBeforeSemicolonsInFor() || !this.ctx.forHeader || this.ctx.inlineStruct)) ||
            (t2.type === AntlrGlslLexer.COMMA && !GlslEditor.CONFIGURATIONS.getSpaceBeforeCommas()) ||
            (t1.type === AntlrGlslLexer.COMMA && !GlslEditor.CONFIGURATIONS.getSpaceAfterCommas()) ||
            ((t1.type === AntlrGlslLexer.DOT || t2.type === AntlrGlslLexer.DOT) && !GlslEditor.CONFIGURATIONS.getSpacesAroundDots()) ||
            (!GlslEditor.CONFIGURATIONS.getSpaceAfterKeywords() &&
                t2.type === AntlrGlslLexer.LRB &&
                (t1.type === AntlrGlslLexer.KW_IF ||
                    t1.type === AntlrGlslLexer.KW_FOR ||
                    t1.type === AntlrGlslLexer.KW_WHILE ||
                    t1.type === AntlrGlslLexer.KW_SWITCH ||
                    t1.type === AntlrGlslLexer.Q_LAYOUT)) ||
            (!GlslEditor.CONFIGURATIONS.getSpacesInsideParentheses() &&
                (t1.type === AntlrGlslLexer.LRB || t2.type === AntlrGlslLexer.RRB)) ||
            (!GlslEditor.CONFIGURATIONS.getSpaceBeforeCaseColons() && this.ctx.caseHeader && t2.type === AntlrGlslLexer.COLON) ||
            (!GlslEditor.CONFIGURATIONS.getSpaceAfterFunctionNames() &&
                t2.type === AntlrGlslLexer.LRB &&
                (t1.type === AntlrGlslLexer.IDENTIFIER || t1.type === AntlrGlslLexer.TYPE || t1.type === AntlrGlslLexer.RSB)) ||
            (!GlslEditor.CONFIGURATIONS.getSpacesAroundBraces() &&
                !GlslEditor.CONFIGURATIONS.getBracesOnSeparateLine() &&
                (t1.type === AntlrGlslLexer.RCB || t2.type === AntlrGlslLexer.LCB)) ||
            (!GlslEditor.CONFIGURATIONS.getSpaceBeforeSemicolonsInFor() &&
                this.ctx.forHeader &&
                !this.ctx.inlineStruct &&
                t2.type === AntlrGlslLexer.SEMICOLON) ||
            (!GlslEditor.CONFIGURATIONS.getSpaceAfterSemicolonsInFor() &&
                this.ctx.forHeader &&
                !this.ctx.inlineStruct &&
                t1.type === AntlrGlslLexer.SEMICOLON) ||
            (!GlslEditor.CONFIGURATIONS.getSpaceBeforeOpeningBrackets() && t2.type === AntlrGlslLexer.LSB) ||
            (!GlslEditor.CONFIGURATIONS.getSpacesInsideBrackets() && (t1.type === AntlrGlslLexer.LSB || t2.type === AntlrGlslLexer.RSB)) ||
            (!GlslEditor.CONFIGURATIONS.getSpacesAroundAssignmentOperators() &&
                (this.isAssignmentOperator(t1.type) || this.isAssignmentOperator(t2.type)))
        );
    }

    private addNothingTextEdit(t2: Token): void {
        const t1 = this.tokens[this.ctx.lastt2TokenIndex];
        const p1 = this.di.offsetToPosition(t1.stopIndex + 1 - this.di.getInjectionOffset());
        const p2 = this.di.offsetToPosition(t2.startIndex - this.di.getInjectionOffset());
        this.addTextEdit(new TextEdit(new Range(p1, p2), Constants.EMPTY));
    }

    private addNewLineTextEdit(t2: Token): void {
        const t1 = this.tokens[this.ctx.lastt2TokenIndex];
        const depthIncrement = this.ctx.functionParameters && t2.type === AntlrGlslLexer.RRB ? -1 : 0;
        const result = this.getNewLineAndIndentation(t2, this.ctx.t2NewLineCount, depthIncrement);
        const p1 = this.di.offsetToPosition(t1.stopIndex + 1 - this.di.getInjectionOffset());
        const p2 = this.di.offsetToPosition(t2.startIndex - this.di.getInjectionOffset());
        this.addTextEdit(new TextEdit(new Range(p1, p2), result));
    }

    private isOperatorSplitRequired(): boolean {
        if (this.ctx.lastt1TokenIndex === Constants.INVALID) {
            return false;
        }
        const t1 = this.tokens[this.ctx.lastt1TokenIndex];
        return this.isBinaryOperator(t1.type) && !this.ctx.unaryExpression && this.ctx.t1NewLine;
    }

    private isBinaryOperator(type: number): boolean {
        return (
            type === AntlrGlslLexer.OP_MUL ||
            type === AntlrGlslLexer.OP_ADD ||
            type === AntlrGlslLexer.OP_SUB ||
            type === AntlrGlslLexer.OP_DIV ||
            type === AntlrGlslLexer.OP_MOD ||
            type === AntlrGlslLexer.OP_SHIFT ||
            type === AntlrGlslLexer.OP_RELATIONAL ||
            type === AntlrGlslLexer.OP_EQUALITY ||
            type === AntlrGlslLexer.OP_BIT_AND ||
            type === AntlrGlslLexer.OP_BIT_OR ||
            type === AntlrGlslLexer.OP_BIT_XOR ||
            type === AntlrGlslLexer.OP_LOGICAL_AND ||
            type === AntlrGlslLexer.OP_LOGICAL_OR ||
            type === AntlrGlslLexer.OP_LOGICAL_XOR
        );
    }

    private isTernaryOperator(type: number): boolean {
        return type === AntlrGlslLexer.QUESTION || type === AntlrGlslLexer.COLON;
    }

    private isAssignmentOperator(type: number): boolean {
        return type === AntlrGlslLexer.OP_ASSIGN || type === AntlrGlslLexer.OP_MODIFY;
    }

    private isOperator(type: number): boolean {
        return this.isUnaryOperator(type) || this.isBinaryOperator(type) || this.isAssignmentOperator(type) || this.isTernaryOperator(type);
    }

    private addOperatorSplitTextEdit(t2: Token): void {
        const t1 = this.tokens[this.ctx.lastt2TokenIndex];
        const result = this.getNewLineAndIndentation(t2, 1, 1);
        const p1 = this.di.offsetToPosition(t1.stopIndex - this.di.getInjectionOffset() + 1);
        const p2 = this.di.offsetToPosition(t2.startIndex - this.di.getInjectionOffset());
        this.addTextEdit(new TextEdit(new Range(p1, p2), result));
    }

    private addSpaceTextEdit(t2: Token): void {
        const t1 = this.tokens[this.ctx.lastt2TokenIndex];
        const p1 = this.di.offsetToPosition(t1.stopIndex + 1 - this.di.getInjectionOffset());
        const p2 = this.di.offsetToPosition(t2.startIndex - this.di.getInjectionOffset());
        this.addTextEdit(new TextEdit(new Range(p1, p2), Constants.SPACE));
    }

    private afterProcessT1(): void {
        this.ctx.lastt1TokenIndex = this.ctx.currentTokenIndex;
        this.ctx.lastt2TokenIndex = this.ctx.currentTokenIndex;
        this.ctx.t1NewLine = false;
        this.ctx.t2NewLineCount = 0;
        this.ctx.firstNewLineIndex = Constants.INVALID;
        this.ctx.lastNewLineIndex = Constants.INVALID;
    }

    private getNewLineAndIndentation(ct: Token, newLineCount: number, depthIncrement = 0): string {
        const realNewLineCount = newLineCount > 1 ? 2 : 1;
        const indentation = this.getIndentation(ct, depthIncrement);
        let result = Constants.EMPTY;
        for (let i = 0; i < realNewLineCount; i++) {
            result += Constants.NEW_LINE;
        }
        result += indentation;
        return result;
    }

    private getIndentation(ct: Token, depthIncrement: number): string {
        const depth = this.getDepth(ct) + depthIncrement;
        if (this.options.insertSpaces) {
            return this.getIndentationBySpaces(depth);
        } else {
            return this.getIndentationByTabs(depth);
        }
    }

    private getIndentationBySpaces(depth: number): string {
        let result = Constants.EMPTY;
        for (let i = 0; i < depth * this.options.tabSize; i++) {
            result += Constants.SPACE;
        }
        return result;
    }

    private getIndentationByTabs(depth: number): string {
        let result = Constants.EMPTY;
        for (let i = 0; i < depth; i++) {
            result += Constants.TAB;
        }
        return result;
    }

    private getDepth(t2: Token): number {
        const offsetIncrement = t2.type === AntlrGlslLexer.LCB ? 0 : 1;
        const position = this.di.offsetToPosition(t2.stopIndex - this.di.getInjectionOffset() + offsetIncrement);
        const depth = this.di.getDepthAt(position);
        let increment = this.ctx.scopelessInterfaceBlock ? 1 : 0;
        if (t2.type === AntlrGlslLexer.LCB) {
            for (const pos of this.di.getRegions().scopedCurlyBracePositions) {
                if (pos === t2.startIndex) {
                    increment--;
                }
            }
        }
        return depth + increment;
    }

    private newLine(): void {
        this.ctx.t1NewLine = true;
        this.ctx.t2NewLineCount++;
        if (this.ctx.firstNewLineIndex === Constants.INVALID) {
            this.ctx.firstNewLineIndex = this.ctx.currentTokenIndex;
        }
        this.ctx.lastNewLineIndex = this.ctx.currentTokenIndex;
    }

    private refreshState(t2: Token): void {
        this.resetState();
        const t1 = this.tokens[this.ctx.lastt1TokenIndex];
        const position = t1.startIndex - this.di.getInjectionOffset();
        this.refreshForState(t1, position);
        this.refreshTypeDeclarationState(position);
        this.refreshUnaryExpressionState(t1, t2);
        this.refreshCaseState(t1, t2);
        this.refreshInlineStruct(t1);
        this.refreshFunctionParametersState(position);
    }

    private refreshFunctionParametersState(position: number): void {
        for (const interval of this.di.getRegions().functionParametersRegions) {
            if (interval.startIndex <= position && interval.stopIndex >= position) {
                this.ctx.forHeader = true;
                if (interval.startIndex <= position && interval.stopIndex >= position) {
                    this.ctx.functionParameters = true;
                    break;
                }
                break;
            }
        }
    }

    private resetState(): void {
        this.ctx.forHeader = false;
        this.ctx.forHeaderEnd = false;
        this.ctx.typeDeclaration = false;
        this.ctx.unaryExpression = false;
        this.ctx.caseHeader = false;
        this.ctx.caseStatementsStart = false;
        this.ctx.inlineStruct = false;
        this.ctx.functionParameters = false;
    }

    private refreshForState(t1: Token, position: number): void {
        for (const interval of this.di.getRegions().forHeaderRegions) {
            if (interval.startIndex <= position && interval.stopIndex >= position) {
                this.ctx.forHeader = true;
                if (interval.stopIndex === t1.stopIndex - this.di.getInjectionOffset()) {
                    this.ctx.forHeaderEnd = true;
                }
                break;
            }
        }
    }

    private refreshTypeDeclarationState(position: number): void {
        for (const interval of this.di.getRegions().typeDeclarationRegions) {
            if (interval.startIndex <= position && interval.stopIndex >= position) {
                this.ctx.typeDeclaration = true;
                break;
            }
        }
    }

    private refreshUnaryExpressionState(t1: Token, t2: Token): void {
        const t1Unary = this.isUnaryOperator(t1.type);
        const t2Unary = this.isUnaryOperator(t2.type);
        for (const interval of this.di.getRegions().unaryExpressionRegions) {
            if (t1Unary && interval.startIndex === t1.startIndex - this.di.getInjectionOffset()) {
                this.ctx.unaryExpression = true;
            } else if (t2Unary && interval.stopIndex === t2.stopIndex - this.di.getInjectionOffset() + 1) {
                this.ctx.unaryExpression = true;
            }
        }
    }

    private isUnaryOperator(type: number): boolean {
        return (
            type === AntlrGlslLexer.OP_SUB ||
            type === AntlrGlslLexer.OP_ADD ||
            type === AntlrGlslLexer.OP_INC ||
            type === AntlrGlslLexer.OP_DEC ||
            type === AntlrGlslLexer.OP_BIT_UNARY ||
            type === AntlrGlslLexer.OP_LOGICAL_UNARY
        );
    }

    private refreshCaseState(t1: Token, t2: Token): void {
        const position = t1.startIndex - this.di.getInjectionOffset();
        for (const interval of this.di.getRegions().caseHeaderRegions) {
            if (position >= interval.startIndex && position <= interval.stopIndex) {
                this.ctx.caseHeader = true;
            }
        }
        for (const interval of this.di.getRegions().caseStatementsRegions) {
            if (t2.startIndex - this.di.getInjectionOffset() === interval.startIndex) {
                this.ctx.caseStatementsStart = true;
                break;
            }
        }
    }

    private refreshScopelessInterfaceBlock(t2: Token): void {
        this.ctx.scopelessInterfaceBlock = false;
        const position = t2.stopIndex - this.di.getInjectionOffset();
        for (const interval of this.di.getRegions().scopelessInterfaceBlockRegions) {
            if (interval.startIndex < position && interval.stopIndex > position) {
                this.ctx.scopelessInterfaceBlock = true;
                break;
            }
        }
    }

    private refreshInlineStruct(t1: Token): void {
        const offset = t1.stopIndex - this.di.getInjectionOffset();
        const position = this.di.offsetToPosition(offset);
        let scope = this.di.getScopeAt(position);
        while (scope) {
            for (const td of scope.typeDeclarations) {
                if (td.interval.startIndex <= offset && td.interval.stopIndex >= offset && td.inline) {
                    this.ctx.inlineStruct = true;
                    return;
                }
            }
            scope = scope.parent;
        }
    }

    private addTextEdit(te: TextEdit): void {
        if (this.isEditInRange()) {
            this.results.push(te);
        }
    }

    private isEditInRange(): boolean {
        if (!this.range) {
            return true;
        } else if (this.ctx.lastt2TokenIndex !== Constants.INVALID) {
            const t1 = this.tokens[this.ctx.lastt2TokenIndex];
            const t2 = this.tokens[this.ctx.currentTokenIndex];
            const p1 = this.di.offsetToPosition(t1.stopIndex - this.di.getInjectionOffset() + 1);
            const p2 = this.di.offsetToPosition(t2.startIndex - this.di.getInjectionOffset());
            const p3 = this.di.offsetToPosition(t1.startIndex - this.di.getInjectionOffset());
            return (
                (this.range.start.isBefore(p1) && this.range.end.isAfter(p2)) ||
                (this.isT3(t2.type) && this.range.start.isBefore(p1) && this.range.end.isAfter(p3))
            );
        } else {
            const t2 = this.tokens[this.ctx.currentTokenIndex];
            const p1 = this.di.offsetToPosition(t2.startIndex - this.di.getInjectionOffset());
            const p2 = this.di.offsetToPosition(t2.stopIndex - this.di.getInjectionOffset() + 1);
            return this.range.start.isBefore(p2) && this.range.end.isAfter(p1);
        }
    }
}
