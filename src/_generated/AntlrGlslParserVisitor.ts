// Generated from syntaxes/AntlrGlslParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { StartContext } from "./AntlrGlslParser";
import { Function_prototypeContext } from "./AntlrGlslParser";
import { Function_definitionContext } from "./AntlrGlslParser";
import { Function_headerContext } from "./AntlrGlslParser";
import { Function_parameter_listContext } from "./AntlrGlslParser";
import { Function_callContext } from "./AntlrGlslParser";
import { Function_call_parameter_listContext } from "./AntlrGlslParser";
import { StatementContext } from "./AntlrGlslParser";
import { Compound_statementContext } from "./AntlrGlslParser";
import { Simple_statementContext } from "./AntlrGlslParser";
import { Selection_statementContext } from "./AntlrGlslParser";
import { Switch_statementContext } from "./AntlrGlslParser";
import { Case_groupContext } from "./AntlrGlslParser";
import { Case_labelContext } from "./AntlrGlslParser";
import { Iteration_statementContext } from "./AntlrGlslParser";
import { For_iterationContext } from "./AntlrGlslParser";
import { While_iterationContext } from "./AntlrGlslParser";
import { Do_while_iterationContext } from "./AntlrGlslParser";
import { Jump_statementContext } from "./AntlrGlslParser";
import { Expression_statementContext } from "./AntlrGlslParser";
import { Declaration_statementContext } from "./AntlrGlslParser";
import { Precision_declarationContext } from "./AntlrGlslParser";
import { Invariant_declarationContext } from "./AntlrGlslParser";
import { Variable_declarationContext } from "./AntlrGlslParser";
import { Single_variable_declarationContext } from "./AntlrGlslParser";
import { Type_declarationContext } from "./AntlrGlslParser";
import { Interface_block_declarationContext } from "./AntlrGlslParser";
import { Identifier_optarrayContext } from "./AntlrGlslParser";
import { Identifier_optarray_optassignmentContext } from "./AntlrGlslParser";
import { ExpressionContext } from "./AntlrGlslParser";
import { Expression_listContext } from "./AntlrGlslParser";
import { TypeContext } from "./AntlrGlslParser";
import { Type_usageContext } from "./AntlrGlslParser";
import { Array_subscriptContext } from "./AntlrGlslParser";
import { QualifierContext } from "./AntlrGlslParser";
import { Layout_qualifierContext } from "./AntlrGlslParser";
import { Layout_qualifier_id_listContext } from "./AntlrGlslParser";
import { Layout_qualifier_idContext } from "./AntlrGlslParser";
import { LiteralContext } from "./AntlrGlslParser";
import { Number_literalContext } from "./AntlrGlslParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `AntlrGlslParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface AntlrGlslParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `AntlrGlslParser.start`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStart?: (ctx: StartContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.function_prototype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_prototype?: (ctx: Function_prototypeContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.function_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_definition?: (ctx: Function_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.function_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_header?: (ctx: Function_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.function_parameter_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_parameter_list?: (ctx: Function_parameter_listContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.function_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_call?: (ctx: Function_callContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.function_call_parameter_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_call_parameter_list?: (ctx: Function_call_parameter_listContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.compound_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompound_statement?: (ctx: Compound_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.simple_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_statement?: (ctx: Simple_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.selection_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelection_statement?: (ctx: Selection_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.switch_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitch_statement?: (ctx: Switch_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.case_group`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_group?: (ctx: Case_groupContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.case_label`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_label?: (ctx: Case_labelContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.iteration_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIteration_statement?: (ctx: Iteration_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.for_iteration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFor_iteration?: (ctx: For_iterationContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.while_iteration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhile_iteration?: (ctx: While_iterationContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.do_while_iteration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDo_while_iteration?: (ctx: Do_while_iterationContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.jump_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJump_statement?: (ctx: Jump_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.expression_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression_statement?: (ctx: Expression_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.declaration_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclaration_statement?: (ctx: Declaration_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.precision_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecision_declaration?: (ctx: Precision_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.invariant_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvariant_declaration?: (ctx: Invariant_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.variable_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_declaration?: (ctx: Variable_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.single_variable_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSingle_variable_declaration?: (ctx: Single_variable_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.type_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_declaration?: (ctx: Type_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.interface_block_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_block_declaration?: (ctx: Interface_block_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.identifier_optarray`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier_optarray?: (ctx: Identifier_optarrayContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.identifier_optarray_optassignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier_optarray_optassignment?: (ctx: Identifier_optarray_optassignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.expression_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression_list?: (ctx: Expression_listContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType?: (ctx: TypeContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.type_usage`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_usage?: (ctx: Type_usageContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.array_subscript`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray_subscript?: (ctx: Array_subscriptContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.qualifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifier?: (ctx: QualifierContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.layout_qualifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLayout_qualifier?: (ctx: Layout_qualifierContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.layout_qualifier_id_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLayout_qualifier_id_list?: (ctx: Layout_qualifier_id_listContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.layout_qualifier_id`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLayout_qualifier_id?: (ctx: Layout_qualifier_idContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteral?: (ctx: LiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `AntlrGlslParser.number_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber_literal?: (ctx: Number_literalContext) => Result;
}

