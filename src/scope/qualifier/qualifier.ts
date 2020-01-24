import { QualifierUsage } from './qualifier-usage';
import { GlslDocumentInfo } from '../../core/glsl-document-info';
import { MarkdownString } from 'vscode';

export class Qualifier {

    public readonly name: string;
    public readonly order: number;
    public readonly usages = new Array<QualifierUsage>();

    public constructor(name: string, order: number) {
        this.name = name;
        this.order = order;
    }

    public isConstQualifier(): boolean {
        return this.name === 'const';
    }

    public isParameterQualifier(): boolean {
        return this.name === 'in' || this.name === 'out' || this.name === 'inout';
    }

    public isPrecisionQualifier(): boolean {
        return this.name === 'lowp' || this.name === 'mediump' || this.name === 'highp';
    }

    public isCompatibleWith(qualifier: Qualifier, di: GlslDocumentInfo): boolean {
        if (this === qualifier) {
            return false;
        }
        return this.isCompatibleWithUnsafe(qualifier, di);
    }

    private isCompatibleWithUnsafe(qualifier: Qualifier, di: GlslDocumentInfo): boolean {
        for (const qs of di.builtin.qualifierRules) {
            if (qs.has(this) && qs.has(qualifier)) {
                return false;
            }
        }
        return true;
    }

    /*public equals(q: Qualifier): boolean {
        if (!q) {
            return false;
        }
        return this.name === q.name;
    }*/

    public toString(): string {
        return this.name;
    }

    public toStringDocumentation(): string {
        return `\t${this.toString()};`;
    }

}
