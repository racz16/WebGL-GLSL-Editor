import { ExtensionContext, languages, window, workspace } from 'vscode';
import { Documentation } from './builtin/documentation';
import { Constants } from './core/constants';
import { GlslEditor } from './core/glsl-editor';
import { addSharedCommands, addSharedFeatures, selector, setContext } from './extension';
import { HostDependent } from './host-dependent';
import { GlslDiagnosticProvider } from './providers/glsl-diagnostic-provider';
import { GlslFileDecorationProvider } from './providers/glsl-file-decoration-provider';
import { GlslInjectionErrorProvider } from './providers/glsl-injection-error-provider';
import { GlslTextProvider } from './providers/glsl-text-provider';

import * as fs from 'fs/promises';
import * as os from 'os';

export async function activate(context: ExtensionContext): Promise<void> {
    GlslEditor.initialize(context);
    const compilerExecutable = await isCompilerExecutable();
    await setContext(Constants.COMPILER_EXECUTABLE_CONTEXT, compilerExecutable);
    addHostDependentCode();
    if (compilerExecutable) {
        addDiagnostic(context);
    }
    addSharedCommands(context);
    addFeatures(context);
    addSharedFeatures(context);
}

function addHostDependentCode(): void {
    HostDependent.getDocumentation = (name, uri) => Documentation.getDocumentation(name, uri);
    HostDependent.textChanged = (document) => new GlslDiagnosticProvider().textChanged(document);
    HostDependent.displayPreprocessedCode = (document) =>
        new GlslDiagnosticProvider().displayPreprocessedCode(document);
}

function addDiagnostic(context: ExtensionContext): void {
    for (const editor of window.visibleTextEditors) {
        if (editor.document.languageId === Constants.GLSL) {
            try {
                new GlslDiagnosticProvider().textChanged(editor.document);
            } catch (error) {
                //if i catch the error here, it can't break the activation
            }
        }
    }
    context.subscriptions.push(
        workspace.onDidOpenTextDocument((event) => {
            if (event.languageId === Constants.GLSL) {
                new GlslDiagnosticProvider().textChanged(event);
            }
        })
    );
    context.subscriptions.push(
        workspace.onDidCloseTextDocument((event) => {
            if (event.languageId === Constants.GLSL) {
                GlslEditor.getDiagnosticCollection().delete(event.uri);
            }
        })
    );
    context.subscriptions.push(
        workspace.onDidChangeTextDocument((event) => {
            if (event.document.languageId === Constants.GLSL) {
                new GlslDiagnosticProvider().textChanged(event.document);
            }
        })
    );
    context.subscriptions.push(languages.registerCodeLensProvider(selector, new GlslInjectionErrorProvider()));
}

function addFeatures(context: ExtensionContext): void {
    //preprocessed glsl
    context.subscriptions.push(
        workspace.registerTextDocumentContentProvider(Constants.PREPROCESSED_GLSL, new GlslTextProvider())
    );
    window.registerFileDecorationProvider(new GlslFileDecorationProvider());
}

async function isCompilerExecutable(): Promise<boolean> {
    const platform = os.platform();
    if (isCompilerAvailable(platform)) {
        const executablePath = getCompilerPath();
        return await makeFileExecutableIfNeeded(executablePath, platform);
    }
    return false;
}

function isCompilerAvailable(platform: NodeJS.Platform): boolean {
    const arch = os.arch();
    return (
        ((platform === 'win32' || platform === 'linux') && arch === 'x64') ||
        (platform === 'darwin' && (arch === 'x64' || arch === 'arm64'))
    );
}

export function getCompilerPath(): string {
    const platformName = getPlatformName();
    return `${GlslEditor.getContext().extensionPath}/res/bin/glslangValidator${platformName}`;
}

function getPlatformName(): string {
    switch (os.platform()) {
        case 'win32':
            return 'Windows';
        case 'linux':
            return 'Linux';
        case 'darwin':
            return 'Mac';
        default:
            return Constants.EMPTY;
    }
}

async function makeFileExecutableIfNeeded(file: string, platform: NodeJS.Platform): Promise<boolean> {
    if (platform === 'win32') {
        return true;
    }
    try {
        await fs.access(file, fs.constants.X_OK);
        return true;
    } catch {
        // file is not executable
        try {
            await fs.chmod(file, 0o755);
            return true;
        } catch {
            // can't make the file executable
            return false;
        }
    }
}
