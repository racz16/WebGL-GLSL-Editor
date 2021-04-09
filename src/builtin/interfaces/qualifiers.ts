export interface IQualifiers {
    qualifiers: Array<IQualifier>;
}

export interface IQualifier {
    name: string;
    order: number;
}

export interface IQualifierRules {
    qualifierRules: Array<IQualifierRule>;
}

export interface IQualifierRule {
    qualifierRule: Array<string>;
}

export interface ILayoutParameters {
    layoutParameters: Array<ILayoutParameter>;
}

export interface ILayoutParameter {
    name: string;
    assignable: boolean;
    extension: string;
}