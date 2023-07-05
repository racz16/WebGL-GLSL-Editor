import { TextDocumentContentProvider, Uri, CancellationToken, ProviderResult, window, EventEmitter } from 'vscode';
import { GlslEditor } from '../core/glsl-editor';

export class GlslTextProvider implements TextDocumentContentProvider {
    public static onDidChangeEmitter = new EventEmitter<Uri>();
    public onDidChange = GlslTextProvider.onDidChangeEmitter.event;

    public provideTextDocumentContent(uri: Uri, token: CancellationToken): ProviderResult<string> {
        const text = GlslEditor.getDocumentInfo(uri).getPreprocessedText();
        if (text) {
            return text;
        } else {
            window.showErrorMessage("Something went wrong. Most likely the code doesn't compile.");
            return null;
        }
    }
}
