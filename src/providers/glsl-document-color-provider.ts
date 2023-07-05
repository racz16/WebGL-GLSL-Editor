import {
    DocumentColorProvider,
    TextDocument,
    CancellationToken,
    ProviderResult,
    ColorInformation,
    Color,
    Range,
    ColorPresentation,
    TextEdit,
} from 'vscode';
import { DocumentInfo } from '../core/document-info';
import { GlslEditor } from '../core/glsl-editor';
import { ColorRegion } from '../scope/regions/color-region';
import { Constants } from '../core/constants';
import { Interval } from '../scope/interval';

export class GlslDocumentColorProvider implements DocumentColorProvider {
    private di: DocumentInfo;

    private initialize(document: TextDocument): void {
        GlslEditor.processElements(document);
        this.di = GlslEditor.getDocumentInfo(document.uri);
    }

    public provideDocumentColors(document: TextDocument, token: CancellationToken): ProviderResult<ColorInformation[]> {
        this.initialize(document);
        const results = new Array<ColorInformation>();
        for (const colorRegion of this.di.getRegions().colorRegions) {
            if (!colorRegion.constructorCall.interval.isInjected()) {
                const range = this.di.intervalToRange(colorRegion.constructorCall.interval);
                const color = this.computeColorFromParameters(colorRegion);
                const ci = new ColorInformation(range, color);
                results.push(ci);
            }
        }
        return results;
    }

    private computeColorFromParameters(cr: ColorRegion): Color {
        const params = cr.parameters;
        if (params.length === 1) {
            if (cr.constructorCall.name === Constants.VEC3) {
                return new Color(params[0], params[0], params[0], 1);
            } else {
                return new Color(params[0], params[0], params[0], params[0]);
            }
        } else if (params.length === 3) {
            return new Color(params[0], params[1], params[2], 1);
        } else {
            return new Color(params[0], params[1], params[2], params[3]);
        }
    }

    public provideColorPresentations(
        color: Color,
        context: { document: TextDocument; range: Range },
        token: CancellationToken
    ): ProviderResult<ColorPresentation[]> {
        this.initialize(context.document);
        const cr = this.getColorRegion(context.range);
        const label = this.computeColorLabel(color, cr);
        const cps = this.computeColorPresentationString(color, cr);
        const cp = new ColorPresentation(label);
        const range = this.di.intervalToRange(
            new Interval(
                cr.constructorCall.nameInterval.stopIndex + this.di.getInjectionOffset() + 1,
                cr.constructorCall.interval.stopIndex + this.di.getInjectionOffset() - 1,
                this.di
            )
        );
        const te = new TextEdit(range, cps);
        cp.textEdit = te;
        return [cp];
    }

    private getColorRegion(range: Range): ColorRegion {
        for (const colorRegion of this.di.getRegions().colorRegions) {
            if (range.intersection(this.di.intervalToRange(colorRegion.constructorCall.interval))) {
                return colorRegion;
            }
        }
        return null;
    }

    private computeColorLabel(color: Color, cr: ColorRegion): string {
        const red = color.red.toFixed(2);
        const green = color.green.toFixed(2);
        const blue = color.blue.toFixed(2);
        if (cr.constructorCall.name === Constants.VEC3) {
            return `${red}, ${green}, ${blue}`;
        } else {
            const alpha = color.alpha.toFixed(2);
            return `${red}, ${green}, ${blue}, ${alpha}`;
        }
    }

    private computeColorPresentationString(color: Color, cr: ColorRegion): string {
        const red = this.roundToTwoDecimals(color.red);
        const green = this.roundToTwoDecimals(color.green);
        const blue = this.roundToTwoDecimals(color.blue);
        if (cr.constructorCall.name === Constants.VEC3) {
            if (red === green && green === blue) {
                return this.formatNumbers(red);
            } else {
                return this.formatNumbers(red, green, blue);
            }
        } else {
            const alpha = this.roundToTwoDecimals(color.alpha);
            if (red === green && green === blue && blue === alpha) {
                return this.formatNumbers(red);
            } else {
                return this.formatNumbers(red, green, blue, alpha);
            }
        }
    }

    private roundToTwoDecimals(num: number): number {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    }

    private formatNumbers(...values: Array<number>): string {
        return values.map((value) => this.formatNumber(value)).join(', ');
    }

    private formatNumber(value: number): string {
        let postfix = '';
        if (Number.isInteger(value)) {
            postfix += '.0';
        }
        if (this.di.getVersion() === 300 && GlslEditor.CONFIGURATIONS.getFavorFloatingSuffix()) {
            postfix += 'f';
        }
        return `${value}${postfix}`;
    }
}
