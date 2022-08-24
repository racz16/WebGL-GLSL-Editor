import { ReferenceProvider, TextDocument, Position, ReferenceContext, CancellationToken, ProviderResult, Location } from 'vscode';
import { PositionalProviderBase } from './helper/positional-provider-base';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { FunctionCall } from '../scope/function/function-call';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { VariableUsage } from '../scope/variable/variable-usage';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { TypeUsage } from '../scope/type/type-usage';
import { LogicalFunction } from '../scope/function/logical-function';

export class GlslReferenceProvider extends PositionalProviderBase<Array<Location>> implements ReferenceProvider {
    private referenceContext: ReferenceContext;

    public provideReferences(
        document: TextDocument,
        position: Position,
        context: ReferenceContext,
        token: CancellationToken
    ): ProviderResult<Location[]> {
        this.referenceContext = context;
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
        if (!lf.getDeclaration().builtIn && !lf.getDeclaration().ctor) {
            for (const fp of lf.prototypes) {
                this.addLocation(ret, fp.nameInterval);
            }
            for (const fd of lf.definitions) {
                this.addLocation(ret, fd.nameInterval);
            }
        }
        for (const fc of lf.calls) {
            this.addLocation(ret, fc.nameInterval);
        }
        return ret;
    }

    private processDeclaration(element: TypeDeclaration | VariableDeclaration): Array<Location> {
        const ret = new Array<Location>();
        if (!element.builtin && this.referenceContext.includeDeclaration) {
            this.addLocation(ret, element.nameInterval);
        }
        for (const usage of element.usages) {
            this.addLocation(ret, usage.nameInterval);
        }
        return ret;
    }

    private processUsage(element: TypeUsage | VariableUsage): Array<Location> {
        const declaration = element.declaration;
        if (declaration) {
            return this.processDeclaration(declaration);
        } else {
            return [];
        }
    }
}
