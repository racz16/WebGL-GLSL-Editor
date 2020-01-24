export interface Types {
    transparent: Array<TransparentType>;
    floatingPointOpaque: Array<OpaqueType>;
    signedIntegerOpaque: Array<OpaqueType>;
    unsignedIntegerOpaque: Array<OpaqueType>;
    custom: Array<CustomType>;
}

export interface TransparentType {
    summary: string;
    name: string;
    width: number;
    height: number;
    base: string;
}

export interface OpaqueType {
    name: string;
}

export interface CustomType {
    name: string;
    members: Array<TypeMember>;
}

export interface TypeMember {
    memberPrecision: string;
    memberType: string;
    memberName: string;
}