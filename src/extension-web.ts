import { ExtensionContext } from 'vscode';
import { Constants } from './core/constants';
import { GlslEditor } from './core/glsl-editor';
import { addSharedCommands, addSharedFeatures, setContext } from './extension';
import { HostDependent } from './host-dependent';

export async function activate(context: ExtensionContext): Promise<void> {
    GlslEditor.initialize(context);
    HostDependent.webExtension = true;
    await setContext(Constants.COMPILER_EXECUTABLE_CONTEXT, false);
    addSharedCommands(context);
    addSharedFeatures(context);
}
