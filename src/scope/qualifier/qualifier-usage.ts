import { Element } from '../element';
import { Interval } from '../interval';
import { Scope } from '../scope';
import { Qualifier } from './qualifier';

export class QualifierUsage extends Element {
    public readonly qualifier: Qualifier;

    public constructor(name: string, nameInterval: Interval, scope: Scope, qualifier: Qualifier) {
        super(name, nameInterval, scope);
        this.qualifier = qualifier;
    }

    public isConstQualifier(): boolean {
        return this.qualifier && this.qualifier.isConstQualifier();
    }

    public isParameterQualifier(): boolean {
        return this.qualifier && this.qualifier.isParameterQualifier();
    }

    public isPrecisionQualifier(): boolean {
        return this.qualifier && this.qualifier.isPrecisionQualifier();
    }
}
