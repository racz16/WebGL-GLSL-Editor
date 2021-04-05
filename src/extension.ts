import { GlslDocumentHighlightProvider } from './providers/glsl-document-highlight-provider';
import { ExtensionContext, languages, commands, workspace, window } from 'vscode';
import { GlslCompletionProvider } from './providers/glsl-completion-provider';
import { GlslDocumentSymbolProvider } from './providers/glsl-document-symbol-provider';
import { GlslDeclarationProvider } from './providers/glsl-declaration-provider';
import { GlslDefinitionProvider } from './providers/glsl-definition-provider';
import { GlslRenameProvider } from './providers/glsl-rename-provider';
import { GlslHoverProvider } from './providers/glsl-hover-provider';
import { GlslImplementationProvider } from './providers/glsl-implementation-provider';
import { GlslReferenceProvider } from './providers/glsl-reference-provider';
import { GlslTypeDefinitionProvider } from './providers/glsl-type-definition-provider';
import { GlslCommandProvider } from './providers/glsl-command-provider';
import { GlslEditor } from './core/glsl-editor';
import { GlslDiagnosticProvider } from './providers/glsl-diagnostic-provider';
import { GlslDocumentSemanticTokensProvider, GlslSemanticTokensLegend } from './providers/glsl-document-semantic-token-provider';
import { GlslCallHierarchyProvider } from './providers/glsl-call-hierarchy-provider';
import { Constants } from './core/constants';
import { GlslDocumentColorProvider } from './providers/glsl-document-color-provider';
import { GlslSignatureHelpProvider } from './providers/glsl-signature-help-provider';
import { GlslFoldingProvider } from './providers/glsl-folding-provider';
import { GlslDocumentFormattingProvider } from './providers/glsl-document-formatting-provider';
import { GlslTextProvider } from './providers/glsl-text-provider';
import { GlslFileDecorationProvider } from './providers/glsl-file-decoration-provider';
import { GlslInjectionErrorProvider } from './providers/glsl-injection-error-provider';
import { DebugHighlighter } from './providers/helper/debug-highlighter';

export function activate(context: ExtensionContext): void {
	GlslEditor.initialize(context);

	const selector = [
		{ language: Constants.GLSL, scheme: Constants.FILE },
		{ language: Constants.GLSL, scheme: Constants.UNTITLED },
		{ language: Constants.GLSL, scheme: Constants.PREPROCESSED_GLSL },
		{ language: Constants.VERT, scheme: Constants.FILE },
		{ language: Constants.VERT, scheme: Constants.UNTITLED },
		{ language: Constants.VERT, scheme: Constants.PREPROCESSED_GLSL },
		{ language: Constants.VS, scheme: Constants.FILE },
		{ language: Constants.VS, scheme: Constants.UNTITLED },
		{ language: Constants.VS, scheme: Constants.PREPROCESSED_GLSL },
		{ language: Constants.FRAG, scheme: Constants.FILE },
		{ language: Constants.FRAG, scheme: Constants.UNTITLED },
		{ language: Constants.FRAG, scheme: Constants.PREPROCESSED_GLSL },
		{ language: Constants.FS, scheme: Constants.FILE },
		{ language: Constants.FS, scheme: Constants.UNTITLED },
		{ language: Constants.FS, scheme: Constants.PREPROCESSED_GLSL },
	];


	//diagnostic
	for (const editor of window.visibleTextEditors) {
		if (editor.document.languageId === Constants.GLSL) {
			try {
				new GlslDiagnosticProvider().textChanged(editor.document);
			} catch (error) {
				//if i catch the error here, it can't break the activation
			}
		}
	}
	context.subscriptions.push(workspace.onDidOpenTextDocument(event => {
		if (event.languageId === Constants.GLSL) {
			new GlslDiagnosticProvider().textChanged(event);
		}
	}));
	context.subscriptions.push(workspace.onDidCloseTextDocument(event => {
		if (event.languageId === Constants.GLSL) {
			GlslEditor.getDiagnosticCollection().delete(event.uri);
		}
	}));
	context.subscriptions.push(workspace.onDidChangeTextDocument(event => {
		if (event.document.languageId === Constants.GLSL) {
			new GlslDiagnosticProvider().textChanged(event.document);
		}
	}));
	context.subscriptions.push(languages.registerCodeLensProvider(selector, new GlslInjectionErrorProvider()));

	//offline documentation
	context.subscriptions.push(commands.registerCommand(`${Constants.EXTENSION_NAME}.${GlslCommandProvider.OPEN_DOC}`, (name: string) => {
		GlslCommandProvider.openDoc(name);
	}));
	//online documentation
	context.subscriptions.push(commands.registerCommand(`${Constants.EXTENSION_NAME}.${GlslCommandProvider.OPEN_DOCS_GL}`, () => {
		GlslCommandProvider.openDocsGl();
	}));
	context.subscriptions.push(commands.registerCommand(`${Constants.EXTENSION_NAME}.${GlslCommandProvider.OPEN_GL_ES_2}`, () => {
		GlslCommandProvider.openGlEs2();
	}));
	context.subscriptions.push(commands.registerCommand(`${Constants.EXTENSION_NAME}.${GlslCommandProvider.OPEN_GL_ES_3}`, () => {
		GlslCommandProvider.openGlEs3();
	}));
	//preprocessed glsl
	context.subscriptions.push(workspace.registerTextDocumentContentProvider(Constants.PREPROCESSED_GLSL, new GlslTextProvider()));
	context.subscriptions.push(commands.registerCommand(`${Constants.EXTENSION_NAME}.${GlslCommandProvider.GENERATE_PREPROCESSED}`, () => {
		GlslCommandProvider.openPreprocessedGlsl();
	}));
	window.registerFileDecorationProvider(new GlslFileDecorationProvider());

	//syntax highlighting
	context.subscriptions.push(languages.registerDocumentSemanticTokensProvider(selector, new GlslDocumentSemanticTokensProvider(), new GlslSemanticTokensLegend()));
	//highlight
	context.subscriptions.push(languages.registerDocumentHighlightProvider(selector, new GlslDocumentHighlightProvider()));
	//context.subscriptions.push(languages.registerDocumentHighlightProvider(selector, new DebugHighlighter()));
	//completion
	context.subscriptions.push(languages.registerCompletionItemProvider(selector, new GlslCompletionProvider(), Constants.DOT));
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
	//hover
	context.subscriptions.push(languages.registerHoverProvider(selector, new GlslHoverProvider()));
	//call hierarchy
	context.subscriptions.push(languages.registerCallHierarchyProvider(selector, new GlslCallHierarchyProvider()));
	//color
	context.subscriptions.push(languages.registerColorProvider(selector, new GlslDocumentColorProvider()));
	//function signature help
	context.subscriptions.push(languages.registerSignatureHelpProvider(selector, new GlslSignatureHelpProvider(), Constants.LRB, Constants.COMMA));
	//folding
	context.subscriptions.push(languages.registerFoldingRangeProvider(selector, new GlslFoldingProvider()));
	//formatting
	context.subscriptions.push(languages.registerDocumentFormattingEditProvider(selector, new GlslDocumentFormattingProvider()));
	context.subscriptions.push(languages.registerDocumentRangeFormattingEditProvider(selector, new GlslDocumentFormattingProvider()));
}