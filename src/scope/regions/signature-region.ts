import { Interval } from '../interval';
import { SignatureParameterRegion } from './signature-parameter-region';

export class SignatureRegion {
    public readonly name: string;
    public readonly interval: Interval;
    public readonly parameters = new Array<SignatureParameterRegion>();

    public constructor(name: string, interval: Interval) {
        this.name = name;
        this.interval = interval;
    }
}
