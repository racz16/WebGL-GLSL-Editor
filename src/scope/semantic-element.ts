import { Token } from "antlr4ts";
import { DocumentInfo } from "../core/document-info";

export class SemanticElement {

    public readonly line: number;
    public readonly offset: number;
    public readonly length: number;
    public readonly code: number;

    public constructor(token: Token, type: SemanticType, di: DocumentInfo) {
        const position = di.offsetToPosition(token.startIndex);
        this.line = position.line;
        this.offset = position.character;
        this.length = token.stopIndex - token.startIndex + 1;
        this.code = type;
    }

}

export enum SemanticType {
    TYPE = 0,
    FUNCTION = 1
}