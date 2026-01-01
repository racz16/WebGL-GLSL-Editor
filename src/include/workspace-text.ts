import { TextDocument, Uri, workspace } from 'vscode';

function uriKey(uri: Uri): string {
    return uri.toString(true);
}

export class WorkspaceText {
    public static getOpenTextDocument(uri: Uri): TextDocument | null {
        const k = uriKey(uri);
        for (const d of workspace.textDocuments) {
            if (uriKey(d.uri) === k) {
                return d;
            }
        }
        return null;
    }

    public static async readText(uri: Uri): Promise<string> {
        const open = this.getOpenTextDocument(uri);
        if (open) {
            return open.getText();
        }
        const data = await workspace.fs.readFile(uri);
        return new TextDecoder('utf-8').decode(data);
    }
}
