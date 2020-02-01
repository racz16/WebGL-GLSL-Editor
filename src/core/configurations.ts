import { workspace, ConfigurationChangeEvent } from "vscode";
import { GlslProcessor } from "./glsl-processor";

export class Configurations {

    private static readonly STRICT_RENAME = 'strictRename';
    private static readonly OFFLINE_DOCUMENTATION_WARNING = 'offlineDocumentationWarning';
    private static readonly ALWAYS_OPEN_ONLINE_DOC = 'alwaysOpenOnlineDoc';
    private static readonly ALWAYS_OPEN_OFFLINE_DOC_IN_NEW_TAB = 'alwaysOpenOfflineDocInNewTab';

    private strictRename: boolean;
    private offlineDocumentationWarning: boolean;
    private alwaysOpenOnlineDoc: boolean;
    private alwaysOpenOfflineDocInNewTab: boolean;

    public constructor() {
        const config = workspace.getConfiguration(GlslProcessor.EXTENSION_NAME);
        this.strictRename = config.get(Configurations.STRICT_RENAME);
        this.offlineDocumentationWarning = config.get(Configurations.OFFLINE_DOCUMENTATION_WARNING);
        this.alwaysOpenOnlineDoc = config.get(Configurations.ALWAYS_OPEN_ONLINE_DOC);
        this.alwaysOpenOfflineDocInNewTab = config.get(Configurations.ALWAYS_OPEN_OFFLINE_DOC_IN_NEW_TAB);

        workspace.onDidChangeConfiguration((e: ConfigurationChangeEvent) => {
            const config = workspace.getConfiguration(GlslProcessor.EXTENSION_NAME);
            if (e.affectsConfiguration(`${GlslProcessor.EXTENSION_NAME}.${Configurations.STRICT_RENAME}`)) {
                this.strictRename = config.get(Configurations.STRICT_RENAME);
            } else if (e.affectsConfiguration(`${GlslProcessor.EXTENSION_NAME}.${Configurations.OFFLINE_DOCUMENTATION_WARNING}`)) {
                this.offlineDocumentationWarning = config.get(Configurations.OFFLINE_DOCUMENTATION_WARNING);
            } else if (e.affectsConfiguration(`${GlslProcessor.EXTENSION_NAME}.${Configurations.ALWAYS_OPEN_ONLINE_DOC}`)) {
                this.alwaysOpenOnlineDoc = config.get(Configurations.ALWAYS_OPEN_ONLINE_DOC);
            } else if (e.affectsConfiguration(`${GlslProcessor.EXTENSION_NAME}.${Configurations.ALWAYS_OPEN_OFFLINE_DOC_IN_NEW_TAB}`)) {
                this.alwaysOpenOfflineDocInNewTab = config.get(Configurations.ALWAYS_OPEN_OFFLINE_DOC_IN_NEW_TAB);
            }
        });
    }

    public getStrictRename(): boolean {
        return this.strictRename;
    }

    public getOfflineDocumentationWarning(): boolean {
        return this.offlineDocumentationWarning;
    }

    public getAlwaysOpenOnlineDoc(): boolean {
        return this.alwaysOpenOnlineDoc;
    }

    public getAlwaysOpenOfflineDocInNewTab(): boolean {
        return this.alwaysOpenOfflineDocInNewTab;
    }

}