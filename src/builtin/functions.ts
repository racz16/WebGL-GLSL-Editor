export interface Functions {
    functions: Array<Function>;
}

export interface Function {
    qualifiers: Array<string>;
    returnType: string;
    name: string;
    parameters: Array<Parameter>;
}

export interface Parameter {
    qualifiers: Array<string>;
    type: string;
    name: string;
}