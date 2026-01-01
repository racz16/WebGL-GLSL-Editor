import { Uri } from 'vscode';

export interface IncludeDirective {
    line: number; // 0-based
    raw: string;
    path: string;
    kind: 'quoted' | 'angled';
}

export interface ResolvedInclude {
    from: Uri;
    to: Uri;
    directive: IncludeDirective;
}

export interface IncludeResolutionError {
    from: Uri;
    directive?: IncludeDirective;
    message: string;
}

export interface IncludeResolverOptions {
    enabled: boolean;
    allowAngledIncludes: boolean;
    searchPaths: Array<Uri>;
    maxDepth: number;
    maxTotalBytes: number;
}

export interface IncludeGraphNode {
    uri: Uri;
    includes: Array<ResolvedInclude>;
}

export interface IncludeGraph {
    root: Uri;
    nodes: Map<string, IncludeGraphNode>; // key: uri.toString(true)
    errors: Array<IncludeResolutionError>;
}
