import { DocumentFormattingEditProvider, TextDocument, FormattingOptions, CancellationToken, ProviderResult, TextEdit, Range, Position } from 'vscode';
import { DocumentInfo } from '../core/document-info';
import { Token } from 'antlr4ts';
import { AntlrGlslLexer } from '../_generated/AntlrGlslLexer';
import { GlslEditor } from '../core/glsl-editor';
import { Constants } from '../core/constants';

export class GlslDocumentFormattingProvider implements DocumentFormattingEditProvider {

    private di: DocumentInfo;
    private document: TextDocument;
    private options: FormattingOptions;

    private blockDepth: number;
    private newLineCount: number;

    private initialize(document: TextDocument, options: FormattingOptions): void {
        GlslEditor.processElements(document);
        this.document = document;
        this.options = options;
        this.di = GlslEditor.getDocumentInfo(document.uri);

        this.blockDepth = 0;
        this.newLineCount = 0;
    }

    public provideDocumentFormattingEdits(document: TextDocument, options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]> {
        this.initialize(document, options);
        const ret = new Array<TextEdit>();
        let t1: Token = null;

        for (const t2 of this.di.getTokens()) {
            const range = this.getRange(t1, t2);

            if (this.notDecidable(t1, t2)) {
                continue;
            }
            this.updateBlockDepth(t1, t2);
            if (this.noModificationNeeded(t1, t2)) {

            } else if (this.newLineNeeded(t1, t2)) {
                const indentation = this.calculareIndentation();
                ret.push(new TextEdit(range, indentation));
            } else if (this.nothingNeeded(t1, t2)) {
                ret.push(new TextEdit(range, Constants.EMPTY));
            } else {
                ret.push(new TextEdit(range, Constants.SPACE));
            }
            this.newLineCount = 0;
            t1 = t2;
        }
        return ret;
    }

    private getRange(t1: Token, t2: Token): Range {
        if (t1) {
            return new Range(
                this.di.offsetToPosition(t1.stopIndex + 1),
                this.di.offsetToPosition(t2.startIndex)
            );
        } else {
            return new Range(
                new Position(0, 0),
                this.di.offsetToPosition(t2.startIndex)
            );
        }
    }

    private calculareIndentation(): string {
        const element = this.options.insertSpaces ? this.convertTabToSpaces() : Constants.TAB;
        let ret = '';
        for (let i = 0; i < this.blockDepth; i++) {
            ret += element;
        }
        if (this.newLineCount > 1) {
            ret = Constants.CRLF + ret;
        }
        ret = Constants.CRLF + ret;
        return ret;
    }

    private convertTabToSpaces(): string {
        let ret = '';
        for (let i = 0; i < this.options.tabSize; i++) {
            ret += Constants.SPACE;
        }
        return ret;
    }

    private updateBlockDepth(t1: Token, t2: Token): void {
        if (t1 && t1.type === AntlrGlslLexer.LCB) {
            this.blockDepth++;
        }
        if (t2.type === AntlrGlslLexer.RCB) {
            this.blockDepth--;
        }
    }

    private notDecidable(t1: Token, t2: Token): boolean {
        const newLine = t2.type === AntlrGlslLexer.NEW_LINE;
        if (newLine) {
            this.newLineCount++;
        }
        return newLine ||
            t2.type === AntlrGlslLexer.SPACE ||
            t2.type === AntlrGlslLexer.TAB;
    }

    private noModificationNeeded(t1: Token, t2: Token): boolean {
        return (t1 && (
            t1.type === AntlrGlslLexer.MACRO ||
            t1.type === AntlrGlslLexer.MULTI_LINE_COMMENT ||
            t1.type === AntlrGlslLexer.SINGLE_LINE_COMMENT
        )) ||
            t2.type === AntlrGlslLexer.MACRO ||
            t2.type === AntlrGlslLexer.MULTI_LINE_COMMENT ||
            t2.type === AntlrGlslLexer.SINGLE_LINE_COMMENT;
    }

    private newLineNeeded(t1: Token, t2: Token): boolean {
        return t1 && (
            t1.type === AntlrGlslLexer.LCB ||
            t1.type === AntlrGlslLexer.RCB ||
            t1.type === AntlrGlslLexer.SEMICOLON
        );
    }

    private nothingNeeded(t1: Token, t2: Token): boolean {
        return (t1 && (
            t1.type === AntlrGlslLexer.LSB ||
            t1.type === AntlrGlslLexer.RSB ||
            t1.type === AntlrGlslLexer.LRB ||
            (t1.type === AntlrGlslLexer.RRB && t2.type !== AntlrGlslLexer.LCB && !this.isOperatorButNotIncOrDec(t2)) ||
            t1.type === AntlrGlslLexer.DOT ||
            t1.type === AntlrGlslLexer.OP_LOGICAL_UNARY ||
            t1.type === AntlrGlslLexer.OP_BIT_UNARY
        )) ||
            t2.type === AntlrGlslLexer.LSB ||
            t2.type === AntlrGlslLexer.RSB ||
            (!this.isOperatorButNotIncOrDec(t1) && t2.type === AntlrGlslLexer.LRB) ||
            t2.type === AntlrGlslLexer.RRB ||
            t2.type === AntlrGlslLexer.DOT ||
            t2.type === AntlrGlslLexer.COMMA ||
            t2.type === AntlrGlslLexer.SEMICOLON;
    }

    private isOperatorButNotIncOrDec(token: Token): boolean {
        if (!token) {
            return false;
        }
        return token.type === AntlrGlslLexer.OP_ADD ||
            token.type === AntlrGlslLexer.OP_ASSIGN ||
            token.type === AntlrGlslLexer.OP_BIT_AND ||
            token.type === AntlrGlslLexer.OP_BIT_OR ||
            token.type === AntlrGlslLexer.OP_BIT_UNARY ||
            token.type === AntlrGlslLexer.OP_BIT_XOR ||
            token.type === AntlrGlslLexer.OP_DIV ||
            token.type === AntlrGlslLexer.OP_EQUALITY ||
            token.type === AntlrGlslLexer.OP_LOGICAL_AND ||
            token.type === AntlrGlslLexer.OP_LOGICAL_OR ||
            token.type === AntlrGlslLexer.OP_LOGICAL_UNARY ||
            token.type === AntlrGlslLexer.OP_LOGICAL_XOR ||
            token.type === AntlrGlslLexer.OP_MOD ||
            token.type === AntlrGlslLexer.OP_MODIFY ||
            token.type === AntlrGlslLexer.OP_MUL ||
            token.type === AntlrGlslLexer.OP_RELATIONAL ||
            token.type === AntlrGlslLexer.OP_SHIFT ||
            token.type === AntlrGlslLexer.OP_SUB;
    }

}