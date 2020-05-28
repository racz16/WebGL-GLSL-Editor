import { GlslEditor } from "../core/glsl-editor";
import { IShadertoyVariables } from "./interfaces/shadertoy-variables";
import { Constants } from "../core/constants";

export class Shadertoy {

    private static shadertoy: Shadertoy;

    private variables: IShadertoyVariables;
    private insertionCode: string;

    private constructor() {
        this.variables = GlslEditor.loadJson<IShadertoyVariables>('shadertoy');
        this.insertionCode = this.computeInsertioneCode();
    }

    public static getInstance(): Shadertoy {
        if (!this.shadertoy) {
            this.shadertoy = new Shadertoy();
        }
        return this.shadertoy;
    }

    public isShadertoyVariable(name: string): boolean {
        return this.variables.variables.some(variable => variable.name === name);
    }

    public getInsertionCode(): string {
        return this.insertionCode;
    }

    public computeInsertioneCode(): string {
        let result = Constants.CRLF + Constants.CRLF;
        for (const variable of this.variables.variables) {
            const array = variable.array ? `[${variable.array}]` : '';
            result += `uniform ${variable.type} ${variable.name}${array};${Constants.CRLF}`;
        }
        return result;
    }

}