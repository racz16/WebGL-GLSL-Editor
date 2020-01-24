import { Interval } from './interval';
import { MarkdownString } from 'vscode';
import { GlslDocumentInfo } from '../core/glsl-document-info';
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

    /*public equals(el: Element): boolean {
        if (el === null) {
            return false;
        }
        return this.name === el.name;
    }*/

    public isDuplicateOf(element: Element, di: GlslDocumentInfo): boolean {
        return element && this.name === element.name && element !== this;
    }

    public toString(): string {
        return this.name;
    }

    public toStringDocumentation(): string {
        return `\t${this.toString()};`;
    }

}