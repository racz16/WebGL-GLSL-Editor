export interface IVariables {
    variables: Array<IVariable>;
}

export interface IVariable {
    min: number;
    customSummary: string;
    summary: string;
    type: string;
    name: string;
    array: number;
    qualifiers: Array<string>;
    stage: string;
}