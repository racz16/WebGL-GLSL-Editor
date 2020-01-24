import { Element } from '../element';
import { VariableDeclaration } from './variable-declaration';
import { Interval } from '../interval';
import { Scope } from '../scope';

export class VariableUsage extends Element {

    public readonly declaration: VariableDeclaration = null;

    public constructor(name: string, scope: Scope, interval: Interval, declaration: VariableDeclaration) {
        super(name, interval, scope);
        this.declaration = declaration;
    }

    /*public equals(vu: VariableUsage): boolean {
        if (!this.declaration || !vu) {
            return false;
        }
        return this.declaration.equals(vu.declaration);
    }*/

}
