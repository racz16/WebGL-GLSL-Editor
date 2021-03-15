export class FormattingContext {
    lastt1TokenIndex = -1;
    lastt2TokenIndex = -1;
    t1NewLine = false;
    t2NewLineCount = 0;

    currentTokenIndex = 0;

    firstNewLineIndex = -1;
    lastNewLineIndex = -1;

    forHeader: boolean;
    forHeaderEnd: boolean;
    typeDeclaration: boolean;
    unaryExpression: boolean;
    caseHeader: boolean;
    caseStatementsStart: boolean;
    scopelessInterfaceBlock: boolean;
    inlineStruct: boolean;
}