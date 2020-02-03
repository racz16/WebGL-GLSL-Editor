import { GlslEditor } from './glsl-editor';
import { Uri } from 'vscode';
import { DocumentInfo } from './document-info';
import { StartContext, Function_definitionContext, Function_prototypeContext, Precision_declarationContext, Declaration_statementContext } from '../_generated/AntlrGlslParser';
import { FunctionProcessor } from '../processor/function-processor';
import { Helper } from '../processor/helper';
import { Scope } from '../scope/scope';
import { TypeUsage } from '../scope/type/type-usage';
import { AntlrGlslParserVisitor } from '../_generated/AntlrGlslParserVisitor';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { TypeDeclarationProcessor } from '../processor/type-declaration-processor';
import { AntlrGlslLexer } from '../_generated/AntlrGlslLexer';

export class GlslVisitor extends AbstractParseTreeVisitor<TypeUsage> implements AntlrGlslParserVisitor<TypeUsage> {

    private uri: Uri;
    private di: DocumentInfo;
    private scope: Scope;

    public constructor(uri: Uri) {
        super();
        this.uri = uri;
    }

    protected defaultResult(): TypeUsage {
        return null;
    }

    private initialize(): void {
        this.di = GlslEditor.getDocumentInfo(this.uri);
        const version = this.getVersion();
        this.di.setVersion(version);
        this.di.reset();
        this.scope = this.di.getRootScope();
    }

    private getVersion(): 100 | 300 {
        for (const token of this.di.getTokens()) {
            if (token.type === AntlrGlslLexer.MACRO && token.text.startsWith('#version')) {
                if (token.text.includes('300')) {
                    return 300;
                }
                break;
            } else if (token.type === AntlrGlslLexer.TAB || token.type === AntlrGlslLexer.SPACE) {
                //do nothing
            } else {
                break;
            }
        }
        return 100;
    }

    public visitStart(ctx: StartContext): TypeUsage {
        this.initialize();
        return super.visitChildren(ctx);
    }

    //
    //declarations
    //
    public visitDeclaration_statement(ctx: Declaration_statementContext): null {
        if (ctx.type_declaration()) {
            TypeDeclarationProcessor.getTypeDeclaration(ctx.type_declaration(), this.scope, this.di, 0);
        } else {
            this.visitChildren(ctx);
        }
        return null;
    }

    //
    //functions
    //
    public visitFunction_prototype(ctx: Function_prototypeContext): null {
        this.scope = Helper.createScopeFromFunctionPrototype(this.scope, ctx);
        FunctionProcessor.getFunctionPrototype(ctx, this.scope, this.di);
        this.scope = this.scope.parent;
        return null;
    }

    public visitFunction_definition(ctx: Function_definitionContext): null {
        this.scope = Helper.createScopeFromFunctionDefinition(this.scope, ctx);
        FunctionProcessor.getFunctionDefinition(ctx, this.scope, this.di);
        this.visitChildren(ctx.compound_statement());
        this.scope = this.scope.parent;
        return null;
    }

}
