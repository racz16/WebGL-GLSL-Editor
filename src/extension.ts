import { GlslDocumentHighlightProvider } from './providers/glsl-document-highlight-provider';
import { ExtensionContext, languages, window, commands, workspace, env, Uri, ViewColumn } from 'vscode';
import { GlslDiagnosticsProvider } from './providers/glsl-diagnostics-provider';
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
import { Documentation } from './builtin/documentation';

import * as path from 'path';

//TODO:
//readme és changelog megírása
//language-configuration, package json átnézése, meg úgy általában átnézni, hogy glsl legyen, ne test
//snippets kibővítése
//idegbeteg hierarchia átalakítása
//code action-ökbe hibák javítása, color, formatting, folding és indentation egysorosoknál, signature helper
//precision statements, scopeja, felesleges precision qualifierekre warning
//glsl mellett vs és fs felismerése is, úgy sokkal okosabbak tudunk lenni
//kommentek és preprocesszor összelövése
//konfigurációk
//workspace.onDidChangeConfiguration	//diagnostics ki-be kapcsolásához

export function activate(context: ExtensionContext) {
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
	const collection = languages.createDiagnosticCollection('glsl');
	for (const editor of window.visibleTextEditors) {
		new GlslDiagnosticsProvider().textChanged(editor.document, collection);
	}
	context.subscriptions.push(workspace.onDidOpenTextDocument(event => {
		new GlslDiagnosticsProvider().textChanged(event, collection);
	}));
	context.subscriptions.push(workspace.onDidCloseTextDocument(event => {
		collection.delete(event.uri);
	}));
	context.subscriptions.push(workspace.onDidChangeTextDocument(event => {
		new GlslDiagnosticsProvider().textChanged(event.document, collection);
	}));


	context.subscriptions.push(commands.registerCommand('webglglsleditor.opendoc', (name: string) => {
		const panel = window.createWebviewPanel(
			'documentation',
			name,
			ViewColumn.Beside,//TODO: hover/completion providerből oké, doksiból active kéne
			{
				enableScripts: true,
				enableCommandUris: true,
				localResourceRoots: [Uri.file(path.join(context.extensionPath, 'res', 'scripts'))]
			}
		);
		const filePath = Uri.file(path.join(context.extensionPath, 'res', 'scripts', 'mml-svg.js'));
		const specialFilePath = panel.webview.asWebviewUri(filePath);
		panel.webview.html = Documentation.getDocumentation(context.extensionPath, name, specialFilePath);
	}));

	//docimentation
	context.subscriptions.push(commands.registerCommand('webglglsleditor.opendocsgl', () => {
		env.openExternal(Uri.parse('http://docs.gl'));
	}));
	context.subscriptions.push(commands.registerCommand('webglglsleditor.opengles2', () => {
		env.openExternal(Uri.parse('https://www.khronos.org/registry/OpenGL-Refpages/es2.0'));
	}));
	context.subscriptions.push(commands.registerCommand('webglglsleditor.opengles3', () => {
		env.openExternal(Uri.parse('https://www.khronos.org/registry/OpenGL-Refpages/es3.0'));
	}));

	//highlight
	context.subscriptions.push(languages.registerDocumentHighlightProvider(selector, new GlslDocumentHighlightProvider()));
	//completion
	context.subscriptions.push(languages.registerCompletionItemProvider(selector, new GlslCompletionProvider()));
	//symbols (outline and breadcrumbs)
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