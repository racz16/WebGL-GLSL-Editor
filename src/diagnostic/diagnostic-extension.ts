import { Interval } from '../scope/interval';


export class DiagnosticExtension {

    public readonly interval: Interval;
    public readonly message: string;

    public constructor(interval: Interval, message: string) {
        this.interval = interval;
        this.message = message;
    }

}
