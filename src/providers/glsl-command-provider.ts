import * as path from 'path';
import { ViewColumn, window, Uri, env } from 'vscode';
import { Documentation } from '../builtin/documentation';
import { GlslProcessor } from '../core/glsl-processor';

export class GlslCommandProvider {

    public static readonly OPEN_DOCS_GL = 'webglglsleditor.opendocsgl';
    public static readonly OPEN_GL_ES_2 = 'webglglsleditor.opengles2';
    public static readonly OPEN_GL_ES_3 = 'webglglsleditor.opengles3';
    public static readonly OPEN_DOC = 'webglglsleditor.opendoc';

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
        const context = GlslProcessor.getContext();
        let vc: ViewColumn;
        let name: string;
        if (param.name) {
            vc = ViewColumn.Beside;
            name = param.name;
        } else {
            vc = ViewColumn.Active;
            name = param.toString();
        }
        const panel = window.createWebviewPanel(
            'documentation',
            name,
            vc,
            {
                enableScripts: true,
                enableCommandUris: true,
                localResourceRoots: [Uri.file(path.join(context.extensionPath, 'res', 'scripts'))]
            }
        );
        const filePath = Uri.file(path.join(context.extensionPath, 'res', 'scripts', 'mml-svg.js'));
        const specialFilePath = panel.webview.asWebviewUri(filePath);
        panel.webview.html = Documentation.getDocumentation(context.extensionPath, name, specialFilePath);
    }

}