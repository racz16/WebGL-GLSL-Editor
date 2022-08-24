import { ColorRegion } from '../scope/regions/color-region';
import { Interval } from '../scope/interval';
import { PreprocessorRegion } from '../scope/regions/preprocessor-region';
import { FoldingRegion } from '../scope/regions/folding-region';
import { SignatureRegion } from '../scope/regions/signature-region';
import { SemanticRegion } from '../scope/regions/semantic-region';
import { CompletionRegion } from '../scope/regions/completion-region';

export class DocumentRegions {
    public readonly completionRegions = new Array<CompletionRegion>();
    public readonly foldingRegions = new Array<FoldingRegion>();
    public readonly semanticRegions = new Array<SemanticRegion>();
    public readonly colorRegions = new Array<ColorRegion>();
    public readonly signatureRegions = new Array<SignatureRegion>();
    public readonly forHeaderRegions = new Array<Interval>();
    public readonly typeDeclarationRegions = new Array<Interval>();
    public readonly unaryExpressionRegions = new Array<Interval>();
    public readonly caseHeaderRegions = new Array<Interval>();
    public readonly caseStatementsRegions = new Array<Interval>();
    public readonly scopelessInterfaceBlockRegions = new Array<Interval>();
    public readonly commentRegions = new Array<Interval>();
    public readonly preprocessorRegions = new Array<PreprocessorRegion>();
    public readonly layoutRegions = new Array<Interval>();
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
