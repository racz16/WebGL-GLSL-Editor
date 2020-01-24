import { GlslProcessor } from './glsl-processor';
import { Uri } from 'vscode';
import { GlslDocumentInfo } from './glsl-document-info';
import { StartContext, Function_definitionContext, Function_prototypeContext, Precision_declarationContext, Declaration_statementContext } from '../_generated/AntlrGlslParser';
import { FunctionHelper } from '../helper/function-helper';
import { Helper } from '../helper/helper';
import { Scope } from '../scope/scope';
import { TypeUsage } from '../scope/type/type-usage';
import { Interval } from '../scope/interval';
import { TypeHelper } from '../helper/old/type-helper';
import { AntlrGlslParserVisitor } from '../_generated/AntlrGlslParserVisitor';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { TypeDeclarationHelper } from '../helper/type-declaration-helper';

export class GlslVisitor extends AbstractParseTreeVisitor<TypeUsage> implements AntlrGlslParserVisitor<TypeUsage> {

    private uri: Uri;
    private di: GlslDocumentInfo;
    private scope: Scope;
    private currentFunctionReturnType: TypeUsage;

    public constructor(uri: Uri) {
        super();
        this.uri = uri;
    }

    protected defaultResult(): TypeUsage {
        return null;
    }

    private initialize(): void {
        this.di = GlslProcessor.getDocumentInfo(this.uri);
        this.di.reset();
        this.di.setVersion(300);//TODO: ezt alapból 100-ra kéne állítani
        this.scope = this.di.getRootScope();
    }

    public visitStart(ctx: StartContext): TypeUsage {
        this.initialize();
        //this.tokenOperations();
        return super.visitChildren(ctx);
        //return super.visitStart(ctx);
    }

    //
    //token errors--------------------------------------------------------------
    //
    private tokenOperations(): void {
        /*for (const token of GlslProcessor.getTokens()) {
            if (token.type === AntlrGlslLexer.RESERVED_KEYWORD) {
                //ErrorHelper.addError(DiagnosticSeverity.Error, token.text + ' : reserved word', token.startIndex, token.stopIndex + 1);
            } else if (token.type === AntlrGlslLexer.ILLEGAL_CHARACTERS) {
                //ErrorHelper.addError(DiagnosticSeverity.Error, 'illegal character(s) ' + token.text, token.startIndex, token.stopIndex + 1);
            } else if (token.type === AntlrGlslLexer.MULTI_LINE_COMMENT) {
                const fb = new FoldingBlock(FoldingType.COMMENT, token.startIndex, token.stopIndex + 1);
                Scope.FOLDING_BLOCKS.push(fb);
            } else if (token.type === AntlrGlslLexer.MACRO) {
                this.addMacroDefinition(token);
            }
        }
        //ErrorHelper.addNoVersionMacroWarning();*/
    }

    /*private addMacroDefinition(token: Token): void {
        let text = token.text;
        if (text.startsWith('#define')) {
            text = text.substring(7);
            let start = -1;
            let stop = -1;
            for (let i = 0; i < text.length; i++) {
                if (start === -1 && text.charAt(i) !== Constants.SPACE && text.charAt(i) !== Constants.TAB) {
                    start = i;
                } else if (start !== -1 && stop === -1 && (text.charAt(i) === Constants.SPACE || text.charAt(i) === Constants.TAB) || text.charAt(i) === Constants.LRB) {
                    stop = i;
                    break;
                }
            }
            if (start !== -1 && stop !== -1) {
                Scope.MACRO_DEFINITIONS.push(text.substring(start, stop));
            }
        }
    }*/

    /*public visitStatement(ctx: StatementContext): TypeUsage  {
        if ((ctx.parent instanceof Do_while_iterationContext || ctx.parent instanceof While_iterationContext || ctx.parent instanceof For_iterationContext || ctx.parent instanceof Selection_statementContext) && ctx.compound_statement() === null) {
            return this.bracelessScope(ctx);
        }
        return super.visitStatement(ctx);
    }

    private bracelessScope(ctx: StatementContext): TypeUsage  {
        this.currentScope = Helper.createScope(this.currentScope as Scope, ctx);
        Scope.BRACELESS_SCOPES.push(this.currentScope);
        const ret = super.visitStatement(ctx);
        this.currentScope = this.currentScope.parent;
        return ret;
    }

    public visitCompound_statement(ctx: Compound_statementContext): TypeUsage  {
        this.currentScope = Helper.createScope(this.currentScope as Scope, ctx);
        super.visitCompound_statement(ctx);
        this.currentScope = this.currentScope.parent;
        return null;
    }
*/
    //
    //declarations
    //

    public visitPrecision_declaration(ctx: Precision_declarationContext): null {
        /*const name = ctx.type().text;
        const nameInterval = Helper.getIntervalFromParserRule(ctx.type());
        const interval = Helper.getIntervalFromParserRule(ctx);
        const td = TypeHelper.getTypeDeclaration(this.scope, name, this.di);
        const tu = new TypeUsage(name, interval, nameInterval, this.scope, Interval.NONE, 0, td);
        this.scope.precisionDeclarations.push(tu);
        if (td) {
            td.usages.push(tu);
        }*/
        return null;
    }

