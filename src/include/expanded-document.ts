import { Uri } from 'vscode';
import { IncludeGraph, IncludeResolutionError } from './include-types';
import { SourceMap } from './source-map';

export interface ExpandedSource {
    uri: Uri;
    text: string;
    lineStarts: Array<number>;
}

export interface ExpandedDocument {
    root: Uri;
    text: string;
    sourceMap: SourceMap;
    sources: Map<string, ExpandedSource>; // key: uri.toString(true)
    graph: IncludeGraph;
    errors: Array<IncludeResolutionError>;
}
