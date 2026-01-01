import { Uri } from 'vscode';

export interface SourceLocation {
    uri: Uri;
    offset: number;
}

export interface SourceMapSegment {
    /** Virtual offset start (inclusive) */
    virtualStart: number;
    /** Virtual offset end (exclusive) */
    virtualEnd: number;

    /** Source file for this segment; null means generated text */
    sourceUri: Uri | null;
    /** Source offset start (inclusive) */
    sourceStart: number;
    /** Source offset end (exclusive) */
    sourceEnd: number;
}

export class SourceMap {
    private readonly segments: Array<SourceMapSegment> = [];

    public getSegments(): ReadonlyArray<SourceMapSegment> {
        return this.segments;
    }

    public appendGenerated(text: string): void {
        if (!text) {
            return;
        }
        const start = this.virtualLength();
        this.segments.push({
            virtualStart: start,
            virtualEnd: start + text.length,
            sourceUri: null,
            sourceStart: 0,
            sourceEnd: 0,
        });
    }

    public appendSource(uri: Uri, sourceStart: number, sourceEnd: number): void {
        if (sourceEnd <= sourceStart) {
            return;
        }
        const start = this.virtualLength();
        const len = sourceEnd - sourceStart;
        this.segments.push({
            virtualStart: start,
            virtualEnd: start + len,
            sourceUri: uri,
            sourceStart,
            sourceEnd,
        });
    }

    public appendFrom(other: SourceMap): void {
        const base = this.virtualLength();
        for (const s of other.getSegments()) {
            this.segments.push({
                virtualStart: s.virtualStart + base,
                virtualEnd: s.virtualEnd + base,
                sourceUri: s.sourceUri,
                sourceStart: s.sourceStart,
                sourceEnd: s.sourceEnd,
            });
        }
    }

    public virtualLength(): number {
        if (!this.segments.length) {
            return 0;
        }
        return this.segments[this.segments.length - 1].virtualEnd;
    }

    public mapVirtualOffset(offset: number): SourceLocation | null {
        for (const s of this.segments) {
            if (offset >= s.virtualStart && offset < s.virtualEnd) {
                if (!s.sourceUri) {
                    return null;
                }
                const delta = offset - s.virtualStart;
                return { uri: s.sourceUri, offset: s.sourceStart + delta };
            }

            // Allow mapping of exclusive end offsets (offset === virtualEnd) to a stable
            // source location at the end of the corresponding segment.
            if (offset === s.virtualEnd) {
                if (!s.sourceUri) {
                    return null;
                }
                return { uri: s.sourceUri, offset: s.sourceEnd };
            }
        }
        return null;
    }

    public mapSourceOffset(sourceUri: Uri, sourceOffset: number): number | null {
        for (const s of this.segments) {
            if (!s.sourceUri) {
                continue;
            }
            if (s.sourceUri.toString(true) !== sourceUri.toString(true)) {
                continue;
            }
            if (sourceOffset >= s.sourceStart && sourceOffset < s.sourceEnd) {
                return s.virtualStart + (sourceOffset - s.sourceStart);
            }

            // Allow mapping of exclusive end offsets (sourceOffset === sourceEnd).
            if (sourceOffset === s.sourceEnd) {
                return s.virtualEnd;
            }
        }
        return null;
    }

    public isGeneratedVirtualOffset(offset: number): boolean {
        for (const s of this.segments) {
            if (offset >= s.virtualStart && offset < s.virtualEnd) {
                return s.sourceUri == null;
            }
        }
        return false;
    }
}
