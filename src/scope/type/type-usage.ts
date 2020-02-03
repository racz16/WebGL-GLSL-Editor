import { Element } from '../element';
import { TypeDeclaration } from './type-declaration';
import { Qualifier } from '../qualifier/qualifier';
import { QualifierUsage } from '../qualifier/qualifier-usage';
import { Interval } from '../interval';
import { Scope } from '../scope';

export class TypeUsage extends Element {

    public readonly declaration: TypeDeclaration;
    public readonly qualifiers = new Array<QualifierUsage>();
    public readonly implicitQualifiers = new Array<Qualifier>();
    public readonly interval: Interval;
    public readonly arrayInterval: Interval;
    public readonly array = new Array<number>();
    public readonly inlineStructDeclaration: boolean;

    public constructor(name: string, interval: Interval, nameInterval: Interval, scope: Scope, arrayInterval: Interval, declaration: TypeDeclaration, arraySize = new Array<number>(), inlineStructDeclaration = false) {
        super(name, nameInterval, scope);
        this.declaration = declaration;
        this.interval = interval;
        this.arrayInterval = arrayInterval;
        this.array = arraySize;
        this.inlineStructDeclaration = inlineStructDeclaration;
    }

    public isVoid(): boolean {
        return this.name === 'void';
    }

    public isArray(): boolean {
        return this.array.length > 0;
    }

    public isMultidimensionalArray(): boolean {
        return this.array.length > 1;
    }

    public areArrayDimensionsMatch(tu: TypeUsage): boolean {
        if (!tu || this.array.length !== tu.array.length) {
            return false;
        }
        for (let i = 0; i < this.array.length; i++) {
            if (this.array[i] !== tu.array[i]) {
                return false;
            }
        }
        return true;
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

    private containsQualifier(q: Qualifier): boolean {
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
        return qualifiers + this.name + this.toStringArray();
    }

    private toStringArray(): string {
        let ret = '';
        for (const array of this.array) {
            const arraySize = array === -1 ? '' : `${array}`;
            ret += `[${arraySize}]`;
        }
        return ret;
    }

}
