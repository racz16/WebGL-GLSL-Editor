import { SignatureHelpProvider, TextDocument, Position, CancellationToken, SignatureHelpContext, ProviderResult, SignatureHelp, SignatureInformation, ParameterInformation } from "vscode";
import { GlslEditor } from "../core/glsl-editor";
import { DocumentInfo } from "../core/document-info";
import { SignatureRegion } from "../scope/signature-region";
import { FunctionDeclaration } from "../scope/function/function-declaration";
import { SignatureParameterRegion } from "../scope/signature-parameter-region";
import { TypeUsage } from "../scope/type/type-usage";
import { LogicalFunction } from "../scope/function/logical-function";

export class GlslSignatureHelpProvider implements SignatureHelpProvider {

    private di: DocumentInfo;
    private position: Position;
    private functions: Array<FunctionDeclaration>;

    private initialize(document: TextDocument, position: Position): void {
        GlslEditor.processElements(document);
        this.di = GlslEditor.getDocumentInfo(document.uri);
        this.position = position;
        this.functions = new Array<FunctionDeclaration>();
    }

    public provideSignatureHelp(document: TextDocument, position: Position, token: CancellationToken, context: SignatureHelpContext): ProviderResult<SignatureHelp> {
        this.initialize(document, position);
        const sr = this.getSignatureRegion();
        if (!sr) {
            return null;
        }
        const sh = new SignatureHelp();
        sh.signatures = [];
        this.addSignatures(this.di.builtin.functions, sh, sr);
        this.addSignatures(this.di.getRootScope().functions, sh, sr);
        sh.activeSignature = this.computeActiveSignature(sr);
        sh.activeParameter = this.computeActiveParameter(sr);
        return sh;
    }

    private getSignatureRegion(): SignatureRegion {
        for (const sr of this.di.signatureRegions) {
            if (!sr.interval.isInjected() && this.di.intervalToRange(sr.interval).contains(this.position)) {
                return sr;
            }
        }
        return null;
    }

    private addSignatures(lfs: Array<LogicalFunction>, sh: SignatureHelp, sr: SignatureRegion): void {
        const fi = this.di.builtin.functionSummaries.get(sr.name);
        for (const lf of lfs.filter(func => func.getDeclaration().name === sr.name)) {
            const fp = lf.getDeclaration();
            const si = new SignatureInformation(fp.toString(), fi?.summary);
            si.parameters = [];
            for (const vd of fp.parameters) {
                const pi = new ParameterInformation(vd.toString(), fi?.parameters.get(vd.name));
                si.parameters.push(pi);
            }
            sh.signatures.push(si);
            this.functions.push(fp);
        }
    }

    private computeActiveParameter(sr: SignatureRegion): number {
        for (let i = 0; i < sr.parameters.length; i++) {
            const spr = sr.parameters[i];
            if (!spr.interval.isInjected() && this.di.intervalToRange(spr.interval).contains(this.position)) {
                return i;
            }
        }
        return -1;
    }

    private computeActiveSignature(sr: SignatureRegion): number {
        const index = this.functions.findIndex(fp => this.isFunctionCompatible(fp, sr));
        return index === -1 ? 0 : index;
    }

    private isFunctionCompatible(fp: FunctionDeclaration, sr: SignatureRegion): boolean {
        if (sr.parameters.some(param => !param) || sr.parameters.length > fp.parameters.length) {
            return false;
        }
        const length = sr.parameters[sr.parameters.length - 1].typeDeclaration == null ? sr.parameters.length - 1 : sr.parameters.length;
        for (let i = 0; i < length; i++) {
            const spr = sr.parameters[i];
            const tu = fp.parameters[i]?.type;
            if (this.isExpressionNotCompatible(spr, tu)) {
                return false;
            }
        }
        return true;
    }

    private isExpressionNotCompatible(spr: SignatureParameterRegion, tu: TypeUsage): boolean {
        return !spr.typeDeclaration || !spr.array || !tu || !tu.declaration || !tu.array ||
            spr.typeDeclaration !== tu.declaration ||
            spr.array.arraySize !== tu.array.arraySize || spr.array.multidimensional !== tu.array.multidimensional;
    }

}