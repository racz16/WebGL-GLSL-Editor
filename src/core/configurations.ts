import { ConfigurationChangeEvent, Uri, workspace } from 'vscode';
import { IncludeResolverOptions } from '../include/include-types';
import { Constants } from './constants';
import { GlslEditor } from './glsl-editor';

export class Configurations {
    private static readonly DIAGNOSTICS = 'diagnostics';
    private static readonly STRICT_RENAME = 'strictRename';
    private static readonly ALWAYS_OPEN_ONLINE_DOC = 'alwaysOpenOnlineDoc';
    private static readonly ALWAYS_OPEN_OFFLINE_DOC_IN_NEW_TAB = 'alwaysOpenOfflineDocInNewTab';
    private static readonly CODE_INJECTION = 'codeInjection';
    private static readonly CODE_INJECTION_SOURCE = 'codeInjectionSource';
    private static readonly BRACES_ON_SEPARATE_LINE = 'format.placeBracesOnSeparateLine';
    private static readonly SPACE_AROUND_UNARY_OPERATORS = 'format.placeSpaceAroundUnaryOperators';
    private static readonly SPACES_AROUND_BINARY_OPERATOS = 'format.placeSpacesAroundBinaryOperators';
    private static readonly SPACES_AROUND_ASSIGNMENT_OPERATORS = 'format.placeSpacesAroundAssignmentOperators';
    private static readonly SPACES_AROUND_TERNARY_OPERATORS = 'format.placeSpacesAroundTernaryOperators';
    private static readonly SPACE_AFTER_KEYWORDS = 'format.placeSpaceAfterKeywords';
    private static readonly SPACE_AFTER_FUNCTION_NAMES = 'format.placeSpaceAfterFunctionNames';
    private static readonly SPACE_BEFORE_COMMAS = 'format.placeSpaceBeforeCommas';
    private static readonly SPACE_AFTER_COMMAS = 'format.placeSpaceAfterCommas';
    private static readonly SPACES_AROUND_DOTS = 'format.placeSpacesAroundDots';
    private static readonly SPACE_BEFORE_CASE_COLONS = 'format.placeSpaceBeforeCaseColons';
    private static readonly SPACE_BEFORE_SEMICOLONS_IN_FOR = 'format.placeSpaceBeforeSemicolonsInFor';
    private static readonly SPACE_AFTER_SEMICOLONS_IN_FOR = 'format.placeSpaceAfterSemicolonsInFor';
    private static readonly SPACES_INSIDE_PARENTHESES = 'format.placeSpacesInsideParentheses';
    private static readonly SPACES_AROUND_BRACES = 'format.placeSpacesAroundBraces';
    private static readonly SPACE_BEFORE_OPENING_BRACKETS = 'format.placeSpaceBeforeOpeningBrackets';
    private static readonly SPACES_INSIDE_BRACKETS = 'format.placeSpacesInsideBrackets';
    private static readonly FAVOR_FLOATING_SUFFIX = 'format.favorFloatingSuffix';

    private static readonly INCLUDES_ENABLED = 'includes.enabled';
    private static readonly INCLUDES_SEARCH_PATHS = 'includes.searchPaths';
    private static readonly INCLUDES_MAX_DEPTH = 'includes.maxDepth';
    private static readonly INCLUDES_MAX_TOTAL_BYTES = 'includes.maxTotalBytes';
    private static readonly INCLUDES_ALLOW_ANGLED = 'includes.allowAngledIncludes';

    private diagnostics: boolean;
    private strictRename: boolean;
    private alwaysOpenOnlineDoc: boolean;
    private alwaysOpenOfflineDocInNewTab: boolean;
    private codeInjection: boolean;
    private codeInjectionSource: Array<string>;
    private bracesOnSeparateLine: boolean;
    private spaceAroundUnaryOperators: boolean;
    private spacesAroundBinaryOperators: boolean;
    private spacesAroundAssignmentOperators: boolean;
    private spacesAroundTernaryOperators: boolean;
    private spaceAfterKeywords: boolean;
    private spaceAfterFunctionNames: boolean;
    private spaceBeforeCommas: boolean;
    private spaceAfterCommas: boolean;
    private spacesAroundDots: boolean;
    private spaceBeforeCaseColons: boolean;
    private spaceBeforeSemicolonsInFor: boolean;
    private spaceAfterSemicolonsInFor: boolean;
    private spacesInsideParentheses: boolean;
    private spacesAroundBraces: boolean;
    private spaceBeforeOpeningBrackets: boolean;
    private spacesInsideBrackets: boolean;
    private favorFloatingSuffix: boolean;

    private includesEnabled: boolean;
    private includesSearchPaths: Array<string>;
    private includesMaxDepth: number;
    private includesMaxTotalBytes: number;
    private includesAllowAngledIncludes: boolean;

