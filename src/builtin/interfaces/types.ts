export interface ITypes {
    transparent: Array<ITransparentType>;
    floatingPointOpaque: Array<IOpaqueType>;
    signedIntegerOpaque: Array<IOpaqueType>;
    unsignedIntegerOpaque: Array<IOpaqueType>;
    custom: Array<ICustomType>;
}

export interface ITransparentType {
    name: string;
    width: number;
    height: number;
    base: string;
    alias: string;
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

export interface IGenericTypes {
    types: Array<IGenericType>;
}

export interface IGenericType {
    generic: string;
    real: Array<string>;
}