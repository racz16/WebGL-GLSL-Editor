export interface Qualifiers {
    qualifiers: Array<Qualifier>;
}

export interface Qualifier {
    name: string;
    order: number;
}

export interface QualifierRules {
    qualifierRules: Array<QualifierRule>;
}

export interface QualifierRule {
    qualifierRule: Array<string>;
}