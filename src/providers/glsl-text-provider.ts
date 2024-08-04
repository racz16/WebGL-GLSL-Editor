import { CancellationToken, EventEmitter, ProviderResult, TextDocumentContentProvider, Uri } from 'vscode';
import { GlslEditor } from '../core/glsl-editor';

export class GlslTextProvider implements TextDocumentContentProvider {
    public static onDidChangeEmitter = new EventEmitter<Uri>();
    public onDidChange = GlslTextProvider.onDidChangeEmitter.event;

    public provideTextDocumentContent(uri: Uri, token: CancellationToken): ProviderResult<string> {
        return GlslEditor.getDocumentInfo(uri).getPreprocessedText();
    }
}
