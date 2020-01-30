import { GlslDocumentHighlightProvider } from './providers/glsl-document-highlight-provider';
import { ExtensionContext, languages, commands, window, workspace, ConfigurationChangeEvent } from 'vscode';
import { GlslCompletionProvider } from './providers/glsl-completion-provider';
import { GlslDocumentSymbolProvider } from './providers/glsl-document-symbol-provider';
import { GlslDeclarationProvider } from './providers/glsl-declaration-provider';
import { GlslDefinitionProvider } from './providers/glsl-definition-provider';
import { GlslRenameProvider } from './providers/glsl-rename-provider';
import { GlslHoverProvider } from './providers/glsl-hover-provider';
import { GlslImplementationProvider } from './providers/glsl-implementation-provider';
import { GlslReferenceProvider } from './providers/glsl-reference-provider';
import { GlslTypeDefinitionProvider } from './providers/glsl-type-definition-provider';
import { GlslDocumentFormattingProvider } from './providers/glsl-document-formatting-provider';
import { GlslCommandProvider } from './providers/glsl-command-provider';
import { GlslProcessor } from './core/glsl-processor';

//TODO:
//writing readme and the changelog, icon, badges
//data in changlelog like [1.0.0] - 2020.02.10.
//function signature helper
//commens vs preprocessor directives

//precision statements
//color visalizer for vec3 and vec4 constructor where variable name contains the word 'color'
//inline statement, folding, indentation and formatting
//rewriting the syntax highlighting
//refining the antlr parser
//refactoring

//diagnostics, code actions for fixes, pairing with other stages
//	redundant qualifier warning etc function parameter in or highp float in vertex shader etc.

export function activate(context: ExtensionContext) {
	GlslProcessor.initialize(context);

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

	//diagnostics
	//TODO
	/*const collection = languages.createDiagnosticCollection('glsl');
	for (const editor of window.visibleTextEditors) {
		if (editor.document.languageId === 'glsl') {
			new GlslDiagnosticsProvider().textChanged(editor.document, collection);
		}
	}
	context.subscriptions.push(workspace.onDidOpenTextDocument(event => {
		if (event.languageId === 'glsl') {
			new GlslDiagnosticsProvider().textChanged(event, collection);
		}
	}));
	context.subscriptions.push(workspace.onDidCloseTextDocument(event => {
		if (event.languageId === 'glsl') {
			collection.delete(event.uri);
		}
	}));
	context.subscriptions.push(workspace.onDidChangeTextDocument(event => {
		if (event.document.languageId === 'glsl') {
			new GlslDiagnosticsProvider().textChanged(event.document, collection);
		}
	}));*/

	//offline documentation
	context.subscriptions.push(commands.registerCommand(`${GlslProcessor.EXTENSION_NAME}.${GlslCommandProvider.OPEN_DOC}`, (param: any) => {
		GlslCommandProvider.openDoc(param);
	}));
	//online docimentation
	context.subscriptions.push(commands.registerCommand(`${GlslProcessor.EXTENSION_NAME}.${GlslCommandProvider.OPEN_DOCS_GL}`, () => {
		GlslCommandProvider.openDocsGl();
	}));
	context.subscriptions.push(commands.registerCommand(`${GlslProcessor.EXTENSION_NAME}.${GlslCommandProvider.OPEN_GL_ES_2}`, () => {
		GlslCommandProvider.openGlEs2();
	}));
	context.subscriptions.push(commands.registerCommand(`${GlslProcessor.EXTENSION_NAME}.${GlslCommandProvider.OPEN_GL_ES_3}`, () => {
		GlslCommandProvider.openGlEs3();
	}));
	//highlight
	context.subscriptions.push(languages.registerDocumentHighlightProvider(selector, new GlslDocumentHighlightProvider()));
	//completion
	context.subscriptions.push(languages.registerCompletionItemProvider(selector, new GlslCompletionProvider()));
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
	//formatting
	context.subscriptions.push(languages.registerDocumentFormattingEditProvider(selector, new GlslDocumentFormattingProvider()));
}

