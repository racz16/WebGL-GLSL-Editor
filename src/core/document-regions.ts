
import { ColorRegion } from "../scope/regions/color-region";
import { PreprocessorRegion } from "../scope/regions/preprocessor-region";
import { FoldingRegion } from "../scope/regions/folding-region";
import { SignatureRegion } from "../scope/regions/signature-region";
import { SemanticRegion } from "../scope/regions/semantic-region";
import { CompletionRegion } from "../scope/regions/completion-region";
import { Range } from "vscode";

export class DocumentRegions {
    public readonly completionRegions = new Array<CompletionRegion>();
    public readonly foldingRegions = new Array<FoldingRegion>();
    public readonly semanticRegions = new Array<SemanticRegion>();
    public readonly colorRegions = new Array<ColorRegion>();
    public readonly signatureRegions = new Array<SignatureRegion>();
    public readonly forHeaderRegions = new Array<Range>();
    public readonly typeDeclarationRegions = new Array<Range>()
    public readonly unaryExpressionRegions = new Array<Range>();
    public readonly caseHeaderRegions = new Array<Range>();
    public readonly caseStatementsRegions = new Array<Range>();
    public readonly scopelessInterfaceBlockRegions = new Array<Range>();
    public readonly commentRegions = new Array<Range>();
    public readonly preprocessorRegions = new Array<PreprocessorRegion>();
    public readonly layoutRegions = new Array<Range>();
    public readonly scopedCurlyBracePositions = new Array<number>();

    public reset(): void {
        this.completionRegions.length = 0;
        this.foldingRegions.length = 0;
        this.semanticRegions.length = 0;
        this.colorRegions.length = 0;
        this.signatureRegions.length = 0;
        this.forHeaderRegions.length = 0;
        this.typeDeclarationRegions.length = 0;
        this.unaryExpressionRegions.length = 0;
        this.caseHeaderRegions.length = 0;
        this.caseStatementsRegions.length = 0;
        this.scopelessInterfaceBlockRegions.length = 0;
        this.commentRegions.length = 0;
        this.preprocessorRegions.length = 0;
        this.layoutRegions.length = 0;
        this.scopedCurlyBracePositions.length = 0;
    }
}