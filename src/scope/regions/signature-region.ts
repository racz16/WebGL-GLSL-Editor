import { Range } from "vscode";
import { SignatureParameterRegion } from "./signature-parameter-region";

export class SignatureRegion {

    public readonly name: string;
    public readonly interval: Range;
    public readonly parameters = new Array<SignatureParameterRegion>();

    public constructor(name: string, interval: Range) {
        this.name = name;
        this.interval = interval;
    }

}
