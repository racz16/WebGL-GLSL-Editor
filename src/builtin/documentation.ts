import * as path from 'path';
import * as fs from 'fs';

import { Uri } from 'vscode';
import { GlslProcessor } from '../core/glsl-processor';

export class Documentation {

    private static readonly documentations = new Map<string, string>();
    private static readonly redirections = new Map<string, string>();
    private static alert = true;
    private static initialized = false;

    private static initialize(): void {
        if (!this.initialized) {
            this.alert = GlslProcessor.CONFIGURATIONS.getOfflineDocumentationWarning();
            this.redirections.set('dFdy', 'dFdx');
            this.redirections.set('floatBitsToUint', 'floatBitsToInt');
            this.redirections.set('uintBitsToFloat', 'intBitsToFloat');
            this.redirections.set('packUnorm2x16', 'packUnorm');
            this.redirections.set('packSnorm2x16', 'packUnorm');
            this.redirections.set('unpackUnorm2x16', 'unpackUnorm');
            this.redirections.set('unpackSnorm2x16', 'unpackUnorm');
            this.initialized = true;
        }
    }

    public static getDocumentation(extensionPath: string, name: string, uri: Uri): string {
        this.initialize();
        if (this.alert !== GlslProcessor.CONFIGURATIONS.getOfflineDocumentationWarning()) {
            this.alert = !this.alert;
            this.documentations.clear();
        }
        const redirectedName = this.redirections.get(name) ?? name;
        let documentation = this.documentations.get(redirectedName);
        if (!documentation) {
            const filePath = Uri.file(path.join(extensionPath, 'res', 'xhtml', `${redirectedName}.xhtml`));
            if (!fs.existsSync(filePath.fsPath)) {
                return `${name} — documentation is not available`;
            }
            const fileContent = fs.readFileSync(filePath.fsPath, 'utf8');
            const alertDisplay = this.alert ? '' : 'display: none;';
            documentation = this.createHtml(redirectedName, uri, fileContent, alertDisplay);
            this.documentations.set(redirectedName, documentation);
        }
        return documentation;
    }

    private static createHtml(redirectedName: string, uri: Uri, fileContent: string, alertDisplay: string): string {
        return `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width">
                    <title>${redirectedName}</title>
                    <style>
                        body.vscode-dark .alert, body.vscode-light .alert, body.vscode-high-contrast .alert {
                            color: var(--vscode-editor-background);
                            background-color: var(--vscode-editor-foreground);
                            padding: 5px;
                            margin: 20px 0 10px 0;
                            ${alertDisplay}
                        }
                    </style>
                    <script src="${uri}"></script>
                </head>
                <body>
                    <div class="alert">
                        This is the offline version of the documentation. If you want to see the online documentation, click
                        <a href="http://docs.gl/el3/${redirectedName}">here</a>.
                    </div>
                    ${fileContent}
                </body>
                </html>
                `;
    }

}
