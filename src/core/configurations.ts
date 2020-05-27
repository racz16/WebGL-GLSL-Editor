import { workspace, ConfigurationChangeEvent } from "vscode";
import { Constants } from "./constants";

export class Configurations {

    private static readonly STRICT_RENAME = 'strictRename';
    private static readonly ALWAYS_OPEN_ONLINE_DOC = 'alwaysOpenOnlineDoc';
    private static readonly ALWAYS_OPEN_OFFLINE_DOC_IN_NEW_TAB = 'alwaysOpenOfflineDocInNewTab';

    private strictRename: boolean;
    private alwaysOpenOnlineDoc: boolean;
    private alwaysOpenOfflineDocInNewTab: boolean;

    public constructor() {
        const config = workspace.getConfiguration(Constants.EXTENSION_NAME);
        this.strictRename = config.get(Configurations.STRICT_RENAME);
        this.alwaysOpenOnlineDoc = config.get(Configurations.ALWAYS_OPEN_ONLINE_DOC);
        this.alwaysOpenOfflineDocInNewTab = config.get(Configurations.ALWAYS_OPEN_OFFLINE_DOC_IN_NEW_TAB);

        workspace.onDidChangeConfiguration((e: ConfigurationChangeEvent) => {
            const config = workspace.getConfiguration(Constants.EXTENSION_NAME);
            if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.STRICT_RENAME}`)) {
                this.strictRename = config.get(Configurations.STRICT_RENAME);
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.ALWAYS_OPEN_ONLINE_DOC}`)) {
                this.alwaysOpenOnlineDoc = config.get(Configurations.ALWAYS_OPEN_ONLINE_DOC);
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.ALWAYS_OPEN_OFFLINE_DOC_IN_NEW_TAB}`)) {
                this.alwaysOpenOfflineDocInNewTab = config.get(Configurations.ALWAYS_OPEN_OFFLINE_DOC_IN_NEW_TAB);
            }
        });
    }

    public getStrictRename(): boolean {
        return this.strictRename;
    }

    public getAlwaysOpenOnlineDoc(): boolean {
        return this.alwaysOpenOnlineDoc;
    }

    public getAlwaysOpenOfflineDocInNewTab(): boolean {
        return this.alwaysOpenOfflineDocInNewTab;
    }

}