import { Range } from "vscode";
import { ArrayUsage } from "../array-usage";
import { TypeDeclaration } from "../type/type-declaration";

export class SignatureParameterRegion {

    public readonly typeDeclaration: TypeDeclaration;
    public readonly array: ArrayUsage;
    public readonly interval: Range;

    public constructor(typeDeclaration: TypeDeclaration, array: ArrayUsage, interval: Range) {
        this.typeDeclaration = typeDeclaration;
        this.array = array;
        this.interval = interval;
    }

}