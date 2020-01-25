import * as path from 'path';
import * as fs from 'fs';

import { Uri } from 'vscode';

export class Documentation {

    private static readonly documentations = new Map<string, string>();

    public static getDocumentation(extensionPath: string, name: string, uri: Uri): string {
        let documentation = this.documentations.get(name);
        if (!documentation) {
            const filePath = Uri.file(path.join(extensionPath, 'res', 'documentation', `${name}.xhtml`));
            if (!fs.existsSync(filePath.fsPath)) {
                return null;
            }
            const fileContent = fs.readFileSync(filePath.fsPath, 'utf8');
            documentation = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width">
                    <title>${name}</title>
                    <style>
                        body.vscode-dark .alert, body.vscode-light .alert, body.vscode-high-contrast .alert {
                            color: var(--vscode-editor-background);
                            background-color: var(--vscode-editor-foreground);
                            padding: 5px;
                            margin: 20px 0 10px 0;
                        }
                    </style>
                    <script src="${uri}"></script>
                </head>
                <body>
                    <div class="alert">
                        This is the offline version of the documentation. If you want to see the online documentation, click
                        <a href="http://docs.gl/el3/${name}">here</a>.
                    </div>
                    ${fileContent}
                </body>
                </html>
            `;
            this.documentations.set(name, documentation);
        }
        return documentation;
    }

}
