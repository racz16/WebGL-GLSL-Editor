import * as path from 'path';
import { ViewColumn, window, Uri, env, ExtensionContext, WebviewPanel, Disposable } from 'vscode';
import { Documentation } from '../builtin/documentation';
import { GlslProcessor } from '../core/glsl-processor';

export class GlslCommandProvider {

    public static readonly OPEN_DOCS_GL = 'opendocsgl';
    public static readonly OPEN_GL_ES_2 = 'opengles2';
    public static readonly OPEN_GL_ES_3 = 'opengles3';
    public static readonly OPEN_DOC = 'opendoc';

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

    public static openDoc(param: any): void {
        const name = param.name ? param.name : param.toString();
        const vc = param.name ? ViewColumn.Beside : ViewColumn.Active;
        const context = GlslProcessor.getContext();
        this.openDocUnsafe(name, vc, context);
    }

    private static openDocUnsafe(name: string, vc: ViewColumn, context: ExtensionContext): void {
        if (GlslProcessor.CONFIGURATIONS.getAlwaysOpenOnlineDoc()) {
            env.openExternal(Uri.parse(`http://docs.gl/el3/${name}`));
        } else {
            this.openOfflineDoc(name, vc, context);
        }
    }

    private static openOfflineDoc(name: string, vc: ViewColumn, context: ExtensionContext): void {
        if (!this.panel || !this.isPanelUsable || GlslProcessor.CONFIGURATIONS.getAlwaysOpenOfflineDocInNewTab()) {
            this.panel = this.createPanel(name, vc, context);
        }
        this.panel.title = name;
        const filePath = Uri.file(path.join(context.extensionPath, 'res', 'js', 'mml-svg.js'));
        const specialFilePath = this.panel.webview.asWebviewUri(filePath);
        this.panel.webview.html = Documentation.getDocumentation(context.extensionPath, name, specialFilePath);
    }

    private static createPanel(name: string, vc: ViewColumn, context: ExtensionContext): WebviewPanel {
        const panel = window.createWebviewPanel('documentation', name, vc,
            {
                enableScripts: true,
                enableCommandUris: true,
                localResourceRoots: [Uri.file(path.join(context.extensionPath, 'res', 'js'))]
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