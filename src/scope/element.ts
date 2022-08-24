import { Interval } from './interval';
import { DocumentInfo } from '../core/document-info';
import { Scope } from './scope';

export abstract class Element {
    public readonly nameInterval: Interval;
    public readonly name: string;
    public readonly scope: Scope;

    public constructor(name: string, nameInterval: Interval, scope: Scope) {
        this.name = name;
        this.nameInterval = nameInterval;
        this.scope = scope;
    }

    public isDuplicateOf(element: Element, di: DocumentInfo): boolean {
        return element && this.name === element.name && element !== this;
    }

    public toString(): string {
        return this.name;
    }

    public toStringDocumentation(): string {
        return `\t${this.toString()};`;
    }
}
