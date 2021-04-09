import { GlslEditor } from '../../core/glsl-editor';
import { TextDocument, Position, Location } from 'vscode';
import { FunctionDeclaration } from '../../scope/function/function-declaration';
import { DocumentInfo } from '../../core/document-info';
import { VariableDeclaration } from '../../scope/variable/variable-declaration';
import { VariableUsage } from '../../scope/variable/variable-usage';
import { TypeDeclaration } from '../../scope/type/type-declaration';
import { TypeUsage } from '../../scope/type/type-usage';
import { FunctionCall } from '../../scope/function/function-call';
import { Interval } from '../../scope/interval';

export class PositionalProviderBase<T> {

    protected di: DocumentInfo;
    protected document: TextDocument;
    protected position: Position;
    protected offset: number;

    protected initialize(document: TextDocument, position: Position): void {
        GlslEditor.processElements(document);
        this.di = GlslEditor.getDocumentInfo(document.uri);
        this.document = document;
        this.position = position;
        this.offset = this.di.positionToOffset(this.position);
    }

    protected processElements(document: TextDocument, position: Position): T {
        this.initialize(document, position);

        //function
        const fp = this.di.getFunctionPrototypeAt(position);
        if (fp && !fp.ctor && this.di.isExtensionAvailable(fp.extension, this.offset)) {
            return this.processFunctionPrototype(fp);
        }

        const fd = this.di.getFunctionDefinitionAt(position);
        if (fd && !fd.ctor && this.di.isExtensionAvailable(fd.extension, this.offset)) {
            return this.processFunctionDefinition(fd);
        }

        const fc = this.di.getFunctionCallAt(position);
        if (fc && (fc.logicalFunction.prototypes.length === 0 || this.di.isExtensionAvailable(fc.logicalFunction.getDeclaration().extension, this.offset))) {
            return this.processFunctionCall(fc);
        }

        //variable
        const vd = this.di.getVariableDeclarationAt(position);
        if (vd && vd.name && this.di.isExtensionAvailable(vd.extension, this.offset)) {
            return this.processVariableDeclaration(vd);
        }

        const vu = this.di.getVariableUsageAt(position);
        if (vu && vu.name && (!vu.declaration || this.di.isExtensionAvailable(vu.declaration.extension, this.offset))) {
            return this.processVariableUsage(vu);
        }

        //type
        const td = this.di.getTypeDeclarationAt(position);
        if (td && td.name) {
            return this.processTypeDeclaration(td);
        }

        const tu = this.di.getTypeUsageAt(position);
        if (tu && tu.name) {
            return this.processTypeUsage(tu);
        }

        return this.defaultReturn();
    }

    protected processFunctionPrototype(fp: FunctionDeclaration): T {
        return null;
    }

    protected processFunctionDefinition(fd: FunctionDeclaration): T {
        return null;
    }

    protected processFunctionCall(fc: FunctionCall): T {
        return null;
    }

    protected processVariableDeclaration(vd: VariableDeclaration): T {
        return null;
    }

    protected processVariableUsage(vu: VariableUsage): T {
        return null;
    }

    protected processTypeDeclaration(td: TypeDeclaration): T {
        return null;
    }

    protected processTypeUsage(tu: TypeUsage): T {
        return null;
    }

    protected defaultReturn(): T {
        return null;
    }

    protected addLocation(list: Array<Location>, interval: Interval): void {
        if (interval && !interval.isInjected()) {
            list.push(this.di.intervalToLocation(interval));
        }
    }

}