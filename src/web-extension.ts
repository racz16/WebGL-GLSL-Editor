import { ExtensionContext } from 'vscode';
import { GlslEditor } from './core/glsl-editor';
import { addSharedCommands, addSharedFeatures } from './extension-base';
import { HostDependent } from './host-dependent';

export function activate(context: ExtensionContext): void {
    GlslEditor.initialize(context);
    HostDependent.webExtension = true;
    addSharedCommands(context);
    addSharedFeatures(context);
}
