import { CodeActionProvider, TextDocument, Range, Selection, CancellationToken, ProviderResult, Command, CodeAction, CodeActionContext, CodeActionKind, WorkspaceEdit, Position, Diagnostic } from "vscode";
import { GlslEditor } from "../core/glsl-editor";
import { DocumentInfo } from "../core/document-info";
import { Shadertoy } from "../builtin/shadertoy";

export class GlslShadertoyActionProvider implements CodeActionProvider {

    private di: DocumentInfo;
    private document: TextDocument;
    private context: CodeActionContext;

    private initialize(document: TextDocument, context: CodeActionContext): void {
        GlslEditor.processElements(document);
        this.di = GlslEditor.getDocumentInfo(document.uri);
        this.document = document;
        this.context = context;
    }

    public provideCodeActions(document: TextDocument, range: Range | Selection, context: CodeActionContext, token: CancellationToken): ProviderResult<(Command | CodeAction)[]> {
        this.initialize(document, context);
        if (this.di.shadertoyVariables.some(sv => range.intersection(this.di.intervalToRange(sv.nameInterval)))) {
            const ca = this.createCodeAction();
            return [ca];
        }
        return null;
    }

    private createCodeAction(): CodeAction {
        const ca = new CodeAction('Generate Shadertoy variables', CodeActionKind.QuickFix);
        ca.diagnostics = this.context.diagnostics.filter(d => d.message.includes('undeclared identifier'));
        const we = new WorkspaceEdit();
        const position = this.di.getVisitor().getVersionEndPosition() ?? new Position(0, 0);
        const insertionCode = Shadertoy.getInstance().getInsertionCode();
        we.insert(this.document.uri, position, insertionCode);
        ca.edit = we;
        return ca;
    }

}