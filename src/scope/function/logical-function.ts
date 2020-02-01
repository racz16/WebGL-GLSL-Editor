import { FunctionDeclaration } from './function-declaration';
import { FunctionCall } from './function-call';

export class LogicalFunction {

    public readonly prototypes = new Array<FunctionDeclaration>();
    public readonly calls = new Array<FunctionCall>();
    public readonly definitions = new Array<FunctionDeclaration>();

    public connects(fd: FunctionDeclaration): boolean {
        return this.getDeclaration().isConnectableWith(fd);
    }

    public getDeclaration(): FunctionDeclaration {
        if (this.prototypes.length) {
            return this.prototypes[0];
        } else if (this.definitions.length) {
            return this.definitions[0];
        } else {
            return null;
        }
    }

    public hasDeclaration(): boolean {
        return this.prototypes.length !== 0 || this.definitions.length !== 0;
    }

}
