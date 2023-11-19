import { ExtensionContext } from 'vscode';
import { GlslEditor } from './core/glsl-editor';
import { addSharedCommands, addSharedFeatures } from './extension';
import { HostDependent } from './host-dependent';

export function activate(context: ExtensionContext): void {
    GlslEditor.initialize(context);
    HostDependent.webExtension = true;
    // HostDependent.getDocumentation = (name, uri) => getDocumentationWeb(name, uri);
    addSharedCommands(context);
    addSharedFeatures(context);
}

// function getDocumentationWeb(html: string, uri: Uri): string {
//     console.log('getDocumentationWeb');
//     const div = document.createElement('div');
//     console.log('createElement');
//     div.innerHTML = html;
//     const main = div.querySelector('main');
//     main.querySelector('#article-header').remove();
//     main.querySelector('#center-doc-outline').remove();
//     main.querySelector('.page-metadata-container').remove();
//     main.querySelectorAll('a').forEach(
//         (a) =>
//             (a.href = `https://learn.microsoft.com${a.href.includes('/') ? '' : '/en-us/windows/win32/direct3dhlsl/'}${
//                 a.href
//             }`)
//     );
//     main.querySelectorAll('table').forEach((table) => {
//         table.style.borderSpacing = '0';
//         table.style.borderCollapse = 'collapse';
//     });
//     main.querySelectorAll('td').forEach((td) => (td.style.border = '1px solid'));
//     main.querySelectorAll('th').forEach((th) => (th.style.border = '1px solid'));
//     return this.createHtml('Some title', uri, main.outerHTML);
// }