    public constructor() {
        const config = workspace.getConfiguration(Constants.EXTENSION_NAME);
        this.diagnostics = config.get(Configurations.DIAGNOSTICS);
        this.strictRename = config.get(Configurations.STRICT_RENAME);
        this.alwaysOpenOnlineDoc = config.get(Configurations.ALWAYS_OPEN_ONLINE_DOC);
        this.alwaysOpenOfflineDocInNewTab = config.get(Configurations.ALWAYS_OPEN_OFFLINE_DOC_IN_NEW_TAB);
        this.codeInjection = config.get(Configurations.CODE_INJECTION);
        this.codeInjectionSource = config.get(Configurations.CODE_INJECTION_SOURCE);
        this.bracesOnSeparateLine = config.get(Configurations.BRACES_ON_SEPARATE_LINE);
        this.spaceAroundUnaryOperators = config.get(Configurations.SPACE_AROUND_UNARY_OPERATORS);
        this.spacesAroundBinaryOperators = config.get(Configurations.SPACES_AROUND_BINARY_OPERATOS);
        this.spacesAroundAssignmentOperators = config.get(Configurations.SPACES_AROUND_ASSIGNMENT_OPERATORS);
        this.spacesAroundTernaryOperators = config.get(Configurations.SPACES_AROUND_TERNARY_OPERATORS);
        this.spaceAfterKeywords = config.get(Configurations.SPACE_AFTER_KEYWORDS);
        this.spaceAfterFunctionNames = config.get(Configurations.SPACE_AFTER_FUNCTION_NAMES);
        this.spaceBeforeCommas = config.get(Configurations.SPACE_BEFORE_COMMAS);
        this.spaceAfterCommas = config.get(Configurations.SPACE_AFTER_COMMAS);
        this.spacesAroundDots = config.get(Configurations.SPACES_AROUND_DOTS);
        this.spaceBeforeCaseColons = config.get(Configurations.SPACE_BEFORE_CASE_COLONS);
        this.spaceBeforeSemicolonsInFor = config.get(Configurations.SPACE_BEFORE_SEMICOLONS_IN_FOR);
        this.spaceAfterSemicolonsInFor = config.get(Configurations.SPACE_AFTER_SEMICOLONS_IN_FOR);
        this.spacesInsideParentheses = config.get(Configurations.SPACES_INSIDE_PARENTHESES);
        this.spacesAroundBraces = config.get(Configurations.SPACES_AROUND_BRACES);
        this.spaceBeforeOpeningBrackets = config.get(Configurations.SPACE_BEFORE_OPENING_BRACKETS);
        this.spacesInsideBrackets = config.get(Configurations.SPACES_INSIDE_BRACKETS);
        this.favorFloatingSuffix = config.get(Configurations.FAVOR_FLOATING_SUFFIX);

        this.includesEnabled = config.get(Configurations.INCLUDES_ENABLED);
        this.includesSearchPaths = config.get(Configurations.INCLUDES_SEARCH_PATHS);
        this.includesMaxDepth = config.get(Configurations.INCLUDES_MAX_DEPTH);
        this.includesMaxTotalBytes = config.get(Configurations.INCLUDES_MAX_TOTAL_BYTES);
        this.includesAllowAngledIncludes = config.get(Configurations.INCLUDES_ALLOW_ANGLED);

        workspace.onDidChangeConfiguration((e: ConfigurationChangeEvent) => {
            const config = workspace.getConfiguration(Constants.EXTENSION_NAME);
            if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.DIAGNOSTICS}`)) {
                this.diagnostics = config.get(Configurations.DIAGNOSTICS);
                GlslEditor.invalidateDocuments();
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.STRICT_RENAME}`)) {
                this.strictRename = config.get(Configurations.STRICT_RENAME);
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.ALWAYS_OPEN_ONLINE_DOC}`)) {
                this.alwaysOpenOnlineDoc = config.get(Configurations.ALWAYS_OPEN_ONLINE_DOC);
            } else if (
                e.affectsConfiguration(
                    `${Constants.EXTENSION_NAME}.${Configurations.ALWAYS_OPEN_OFFLINE_DOC_IN_NEW_TAB}`
                )
            ) {
                this.alwaysOpenOfflineDocInNewTab = config.get(Configurations.ALWAYS_OPEN_OFFLINE_DOC_IN_NEW_TAB);
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.CODE_INJECTION}`)) {
                this.codeInjection = config.get(Configurations.CODE_INJECTION);
                GlslEditor.invalidateDocuments();
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.CODE_INJECTION_SOURCE}`)) {
                this.codeInjectionSource = config.get(Configurations.CODE_INJECTION_SOURCE);
                GlslEditor.invalidateDocuments();
            } else if (
                e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.BRACES_ON_SEPARATE_LINE}`)
            ) {
                this.bracesOnSeparateLine = config.get(Configurations.BRACES_ON_SEPARATE_LINE);
            } else if (
                e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.SPACE_AROUND_UNARY_OPERATORS}`)
            ) {
                this.spaceAroundUnaryOperators = config.get(Configurations.SPACE_AROUND_UNARY_OPERATORS);
            } else if (
                e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.SPACES_AROUND_BINARY_OPERATOS}`)
            ) {
                this.spacesAroundBinaryOperators = config.get(Configurations.SPACES_AROUND_BINARY_OPERATOS);
            } else if (
                e.affectsConfiguration(
                    `${Constants.EXTENSION_NAME}.${Configurations.SPACES_AROUND_ASSIGNMENT_OPERATORS}`
                )
            ) {
                this.spacesAroundAssignmentOperators = config.get(Configurations.SPACES_AROUND_ASSIGNMENT_OPERATORS);
            } else if (
                e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.SPACES_AROUND_TERNARY_OPERATORS}`)
            ) {
                this.spacesAroundTernaryOperators = config.get(Configurations.SPACES_AROUND_TERNARY_OPERATORS);
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.SPACE_AFTER_KEYWORDS}`)) {
                this.spaceAfterKeywords = config.get(Configurations.SPACE_AFTER_KEYWORDS);
            } else if (
                e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.SPACE_AFTER_FUNCTION_NAMES}`)
            ) {
                this.spaceAfterFunctionNames = config.get(Configurations.SPACE_AFTER_FUNCTION_NAMES);
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.SPACE_BEFORE_COMMAS}`)) {
                this.spaceBeforeCommas = config.get(Configurations.SPACE_BEFORE_COMMAS);
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.SPACE_AFTER_COMMAS}`)) {
                this.spaceAfterCommas = config.get(Configurations.SPACE_AFTER_COMMAS);
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.SPACES_AROUND_DOTS}`)) {
                this.spacesAroundDots = config.get(Configurations.SPACES_AROUND_DOTS);
            } else if (
                e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.SPACE_BEFORE_CASE_COLONS}`)
            ) {
                this.spaceBeforeCaseColons = config.get(Configurations.SPACE_BEFORE_CASE_COLONS);
            } else if (
                e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.SPACE_BEFORE_SEMICOLONS_IN_FOR}`)
            ) {
                this.spaceBeforeSemicolonsInFor = config.get(Configurations.SPACE_BEFORE_SEMICOLONS_IN_FOR);
            } else if (
                e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.SPACE_AFTER_SEMICOLONS_IN_FOR}`)
            ) {
                this.spaceAfterSemicolonsInFor = config.get(Configurations.SPACE_AFTER_SEMICOLONS_IN_FOR);
            } else if (
                e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.SPACES_INSIDE_PARENTHESES}`)
            ) {
                this.spacesInsideParentheses = config.get(Configurations.SPACES_INSIDE_PARENTHESES);
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.SPACES_AROUND_BRACES}`)) {
                this.spacesAroundBraces = config.get(Configurations.SPACES_AROUND_BRACES);
            } else if (
                e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.SPACE_BEFORE_OPENING_BRACKETS}`)
            ) {
                this.spaceBeforeOpeningBrackets = config.get(Configurations.SPACE_BEFORE_OPENING_BRACKETS);
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.SPACES_INSIDE_BRACKETS}`)) {
                this.spacesInsideBrackets = config.get(Configurations.SPACES_INSIDE_BRACKETS);
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.FAVOR_FLOATING_SUFFIX}`)) {
                this.favorFloatingSuffix = config.get(Configurations.FAVOR_FLOATING_SUFFIX);
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.INCLUDES_ENABLED}`)) {
                this.includesEnabled = config.get(Configurations.INCLUDES_ENABLED);
                GlslEditor.invalidateDocuments();
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.INCLUDES_SEARCH_PATHS}`)) {
                this.includesSearchPaths = config.get(Configurations.INCLUDES_SEARCH_PATHS);
                GlslEditor.invalidateDocuments();
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.INCLUDES_MAX_DEPTH}`)) {
                this.includesMaxDepth = config.get(Configurations.INCLUDES_MAX_DEPTH);
                GlslEditor.invalidateDocuments();
            } else if (
                e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.INCLUDES_MAX_TOTAL_BYTES}`)
            ) {
                this.includesMaxTotalBytes = config.get(Configurations.INCLUDES_MAX_TOTAL_BYTES);
                GlslEditor.invalidateDocuments();
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.INCLUDES_ALLOW_ANGLED}`)) {
                this.includesAllowAngledIncludes = config.get(Configurations.INCLUDES_ALLOW_ANGLED);
                GlslEditor.invalidateDocuments();
            }
        });
    }

    public getDiagnostics(): boolean {
        return this.diagnostics;
    }

    public getStrictRename(): boolean {
        return this.strictRename;
    }

    public getAlwaysOpenOnlineDoc(): boolean {
        return this.alwaysOpenOnlineDoc;
    }

    public getAlwaysOpenOfflineDocInNewTab(): boolean {
        return this.alwaysOpenOfflineDocInNewTab;
    }

    public getCodeInjection(): boolean {
        return this.codeInjection;
    }

    public getCodeInjectionSource(): Array<string> {
        return this.codeInjectionSource;
    }

    public getBracesOnSeparateLine(): boolean {
        return this.bracesOnSeparateLine;
    }

    public getSpaceAroundUnaryOperators(): boolean {
        return this.spaceAroundUnaryOperators;
    }

    public getSpacesAroundBinaryOperators(): boolean {
        return this.spacesAroundBinaryOperators;
    }

    public getSpacesAroundAssignmentOperators(): boolean {
        return this.spacesAroundAssignmentOperators;
    }

    public getSpacesAroundTernaryOperators(): boolean {
        return this.spacesAroundTernaryOperators;
    }

    public getSpaceAfterKeywords(): boolean {
        return this.spaceAfterKeywords;
    }

    public getSpaceAfterFunctionNames(): boolean {
        return this.spaceAfterFunctionNames;
    }

    public getSpaceBeforeCommas(): boolean {
        return this.spaceBeforeCommas;
    }

    public getSpaceAfterCommas(): boolean {
        return this.spaceAfterCommas;
    }

    public getSpacesAroundDots(): boolean {
        return this.spacesAroundDots;
    }

    public getSpaceBeforeCaseColons(): boolean {
        return this.spaceBeforeCaseColons;
    }

    public getSpaceBeforeSemicolonsInFor(): boolean {
        return this.spaceBeforeSemicolonsInFor;
    }

    public getSpaceAfterSemicolonsInFor(): boolean {
        return this.spaceAfterSemicolonsInFor;
    }

    public getSpacesInsideParentheses(): boolean {
        return this.spacesInsideParentheses;
    }

    public getSpacesAroundBraces(): boolean {
        return this.spacesAroundBraces;
    }

    public getSpaceBeforeOpeningBrackets(): boolean {
        return this.spaceBeforeOpeningBrackets;
    }

    public getSpacesInsideBrackets(): boolean {
        return this.spacesInsideBrackets;
    }

    public getFavorFloatingSuffix(): boolean {
        return this.favorFloatingSuffix;
    }

    public getIncludesEnabled(): boolean {
        return this.includesEnabled;
    }

    public getIncludesSearchPaths(): Array<string> {
        return this.includesSearchPaths;
    }

    public getIncludesMaxDepth(): number {
        return this.includesMaxDepth;
    }

    public getIncludesMaxTotalBytes(): number {
        return this.includesMaxTotalBytes;
    }

    public getIncludesAllowAngledIncludes(): boolean {
        return this.includesAllowAngledIncludes;
    }

    public getIncludeResolverOptions(): IncludeResolverOptions {
        const folders = this.getIncludesSearchPaths() ?? [];
        const searchPaths = folders.map((p) => this.toSearchPathUri(p)).filter((u): u is Uri => u != null);

        return {
            enabled: this.getIncludesEnabled() ?? false,
            allowAngledIncludes: this.getIncludesAllowAngledIncludes() ?? false,
            searchPaths,
            maxDepth: this.getIncludesMaxDepth() ?? 32,
            maxTotalBytes: this.getIncludesMaxTotalBytes() ?? 1024 * 1024,
        };
    }

    private toSearchPathUri(value: string): Uri | null {
        const p = (value ?? '').trim();
        if (!p) {
            return null;
        }

        // Accept explicit URIs: file://, vscode-remote://, etc.
        if (/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(p)) {
            try {
                return Uri.parse(p);
            } catch {
                return null;
            }
        }

        const isWindowsAbs = /^[a-zA-Z]:[\\/]/.test(p);
        const isPosixAbs = p.startsWith('/');

        // If relative, interpret relative to the first workspace folder.
        if (!isWindowsAbs && !isPosixAbs) {
            const root = workspace.workspaceFolders?.[0]?.uri;
            if (!root) {
                return null;
            }
            const segments = p.split(/[\\/]+/g).filter(Boolean);
            return Uri.joinPath(root, ...segments);
        }

        // Absolute filesystem path (desktop extension only).
        try {
            return Uri.file(p);
        } catch {
            return null;
        }
    }
}
