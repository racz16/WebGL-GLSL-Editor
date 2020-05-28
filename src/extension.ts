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
import { GlslShadertoyActionProvider } from './providers/glsl-shadertoy-action-provider';

export function activate(context: ExtensionContext): void {
	GlslEditor.initialize(context);

	const selector = [
		{ language: 'glsl', scheme: 'file' },
		{ language: 'glsl', scheme: 'untitled' },
		{ language: 'vert', scheme: 'file' },
		{ language: 'vert', scheme: 'untitled' },
		{ language: 'vs', scheme: 'file' },
		{ language: 'vs', scheme: 'untitled' },
		{ language: 'frag', scheme: 'file' },
		{ language: 'frag', scheme: 'untitled' },
		{ language: 'fs', scheme: 'file' },
		{ language: 'fs', scheme: 'untitled' }
	];

	//diagnostic
	const collection = languages.createDiagnosticCollection('glsl');
	for (const editor of window.visibleTextEditors) {
		if (editor.document.languageId === 'glsl') {
			new GlslDiagnosticProvider().textChanged(editor.document, collection);
		}
	}
	context.subscriptions.push(workspace.onDidOpenTextDocument(event => {
		if (event.languageId === 'glsl') {
			new GlslDiagnosticProvider().textChanged(event, collection);
		}
	}));
	context.subscriptions.push(workspace.onDidCloseTextDocument(event => {
		if (event.languageId === 'glsl') {
			collection.delete(event.uri);
		}
	}));
	context.subscriptions.push(workspace.onDidChangeTextDocument(event => {
		if (event.document.languageId === 'glsl') {
			new GlslDiagnosticProvider().textChanged(event.document, collection);
		}
	}));

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

	//syntax highlighting
	context.subscriptions.push(languages.registerDocumentSemanticTokensProvider(selector, new GlslDocumentSemanticTokensProvider(), new GlslSemanticTokensLegend()));
	//highlight
	context.subscriptions.push(languages.registerDocumentHighlightProvider(selector, new GlslDocumentHighlightProvider()));
	//completion
	context.subscriptions.push(languages.registerCompletionItemProvider(selector, new GlslCompletionProvider(), '.'));
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
	//shadertoy
	context.subscriptions.push(languages.registerCodeActionsProvider(selector, new GlslShadertoyActionProvider()));
	//folding
	//context.subscriptions.push(languages.registerFoldingRangeProvider(selector, new GlslFoldingProvider()));
	//formatting
	//context.subscriptions.push(languages.registerDocumentFormattingEditProvider(selector, new GlslDocumentFormattingProvider()));
}

