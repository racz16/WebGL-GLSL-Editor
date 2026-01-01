import { Uri } from 'vscode';
import { IncludeGraph, IncludeResolutionError } from './include-types';
import { SourceMap } from './source-map';

export interface ExpandedDocument {
    root: Uri;
    text: string;
    sourceMap: SourceMap;
    graph: IncludeGraph;
    errors: Array<IncludeResolutionError>;
}
