import {
    CallHierarchyProvider,
    TextDocument,
    Position,
    CancellationToken,
    ProviderResult,
    CallHierarchyItem,
    CallHierarchyIncomingCall,
    CallHierarchyOutgoingCall,
    SymbolKind,
    Range,
} from 'vscode';
import { PositionalProviderBase } from './helper/positional-provider-base';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { FunctionCall } from '../scope/function/function-call';
import { LogicalFunction } from '../scope/function/logical-function';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { HierarchyElement } from './helper/hierarchy-element';
import { HierarcySearchStage } from './helper/hierarchy-search-stage';

export class GlslCallHierarchyProvider
    extends PositionalProviderBase<Array<HierarchyElement>>
    implements CallHierarchyProvider
{
    private stage: HierarcySearchStage;

    public prepareCallHierarchy(
        document: TextDocument,
        position: Position,
        token: CancellationToken
    ): ProviderResult<Array<CallHierarchyItem>> {
        this.stage = HierarcySearchStage.PREPARE;
        return this.processElements(document, position)?.map((x) => x.getItem());
    }

    public provideCallHierarchyIncomingCalls(
        item: CallHierarchyItem,
        token: CancellationToken
    ): ProviderResult<CallHierarchyIncomingCall[]> {
        this.stage = HierarcySearchStage.INCOMING;
        const elements = this.processElements(this.document, item.selectionRange.start);
        const results = new Array<CallHierarchyIncomingCall>();
        for (const element of elements) {
            const result = element.toIncomingCall();
            results.push(result);
        }
        return results;
    }

    public provideCallHierarchyOutgoingCalls(
        item: CallHierarchyItem,
        token: CancellationToken
    ): ProviderResult<CallHierarchyOutgoingCall[]> {
        this.stage = HierarcySearchStage.OUTGOING;
        const elements = this.processElements(this.document, item.selectionRange.start);
        const results = new Array<CallHierarchyOutgoingCall>();
        for (const element of elements) {
            const result = element.toOutgoingCall();
            results.push(result);
        }
        return results;
    }

    protected processFunctionPrototype(fp: FunctionDeclaration): Array<HierarchyElement> {
        if (fp.logicalFunction.definitions.length) {
            return this.processFunctionDefinition(fp.logicalFunction.definitions[0]);
        }
        if (this.stage === HierarcySearchStage.PREPARE) {
            const item = this.createItemFromDeclaration(fp);
            return [new HierarchyElement(item, fp.logicalFunction)];
        } else if (this.stage === HierarcySearchStage.INCOMING) {
            return this.createIncomingElements(fp.logicalFunction);
        } else {
            return [];
        }
    }

    protected processFunctionDefinition(fd: FunctionDeclaration): Array<HierarchyElement> {
        if (this.stage === HierarcySearchStage.PREPARE) {
            const item = this.createItemFromDeclaration(fd);
            return [new HierarchyElement(item, fd.logicalFunction)];
        } else if (this.stage === HierarcySearchStage.INCOMING) {
            return this.createIncomingElements(fd.logicalFunction);
        } else {
            return this.createOutgoingElements(fd);
        }
    }

    protected processFunctionCall(fc: FunctionCall): Array<HierarchyElement> {
        if (this.stage === HierarcySearchStage.PREPARE) {
            return this.createPrepareElementsFromCall(fc);
        } else if (this.stage === HierarcySearchStage.INCOMING) {
            return this.createIncomingElements(fc.logicalFunction);
        } else {
            if (fc.logicalFunction.definitions.length) {
                return this.createOutgoingElements(fc.logicalFunction.definitions[0]);
            }
            return [];
        }
    }

    protected processTypeDeclaration(td: TypeDeclaration): Array<HierarchyElement> {
        if (this.stage === HierarcySearchStage.PREPARE) {
            const item = this.createItemFromTypeDeclaration(td);
            return [new HierarchyElement(item, null)];
        } else if (this.stage === HierarcySearchStage.INCOMING) {
            if (td.ctorCalls.length) {
                const lf = td.ctorCalls[0].logicalFunction;
                return this.createIncomingElements(lf);
            }
            return [];
        } else {
            return [];
        }
    }

    protected defaultReturn(): Array<HierarchyElement> {
        return this.stage === HierarcySearchStage.PREPARE ? null : [];
    }

    private createPrepareElementsFromCall(fc: FunctionCall): Array<HierarchyElement> {
        if (fc.logicalFunction.definitions.length) {
            const item = this.createItemFromDeclaration(fc.logicalFunction.definitions[0]);
            return [new HierarchyElement(item, fc.logicalFunction)];
        } else if (fc.logicalFunction.hasDeclaration()) {
            const item = this.createItemWithoutDefinition(fc);
            return [new HierarchyElement(item, fc.logicalFunction)];
        }
        return null;
    }

    private createIncomingElements(lf: LogicalFunction): Array<HierarchyElement> {
        const elements = new Array<HierarchyElement>();
        for (const call of lf.calls) {
            this.addIncomingElement(elements, call);
        }
        return elements;
    }

    private addIncomingElement(elements: Array<HierarchyElement>, call: FunctionCall): void {
        const ic = call.incomingCall;
        if (ic) {
            const foundElement = elements.find((x) => x.getLogicalFunction() === ic.logicalFunction);
            if (foundElement) {
                const overlayRange = this.di.intervalToRange(call.nameInterval);
                foundElement.getRanges().push(overlayRange);
            } else {
                const element = this.createIncomingElement(ic, call);
                elements.push(element);
            }
        }
    }

    private createIncomingElement(ic: FunctionDeclaration, call: FunctionCall): HierarchyElement {
        const item = this.createItemFromIncomingCall(ic);
        const overlayRange = this.di.intervalToRange(call.nameInterval);
        const element = new HierarchyElement(item, ic.logicalFunction);
        element.getRanges().push(overlayRange);
        return element;
    }

    private createOutgoingElements(fd: FunctionDeclaration): Array<HierarchyElement> {
        const elements = new Array<HierarchyElement>();
        for (const call of fd.outgoingCalls) {
            this.addOutgoingElement(elements, call);
        }
        return elements;
    }

    private addOutgoingElement(elements: Array<HierarchyElement>, call: FunctionCall): void {
        const foundElement = elements.find((x) => x.getLogicalFunction() === call.logicalFunction);
        if (foundElement) {
            const overlayRange = this.di.intervalToRange(call.nameInterval);
            foundElement.getRanges().push(overlayRange);
        } else {
            const element = this.createOutgoingElement(call);
            elements.push(element);
        }
    }

    private createOutgoingElement(call: FunctionCall): HierarchyElement {
        let item: CallHierarchyItem;
        if (call.logicalFunction.definitions.length) {
            item = this.createItemFromDeclaration(call.logicalFunction.definitions[0]);
        } else if (call.logicalFunction.hasDeclaration()) {
            item = this.createItemWithoutDefinition(call);
        }
        const element = new HierarchyElement(item, call.logicalFunction);
        const overlayRange = this.di.intervalToRange(call.nameInterval);
        element.getRanges().push(overlayRange);
        return element;
    }

    private createItemFromDeclaration(fd: FunctionDeclaration): CallHierarchyItem {
        const lineFocusRange = this.di.intervalToRange(fd.nameInterval);
        return new CallHierarchyItem(
            SymbolKind.Function,
            fd.name,
            `(${fd.toStringParameters()})`,
            this.document.uri,
            lineFocusRange,
            lineFocusRange
        );
    }

    private createItemWithoutDefinition(fc: FunctionCall): CallHierarchyItem {
        const fp = fc.logicalFunction.getDeclaration();
        const kind = fp.ctor ? SymbolKind.Struct : SymbolKind.Function;
        let lineFocusRange: Range;
        if (fp.ctor && fp.returnType?.declaration?.nameInterval) {
            lineFocusRange = this.di.intervalToRange(fp.returnType.declaration.nameInterval);
        } else {
            lineFocusRange = this.di.intervalToRange(fc.nameInterval);
        }
        return new CallHierarchyItem(
            kind,
            fp.name,
            `(${fp.toStringParameters()})`,
            this.document.uri,
            lineFocusRange,
            lineFocusRange
        );
    }

    private createItemFromIncomingCall(incomingCall: FunctionDeclaration): CallHierarchyItem {
        const kind = incomingCall.ctor ? SymbolKind.Struct : SymbolKind.Function;
        let lineFocusRange: Range;
        if (incomingCall.ctor && incomingCall.returnType?.declaration?.nameInterval) {
            lineFocusRange = this.di.intervalToRange(incomingCall.returnType.declaration.nameInterval);
        } else {
            lineFocusRange = this.di.intervalToRange(incomingCall.nameInterval);
        }
        return new CallHierarchyItem(
            kind,
            incomingCall.name,
            `(${incomingCall.toStringParameters()})`,
            this.document.uri,
            lineFocusRange,
            lineFocusRange
        );
    }

    private createItemFromTypeDeclaration(td: TypeDeclaration): CallHierarchyItem {
        const lineFocusRange = this.di.intervalToRange(td.nameInterval);
        return new CallHierarchyItem(
            SymbolKind.Struct,
            td.name,
            `(${td.toStringConstructorParameters()})`,
            this.document.uri,
            lineFocusRange,
            lineFocusRange
        );
    }
}
