import { ANTLRErrorListener, Recognizer, RecognitionException } from 'antlr4ts';
import { AntlrGeneratedDiagnostic } from '../diagnostic/antlr-generated-diagnostic';

export class GlslErrorListener implements ANTLRErrorListener<any> {

    private readonly syntaxErrors = new Array<AntlrGeneratedDiagnostic>();

    public getSyntaxErrors(): Array<AntlrGeneratedDiagnostic> {
        return this.syntaxErrors;
    }

    syntaxError(recognizer: Recognizer<any, any>, offendingSymbol: any | undefined, line: number, charPositionInLine: number, msg: string, e: RecognitionException | undefined): void {
        this.syntaxErrors.push(new AntlrGeneratedDiagnostic(recognizer, offendingSymbol, line, charPositionInLine, msg, e));
    }

}
