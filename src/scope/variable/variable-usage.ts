import { Element } from '../element';
import { VariableDeclaration } from './variable-declaration';
import { Interval } from '../interval';
import { Scope } from '../scope';

export class VariableUsage extends Element {

    public readonly declaration: VariableDeclaration;

    public constructor(name: string, scope: Scope, interval: Interval, declaration: VariableDeclaration) {
        super(name, interval, scope);
        this.declaration = declaration;
    }

}
