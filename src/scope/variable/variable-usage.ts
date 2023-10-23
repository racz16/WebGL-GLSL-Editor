import { Element } from '../element';
import { Interval } from '../interval';
import { Scope } from '../scope';
import { VariableDeclaration } from './variable-declaration';

export class VariableUsage extends Element {
    public readonly declaration: VariableDeclaration;

    public constructor(name: string, scope: Scope, interval: Interval, declaration: VariableDeclaration) {
        super(name, interval, scope);
        this.declaration = declaration;
    }
}
