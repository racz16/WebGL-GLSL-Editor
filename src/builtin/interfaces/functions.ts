export interface IFunctions {
    functions: Array<IFunction>;
}

export interface IFunction {
    qualifiers: Array<string>;
    returnType: string;
    name: string;
    parameters: Array<IParameter>;
    stage: string;
    extension: string;
}

export interface IParameter {
    qualifiers: Array<string>;
    type: string;
    name: string;
}

export interface IFunctionSummaries {
    functions: Array<IFunctionSummary>;
}

export interface IFunctionSummary {
    name: string;
    summary: string;
    stage: string;
    parameters: Array<IFunctionParameterSummary>;
    extension: string;
}

export interface IFunctionParameterSummary {
    name: string;
    summary: string;
}

export interface IImportantFunctions {
    importantFunctions: Array<string>;
}