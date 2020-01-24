import { Recognizer, RecognitionException, CommonToken } from 'antlr4ts';
import { Diagnostic, DiagnosticSeverity } from 'vscode';
import { Helper } from '../helper/helper';

export class AntlrGeneratedDiagnostic {

    private readonly recognizer: Recognizer<any, any>;
    private readonly offendingSymbol: CommonToken;
    private readonly line: number;
    private readonly charPositionInLine: number;
    private readonly message: string;
    private readonly exception: RecognitionException;

    public constructor(recognizer: Recognizer<any, any>, offendingSymbol: CommonToken, line: number, charPositionInLine: number, msg: string, e: RecognitionException) {
        this.recognizer = recognizer;
        this.offendingSymbol = offendingSymbol;
        this.line = line;
        this.charPositionInLine = charPositionInLine;
        this.message = msg;
        this.exception = e;
    }

    public getRecognizer(): Recognizer<any, any> {
        return this.recognizer;
    }

    public getOffendingSymbol(): CommonToken {
        return this.offendingSymbol;
    }

    public getLine(): number {
        return this.line;
    }

    public getCharPositionInLine(): number {
        return this.charPositionInLine;
    }

    public getMessage(): string {
        return this.message;
    }

    public getException(): RecognitionException | undefined {
        return this.exception;
    }

    public toDiagnostic(): Diagnostic {
        const range = Helper.lineAndCharacterToRange(this.line, this.charPositionInLine);
        const message = `Unexpected token '${this.offendingSymbol.text}'`;
        return new Diagnostic(range, message, DiagnosticSeverity.Error);
    }



}
