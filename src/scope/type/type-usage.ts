import { Element } from '../element';
import { TypeDeclaration } from './type-declaration';
import { Qualifier } from '../qualifier/qualifier';
import { QualifierUsage } from '../qualifier/qualifier-usage';
import { Interval } from '../interval';
import { Scope } from '../scope';
import { ArrayUsage } from '../array-usage';

export class TypeUsage extends Element {

    public readonly declaration: TypeDeclaration;
    public readonly qualifiers = new Array<QualifierUsage>();
    public readonly implicitQualifiers = new Array<Qualifier>();
    public readonly interval: Interval;
    public readonly array: ArrayUsage;
    public readonly inlineStructDeclaration: boolean;

    public constructor(name: string, interval: Interval, nameInterval: Interval, scope: Scope, declaration: TypeDeclaration, array: ArrayUsage, inlineStructDeclaration = false) {
        super(name, nameInterval, scope);
        this.declaration = declaration;
        this.interval = interval;
        this.array = array;
        this.inlineStructDeclaration = inlineStructDeclaration;
    }

    public isVoid(): boolean {
        return this.name === 'void';
    }

    public areArrayDimensionsMatch(tu: TypeUsage): boolean {
        return tu && this.array.arraySize === tu.array.arraySize && this.array.multidimensional === tu.array.multidimensional;
    }

    public qualifiersEqualsExceptPrecisionWith(tu: TypeUsage): boolean {
        if (!tu) {
            return false;
        }
        return this.qualifiersEqualsExceptPrecisionWithHalf(tu) && tu.qualifiersEqualsExceptPrecisionWithHalf(this);
    }

    private qualifiersEqualsExceptPrecisionWithHalf(tu: TypeUsage): boolean {
        for (const qu of this.qualifiers) {
            if (!qu.qualifier.isPrecisionQualifier() && !tu.containsQualifier(qu.qualifier) && !tu.implicitQualifiers.includes(qu.qualifier)) {
                return false;
            }
        }
        for (const q of this.implicitQualifiers) {
            if (!q.isPrecisionQualifier() && !tu.containsQualifier(q) && !tu.implicitQualifiers.includes(q)) {
                return false;
            }
        }
        return true;
    }

    public containsQualifier(q: Qualifier): boolean {
        for (const qu of this.qualifiers) {
            if (qu.qualifier === q) {
                return true;
            }
        }
        return false;
    }

    //
    //toString
    //
    public toString(): string {
        let qualifiers = '';
        for (let i = 0; i < this.qualifiers.length; i++) {
            qualifiers += this.qualifiers[i].toString() + ' ';
        }
        return qualifiers + this.toStringWithoutQualifiers();
    }

    public toStringWithoutQualifiers(): string {
        return this.name + this.array.toString();
    }

}
