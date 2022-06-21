import { Element } from '../element';
import { VariableDeclaration } from './variable-declaration';
import { Scope } from '../scope';
import { Range } from 'vscode';

export class VariableUsage extends Element {

    public readonly declaration: VariableDeclaration;

    public constructor(name: string, scope: Scope, interval: Range, declaration: VariableDeclaration) {
        super(name, interval, scope);
        this.declaration = declaration;
    }

}
