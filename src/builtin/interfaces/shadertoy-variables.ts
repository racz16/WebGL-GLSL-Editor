export interface IShadertoyVariables {
    variables: Array<IShadertoyVariable>;
}

export interface IShadertoyVariable {
    type: string;
    name: string;
    array?: number;
}