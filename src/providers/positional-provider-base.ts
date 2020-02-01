import { GlslProcessor } from '../core/glsl-processor';
import { TextDocument, Position } from 'vscode';
import { FunctionDeclaration } from '../scope/function/function-declaration';
import { GlslDocumentInfo } from '../core/glsl-document-info';
import { VariableDeclaration } from '../scope/variable/variable-declaration';
import { VariableUsage } from '../scope/variable/variable-usage';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { TypeUsage } from '../scope/type/type-usage';
import { FunctionCall } from '../scope/function/function-call';

export class PositionalProviderBase<T> {

    protected di: GlslDocumentInfo;
    protected document: TextDocument;
    protected position: Position;

    protected initialize(document: TextDocument, position: Position): void {
        GlslProcessor.processDocument(document);
        this.di = GlslProcessor.getDocumentInfo(document.uri);
        this.document = document;
        this.position = position;
    }

    public processElements(document: TextDocument, position: Position): T {
        this.initialize(document, position);

        //function
        const fp = this.di.getFunctionPrototypeAt(position);
        if (fp) {
            return this.processFunctionPrototype(fp);
        }

        const fd = this.di.getFunctionDefinitionAt(position);
        if (fd) {
            return this.processFunctionDefinition(fd);
        }

        const fc = this.di.getFunctionCallAt(position);
        if (fc) {
            return this.processFunctionCall(fc);
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

        //variable
        const vd = this.di.getVariableDeclarationAt(position);
        if (vd && vd.name) {
            return this.processVariableDeclaration(vd);
        }

        const vu = this.di.getVariableUsageAt(position);
        if (vu && vu.name) {
            return this.processVariableUsage(vu);
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

}