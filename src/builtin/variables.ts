export interface Variables {
    variables: Array<Variable>;
}

export interface Variable {
    min: number;
    customSummary: string;
    summary: string;
    type: string;
    name: string;
    array: number;
    qualifiers: Array<string>;
}