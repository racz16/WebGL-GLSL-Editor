import { FileDecorationProvider, Uri, CancellationToken, ProviderResult, FileDecoration } from "vscode";
import { Constants } from "../core/constants";

export class GlslFileDecorationProvider implements FileDecorationProvider {

    public provideFileDecoration(uri: Uri, token: CancellationToken): ProviderResult<FileDecoration> {
        if (uri.scheme === Constants.PREPROCESSED_GLSL) {
            const fd = new FileDecoration();
            fd.tooltip = 'This is the read-only view of the preprocessed GLSL source code.';
            fd.badge = 'P';
            return fd;
        } else {
            return null;
        }
    }
}