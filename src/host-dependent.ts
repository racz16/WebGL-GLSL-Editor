import { TextDocument, Uri, Webview } from 'vscode';

export class HostDependent {
    public static webExtension = false;

    public static getDocumentation(name: string, uri: Uri, webview: Webview): string {
        return '';
    }

    public static displayPreprocessedCode(document: TextDocument): void {}

    public static textChanged(document: TextDocument): void {}
}
