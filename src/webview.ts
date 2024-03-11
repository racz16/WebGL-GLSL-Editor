import { provideVSCodeDesignSystem, vsCodeButton, vsCodeDropdown, vsCodeOption } from '@vscode/webview-ui-toolkit';

provideVSCodeDesignSystem().register(vsCodeButton(), vsCodeDropdown(), vsCodeOption());
