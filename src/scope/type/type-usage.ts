import { Element } from '../element';
import { TypeDeclaration } from './type-declaration';
import { Qualifier } from '../qualifier/qualifier';
import { QualifierUsage } from '../qualifier/qualifier-usage';
import { Interval } from '../interval';
import { Scope } from '../scope';

export class TypeUsage extends Element {

    public readonly declaration: TypeDeclaration = null;
    public readonly qualifiers = new Array<QualifierUsage>();
    public readonly implicitQualifiers = new Array<Qualifier>();
    public readonly interval: Interval;
    public readonly arrayInterval: Interval;
    public readonly arrayDepth: number;
    public readonly inlineStructDeclaration;

    public constructor(name: string, interval: Interval, nameInterval: Interval, scope: Scope, arrayInterval: Interval, arrayDepth: number, declaration: TypeDeclaration, inlineStructDeclaration = false) {
        super(name, nameInterval, scope);
        this.arrayDepth = arrayDepth;
        this.declaration = declaration;
        this.interval = interval;
        this.arrayInterval = arrayInterval;
        this.inlineStructDeclaration = inlineStructDeclaration;
    }

    public isVoid(): boolean {
        return this.name === 'void';
    }

    public isArray(): boolean {
        return this.arrayDepth > 0;
    }

    public isMultidimensionalArray(): boolean {
        return this.arrayDepth > 1;
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

    /*public equals(tu: TypeUsage): boolean {
        if (!this.declaration || !tu) {
            return false;
        }
        return this.arrayDepth === tu.arrayDepth
            && this.qualifiersEquals(tu)
            && this.declaration.equals(tu.declaration);
    }

    public qualifiersEquals(tu: TypeUsage): boolean {
        for (const qu of this.qualifiers) {
            if (!tu.containsQualifier(qu.qualifier) && !tu.implicitQualifiers.includes(qu.qualifier)) {
                return false;
            }
        }
        for (const q of this.implicitQualifiers) {
            if (!tu.containsQualifier(q) && !tu.implicitQualifiers.includes(q)) {
                return false;
            }
        }
        return this.qualifiers.length + this.implicitQualifiers.length === tu.qualifiers.length + tu.implicitQualifiers.length;
    }*/

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
        for (let i = 0; i < this.arrayDepth; i++) {
            ret += "[]";
        }
        return ret;
    }

}
