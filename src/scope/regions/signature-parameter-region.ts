import { ArrayUsage } from '../array-usage';
import { Interval } from '../interval';
import { TypeDeclaration } from '../type/type-declaration';

export class SignatureParameterRegion {
    public readonly typeDeclaration: TypeDeclaration;
    public readonly array: ArrayUsage;
    public readonly interval: Interval;

    public constructor(typeDeclaration: TypeDeclaration, array: ArrayUsage, interval: Interval) {
        this.typeDeclaration = typeDeclaration;
        this.array = array;
        this.interval = interval;
    }
}
