import { FunctionDeclaration } from './function-declaration';
import { FunctionCall } from './function-call';

export class LogicalFunction {

    public readonly prototypes = new Array<FunctionDeclaration>();
    public readonly calls = new Array<FunctionCall>();
    public readonly definitions = new Array<FunctionDeclaration>();

    public connects(fd: FunctionDeclaration): boolean {
        const fp = this.prototypes[0];
        if (fp && fp.isConnectableWith(fd)) {
            return true;
        }
        const fd2 = this.definitions[0];
        if (fd2 && fd2.isConnectableWith(fd)) {
            return true;
        }
        return false;
    }

}
