export interface IFunctions {
    functions: Array<IFunction>;
}

export interface IFunction {
    qualifiers: Array<string>;
    returnType: string;
    name: string;
    parameters: Array<IParameter>;
    stage: string;
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
    customSummary: string;
    stage: string;
}

export interface IImportantFunctions {
    importantFunctions: Array<string>;
}