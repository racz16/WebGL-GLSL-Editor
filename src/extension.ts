import {
    commands,
    DocumentLink,
    DocumentSelector,
    ExtensionContext,
    languages,
    Position,
    Range,
    Uri,
    workspace,
} from 'vscode';
import { Constants } from './core/constants';
import { GlslCallHierarchyProvider } from './providers/glsl-call-hierarchy-provider';
import { GlslCommandProvider } from './providers/glsl-command-provider';
import { GlslCompletionProvider } from './providers/glsl-completion-provider';
import { GlslDeclarationProvider } from './providers/glsl-declaration-provider';
import { GlslDefinitionProvider } from './providers/glsl-definition-provider';
import { GlslDocumentColorProvider } from './providers/glsl-document-color-provider';
import { GlslDocumentFormattingProvider } from './providers/glsl-document-formatting-provider';
import { GlslDocumentHighlightProvider } from './providers/glsl-document-highlight-provider';
import {
    GlslDocumentSemanticTokensProvider,
    GlslSemanticTokensLegend,
} from './providers/glsl-document-semantic-token-provider';
import { GlslDocumentSymbolProvider } from './providers/glsl-document-symbol-provider';
import { GlslFoldingProvider } from './providers/glsl-folding-provider';
import { GlslHoverProvider } from './providers/glsl-hover-provider';
import { GlslImplementationProvider } from './providers/glsl-implementation-provider';
import { GlslInlayHintsProvider } from './providers/glsl-inlay-hints-provider';
import { GlslReferenceProvider } from './providers/glsl-reference-provider';
import { GlslRenameProvider } from './providers/glsl-rename-provider';
import { GlslSignatureHelpProvider } from './providers/glsl-signature-help-provider';
import { GlslTypeDefinitionProvider } from './providers/glsl-type-definition-provider';

export const selector: DocumentSelector = [
    { language: Constants.GLSL },
    { language: Constants.VERT },
    { language: Constants.VS },
    { language: Constants.FRAG },
    { language: Constants.FS },
];

export function addSharedCommands(context: ExtensionContext): void {
    context.subscriptions.push(
        commands.registerCommand(`${Constants.EXTENSION_NAME}.${GlslCommandProvider.OPEN_DOC}`, (name: string) => {
            GlslCommandProvider.openDoc(name);
        })
    );
    context.subscriptions.push(
        commands.registerCommand(`${Constants.EXTENSION_NAME}.${GlslCommandProvider.OPEN_DOCS_GL}`, () => {
            GlslCommandProvider.openDocsGl();
        })
    );
    context.subscriptions.push(
        commands.registerCommand(`${Constants.EXTENSION_NAME}.${GlslCommandProvider.OPEN_GL_ES_2}`, () => {
            GlslCommandProvider.openGlEs2();
        })
    );
    context.subscriptions.push(
        commands.registerCommand(`${Constants.EXTENSION_NAME}.${GlslCommandProvider.OPEN_GL_ES_3}`, () => {
            GlslCommandProvider.openGlEs3();
        })
    );
    //preprocessed glsl
    context.subscriptions.push(
        commands.registerCommand(`${Constants.EXTENSION_NAME}.${GlslCommandProvider.GENERATE_PREPROCESSED}`, () => {
            GlslCommandProvider.openPreprocessedGlsl();
        })
    );
}

export function addSharedFeatures(context: ExtensionContext): void {
    //syntax highlighting
    context.subscriptions.push(
        languages.registerDocumentSemanticTokensProvider(
            selector,
            new GlslDocumentSemanticTokensProvider(),
            new GlslSemanticTokensLegend()
        )
    );
    //hover
    context.subscriptions.push(languages.registerHoverProvider(selector, new GlslHoverProvider()));
    //highlight
    context.subscriptions.push(
        languages.registerDocumentHighlightProvider(selector, new GlslDocumentHighlightProvider())
    );
    //context.subscriptions.push(languages.registerDocumentHighlightProvider(selector, new DebugHighlighter()));
    //completion
    context.subscriptions.push(
        languages.registerCompletionItemProvider(selector, new GlslCompletionProvider(), Constants.DOT)
    );
    //symbols
    context.subscriptions.push(languages.registerDocumentSymbolProvider(selector, new GlslDocumentSymbolProvider()));
    //declaration
    context.subscriptions.push(languages.registerDeclarationProvider(selector, new GlslDeclarationProvider()));
    //definition
    context.subscriptions.push(languages.registerDefinitionProvider(selector, new GlslDefinitionProvider()));
    //type definition
    context.subscriptions.push(languages.registerTypeDefinitionProvider(selector, new GlslTypeDefinitionProvider()));
    //implementation
    context.subscriptions.push(languages.registerImplementationProvider(selector, new GlslImplementationProvider()));
    //reference
    context.subscriptions.push(languages.registerReferenceProvider(selector, new GlslReferenceProvider()));
    //rename
    context.subscriptions.push(languages.registerRenameProvider(selector, new GlslRenameProvider()));
    //call hierarchy
    context.subscriptions.push(languages.registerCallHierarchyProvider(selector, new GlslCallHierarchyProvider()));
    //color
    context.subscriptions.push(languages.registerColorProvider(selector, new GlslDocumentColorProvider()));
    //function signature help
    context.subscriptions.push(
        languages.registerSignatureHelpProvider(
            selector,
            new GlslSignatureHelpProvider(),
            Constants.LRB,
            Constants.COMMA
        )
    );
    //folding
    context.subscriptions.push(languages.registerFoldingRangeProvider(selector, new GlslFoldingProvider()));
    //formatting
    context.subscriptions.push(
        languages.registerDocumentFormattingEditProvider(selector, new GlslDocumentFormattingProvider())
    );
    context.subscriptions.push(
        languages.registerDocumentRangeFormattingEditProvider(selector, new GlslDocumentFormattingProvider())
    );
    //inlay hints
    context.subscriptions.push(languages.registerInlayHintsProvider(selector, new GlslInlayHintsProvider()));

    context.subscriptions.push(
        languages.registerDocumentLinkProvider(selector, {
            provideDocumentLinks(document, token) {
                const regex = /(?<=(#\s*include\s+"\s*))(?<path>(\w|\.|\/|\\)+)\s*"/g;
                const text = document.getText();
                const result = new Array<DocumentLink>();
                for (const regexResult of text.matchAll(regex)) {
                    if (regexResult?.groups) {
                        const index = regexResult.index;
                        const lines = text.split('\n');
                        let characterCount = 0;
                        for (let i = 0; i < lines.length; i++) {
                            const line = lines[i];
                            if (characterCount + line.length >= index) {
                                const path = regexResult.groups['path'];
                                const position = index - characterCount;
                                const newUri = Uri.joinPath(workspace.workspaceFolders[0].uri, path);
                                result.push({
                                    range: new Range(
                                        new Position(i, position),
                                        new Position(i, position + path.length)
                                    ),
                                    target: newUri,
                                });
                                break;
                            } else {
                                characterCount += line.length + 1;
                            }
                        }
                    }
                }
                return result;
            },
        })
    );
}
