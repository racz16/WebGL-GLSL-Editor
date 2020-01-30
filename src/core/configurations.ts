import { workspace, ConfigurationChangeEvent } from "vscode";
import { GlslProcessor } from "./glsl-processor";

export class Configurations {

    private static readonly STRICT_RENAME = 'strictRename';
    private static readonly OFFLINE_DOCUMENTATION_WARNING = 'offlineDocumentationWarning';

    private strictRename: boolean;
    private offlineDocumentationWarning: boolean;

    public constructor() {
        const config = workspace.getConfiguration(GlslProcessor.EXTENSION_NAME);
        this.strictRename = config.get(Configurations.STRICT_RENAME);
        this.offlineDocumentationWarning = config.get(Configurations.OFFLINE_DOCUMENTATION_WARNING);

        workspace.onDidChangeConfiguration((e: ConfigurationChangeEvent) => {
            const config = workspace.getConfiguration(GlslProcessor.EXTENSION_NAME);
            if (e.affectsConfiguration(`${GlslProcessor.EXTENSION_NAME}.${Configurations.STRICT_RENAME}`)) {
                this.strictRename = config.get(Configurations.STRICT_RENAME);
            } else if (e.affectsConfiguration(`${GlslProcessor.EXTENSION_NAME}.${Configurations.OFFLINE_DOCUMENTATION_WARNING}`)) {
                this.offlineDocumentationWarning = config.get(Configurations.OFFLINE_DOCUMENTATION_WARNING);
            }
        });
    }

    public getStrictRename(): boolean {
        return this.strictRename;
    }

    public getOfflineDocumentationWarning(): boolean {
        return this.offlineDocumentationWarning;
    }

}