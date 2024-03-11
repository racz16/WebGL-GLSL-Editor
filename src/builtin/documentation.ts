import * as fs from 'fs';
import { Uri, Webview } from 'vscode';
import { GlslEditor } from '../core/glsl-editor';
import { documentationRedirections } from './info/documentation-redirections';

export class Documentation {
    private static readonly documentations = new Map<string, string>();
    private static readonly redirections = new Map<string, string>();
    private static initialized = false;
    private static webview: Webview;

    private static initialize(): void {
        if (!this.initialized) {
            for (const redirection of documentationRedirections) {
                this.redirections.set(redirection.from, redirection.to);
            }
            this.initialized = true;
        }
    }

    public static getDocumentation(name: string, uri: Uri, webview: Webview): string {
        this.webview = webview;
        this.initialize();
        const redirectedName = this.redirections.get(name) ?? name;
        let documentation = this.documentations.get(redirectedName);
        if (!documentation) {
            documentation = this.getDocumentationFromFile(name, redirectedName, uri);
            this.documentations.set(redirectedName, documentation);
        }
        return documentation;
    }

    private static getDocumentationFromFile(name: string, redirectedName: string, uri: Uri): string {
        const filePath = Uri.file(`${GlslEditor.getContext().extensionPath}/res/xhtml/${redirectedName}.xhtml`);
        if (!fs.existsSync(filePath.fsPath)) {
            return `${name} — documentation is not available`;
        }
        const fileContent = fs.readFileSync(filePath.fsPath, 'utf8');
        return this.createHtml(redirectedName, uri, fileContent);
    }

    private static getNonce() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    private static createHtml(redirectedName: string, uri: Uri, fileContent: string): string {
        const uri2 = Uri.file(`${GlslEditor.getContext().extensionPath}/out/webview.js`);
        const uri3 = this.webview.asWebviewUri(uri2);
        const nonce = this.getNonce();
        return `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width">
                    <title>${redirectedName}</title>
                    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}';">
                    <script type="module" nonce="${nonce}" src="${uri3}"></script>
                </head>
                <body>
                    <vscode-button appearance="primary">Button Text</vscode-button>
                    <vscode-dropdown>
                        <vscode-option>Option Label #1</vscode-option>
                        <vscode-option>Option Label #2</vscode-option>
                        <vscode-option>Option Label #3</vscode-option>
                    </vscode-dropdown>
                </body>
                </html>
                `;
    }
}
