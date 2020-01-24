import { ReferenceProvider, TextDocument, Position, ReferenceContext, CancellationToken, ProviderResult, Location } from 'vscode';
import { Helper } from '../helper/helper';
import { PositionalProviderBase } from './positional-provider-base';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { FunctionCall } from '../scope/function/function-call';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { VariableUsage } from '../scope/variable/variable-usage';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { TypeUsage } from '../scope/type/type-usage';
import { LogicalFunction } from '../scope/function/logical-function';

export class GlslReferenceProvider extends PositionalProviderBase<Array<Location>> implements ReferenceProvider {

    public provideReferences(document: TextDocument, position: Position, context: ReferenceContext, token: CancellationToken): ProviderResult<Location[]> {
        return this.processElements(document, position);
    }

    protected processFunctionPrototype(fp: FunctionDeclaration): Array<Location> {
        return this.processFunction(fp.logicalFunction);
    }

    protected processFunctionDefinition(fd: FunctionDeclaration): Array<Location> {
        return this.processFunction(fd.logicalFunction);
    }

    protected processFunctionCall(fc: FunctionCall): Array<Location> {
        return this.processFunction(fc.logicalFunction);
    }

    protected processVariableDeclaration(vd: VariableDeclaration): Array<Location> {
        return this.processDeclaration(vd);
    }

    protected processVariableUsage(vu: VariableUsage): Array<Location> {
        return this.processUsage(vu);
    }

    protected processTypeDeclaration(td: TypeDeclaration): Array<Location> {
        return this.processDeclaration(td);
    }

    protected processTypeUsage(tu: TypeUsage): Array<Location> {
        return this.processUsage(tu);
    }

    private processFunction(lf: LogicalFunction): Array<Location> {
        const ret = new Array<Location>();
        for (const fp of lf.prototypes) {
            ret.push(Helper.intervalToLocation(fp.nameInterval, this.document));
        }
        for (const fd of lf.definitions) {
            ret.push(Helper.intervalToLocation(fd.nameInterval, this.document));
        }
        for (const fc of lf.calls) {
            ret.push(Helper.intervalToLocation(fc.nameInterval, this.document));
        }
        return ret;
    }

    private processDeclaration(element: TypeDeclaration | VariableDeclaration): Array<Location> {
        const ret = new Array<Location>();
        ret.push(Helper.intervalToLocation(element.nameInterval, this.document));
        for (const usage of element.usages) {
            ret.push(Helper.intervalToLocation(usage.nameInterval, this.document));
        }
        return ret;
    }

    private processUsage(element: TypeUsage | VariableUsage): Array<Location> {
        const ret = new Array<Location>();
        ret.push(Helper.intervalToLocation(element.nameInterval, this.document));
        const declaration = element.declaration;
        if (declaration) {
            if (!declaration.builtin) {
                ret.push(Helper.intervalToLocation(declaration.nameInterval, this.document));
            }
            for (const usage of declaration.usages) {
                if (element !== usage) {
                    ret.push(Helper.intervalToLocation(usage.nameInterval, this.document));
                }
            }

        }
        return ret;
    }

}
