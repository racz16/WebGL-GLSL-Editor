import * as fs from 'fs';
import { Uri } from 'vscode';
import { GlslEditor } from '../core/glsl-editor';
import { documentationRedirections } from './info/documentation-redirections';

export class Documentation {
    private static readonly documentations = new Map<string, string>();
    private static readonly redirections = new Map<string, string>();
    private static initialized = false;

    private static initialize(): void {
        if (!this.initialized) {
            for (const redirection of documentationRedirections) {
                this.redirections.set(redirection.from, redirection.to);
            }
            this.initialized = true;
        }
    }

    public static getDocumentation(name: string, uri: Uri): string {
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

    private static createHtml(redirectedName: string, uri: Uri, fileContent: string): string {
        return `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width">
                    <title>${redirectedName}</title>
                    <script>
                    MathJax = {
                        options: {
                          enableMenu: false
                        }
                      };
                    </script>
                    <script src="${uri}"></script>
                </head>
                <body>
                    ${fileContent}
                </body>
                </html>
                `;
    }
}
