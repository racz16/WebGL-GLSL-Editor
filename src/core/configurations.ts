import { workspace, ConfigurationChangeEvent } from "vscode";
import { Constants } from "./constants";
import { GlslEditor } from "./glsl-editor";

export class Configurations {

    private static readonly STRICT_RENAME = 'strictRename';
    private static readonly ALWAYS_OPEN_ONLINE_DOC = 'alwaysOpenOnlineDoc';
    private static readonly ALWAYS_OPEN_OFFLINE_DOC_IN_NEW_TAB = 'alwaysOpenOfflineDocInNewTab';
    private static readonly CODE_INJECTION = 'codeInjection';
    private static readonly CODE_INJECTION_SOURCE = 'codeInjectionSource';

    private strictRename: boolean;
    private alwaysOpenOnlineDoc: boolean;
    private alwaysOpenOfflineDocInNewTab: boolean;
    private codeInjection: boolean;
    private codeInjectionSource: Array<string>;

    public constructor() {
        const config = workspace.getConfiguration(Constants.EXTENSION_NAME);
        this.strictRename = config.get(Configurations.STRICT_RENAME);
        this.alwaysOpenOnlineDoc = config.get(Configurations.ALWAYS_OPEN_ONLINE_DOC);
        this.alwaysOpenOfflineDocInNewTab = config.get(Configurations.ALWAYS_OPEN_OFFLINE_DOC_IN_NEW_TAB);
        this.codeInjection = config.get(Configurations.CODE_INJECTION);
        this.codeInjectionSource = config.get(Configurations.CODE_INJECTION_SOURCE);

        workspace.onDidChangeConfiguration((e: ConfigurationChangeEvent) => {
            const config = workspace.getConfiguration(Constants.EXTENSION_NAME);
            if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.STRICT_RENAME}`)) {
                this.strictRename = config.get(Configurations.STRICT_RENAME);
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.ALWAYS_OPEN_ONLINE_DOC}`)) {
                this.alwaysOpenOnlineDoc = config.get(Configurations.ALWAYS_OPEN_ONLINE_DOC);
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.ALWAYS_OPEN_OFFLINE_DOC_IN_NEW_TAB}`)) {
                this.alwaysOpenOfflineDocInNewTab = config.get(Configurations.ALWAYS_OPEN_OFFLINE_DOC_IN_NEW_TAB);
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.CODE_INJECTION}`)) {
                this.codeInjection = config.get(Configurations.CODE_INJECTION);
                GlslEditor.invalidateDocuments();
            } else if (e.affectsConfiguration(`${Constants.EXTENSION_NAME}.${Configurations.CODE_INJECTION_SOURCE}`)) {
                this.codeInjectionSource = config.get(Configurations.CODE_INJECTION_SOURCE);
                GlslEditor.invalidateDocuments();
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

    public getCodeInjection(): boolean {
        return this.codeInjection;
    }

    public getCodeInjectionSource(): Array<string> {
        return this.codeInjectionSource;
    }

}