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

    protected documentInfo: GlslDocumentInfo;
    protected document: TextDocument;
    protected position: Position;

    public processElements(document: TextDocument, position: Position): T {
        this.initialize(document, position);

        //function
        const fp = this.documentInfo.getFunctionPrototypeAt(position, document);
        if (fp) {
            return this.processFunctionPrototype(fp);
        }

        const fd = this.documentInfo.getFunctionDefinitionAt(position, document);
        if (fd) {
            return this.processFunctionDefinition(fd);
        }

        const fc = this.documentInfo.getFunctionCallAt(position, document);
        if (fc) {
            return this.processFunctionCall(fc);
        }

        //type
        const td = this.documentInfo.getTypeDeclarationAt(position, document);
        if (td) {
            return this.processTypeDeclaration(td);
        }

        const tu = this.documentInfo.getTypeUsageAt(position, document);
        if (tu) {
            return this.processTypeUsage(tu);
        }

        //variable
        const vd = this.documentInfo.getVariableDeclarationAt(position, document);
        if (vd) {
            return this.processVariableDeclaration(vd);
        }

        const vu = this.documentInfo.getVariableUsageAt(position, document);
        if (vu) {
            return this.processVariableUsage(vu);
        }

        return this.defaultReturn();
    }

    protected initialize(document: TextDocument, position: Position): void {
        GlslProcessor.processDocument(document);
        this.documentInfo = GlslProcessor.getDocumentInfo(document.uri);
        this.document = document;
        this.position = position;
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