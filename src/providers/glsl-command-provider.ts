import * as path from 'path';
import { ViewColumn, window, Uri, env, WebviewPanel, Disposable } from 'vscode';
import { Documentation } from '../builtin/documentation';
import { Constants } from '../core/constants';
import { GlslEditor } from '../core/glsl-editor';
import { GlslDiagnosticProvider } from './glsl-diagnostic-provider';

export class GlslCommandProvider {

    public static readonly OPEN_DOCS_GL = 'opendocsgl';
    public static readonly OPEN_GL_ES_2 = 'opengles2';
    public static readonly OPEN_GL_ES_3 = 'opengles3';
    public static readonly OPEN_DOC = 'opendoc';
    public static readonly GENERATE_PREPROCESSED = 'generatepreprocessed';

    private static panel: WebviewPanel;
    private static isPanelUsable = false;
    private static panelEventHandler: Disposable;

    public static openDocsGl(): void {
        env.openExternal(Uri.parse('http://docs.gl'));
    }

    public static openGlEs2(): void {
        env.openExternal(Uri.parse('https://www.khronos.org/registry/OpenGL-Refpages/es2.0'));
    }

    public static openGlEs3(): void {
        env.openExternal(Uri.parse('https://www.khronos.org/registry/OpenGL-Refpages/es3.0'));
    }

    public static openDoc(name: string): void {
        if (GlslEditor.CONFIGURATIONS.getAlwaysOpenOnlineDoc()) {
            env.openExternal(Uri.parse(`http://docs.gl/el3/${name}`));
        } else {
            this.openOfflineDoc(name);
        }
    }

    public static openPreprocessedGlsl(): void {
        const doc = window.activeTextEditor.document;
        if (doc?.languageId === Constants.GLSL) {
            new GlslDiagnosticProvider().displayPreprocessedCode(doc);
        } else {
            window.showWarningMessage('The active file have to be a GLSL file.');
        }
    }

    private static openOfflineDoc(name: string): void {
        if (!this.panel || !this.isPanelUsable || GlslEditor.CONFIGURATIONS.getAlwaysOpenOfflineDocInNewTab()) {
            this.panel = this.createPanel(name);
        }
        this.panel.title = name;
        const filePath = Uri.file(path.join(GlslEditor.getContext().extensionPath, 'res', 'js', 'mml-chtml.js'));
        const specialFilePath = this.panel.webview.asWebviewUri(filePath);
        this.panel.webview.html = Documentation.getDocumentation(name, specialFilePath);
    }

    private static createPanel(name: string): WebviewPanel {
        const panel = window.createWebviewPanel('documentation', name, ViewColumn.Beside,
            {
                enableScripts: true,
                enableCommandUris: true,
                localResourceRoots: [Uri.file(path.join(GlslEditor.getContext().extensionPath, 'res', 'js'))]
            }
        );

        this.panelEventHandler?.dispose();
        this.isPanelUsable = true;
        this.panelEventHandler = panel.onDidDispose(() => {
            this.isPanelUsable = false;
        });

        return panel;
    }

}