    public visitDeclaration_statement(ctx: Declaration_statementContext): null {
        if (ctx.type_declaration()) {
            TypeDeclarationHelper.getTypeDeclaration(ctx.type_declaration(), this.scope, this.di, 0);
        } else {
            this.visitChildren(ctx);
        }
        return null;
    }

    //
    //functions-----------------------------------------------------------------
    //
    public visitFunction_prototype(ctx: Function_prototypeContext): null {
        this.scope = Helper.createScopeFromFunctionPrototype(this.scope, ctx);
        FunctionHelper.getFunctionPrototype(ctx, this.scope, this.di);
        this.scope = this.scope.parent;
        return null;
    }

    public visitFunction_definition(ctx: Function_definitionContext): null {
        this.scope = Helper.createScopeFromFunctionDefinition(this.scope, ctx);
        const fd = FunctionHelper.getFunctionDefinition(ctx, this.scope, this.di);
        this.currentFunctionReturnType = fd.returnType;
        this.visitChildren(ctx.compound_statement());
        this.scope = this.scope.parent;
        return null;
    }

    /*
        //
        //if, for, while, do-while, case, jump--------------------------------------
        //
        public visitSelection_statement(ctx: Selection_statementContext): TypeUsage  {
            try {
                this.selectionStatement(ctx);
            } catch (ex) { }
            return null;
        }
    
        private selectionStatement(ctx: Selection_statementContext): void {
            const tu = this.visitExpression(ctx.expression());
            //ErrorHelper.addBoolExpressionExpectedError(tu, ctx.expression().start.startIndex, ctx.expression().stop.stopIndex + 1);
            for (const sc of ctx.statement()) {
                this.visitStatement(sc);
            }
        }
    
        public visitFor_iteration(ctx: For_iterationContext): TypeUsage  {
            this.currentScope = Helper.createScope(this.currentScope as Scope, ctx);
            try {
                this.forIteration(ctx);
            } catch (ex) { }
            this.currentScope = this.currentScope.parent;
            return null;
        }
    
        private forIteration(ctx: For_iterationContext): void {
            if (ctx.variable_declaration() !== null) {
                this.visitVariable_declaration(ctx.variable_declaration());
            }
            this.forExpressions(ctx);
            this.visitStatement(ctx.statement());
        }
    
        private forExpressions(ctx: For_iterationContext): void {
            if (ctx.expression_list() !== null) {
                this.visitExpression_list(ctx.expression_list(0));
            }
            if (ctx.expression() !== null) {
                const tu = this.visitExpression(ctx.expression());
                //ErrorHelper.addBoolExpressionExpectedError(tu, ctx.expression().start.startIndex, ctx.expression().stop.stopIndex + 1);
            }
        }
    
        public visitDo_while_iteration(ctx: Do_while_iterationContext): TypeUsage  {
            try {
                const tu = this.visitExpression(ctx.expression());
                //ErrorHelper.addBoolExpressionExpectedError(tu, ctx.expression().start.startIndex, ctx.expression().stop.stopIndex + 1);
                this.visitStatement(ctx.statement());
            } catch (ex) { }
            return null;
        }
    
        public visitWhile_iteration(ctx: While_iterationContext): TypeUsage  {
            try {
                const tu = this.visitExpression(ctx.expression());
                //ErrorHelper.addBoolExpressionExpectedError(tu, ctx.expression().start.startIndex, ctx.expression().stop.stopIndex + 1);
                this.visitStatement(ctx.statement());
            } catch (ex) { }
            return null;
        }
    
        public visitCase_statement_list(ctx: Case_statement_listContext): TypeUsage  {
            this.currentScope = Helper.createScope(this.currentScope, ctx);
            Scope.BRACELESS_SCOPES.push(this.currentScope);
            super.visitCase_statement_list(ctx);
            this.currentScope = this.currentScope.parent;
            return null;
        }
    
        public visitJump_statement(ctx: Jump_statementContext): null {
            if (ctx.KW_RETURN() !== null) {
                //ErrorHelper.addReturnError(this.currentFunctionReturnType, ctx);
            }
            return super.visitJump_statement(ctx) as null;
        }
    
        //
        //expression----------------------------------------------------------------------
        //
        public visitExpression(ctx: ExpressionContext): TypeUsage  {
            try {
                return ExpressionHelper.expression(ctx, this, this.currentScope as Scope);
            } catch (ex) {
                return null;
            }
        }
    
        //
        //literal-------------------------------------------------------------------
        //
        public visitLiteral(ctx: LiteralContext): TypeUsage {
            if (ctx.BOOL_LITERAL() === null) {
                this.visitNumber_literal(ctx.number_literal());
            }
            const name = this.getLiteralTypeName(ctx);
            const tu = new TypeUsage(name);
            TypeHelper.setDeclaration(null, tu);
            return tu;
        }
    
        private getLiteralTypeName(ctx: LiteralContext): string {
            let name: string;
            if (ctx.BOOL_LITERAL() !== null) {
                name = 'bool';
            } else {
                name = this.asd(ctx);
            }
            return name;
        }
    
        private asd(ctx: LiteralContext): string {
            if (ctx.number_literal().INT_LITERAL() !== null) {
                return this.getFixPointLiteralTypeName(ctx);
            } else {
                return this.getFloatingPointLiteralTypeName(ctx);
            }
        }
    
        private getFixPointLiteralTypeName(ctx: LiteralContext): string {
            const number = ctx.number_literal().INT_LITERAL().text;
            const unsigned = number.endsWith('u') || number.endsWith('U');
            return unsigned ? 'uint' : 'int';
        }
    
        private getFloatingPointLiteralTypeName(ctx: LiteralContext): string {
            const number = ctx.number_literal().FLOAT_LITERAL().text;
            const longFloat = number.endsWith('lf') || number.endsWith('LF');
            return longFloat ? 'double' : 'float';
        }
    
        public visitNumber_literal(ctx: Number_literalContext): null {
            if (ctx.INT_LITERAL() !== null) {
                const number = this.parseStringNumber(ctx.INT_LITERAL().text);
                ErrorHelper.addIntegerOverflowError(number, ctx);
            }
            return super.visitNumber_literal(ctx) as null;
        }
    
        private parseStringNumber(num: string): number {
            num = num.charAt(num.length - 1) === 'u' || num.charAt(num.length - 1) === 'U' ? num.substring(0, num.length - 1) : num;
            return this.parseSignedStringNumber(num);
        }
    
        private parseSignedStringNumber(num: string): number {
            if (num.startsWith('0x') || num.startsWith('0X')) {
                return Long.parseLong(num.substring(2), 16);
            } else if (num.startsWith("0")) {
                return Long.parseLong(num.substring(0), 8);
            } else {
                return Long.parseLong(num);
            }
        }
    
        //
        //struct--------------------------------------------------------------------
        //
        public visitStruct_declaration(ctx: Struct_declarationContext): TypeUsage  {
            this.currentScope = Helper.createScope(this.currentScope as Scope, ctx);
            try {
                const td = TypeHelper.createTypeDeclaration(this.currentScope, ctx);
                this.currentScope.parent.typeDeclarations.push(td);
                this.createConstructor(td);
                //const fb = new FoldingBlock(FoldingType.BLOCK, ctx.LCB().symbol.startIndex, ctx.RCB().symbol.stopIndex + 1);
                //Scope.FOLDING_BLOCKS.push(fb);
                super.visitStruct_declaration(ctx);
            } catch (ex) { }
            this.currentScope = this.currentScope.parent;
            return null;
        }
    
        private createConstructor(td: TypeDeclaration): void {
            const f = new LogicalFunction();
            f.setConstructor(true);
            const tu = new TypeUsage(td.name);
            tu.setDeclaration(td);
            f.setReturnType(tu);
            this.setConstructorSignature(f, td);
            Scope.FUNCTIONS.push(f);
        }
    
        private setConstructorSignature(f: LogicalFunction, td: TypeDeclaration): void {
            f.setName(td.name);
            for (const vd of td.members) {
                f.parameters.push(vd);
            }
        }
    
        //
        //variable declaration------------------------------------------------------
        //
        public visitVariable_declaration(ctx: Variable_declarationContext): null {
            try {
                for (const iooc of ctx.identifier_optarray_optassignment()) {
                    const tu = TypeHelper.createTypeUsageWithoutQualifiers(this.currentScope, ctx, ctx.array_subscript());
                    tu.setArrayDepth(tu.arrayDepth + Helper.getArrayDepth(iooc.identifier_optarray().array_subscript()));
                    TypeHelper.addTypeUsageToScopeIfCustom(tu, this.currentScope);
                    const vd = VariableHelper.createVariableDeclarationWithoutQualifiers(tu, ctx, iooc);
                    (this.currentScope as Scope).variableDeclarations.push(vd);
                    const tu2 = ExpressionHelper.expression(iooc.expression(), this, this.currentScope);
                    //ErrorHelper.addIncompatibleTypesError(tu, tu2, iooc.expression());
                }
            } catch (ex) { }
            return super.visitVariable_declaration(ctx) as null;
        }
    
        //
        //interface block-----------------------------------------------------------
        //
        public visitDeclaration_statement(ctx: Declaration_statementContext): null {
            //if it's an interface block
            try {
                if (ctx.LCB() !== null) {
                    for (const vd of VariableHelper.createMembers(this.currentScope as Scope, ctx.member_declaration())) {
                        (this.currentScope as Scope).variableDeclarations.push(vd);
                    }
                    //const fb = new FoldingBlock(FoldingType.BLOCK, ctx.LCB().symbol.startIndex, ctx.RCB().symbol.stopIndex + 1);
                    //Scope.FOLDING_BLOCKS.push(fb);
                }
            } catch (ex) { }
            return super.visitDeclaration_statement(ctx) as null;
        }*/

}
