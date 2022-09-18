// FUNCTION
export interface IFunction {
    qualifiers?: Array<string>;
    returnType: string;
    name: string;
    parameters: Array<IParameter>;
    stage?: string;
    extension?: string;
}

export interface IParameter {
    qualifiers?: Array<string>;
    type: string;
    name: string;
}

export interface IFunctionSummary {
    name: string;
    summary?: string;
    stage?: string;
    parameters: Array<IFunctionParameterSummary>;
    extension?: string;
}

export interface IFunctionParameterSummary {
    name: string;
    summary?: string;
}

// KEYWORD
export interface IKeyword {
    name: string;
    stage?: string;
}

// QUALIFIER
export interface IQualifier {
    name: string;
    order: number;
}

export interface ILayoutParameter {
    name: string;
    assignable?: boolean;
    extension?: string;
}

// REDIRECTION
export interface IRedirection {
    from: string;
    to: string;
}

// TYPE
export interface ITransparentType {
    name: string;
    width: number;
    height: number;
    base: string;
    alias?: string;
}

export interface IOpaqueType {
    name: string;
}

export interface ICustomType {
    name: string;
    members: Array<ITypeMember>;
}

export interface ITypeMember {
    memberPrecision: string;
    memberType: string;
    memberName: string;
}

export interface IGenericType {
    generic: string;
    real: Array<string>;
}

// VARIABLE
export interface IVariable {
    min?: number;
    summary?: string;
    notDocumented?: boolean;
    type: string;
    name: string;
    array?: number;
    qualifiers?: Array<string>;
    stage?: string;
    extension?: string;
}
