import { Constants } from '../../core/constants';

export class FormattingContext {
    lastt1TokenIndex = Constants.INVALID;
    lastt2TokenIndex = Constants.INVALID;
    t1NewLine = false;
    t2NewLineCount = 0;

    currentTokenIndex = 0;

    firstNewLineIndex = Constants.INVALID;
    lastNewLineIndex = Constants.INVALID;

    forHeader: boolean;
    forHeaderEnd: boolean;
    typeDeclaration: boolean;
    unaryExpression: boolean;
    caseHeader: boolean;
    caseStatementsStart: boolean;
    scopelessInterfaceBlock: boolean;
    inlineStruct: boolean;
}
