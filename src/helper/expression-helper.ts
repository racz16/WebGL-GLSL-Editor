import { ExpressionContext } from '../_generated/AntlrGlslParser';
import { TypeDeclaration } from '../scope/type/type-declaration';
import { GlslDocumentInfo } from '../core/glsl-document-info';
import { Helper } from './helper';

export class ExpressionHelper {

    private ctx: ExpressionContext;
    private di: GlslDocumentInfo;

    private initialize(ctx: ExpressionContext, di: GlslDocumentInfo): void {
        this.ctx = ctx;
        this.di = di;
    }

    public processExpression(ctx: ExpressionContext, di: GlslDocumentInfo): ExpressionType {
        this.initialize(ctx, di);
        if (this.isLiteral()) {
            return this.processLiteral();
        } else if (this.isIdentifier()) {
            return this.processIdentifier();
        }
        return null;
    }

    private isLiteral(): boolean {
        return this.ctx.literal() !== null;
    }

    private processLiteral(): ExpressionType {
        if (this.ctx.literal().BOOL_LITERAL()) {
            return new ExpressionType(this.di.builtin.types.get('bool'));
        } else {
            if (this.ctx.literal().number_literal().FLOAT_LITERAL()) {
                return new ExpressionType(this.di.builtin.types.get('float'));
            } else {
                if (this.ctx.literal().text.toLowerCase().endsWith('u')) {
                    return new ExpressionType(this.di.builtin.types.get('uint'));
                } else {
                    return new ExpressionType(this.di.builtin.types.get('int'));
                }
            }
        }
    }

    private isIdentifier(): boolean {
        return this.ctx.IDENTIFIER() && !this.ctx.DOT();
    }

    private processIdentifier(): ExpressionType {
        const position = this.di.offsetToPosition(this.ctx.IDENTIFIER().symbol.startIndex);
        const vu = this.di.getVariableUsageAt(position);
        if (vu && vu.declaration && vu.declaration.type && vu.declaration.type.declaration) {
            return new ExpressionType(vu.declaration.type.declaration);
        } else {
            return null;
        }
    }



    private isParenthesizedExpression(): boolean {
        return this.ctx.LRB() !== null;
    }

    private processParenthesizedExpression(): ExpressionType {
        return new ExpressionHelper().processExpression(this.ctx.expression()[0], this.di);
    }

}

export class ExpressionType {
    public readonly type: TypeDeclaration;
    public readonly array: Array<number>;
    public readonly constant: boolean;

    public constructor(type: TypeDeclaration, array = [1], constant = false) {
        this.type = type;
        this.array = array;
        this.constant = constant;
    }

}