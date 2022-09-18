import { TextDocument, Uri } from 'vscode';

export class HostDependent {
    public static webExtension = false;

    public static getDocumentation(name: string, uri: Uri): string {
        return '';
    }

    public static displayPreprocessedCode(document: TextDocument): void {}

    public static textChanged(document: TextDocument): void {}
}
