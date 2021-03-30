import { Token } from "antlr4ts";

export class SemanticRegion {

    public readonly line: number;
    public readonly offset: number;
    public readonly length: number;
    public readonly code: number;

    public constructor(token: Token, type: SemanticType) {
        this.line = token.line - 1;
        this.offset = token.charPositionInLine;
        this.length = token.stopIndex - token.startIndex + 1;
        this.code = type;
    }

}

export enum SemanticType {
    USER_TYPE = 0,
    BUILTIN_TYPE = 1,
    FUNCTION = 2,
}