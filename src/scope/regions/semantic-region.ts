import { Token } from "antlr4ts";

export class SemanticRegion {

    public readonly token: Token;
    public readonly type: SemanticType;
    public readonly modifiers: Array<SemanticModifier>;

    public constructor(token: Token, type: SemanticType, modifiers = new Array<SemanticModifier>()) {
        this.token = token;
        this.type = type;
        this.modifiers = modifiers;
    }

}

export enum SemanticType {
    USER_TYPE = 'type',
    BUILTIN_TYPE = 'struct',
    FUNCTION = 'function',
    VARIABLE = 'variable',
}

export enum SemanticModifier {
    DECLARATION = 'declaration',
    DEFINITION = 'definition',
    CONST = 'readonly',
}