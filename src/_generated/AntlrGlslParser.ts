// Generated from syntaxes/AntlrGlslParser.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { AntlrGlslParserVisitor } from "./AntlrGlslParserVisitor";


export class AntlrGlslParser extends Parser {
	public static readonly KW_BREAK = 1;
	public static readonly KW_CONTINUE = 2;
	public static readonly KW_DO = 3;
	public static readonly KW_FOR = 4;
	public static readonly KW_WHILE = 5;
	public static readonly KW_SWITCH = 6;
	public static readonly KW_CASE = 7;
	public static readonly KW_DEFAULT = 8;
	public static readonly KW_IF = 9;
	public static readonly KW_ELSE = 10;
	public static readonly KW_DISCARD = 11;
	public static readonly KW_RETURN = 12;
	public static readonly KW_STRUCT = 13;
	public static readonly KW_VOID = 14;
	public static readonly Q_PRECISION = 15;
	public static readonly Q_LAYOUT = 16;
	public static readonly Q_INVARIANT = 17;
	public static readonly Q_SMOOTH = 18;
	public static readonly Q_FLAT = 19;
	public static readonly Q_CONST = 20;
	public static readonly Q_INOUT = 21;
	public static readonly Q_IN = 22;
	public static readonly Q_OUT = 23;
	public static readonly Q_CENTROID = 24;
	public static readonly Q_UNIFORM = 25;
	public static readonly Q_VARYING = 26;
	public static readonly Q_ATTRIBUTE = 27;
	public static readonly Q_HIGHP = 28;
	public static readonly Q_MEDIUMP = 29;
	public static readonly Q_LOWP = 30;
	public static readonly TYPE = 31;
	public static readonly BOOL_LITERAL = 32;
	public static readonly INT_LITERAL = 33;
	public static readonly FLOAT_LITERAL = 34;
	public static readonly OP_MUL = 35;
	public static readonly OP_ADD = 36;
	public static readonly OP_SUB = 37;
	public static readonly OP_DIV = 38;
	public static readonly OP_MOD = 39;
	public static readonly OP_INC = 40;
	public static readonly OP_DEC = 41;
	public static readonly OP_SHIFT = 42;
	public static readonly OP_RELATIONAL = 43;
	public static readonly OP_EQUALITY = 44;
	public static readonly OP_BIT_AND = 45;
	public static readonly OP_BIT_XOR = 46;
	public static readonly OP_BIT_OR = 47;
	public static readonly OP_BIT_UNARY = 48;
	public static readonly OP_LOGICAL_AND = 49;
	public static readonly OP_LOGICAL_OR = 50;
	public static readonly OP_LOGICAL_XOR = 51;
	public static readonly OP_LOGICAL_UNARY = 52;
	public static readonly OP_MODIFY = 53;
	public static readonly OP_ASSIGN = 54;
	public static readonly MACRO = 55;
	public static readonly NEW_LINE = 56;
	public static readonly SPACE = 57;
	public static readonly TAB = 58;
	public static readonly MULTI_LINE_COMMENT = 59;
	public static readonly SINGLE_LINE_COMMENT = 60;
	public static readonly IDENTIFIER = 61;
	public static readonly DOT = 62;
	public static readonly COMMA = 63;
	public static readonly COLON = 64;
	public static readonly SEMICOLON = 65;
	public static readonly QUESTION = 66;
	public static readonly LRB = 67;
	public static readonly RRB = 68;
	public static readonly LCB = 69;
	public static readonly RCB = 70;
	public static readonly LSB = 71;
	public static readonly RSB = 72;
	public static readonly RULE_start = 0;
	public static readonly RULE_function_prototype = 1;
	public static readonly RULE_function_definition = 2;
	public static readonly RULE_function_header = 3;
	public static readonly RULE_function_parameter_list = 4;
	public static readonly RULE_function_call = 5;
	public static readonly RULE_function_call_parameter_list = 6;
	public static readonly RULE_statement = 7;
	public static readonly RULE_compound_statement = 8;
	public static readonly RULE_simple_statement = 9;
	public static readonly RULE_selection_statement = 10;
	public static readonly RULE_switch_statement = 11;
	public static readonly RULE_case_group = 12;
	public static readonly RULE_case_label = 13;
	public static readonly RULE_iteration_statement = 14;
	public static readonly RULE_for_iteration = 15;
	public static readonly RULE_while_iteration = 16;
	public static readonly RULE_do_while_iteration = 17;
	public static readonly RULE_jump_statement = 18;
	public static readonly RULE_expression_statement = 19;
	public static readonly RULE_declaration_statement = 20;
	public static readonly RULE_precision_declaration = 21;
	public static readonly RULE_invariant_declaration = 22;
	public static readonly RULE_variable_declaration = 23;
	public static readonly RULE_single_variable_declaration = 24;
	public static readonly RULE_type_declaration = 25;
	public static readonly RULE_interface_block_declaration = 26;
	public static readonly RULE_identifier_optarray = 27;
	public static readonly RULE_identifier_optarray_optassignment = 28;
	public static readonly RULE_expression = 29;
	public static readonly RULE_expression_list = 30;
	public static readonly RULE_type = 31;
	public static readonly RULE_type_usage = 32;
	public static readonly RULE_array_subscript = 33;
	public static readonly RULE_qualifier = 34;
	public static readonly RULE_layout_qualifier = 35;
	public static readonly RULE_layout_qualifier_id_list = 36;
	public static readonly RULE_layout_qualifier_id = 37;
	public static readonly RULE_literal = 38;
	public static readonly RULE_number_literal = 39;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"start", "function_prototype", "function_definition", "function_header", 
		"function_parameter_list", "function_call", "function_call_parameter_list", 
		"statement", "compound_statement", "simple_statement", "selection_statement", 
		"switch_statement", "case_group", "case_label", "iteration_statement", 
		"for_iteration", "while_iteration", "do_while_iteration", "jump_statement", 
		"expression_statement", "declaration_statement", "precision_declaration", 
		"invariant_declaration", "variable_declaration", "single_variable_declaration", 
		"type_declaration", "interface_block_declaration", "identifier_optarray", 
		"identifier_optarray_optassignment", "expression", "expression_list", 
		"type", "type_usage", "array_subscript", "qualifier", "layout_qualifier", 
		"layout_qualifier_id_list", "layout_qualifier_id", "literal", "number_literal",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'break'", "'continue'", "'do'", "'for'", "'while'", "'switch'", 
		"'case'", "'default'", "'if'", "'else'", "'discard'", "'return'", "'struct'", 
		"'void'", "'precision'", "'layout'", "'invariant'", "'smooth'", "'flat'", 
		"'const'", "'inout'", "'in'", "'out'", "'centroid'", "'uniform'", "'varying'", 
		"'attribute'", "'highp'", "'mediump'", "'lowp'", undefined, undefined, 
		undefined, undefined, "'*'", "'+'", "'-'", "'/'", "'%'", "'++'", "'--'", 
		undefined, undefined, undefined, "'&'", "'^'", "'|'", "'~'", "'&&'", "'||'", 
		"'^^'", "'!'", undefined, "'='", undefined, undefined, "' '", "'\t'", 
		undefined, undefined, undefined, "'.'", "','", "':'", "';'", "'?'", "'('", 
		"')'", "'{'", "'}'", "'['", "']'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "KW_BREAK", "KW_CONTINUE", "KW_DO", "KW_FOR", "KW_WHILE", "KW_SWITCH", 
		"KW_CASE", "KW_DEFAULT", "KW_IF", "KW_ELSE", "KW_DISCARD", "KW_RETURN", 
		"KW_STRUCT", "KW_VOID", "Q_PRECISION", "Q_LAYOUT", "Q_INVARIANT", "Q_SMOOTH", 
		"Q_FLAT", "Q_CONST", "Q_INOUT", "Q_IN", "Q_OUT", "Q_CENTROID", "Q_UNIFORM", 
		"Q_VARYING", "Q_ATTRIBUTE", "Q_HIGHP", "Q_MEDIUMP", "Q_LOWP", "TYPE", 
		"BOOL_LITERAL", "INT_LITERAL", "FLOAT_LITERAL", "OP_MUL", "OP_ADD", "OP_SUB", 
		"OP_DIV", "OP_MOD", "OP_INC", "OP_DEC", "OP_SHIFT", "OP_RELATIONAL", "OP_EQUALITY", 
		"OP_BIT_AND", "OP_BIT_XOR", "OP_BIT_OR", "OP_BIT_UNARY", "OP_LOGICAL_AND", 
		"OP_LOGICAL_OR", "OP_LOGICAL_XOR", "OP_LOGICAL_UNARY", "OP_MODIFY", "OP_ASSIGN", 
		"MACRO", "NEW_LINE", "SPACE", "TAB", "MULTI_LINE_COMMENT", "SINGLE_LINE_COMMENT", 
		"IDENTIFIER", "DOT", "COMMA", "COLON", "SEMICOLON", "QUESTION", "LRB", 
		"RRB", "LCB", "RCB", "LSB", "RSB",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(AntlrGlslParser._LITERAL_NAMES, AntlrGlslParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return AntlrGlslParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "AntlrGlslParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return AntlrGlslParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return AntlrGlslParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(AntlrGlslParser._ATN, this);
	}
	// @RuleVersion(0)
	public start(): StartContext {
		let _localctx: StartContext = new StartContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, AntlrGlslParser.RULE_start);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 86;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << AntlrGlslParser.KW_STRUCT) | (1 << AntlrGlslParser.KW_VOID) | (1 << AntlrGlslParser.Q_PRECISION) | (1 << AntlrGlslParser.Q_LAYOUT) | (1 << AntlrGlslParser.Q_INVARIANT) | (1 << AntlrGlslParser.Q_SMOOTH) | (1 << AntlrGlslParser.Q_FLAT) | (1 << AntlrGlslParser.Q_CONST) | (1 << AntlrGlslParser.Q_INOUT) | (1 << AntlrGlslParser.Q_IN) | (1 << AntlrGlslParser.Q_OUT) | (1 << AntlrGlslParser.Q_CENTROID) | (1 << AntlrGlslParser.Q_UNIFORM) | (1 << AntlrGlslParser.Q_VARYING) | (1 << AntlrGlslParser.Q_ATTRIBUTE) | (1 << AntlrGlslParser.Q_HIGHP) | (1 << AntlrGlslParser.Q_MEDIUMP) | (1 << AntlrGlslParser.Q_LOWP) | (1 << AntlrGlslParser.TYPE))) !== 0) || ((((_la - 61)) & ~0x1F) === 0 && ((1 << (_la - 61)) & ((1 << (AntlrGlslParser.IDENTIFIER - 61)) | (1 << (AntlrGlslParser.SEMICOLON - 61)) | (1 << (AntlrGlslParser.LCB - 61)))) !== 0)) {
				{
				this.state = 84;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 0, this._ctx) ) {
				case 1:
					{
					this.state = 80;
					this.function_prototype();
					}
					break;

				case 2:
					{
					this.state = 81;
					this.function_definition();
					}
					break;

				case 3:
					{
					this.state = 82;
					this.declaration_statement();
					}
					break;

				case 4:
					{
					this.state = 83;
					this.match(AntlrGlslParser.SEMICOLON);
					}
					break;
				}
				}
				this.state = 88;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_prototype(): Function_prototypeContext {
		let _localctx: Function_prototypeContext = new Function_prototypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, AntlrGlslParser.RULE_function_prototype);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 89;
			this.function_header();
			this.state = 90;
			this.match(AntlrGlslParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_definition(): Function_definitionContext {
		let _localctx: Function_definitionContext = new Function_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, AntlrGlslParser.RULE_function_definition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 92;
			this.function_header();
			this.state = 93;
			this.compound_statement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_header(): Function_headerContext {
		let _localctx: Function_headerContext = new Function_headerContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, AntlrGlslParser.RULE_function_header);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 95;
			this.type_usage();
			this.state = 96;
			this.match(AntlrGlslParser.IDENTIFIER);
			this.state = 97;
			this.match(AntlrGlslParser.LRB);
			this.state = 99;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << AntlrGlslParser.KW_STRUCT) | (1 << AntlrGlslParser.KW_VOID) | (1 << AntlrGlslParser.Q_PRECISION) | (1 << AntlrGlslParser.Q_LAYOUT) | (1 << AntlrGlslParser.Q_INVARIANT) | (1 << AntlrGlslParser.Q_SMOOTH) | (1 << AntlrGlslParser.Q_FLAT) | (1 << AntlrGlslParser.Q_CONST) | (1 << AntlrGlslParser.Q_INOUT) | (1 << AntlrGlslParser.Q_IN) | (1 << AntlrGlslParser.Q_OUT) | (1 << AntlrGlslParser.Q_CENTROID) | (1 << AntlrGlslParser.Q_UNIFORM) | (1 << AntlrGlslParser.Q_VARYING) | (1 << AntlrGlslParser.Q_ATTRIBUTE) | (1 << AntlrGlslParser.Q_HIGHP) | (1 << AntlrGlslParser.Q_MEDIUMP) | (1 << AntlrGlslParser.Q_LOWP) | (1 << AntlrGlslParser.TYPE))) !== 0) || _la === AntlrGlslParser.IDENTIFIER) {
				{
				this.state = 98;
				this.function_parameter_list();
				}
			}

			this.state = 101;
			this.match(AntlrGlslParser.RRB);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_parameter_list(): Function_parameter_listContext {
		let _localctx: Function_parameter_listContext = new Function_parameter_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, AntlrGlslParser.RULE_function_parameter_list);
		let _la: number;
		try {
			this.state = 112;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 103;
				this.match(AntlrGlslParser.KW_VOID);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 104;
				this.single_variable_declaration();
				this.state = 109;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === AntlrGlslParser.COMMA) {
					{
					{
					this.state = 105;
					this.match(AntlrGlslParser.COMMA);
					this.state = 106;
					this.single_variable_declaration();
					}
					}
					this.state = 111;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_call(): Function_callContext {
		let _localctx: Function_callContext = new Function_callContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, AntlrGlslParser.RULE_function_call);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 114;
			_la = this._input.LA(1);
			if (!(_la === AntlrGlslParser.TYPE || _la === AntlrGlslParser.IDENTIFIER)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 118;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === AntlrGlslParser.LSB) {
				{
				{
				this.state = 115;
				this.array_subscript();
				}
				}
				this.state = 120;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 121;
			this.match(AntlrGlslParser.LRB);
			this.state = 123;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 14)) & ~0x1F) === 0 && ((1 << (_la - 14)) & ((1 << (AntlrGlslParser.KW_VOID - 14)) | (1 << (AntlrGlslParser.TYPE - 14)) | (1 << (AntlrGlslParser.BOOL_LITERAL - 14)) | (1 << (AntlrGlslParser.INT_LITERAL - 14)) | (1 << (AntlrGlslParser.FLOAT_LITERAL - 14)) | (1 << (AntlrGlslParser.OP_ADD - 14)) | (1 << (AntlrGlslParser.OP_SUB - 14)) | (1 << (AntlrGlslParser.OP_INC - 14)) | (1 << (AntlrGlslParser.OP_DEC - 14)))) !== 0) || ((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & ((1 << (AntlrGlslParser.OP_BIT_UNARY - 48)) | (1 << (AntlrGlslParser.OP_LOGICAL_UNARY - 48)) | (1 << (AntlrGlslParser.IDENTIFIER - 48)) | (1 << (AntlrGlslParser.LRB - 48)))) !== 0)) {
				{
				this.state = 122;
				this.function_call_parameter_list();
				}
			}

			this.state = 125;
			this.match(AntlrGlslParser.RRB);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_call_parameter_list(): Function_call_parameter_listContext {
		let _localctx: Function_call_parameter_listContext = new Function_call_parameter_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, AntlrGlslParser.RULE_function_call_parameter_list);
		try {
			this.state = 129;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case AntlrGlslParser.KW_VOID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 127;
				this.match(AntlrGlslParser.KW_VOID);
				}
				break;
			case AntlrGlslParser.TYPE:
			case AntlrGlslParser.BOOL_LITERAL:
			case AntlrGlslParser.INT_LITERAL:
			case AntlrGlslParser.FLOAT_LITERAL:
			case AntlrGlslParser.OP_ADD:
			case AntlrGlslParser.OP_SUB:
			case AntlrGlslParser.OP_INC:
			case AntlrGlslParser.OP_DEC:
			case AntlrGlslParser.OP_BIT_UNARY:
			case AntlrGlslParser.OP_LOGICAL_UNARY:
			case AntlrGlslParser.IDENTIFIER:
			case AntlrGlslParser.LRB:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 128;
				this.expression_list();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, AntlrGlslParser.RULE_statement);
		try {
			this.state = 133;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 131;
				this.compound_statement();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 132;
				this.simple_statement();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public compound_statement(): Compound_statementContext {
		let _localctx: Compound_statementContext = new Compound_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, AntlrGlslParser.RULE_compound_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 135;
			this.match(AntlrGlslParser.LCB);
			this.state = 139;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << AntlrGlslParser.KW_BREAK) | (1 << AntlrGlslParser.KW_CONTINUE) | (1 << AntlrGlslParser.KW_DO) | (1 << AntlrGlslParser.KW_FOR) | (1 << AntlrGlslParser.KW_WHILE) | (1 << AntlrGlslParser.KW_SWITCH) | (1 << AntlrGlslParser.KW_IF) | (1 << AntlrGlslParser.KW_DISCARD) | (1 << AntlrGlslParser.KW_RETURN) | (1 << AntlrGlslParser.KW_STRUCT) | (1 << AntlrGlslParser.KW_VOID) | (1 << AntlrGlslParser.Q_PRECISION) | (1 << AntlrGlslParser.Q_LAYOUT) | (1 << AntlrGlslParser.Q_INVARIANT) | (1 << AntlrGlslParser.Q_SMOOTH) | (1 << AntlrGlslParser.Q_FLAT) | (1 << AntlrGlslParser.Q_CONST) | (1 << AntlrGlslParser.Q_INOUT) | (1 << AntlrGlslParser.Q_IN) | (1 << AntlrGlslParser.Q_OUT) | (1 << AntlrGlslParser.Q_CENTROID) | (1 << AntlrGlslParser.Q_UNIFORM) | (1 << AntlrGlslParser.Q_VARYING) | (1 << AntlrGlslParser.Q_ATTRIBUTE) | (1 << AntlrGlslParser.Q_HIGHP) | (1 << AntlrGlslParser.Q_MEDIUMP) | (1 << AntlrGlslParser.Q_LOWP) | (1 << AntlrGlslParser.TYPE))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (AntlrGlslParser.BOOL_LITERAL - 32)) | (1 << (AntlrGlslParser.INT_LITERAL - 32)) | (1 << (AntlrGlslParser.FLOAT_LITERAL - 32)) | (1 << (AntlrGlslParser.OP_ADD - 32)) | (1 << (AntlrGlslParser.OP_SUB - 32)) | (1 << (AntlrGlslParser.OP_INC - 32)) | (1 << (AntlrGlslParser.OP_DEC - 32)) | (1 << (AntlrGlslParser.OP_BIT_UNARY - 32)) | (1 << (AntlrGlslParser.OP_LOGICAL_UNARY - 32)) | (1 << (AntlrGlslParser.IDENTIFIER - 32)))) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & ((1 << (AntlrGlslParser.SEMICOLON - 65)) | (1 << (AntlrGlslParser.LRB - 65)) | (1 << (AntlrGlslParser.LCB - 65)))) !== 0)) {
				{
				{
				this.state = 136;
				this.statement();
				}
				}
				this.state = 141;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 142;
			this.match(AntlrGlslParser.RCB);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simple_statement(): Simple_statementContext {
		let _localctx: Simple_statementContext = new Simple_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, AntlrGlslParser.RULE_simple_statement);
		try {
			this.state = 151;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 144;
				this.declaration_statement();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 145;
				this.expression_statement();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 146;
				this.selection_statement();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 147;
				this.iteration_statement();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 148;
				this.jump_statement();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 149;
				this.switch_statement();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 150;
				this.match(AntlrGlslParser.SEMICOLON);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selection_statement(): Selection_statementContext {
		let _localctx: Selection_statementContext = new Selection_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, AntlrGlslParser.RULE_selection_statement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 153;
			this.match(AntlrGlslParser.KW_IF);
			this.state = 154;
			this.match(AntlrGlslParser.LRB);
			this.state = 155;
			this.expression(0);
			this.state = 156;
			this.match(AntlrGlslParser.RRB);
			this.state = 157;
			this.statement();
			this.state = 160;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 11, this._ctx) ) {
			case 1:
				{
				this.state = 158;
				this.match(AntlrGlslParser.KW_ELSE);
				this.state = 159;
				this.statement();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public switch_statement(): Switch_statementContext {
		let _localctx: Switch_statementContext = new Switch_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, AntlrGlslParser.RULE_switch_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 162;
			this.match(AntlrGlslParser.KW_SWITCH);
			this.state = 163;
			this.match(AntlrGlslParser.LRB);
			this.state = 164;
			this.expression(0);
			this.state = 165;
			this.match(AntlrGlslParser.RRB);
			this.state = 166;
			this.match(AntlrGlslParser.LCB);
			this.state = 170;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === AntlrGlslParser.KW_CASE || _la === AntlrGlslParser.KW_DEFAULT) {
				{
				{
				this.state = 167;
				this.case_group();
				}
				}
				this.state = 172;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 173;
			this.match(AntlrGlslParser.RCB);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public case_group(): Case_groupContext {
		let _localctx: Case_groupContext = new Case_groupContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, AntlrGlslParser.RULE_case_group);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 175;
			this.case_label();
			this.state = 179;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << AntlrGlslParser.KW_BREAK) | (1 << AntlrGlslParser.KW_CONTINUE) | (1 << AntlrGlslParser.KW_DO) | (1 << AntlrGlslParser.KW_FOR) | (1 << AntlrGlslParser.KW_WHILE) | (1 << AntlrGlslParser.KW_SWITCH) | (1 << AntlrGlslParser.KW_IF) | (1 << AntlrGlslParser.KW_DISCARD) | (1 << AntlrGlslParser.KW_RETURN) | (1 << AntlrGlslParser.KW_STRUCT) | (1 << AntlrGlslParser.KW_VOID) | (1 << AntlrGlslParser.Q_PRECISION) | (1 << AntlrGlslParser.Q_LAYOUT) | (1 << AntlrGlslParser.Q_INVARIANT) | (1 << AntlrGlslParser.Q_SMOOTH) | (1 << AntlrGlslParser.Q_FLAT) | (1 << AntlrGlslParser.Q_CONST) | (1 << AntlrGlslParser.Q_INOUT) | (1 << AntlrGlslParser.Q_IN) | (1 << AntlrGlslParser.Q_OUT) | (1 << AntlrGlslParser.Q_CENTROID) | (1 << AntlrGlslParser.Q_UNIFORM) | (1 << AntlrGlslParser.Q_VARYING) | (1 << AntlrGlslParser.Q_ATTRIBUTE) | (1 << AntlrGlslParser.Q_HIGHP) | (1 << AntlrGlslParser.Q_MEDIUMP) | (1 << AntlrGlslParser.Q_LOWP) | (1 << AntlrGlslParser.TYPE))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (AntlrGlslParser.BOOL_LITERAL - 32)) | (1 << (AntlrGlslParser.INT_LITERAL - 32)) | (1 << (AntlrGlslParser.FLOAT_LITERAL - 32)) | (1 << (AntlrGlslParser.OP_ADD - 32)) | (1 << (AntlrGlslParser.OP_SUB - 32)) | (1 << (AntlrGlslParser.OP_INC - 32)) | (1 << (AntlrGlslParser.OP_DEC - 32)) | (1 << (AntlrGlslParser.OP_BIT_UNARY - 32)) | (1 << (AntlrGlslParser.OP_LOGICAL_UNARY - 32)) | (1 << (AntlrGlslParser.IDENTIFIER - 32)))) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & ((1 << (AntlrGlslParser.SEMICOLON - 65)) | (1 << (AntlrGlslParser.LRB - 65)) | (1 << (AntlrGlslParser.LCB - 65)))) !== 0)) {
				{
				{
				this.state = 176;
				this.statement();
				}
				}
				this.state = 181;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public case_label(): Case_labelContext {
		let _localctx: Case_labelContext = new Case_labelContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, AntlrGlslParser.RULE_case_label);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 185;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case AntlrGlslParser.KW_DEFAULT:
				{
				this.state = 182;
				this.match(AntlrGlslParser.KW_DEFAULT);
				}
				break;
			case AntlrGlslParser.KW_CASE:
				{
				this.state = 183;
				this.match(AntlrGlslParser.KW_CASE);
				this.state = 184;
				this.expression(0);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 187;
			this.match(AntlrGlslParser.COLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public iteration_statement(): Iteration_statementContext {
		let _localctx: Iteration_statementContext = new Iteration_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, AntlrGlslParser.RULE_iteration_statement);
		try {
			this.state = 192;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case AntlrGlslParser.KW_FOR:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 189;
				this.for_iteration();
				}
				break;
			case AntlrGlslParser.KW_WHILE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 190;
				this.while_iteration();
				}
				break;
			case AntlrGlslParser.KW_DO:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 191;
				this.do_while_iteration();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public for_iteration(): For_iterationContext {
		let _localctx: For_iterationContext = new For_iterationContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, AntlrGlslParser.RULE_for_iteration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 194;
			this.match(AntlrGlslParser.KW_FOR);
			this.state = 195;
			this.match(AntlrGlslParser.LRB);
			this.state = 198;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 16, this._ctx) ) {
			case 1:
				{
				this.state = 196;
				this.variable_declaration();
				}
				break;

			case 2:
				{
				this.state = 197;
				this.expression_list();
				}
				break;
			}
			this.state = 201;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				{
				this.state = 200;
				this.match(AntlrGlslParser.SEMICOLON);
				}
				break;
			}
			this.state = 204;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 18, this._ctx) ) {
			case 1:
				{
				this.state = 203;
				this.expression(0);
				}
				break;
			}
			this.state = 207;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === AntlrGlslParser.SEMICOLON) {
				{
				this.state = 206;
				this.match(AntlrGlslParser.SEMICOLON);
				}
			}

			this.state = 210;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 31)) & ~0x1F) === 0 && ((1 << (_la - 31)) & ((1 << (AntlrGlslParser.TYPE - 31)) | (1 << (AntlrGlslParser.BOOL_LITERAL - 31)) | (1 << (AntlrGlslParser.INT_LITERAL - 31)) | (1 << (AntlrGlslParser.FLOAT_LITERAL - 31)) | (1 << (AntlrGlslParser.OP_ADD - 31)) | (1 << (AntlrGlslParser.OP_SUB - 31)) | (1 << (AntlrGlslParser.OP_INC - 31)) | (1 << (AntlrGlslParser.OP_DEC - 31)) | (1 << (AntlrGlslParser.OP_BIT_UNARY - 31)) | (1 << (AntlrGlslParser.OP_LOGICAL_UNARY - 31)) | (1 << (AntlrGlslParser.IDENTIFIER - 31)))) !== 0) || _la === AntlrGlslParser.LRB) {
				{
				this.state = 209;
				this.expression_list();
				}
			}

			this.state = 212;
			this.match(AntlrGlslParser.RRB);
			this.state = 213;
			this.statement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public while_iteration(): While_iterationContext {
		let _localctx: While_iterationContext = new While_iterationContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, AntlrGlslParser.RULE_while_iteration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 215;
			this.match(AntlrGlslParser.KW_WHILE);
			this.state = 216;
			this.match(AntlrGlslParser.LRB);
			this.state = 217;
			this.expression(0);
			this.state = 218;
			this.match(AntlrGlslParser.RRB);
			this.state = 219;
			this.statement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public do_while_iteration(): Do_while_iterationContext {
		let _localctx: Do_while_iterationContext = new Do_while_iterationContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, AntlrGlslParser.RULE_do_while_iteration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 221;
			this.match(AntlrGlslParser.KW_DO);
			this.state = 222;
			this.statement();
			this.state = 223;
			this.match(AntlrGlslParser.KW_WHILE);
			this.state = 224;
			this.match(AntlrGlslParser.LRB);
			this.state = 225;
			this.expression(0);
			this.state = 226;
			this.match(AntlrGlslParser.RRB);
			this.state = 227;
			this.match(AntlrGlslParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public jump_statement(): Jump_statementContext {
		let _localctx: Jump_statementContext = new Jump_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, AntlrGlslParser.RULE_jump_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 236;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case AntlrGlslParser.KW_CONTINUE:
				{
				this.state = 229;
				this.match(AntlrGlslParser.KW_CONTINUE);
				}
				break;
			case AntlrGlslParser.KW_BREAK:
				{
				this.state = 230;
				this.match(AntlrGlslParser.KW_BREAK);
				}
				break;
			case AntlrGlslParser.KW_DISCARD:
				{
				this.state = 231;
				this.match(AntlrGlslParser.KW_DISCARD);
				}
				break;
			case AntlrGlslParser.KW_RETURN:
				{
				this.state = 232;
				this.match(AntlrGlslParser.KW_RETURN);
				this.state = 234;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 31)) & ~0x1F) === 0 && ((1 << (_la - 31)) & ((1 << (AntlrGlslParser.TYPE - 31)) | (1 << (AntlrGlslParser.BOOL_LITERAL - 31)) | (1 << (AntlrGlslParser.INT_LITERAL - 31)) | (1 << (AntlrGlslParser.FLOAT_LITERAL - 31)) | (1 << (AntlrGlslParser.OP_ADD - 31)) | (1 << (AntlrGlslParser.OP_SUB - 31)) | (1 << (AntlrGlslParser.OP_INC - 31)) | (1 << (AntlrGlslParser.OP_DEC - 31)) | (1 << (AntlrGlslParser.OP_BIT_UNARY - 31)) | (1 << (AntlrGlslParser.OP_LOGICAL_UNARY - 31)) | (1 << (AntlrGlslParser.IDENTIFIER - 31)))) !== 0) || _la === AntlrGlslParser.LRB) {
					{
					this.state = 233;
					this.expression(0);
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 238;
			this.match(AntlrGlslParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression_statement(): Expression_statementContext {
		let _localctx: Expression_statementContext = new Expression_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, AntlrGlslParser.RULE_expression_statement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 240;
			this.expression_list();
			this.state = 242;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				{
				this.state = 241;
				this.match(AntlrGlslParser.SEMICOLON);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public declaration_statement(): Declaration_statementContext {
		let _localctx: Declaration_statementContext = new Declaration_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, AntlrGlslParser.RULE_declaration_statement);
		try {
			this.state = 259;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 244;
				this.precision_declaration();
				this.state = 245;
				this.match(AntlrGlslParser.SEMICOLON);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 247;
				this.invariant_declaration();
				this.state = 248;
				this.match(AntlrGlslParser.SEMICOLON);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 250;
				this.type_declaration();
				this.state = 251;
				this.match(AntlrGlslParser.SEMICOLON);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 253;
				this.variable_declaration();
				this.state = 254;
				this.match(AntlrGlslParser.SEMICOLON);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 256;
				this.interface_block_declaration();
				this.state = 257;
				this.match(AntlrGlslParser.SEMICOLON);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public precision_declaration(): Precision_declarationContext {
		let _localctx: Precision_declarationContext = new Precision_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, AntlrGlslParser.RULE_precision_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 261;
			this.match(AntlrGlslParser.Q_PRECISION);
			this.state = 265;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << AntlrGlslParser.Q_PRECISION) | (1 << AntlrGlslParser.Q_LAYOUT) | (1 << AntlrGlslParser.Q_INVARIANT) | (1 << AntlrGlslParser.Q_SMOOTH) | (1 << AntlrGlslParser.Q_FLAT) | (1 << AntlrGlslParser.Q_CONST) | (1 << AntlrGlslParser.Q_INOUT) | (1 << AntlrGlslParser.Q_IN) | (1 << AntlrGlslParser.Q_OUT) | (1 << AntlrGlslParser.Q_CENTROID) | (1 << AntlrGlslParser.Q_UNIFORM) | (1 << AntlrGlslParser.Q_VARYING) | (1 << AntlrGlslParser.Q_ATTRIBUTE) | (1 << AntlrGlslParser.Q_HIGHP) | (1 << AntlrGlslParser.Q_MEDIUMP) | (1 << AntlrGlslParser.Q_LOWP))) !== 0)) {
				{
				{
				this.state = 262;
				this.qualifier();
				}
				}
				this.state = 267;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 268;
			this.type();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public invariant_declaration(): Invariant_declarationContext {
		let _localctx: Invariant_declarationContext = new Invariant_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, AntlrGlslParser.RULE_invariant_declaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 270;
			this.match(AntlrGlslParser.Q_INVARIANT);
			this.state = 271;
			this.match(AntlrGlslParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variable_declaration(): Variable_declarationContext {
		let _localctx: Variable_declarationContext = new Variable_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, AntlrGlslParser.RULE_variable_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 273;
			this.type_usage();
			this.state = 282;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 27, this._ctx) ) {
			case 1:
				{
				this.state = 274;
				this.identifier_optarray_optassignment();
				this.state = 279;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === AntlrGlslParser.COMMA) {
					{
					{
					this.state = 275;
					this.match(AntlrGlslParser.COMMA);
					this.state = 276;
					this.identifier_optarray_optassignment();
					}
					}
					this.state = 281;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public single_variable_declaration(): Single_variable_declarationContext {
		let _localctx: Single_variable_declarationContext = new Single_variable_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, AntlrGlslParser.RULE_single_variable_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 284;
			this.type_usage();
			this.state = 286;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === AntlrGlslParser.IDENTIFIER) {
				{
				this.state = 285;
				this.identifier_optarray_optassignment();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public type_declaration(): Type_declarationContext {
		let _localctx: Type_declarationContext = new Type_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, AntlrGlslParser.RULE_type_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 288;
			this.match(AntlrGlslParser.KW_STRUCT);
			this.state = 290;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === AntlrGlslParser.IDENTIFIER) {
				{
				this.state = 289;
				this.match(AntlrGlslParser.IDENTIFIER);
				}
			}

			this.state = 292;
			this.match(AntlrGlslParser.LCB);
			this.state = 298;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << AntlrGlslParser.KW_STRUCT) | (1 << AntlrGlslParser.KW_VOID) | (1 << AntlrGlslParser.Q_PRECISION) | (1 << AntlrGlslParser.Q_LAYOUT) | (1 << AntlrGlslParser.Q_INVARIANT) | (1 << AntlrGlslParser.Q_SMOOTH) | (1 << AntlrGlslParser.Q_FLAT) | (1 << AntlrGlslParser.Q_CONST) | (1 << AntlrGlslParser.Q_INOUT) | (1 << AntlrGlslParser.Q_IN) | (1 << AntlrGlslParser.Q_OUT) | (1 << AntlrGlslParser.Q_CENTROID) | (1 << AntlrGlslParser.Q_UNIFORM) | (1 << AntlrGlslParser.Q_VARYING) | (1 << AntlrGlslParser.Q_ATTRIBUTE) | (1 << AntlrGlslParser.Q_HIGHP) | (1 << AntlrGlslParser.Q_MEDIUMP) | (1 << AntlrGlslParser.Q_LOWP) | (1 << AntlrGlslParser.TYPE))) !== 0) || _la === AntlrGlslParser.IDENTIFIER) {
				{
				{
				this.state = 293;
				this.variable_declaration();
				this.state = 294;
				this.match(AntlrGlslParser.SEMICOLON);
				}
				}
				this.state = 300;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 301;
			this.match(AntlrGlslParser.RCB);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_block_declaration(): Interface_block_declarationContext {
		let _localctx: Interface_block_declarationContext = new Interface_block_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, AntlrGlslParser.RULE_interface_block_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 306;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << AntlrGlslParser.Q_PRECISION) | (1 << AntlrGlslParser.Q_LAYOUT) | (1 << AntlrGlslParser.Q_INVARIANT) | (1 << AntlrGlslParser.Q_SMOOTH) | (1 << AntlrGlslParser.Q_FLAT) | (1 << AntlrGlslParser.Q_CONST) | (1 << AntlrGlslParser.Q_INOUT) | (1 << AntlrGlslParser.Q_IN) | (1 << AntlrGlslParser.Q_OUT) | (1 << AntlrGlslParser.Q_CENTROID) | (1 << AntlrGlslParser.Q_UNIFORM) | (1 << AntlrGlslParser.Q_VARYING) | (1 << AntlrGlslParser.Q_ATTRIBUTE) | (1 << AntlrGlslParser.Q_HIGHP) | (1 << AntlrGlslParser.Q_MEDIUMP) | (1 << AntlrGlslParser.Q_LOWP))) !== 0)) {
				{
				{
				this.state = 303;
				this.qualifier();
				}
				}
				this.state = 308;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 310;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === AntlrGlslParser.IDENTIFIER) {
				{
				this.state = 309;
				this.match(AntlrGlslParser.IDENTIFIER);
				}
			}

			this.state = 312;
			this.match(AntlrGlslParser.LCB);
			this.state = 318;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << AntlrGlslParser.KW_STRUCT) | (1 << AntlrGlslParser.KW_VOID) | (1 << AntlrGlslParser.Q_PRECISION) | (1 << AntlrGlslParser.Q_LAYOUT) | (1 << AntlrGlslParser.Q_INVARIANT) | (1 << AntlrGlslParser.Q_SMOOTH) | (1 << AntlrGlslParser.Q_FLAT) | (1 << AntlrGlslParser.Q_CONST) | (1 << AntlrGlslParser.Q_INOUT) | (1 << AntlrGlslParser.Q_IN) | (1 << AntlrGlslParser.Q_OUT) | (1 << AntlrGlslParser.Q_CENTROID) | (1 << AntlrGlslParser.Q_UNIFORM) | (1 << AntlrGlslParser.Q_VARYING) | (1 << AntlrGlslParser.Q_ATTRIBUTE) | (1 << AntlrGlslParser.Q_HIGHP) | (1 << AntlrGlslParser.Q_MEDIUMP) | (1 << AntlrGlslParser.Q_LOWP) | (1 << AntlrGlslParser.TYPE))) !== 0) || _la === AntlrGlslParser.IDENTIFIER) {
				{
				{
				this.state = 313;
				this.variable_declaration();
				this.state = 314;
				this.match(AntlrGlslParser.SEMICOLON);
				}
				}
				this.state = 320;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 321;
			this.match(AntlrGlslParser.RCB);
			this.state = 323;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === AntlrGlslParser.IDENTIFIER) {
				{
				this.state = 322;
				this.identifier_optarray();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier_optarray(): Identifier_optarrayContext {
		let _localctx: Identifier_optarrayContext = new Identifier_optarrayContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, AntlrGlslParser.RULE_identifier_optarray);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 325;
			this.match(AntlrGlslParser.IDENTIFIER);
			this.state = 329;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === AntlrGlslParser.LSB) {
				{
				{
				this.state = 326;
				this.array_subscript();
				}
				}
				this.state = 331;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier_optarray_optassignment(): Identifier_optarray_optassignmentContext {
		let _localctx: Identifier_optarray_optassignmentContext = new Identifier_optarray_optassignmentContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, AntlrGlslParser.RULE_identifier_optarray_optassignment);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 332;
			this.identifier_optarray();
			this.state = 335;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === AntlrGlslParser.OP_ASSIGN) {
				{
				this.state = 333;
				this.match(AntlrGlslParser.OP_ASSIGN);
				this.state = 334;
				this.expression(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 58;
		this.enterRecursionRule(_localctx, 58, AntlrGlslParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 347;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				{
				this.state = 338;
				this.literal();
				}
				break;

			case 2:
				{
				this.state = 339;
				this.function_call();
				}
				break;

			case 3:
				{
				this.state = 340;
				this.match(AntlrGlslParser.IDENTIFIER);
				}
				break;

			case 4:
				{
				this.state = 341;
				this.match(AntlrGlslParser.LRB);
				this.state = 342;
				this.expression(0);
				this.state = 343;
				this.match(AntlrGlslParser.RRB);
				}
				break;

			case 5:
				{
				this.state = 345;
				_la = this._input.LA(1);
				if (!(((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (AntlrGlslParser.OP_ADD - 36)) | (1 << (AntlrGlslParser.OP_SUB - 36)) | (1 << (AntlrGlslParser.OP_INC - 36)) | (1 << (AntlrGlslParser.OP_DEC - 36)) | (1 << (AntlrGlslParser.OP_BIT_UNARY - 36)) | (1 << (AntlrGlslParser.OP_LOGICAL_UNARY - 36)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 346;
				this.expression(14);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 404;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 40, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 402;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 39, this._ctx) ) {
					case 1:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, AntlrGlslParser.RULE_expression);
						this.state = 349;
						if (!(this.precpred(this._ctx, 13))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 13)");
						}
						this.state = 350;
						_la = this._input.LA(1);
						if (!(((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (AntlrGlslParser.OP_MUL - 35)) | (1 << (AntlrGlslParser.OP_DIV - 35)) | (1 << (AntlrGlslParser.OP_MOD - 35)))) !== 0))) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 351;
						this.expression(14);
						}
						break;

					case 2:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, AntlrGlslParser.RULE_expression);
						this.state = 352;
						if (!(this.precpred(this._ctx, 12))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 12)");
						}
						this.state = 353;
						_la = this._input.LA(1);
						if (!(_la === AntlrGlslParser.OP_ADD || _la === AntlrGlslParser.OP_SUB)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 354;
						this.expression(13);
						}
						break;

					case 3:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, AntlrGlslParser.RULE_expression);
						this.state = 355;
						if (!(this.precpred(this._ctx, 11))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 11)");
						}
						this.state = 356;
						this.match(AntlrGlslParser.OP_SHIFT);
						this.state = 357;
						this.expression(12);
						}
						break;

					case 4:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, AntlrGlslParser.RULE_expression);
						this.state = 358;
						if (!(this.precpred(this._ctx, 10))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 10)");
						}
						this.state = 359;
						this.match(AntlrGlslParser.OP_RELATIONAL);
						this.state = 360;
						this.expression(11);
						}
						break;

					case 5:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, AntlrGlslParser.RULE_expression);
						this.state = 361;
						if (!(this.precpred(this._ctx, 9))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 9)");
						}
						this.state = 362;
						this.match(AntlrGlslParser.OP_EQUALITY);
						this.state = 363;
						this.expression(10);
						}
						break;

					case 6:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, AntlrGlslParser.RULE_expression);
						this.state = 364;
						if (!(this.precpred(this._ctx, 8))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 8)");
						}
						this.state = 365;
						this.match(AntlrGlslParser.OP_BIT_AND);
						this.state = 366;
						this.expression(9);
						}
						break;

					case 7:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, AntlrGlslParser.RULE_expression);
						this.state = 367;
						if (!(this.precpred(this._ctx, 7))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 7)");
						}
						this.state = 368;
						this.match(AntlrGlslParser.OP_BIT_XOR);
						this.state = 369;
						this.expression(8);
						}
						break;

					case 8:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, AntlrGlslParser.RULE_expression);
						this.state = 370;
						if (!(this.precpred(this._ctx, 6))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 6)");
						}
						this.state = 371;
						this.match(AntlrGlslParser.OP_BIT_OR);
						this.state = 372;
						this.expression(7);
						}
						break;

					case 9:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, AntlrGlslParser.RULE_expression);
						this.state = 373;
						if (!(this.precpred(this._ctx, 5))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 5)");
						}
						this.state = 374;
						this.match(AntlrGlslParser.OP_LOGICAL_AND);
						this.state = 375;
						this.expression(6);
						}
						break;

					case 10:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, AntlrGlslParser.RULE_expression);
						this.state = 376;
						if (!(this.precpred(this._ctx, 4))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 4)");
						}
						this.state = 377;
						this.match(AntlrGlslParser.OP_LOGICAL_XOR);
						this.state = 378;
						this.expression(5);
						}
						break;

					case 11:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, AntlrGlslParser.RULE_expression);
						this.state = 379;
						if (!(this.precpred(this._ctx, 3))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 3)");
						}
						this.state = 380;
						this.match(AntlrGlslParser.OP_LOGICAL_OR);
						this.state = 381;
						this.expression(4);
						}
						break;

					case 12:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, AntlrGlslParser.RULE_expression);
						this.state = 382;
						if (!(this.precpred(this._ctx, 1))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
						}
						this.state = 383;
						_la = this._input.LA(1);
						if (!(_la === AntlrGlslParser.OP_MODIFY || _la === AntlrGlslParser.OP_ASSIGN)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 384;
						this.expression(2);
						}
						break;

					case 13:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, AntlrGlslParser.RULE_expression);
						this.state = 385;
						if (!(this.precpred(this._ctx, 15))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 15)");
						}
						this.state = 394;
						this._errHandler.sync(this);
						switch ( this.interpreter.adaptivePredict(this._input, 38, this._ctx) ) {
						case 1:
							{
							this.state = 386;
							this.array_subscript();
							}
							break;

						case 2:
							{
							this.state = 387;
							this.match(AntlrGlslParser.DOT);
							this.state = 388;
							this.function_call();
							}
							break;

						case 3:
							{
							this.state = 389;
							this.match(AntlrGlslParser.DOT);
							this.state = 390;
							this.match(AntlrGlslParser.IDENTIFIER);
							}
							break;

						case 4:
							{
							this.state = 391;
							this.match(AntlrGlslParser.DOT);
							}
							break;

						case 5:
							{
							this.state = 392;
							this.match(AntlrGlslParser.OP_INC);
							}
							break;

						case 6:
							{
							this.state = 393;
							this.match(AntlrGlslParser.OP_DEC);
							}
							break;
						}
						}
						break;

					case 14:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, AntlrGlslParser.RULE_expression);
						this.state = 396;
						if (!(this.precpred(this._ctx, 2))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 2)");
						}
						this.state = 397;
						this.match(AntlrGlslParser.QUESTION);
						this.state = 398;
						this.expression_list();
						this.state = 399;
						this.match(AntlrGlslParser.COLON);
						this.state = 400;
						this.expression_list();
						}
						break;
					}
					}
				}
				this.state = 406;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 40, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression_list(): Expression_listContext {
		let _localctx: Expression_listContext = new Expression_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, AntlrGlslParser.RULE_expression_list);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 407;
			this.expression(0);
			this.state = 412;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 41, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 408;
					this.match(AntlrGlslParser.COMMA);
					this.state = 409;
					this.expression(0);
					}
					}
				}
				this.state = 414;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 41, this._ctx);
			}
			this.state = 416;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 42, this._ctx) ) {
			case 1:
				{
				this.state = 415;
				this.match(AntlrGlslParser.COMMA);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public type(): TypeContext {
		let _localctx: TypeContext = new TypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, AntlrGlslParser.RULE_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 418;
			_la = this._input.LA(1);
			if (!(_la === AntlrGlslParser.KW_VOID || _la === AntlrGlslParser.TYPE || _la === AntlrGlslParser.IDENTIFIER)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public type_usage(): Type_usageContext {
		let _localctx: Type_usageContext = new Type_usageContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, AntlrGlslParser.RULE_type_usage);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 423;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << AntlrGlslParser.Q_PRECISION) | (1 << AntlrGlslParser.Q_LAYOUT) | (1 << AntlrGlslParser.Q_INVARIANT) | (1 << AntlrGlslParser.Q_SMOOTH) | (1 << AntlrGlslParser.Q_FLAT) | (1 << AntlrGlslParser.Q_CONST) | (1 << AntlrGlslParser.Q_INOUT) | (1 << AntlrGlslParser.Q_IN) | (1 << AntlrGlslParser.Q_OUT) | (1 << AntlrGlslParser.Q_CENTROID) | (1 << AntlrGlslParser.Q_UNIFORM) | (1 << AntlrGlslParser.Q_VARYING) | (1 << AntlrGlslParser.Q_ATTRIBUTE) | (1 << AntlrGlslParser.Q_HIGHP) | (1 << AntlrGlslParser.Q_MEDIUMP) | (1 << AntlrGlslParser.Q_LOWP))) !== 0)) {
				{
				{
				this.state = 420;
				this.qualifier();
				}
				}
				this.state = 425;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 428;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case AntlrGlslParser.KW_VOID:
			case AntlrGlslParser.TYPE:
			case AntlrGlslParser.IDENTIFIER:
				{
				this.state = 426;
				this.type();
				}
				break;
			case AntlrGlslParser.KW_STRUCT:
				{
				this.state = 427;
				this.type_declaration();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 433;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === AntlrGlslParser.LSB) {
				{
				{
				this.state = 430;
				this.array_subscript();
				}
				}
				this.state = 435;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public array_subscript(): Array_subscriptContext {
		let _localctx: Array_subscriptContext = new Array_subscriptContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, AntlrGlslParser.RULE_array_subscript);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 436;
			this.match(AntlrGlslParser.LSB);
			this.state = 438;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 31)) & ~0x1F) === 0 && ((1 << (_la - 31)) & ((1 << (AntlrGlslParser.TYPE - 31)) | (1 << (AntlrGlslParser.BOOL_LITERAL - 31)) | (1 << (AntlrGlslParser.INT_LITERAL - 31)) | (1 << (AntlrGlslParser.FLOAT_LITERAL - 31)) | (1 << (AntlrGlslParser.OP_ADD - 31)) | (1 << (AntlrGlslParser.OP_SUB - 31)) | (1 << (AntlrGlslParser.OP_INC - 31)) | (1 << (AntlrGlslParser.OP_DEC - 31)) | (1 << (AntlrGlslParser.OP_BIT_UNARY - 31)) | (1 << (AntlrGlslParser.OP_LOGICAL_UNARY - 31)) | (1 << (AntlrGlslParser.IDENTIFIER - 31)))) !== 0) || _la === AntlrGlslParser.LRB) {
				{
				this.state = 437;
				this.expression(0);
				}
			}

			this.state = 440;
			this.match(AntlrGlslParser.RSB);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualifier(): QualifierContext {
		let _localctx: QualifierContext = new QualifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, AntlrGlslParser.RULE_qualifier);
		try {
			this.state = 458;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case AntlrGlslParser.Q_LAYOUT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 442;
				this.layout_qualifier();
				}
				break;
			case AntlrGlslParser.Q_PRECISION:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 443;
				this.match(AntlrGlslParser.Q_PRECISION);
				}
				break;
			case AntlrGlslParser.Q_INVARIANT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 444;
				this.match(AntlrGlslParser.Q_INVARIANT);
				}
				break;
			case AntlrGlslParser.Q_SMOOTH:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 445;
				this.match(AntlrGlslParser.Q_SMOOTH);
				}
				break;
			case AntlrGlslParser.Q_FLAT:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 446;
				this.match(AntlrGlslParser.Q_FLAT);
				}
				break;
			case AntlrGlslParser.Q_CONST:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 447;
				this.match(AntlrGlslParser.Q_CONST);
				}
				break;
			case AntlrGlslParser.Q_INOUT:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 448;
				this.match(AntlrGlslParser.Q_INOUT);
				}
				break;
			case AntlrGlslParser.Q_IN:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 449;
				this.match(AntlrGlslParser.Q_IN);
				}
				break;
			case AntlrGlslParser.Q_OUT:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 450;
				this.match(AntlrGlslParser.Q_OUT);
				}
				break;
			case AntlrGlslParser.Q_CENTROID:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 451;
				this.match(AntlrGlslParser.Q_CENTROID);
				}
				break;
			case AntlrGlslParser.Q_UNIFORM:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 452;
				this.match(AntlrGlslParser.Q_UNIFORM);
				}
				break;
			case AntlrGlslParser.Q_VARYING:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 453;
				this.match(AntlrGlslParser.Q_VARYING);
				}
				break;
			case AntlrGlslParser.Q_ATTRIBUTE:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 454;
				this.match(AntlrGlslParser.Q_ATTRIBUTE);
				}
				break;
			case AntlrGlslParser.Q_HIGHP:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 455;
				this.match(AntlrGlslParser.Q_HIGHP);
				}
				break;
			case AntlrGlslParser.Q_MEDIUMP:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 456;
				this.match(AntlrGlslParser.Q_MEDIUMP);
				}
				break;
			case AntlrGlslParser.Q_LOWP:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 457;
				this.match(AntlrGlslParser.Q_LOWP);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public layout_qualifier(): Layout_qualifierContext {
		let _localctx: Layout_qualifierContext = new Layout_qualifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, AntlrGlslParser.RULE_layout_qualifier);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 460;
			this.match(AntlrGlslParser.Q_LAYOUT);
			this.state = 461;
			this.match(AntlrGlslParser.LRB);
			this.state = 462;
			this.layout_qualifier_id_list();
			this.state = 463;
			this.match(AntlrGlslParser.RRB);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public layout_qualifier_id_list(): Layout_qualifier_id_listContext {
		let _localctx: Layout_qualifier_id_listContext = new Layout_qualifier_id_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, AntlrGlslParser.RULE_layout_qualifier_id_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 465;
			this.layout_qualifier_id();
			this.state = 470;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === AntlrGlslParser.COMMA) {
				{
				{
				this.state = 466;
				this.match(AntlrGlslParser.COMMA);
				this.state = 467;
				this.layout_qualifier_id();
				}
				}
				this.state = 472;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public layout_qualifier_id(): Layout_qualifier_idContext {
		let _localctx: Layout_qualifier_idContext = new Layout_qualifier_idContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, AntlrGlslParser.RULE_layout_qualifier_id);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 473;
			this.match(AntlrGlslParser.IDENTIFIER);
			this.state = 479;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === AntlrGlslParser.OP_ASSIGN) {
				{
				this.state = 474;
				this.match(AntlrGlslParser.OP_ASSIGN);
				this.state = 477;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case AntlrGlslParser.IDENTIFIER:
					{
					this.state = 475;
					this.match(AntlrGlslParser.IDENTIFIER);
					}
					break;
				case AntlrGlslParser.BOOL_LITERAL:
				case AntlrGlslParser.INT_LITERAL:
				case AntlrGlslParser.FLOAT_LITERAL:
					{
					this.state = 476;
					this.literal();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, AntlrGlslParser.RULE_literal);
		try {
			this.state = 483;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case AntlrGlslParser.BOOL_LITERAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 481;
				this.match(AntlrGlslParser.BOOL_LITERAL);
				}
				break;
			case AntlrGlslParser.INT_LITERAL:
			case AntlrGlslParser.FLOAT_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 482;
				this.number_literal();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public number_literal(): Number_literalContext {
		let _localctx: Number_literalContext = new Number_literalContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, AntlrGlslParser.RULE_number_literal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 485;
			_la = this._input.LA(1);
			if (!(_la === AntlrGlslParser.INT_LITERAL || _la === AntlrGlslParser.FLOAT_LITERAL)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 29:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 13);

		case 1:
			return this.precpred(this._ctx, 12);

		case 2:
			return this.precpred(this._ctx, 11);

		case 3:
			return this.precpred(this._ctx, 10);

		case 4:
			return this.precpred(this._ctx, 9);

		case 5:
			return this.precpred(this._ctx, 8);

		case 6:
			return this.precpred(this._ctx, 7);

		case 7:
			return this.precpred(this._ctx, 6);

		case 8:
			return this.precpred(this._ctx, 5);

		case 9:
			return this.precpred(this._ctx, 4);

		case 10:
			return this.precpred(this._ctx, 3);

		case 11:
			return this.precpred(this._ctx, 1);

		case 12:
			return this.precpred(this._ctx, 15);

		case 13:
			return this.precpred(this._ctx, 2);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03J\u01EA\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x03\x02\x03\x02" +
		"\x03\x02\x03\x02\x07\x02W\n\x02\f\x02\x0E\x02Z\v\x02\x03\x03\x03\x03\x03" +
		"\x03\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05f" +
		"\n\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03\x06\x07\x06n\n\x06" +
		"\f\x06\x0E\x06q\v\x06\x05\x06s\n\x06\x03\x07\x03\x07\x07\x07w\n\x07\f" +
		"\x07\x0E\x07z\v\x07\x03\x07\x03\x07\x05\x07~\n\x07\x03\x07\x03\x07\x03" +
		"\b\x03\b\x05\b\x84\n\b\x03\t\x03\t\x05\t\x88\n\t\x03\n\x03\n\x07\n\x8C" +
		"\n\n\f\n\x0E\n\x8F\v\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v" +
		"\x03\v\x05\v\x9A\n\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x05\f\xA3" +
		"\n\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x07\r\xAB\n\r\f\r\x0E\r\xAE\v" +
		"\r\x03\r\x03\r\x03\x0E\x03\x0E\x07\x0E\xB4\n\x0E\f\x0E\x0E\x0E\xB7\v\x0E" +
		"\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xBC\n\x0F\x03\x0F\x03\x0F\x03\x10\x03" +
		"\x10\x03\x10\x05\x10\xC3\n\x10\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11" +
		"\xC9\n\x11\x03\x11\x05\x11\xCC\n\x11\x03\x11\x05\x11\xCF\n\x11\x03\x11" +
		"\x05\x11\xD2\n\x11\x03\x11\x05\x11\xD5\n\x11\x03\x11\x03\x11\x03\x11\x03" +
		"\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x13\x03\x13\x03\x13\x03" +
		"\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03" +
		"\x14\x05\x14\xED\n\x14\x05\x14\xEF\n\x14\x03\x14\x03\x14\x03\x15\x03\x15" +
		"\x05\x15\xF5\n\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x05" +
		"\x16\u0106\n\x16\x03\x17\x03\x17\x07\x17\u010A\n\x17\f\x17\x0E\x17\u010D" +
		"\v\x17\x03\x17\x03\x17\x03\x18\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19" +
		"\x03\x19\x07\x19\u0118\n\x19\f\x19\x0E\x19\u011B\v\x19\x05\x19\u011D\n" +
		"\x19\x03\x1A\x03\x1A\x05\x1A\u0121\n\x1A\x03\x1B\x03\x1B\x05\x1B\u0125" +
		"\n\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x07\x1B\u012B\n\x1B\f\x1B\x0E\x1B" +
		"\u012E\v\x1B\x03\x1B\x03\x1B\x03\x1C\x07\x1C\u0133\n\x1C\f\x1C\x0E\x1C" +
		"\u0136\v\x1C\x03\x1C\x05\x1C\u0139\n\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C" +
		"\x07\x1C\u013F\n\x1C\f\x1C\x0E\x1C\u0142\v\x1C\x03\x1C\x03\x1C\x05\x1C" +
		"\u0146\n\x1C\x03\x1D\x03\x1D\x07\x1D\u014A\n\x1D\f\x1D\x0E\x1D\u014D\v" +
		"\x1D\x03\x1E\x03\x1E\x03\x1E\x05\x1E\u0152\n\x1E\x03\x1F\x03\x1F\x03\x1F" +
		"\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x05\x1F\u015E" +
		"\n\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F" +
		"\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F" +
		"\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F" +
		"\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F" +
		"\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F" +
		"\x03\x1F\x05\x1F\u018D\n\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03" +
		"\x1F\x07\x1F\u0195\n\x1F\f\x1F\x0E\x1F\u0198\v\x1F\x03 \x03 \x03 \x07" +
		" \u019D\n \f \x0E \u01A0\v \x03 \x05 \u01A3\n \x03!\x03!\x03\"\x07\"\u01A8" +
		"\n\"\f\"\x0E\"\u01AB\v\"\x03\"\x03\"\x05\"\u01AF\n\"\x03\"\x07\"\u01B2" +
		"\n\"\f\"\x0E\"\u01B5\v\"\x03#\x03#\x05#\u01B9\n#\x03#\x03#\x03$\x03$\x03" +
		"$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x05" +
		"$\u01CD\n$\x03%\x03%\x03%\x03%\x03%\x03&\x03&\x03&\x07&\u01D7\n&\f&\x0E" +
		"&\u01DA\v&\x03\'\x03\'\x03\'\x03\'\x05\'\u01E0\n\'\x05\'\u01E2\n\'\x03" +
		"(\x03(\x05(\u01E6\n(\x03)\x03)\x03)\x02\x02\x03<*\x02\x02\x04\x02\x06" +
		"\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02" +
		"\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x02" +
		"2\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02" +
		"N\x02P\x02\x02\t\x04\x02!!??\x06\x02&\'*+2266\x04\x02%%()\x03\x02&\'\x03" +
		"\x0278\x05\x02\x10\x10!!??\x03\x02#$\x02\u0224\x02X\x03\x02\x02\x02\x04" +
		"[\x03\x02\x02\x02\x06^\x03\x02\x02\x02\ba\x03\x02\x02\x02\nr\x03\x02\x02" +
		"\x02\ft\x03\x02\x02\x02\x0E\x83\x03\x02\x02\x02\x10\x87\x03\x02\x02\x02" +
		"\x12\x89\x03\x02\x02\x02\x14\x99\x03\x02\x02\x02\x16\x9B\x03\x02\x02\x02" +
		"\x18\xA4\x03\x02\x02\x02\x1A\xB1\x03\x02\x02\x02\x1C\xBB\x03\x02\x02\x02" +
		"\x1E\xC2\x03\x02\x02\x02 \xC4\x03\x02\x02\x02\"\xD9\x03\x02\x02\x02$\xDF" +
		"\x03\x02\x02\x02&\xEE\x03\x02\x02\x02(\xF2\x03\x02\x02\x02*\u0105\x03" +
		"\x02\x02\x02,\u0107\x03\x02\x02\x02.\u0110\x03\x02\x02\x020\u0113\x03" +
		"\x02\x02\x022\u011E\x03\x02\x02\x024\u0122\x03\x02\x02\x026\u0134\x03" +
		"\x02\x02\x028\u0147\x03\x02\x02\x02:\u014E\x03\x02\x02\x02<\u015D\x03" +
		"\x02\x02\x02>\u0199\x03\x02\x02\x02@\u01A4\x03\x02\x02\x02B\u01A9\x03" +
		"\x02\x02\x02D\u01B6\x03\x02\x02\x02F\u01CC\x03\x02\x02\x02H\u01CE\x03" +
		"\x02\x02\x02J\u01D3\x03\x02\x02\x02L\u01DB\x03\x02\x02\x02N\u01E5\x03" +
		"\x02\x02\x02P\u01E7\x03\x02\x02\x02RW\x05\x04\x03\x02SW\x05\x06\x04\x02" +
		"TW\x05*\x16\x02UW\x07C\x02\x02VR\x03\x02\x02\x02VS\x03\x02\x02\x02VT\x03" +
		"\x02\x02\x02VU\x03\x02\x02\x02WZ\x03\x02\x02\x02XV\x03\x02\x02\x02XY\x03" +
		"\x02\x02\x02Y\x03\x03\x02\x02\x02ZX\x03\x02\x02\x02[\\\x05\b\x05\x02\\" +
		"]\x07C\x02\x02]\x05\x03\x02\x02\x02^_\x05\b\x05\x02_`\x05\x12\n\x02`\x07" +
		"\x03\x02\x02\x02ab\x05B\"\x02bc\x07?\x02\x02ce\x07E\x02\x02df\x05\n\x06" +
		"\x02ed\x03\x02\x02\x02ef\x03\x02\x02\x02fg\x03\x02\x02\x02gh\x07F\x02" +
		"\x02h\t\x03\x02\x02\x02is\x07\x10\x02\x02jo\x052\x1A\x02kl\x07A\x02\x02" +
		"ln\x052\x1A\x02mk\x03\x02\x02\x02nq\x03\x02\x02\x02om\x03\x02\x02\x02" +
		"op\x03\x02\x02\x02ps\x03\x02\x02\x02qo\x03\x02\x02\x02ri\x03\x02\x02\x02" +
		"rj\x03\x02\x02\x02s\v\x03\x02\x02\x02tx\t\x02\x02\x02uw\x05D#\x02vu\x03" +
		"\x02\x02\x02wz\x03\x02\x02\x02xv\x03\x02\x02\x02xy\x03\x02\x02\x02y{\x03" +
		"\x02\x02\x02zx\x03\x02\x02\x02{}\x07E\x02\x02|~\x05\x0E\b\x02}|\x03\x02" +
		"\x02\x02}~\x03\x02\x02\x02~\x7F\x03\x02\x02\x02\x7F\x80\x07F\x02\x02\x80" +
		"\r\x03\x02\x02\x02\x81\x84\x07\x10\x02\x02\x82\x84\x05> \x02\x83\x81\x03" +
		"\x02\x02\x02\x83\x82\x03\x02\x02\x02\x84\x0F\x03\x02\x02\x02\x85\x88\x05" +
		"\x12\n\x02\x86\x88\x05\x14\v\x02\x87\x85\x03\x02\x02\x02\x87\x86\x03\x02" +
		"\x02\x02\x88\x11\x03\x02\x02\x02\x89\x8D\x07G\x02\x02\x8A\x8C\x05\x10" +
		"\t\x02\x8B\x8A\x03\x02\x02\x02\x8C\x8F\x03\x02\x02\x02\x8D\x8B\x03\x02" +
		"\x02\x02\x8D\x8E\x03\x02\x02\x02\x8E\x90\x03\x02\x02\x02\x8F\x8D\x03\x02" +
		"\x02\x02\x90\x91\x07H\x02\x02\x91\x13\x03\x02\x02\x02\x92\x9A\x05*\x16" +
		"\x02\x93\x9A\x05(\x15\x02\x94\x9A\x05\x16\f\x02\x95\x9A\x05\x1E\x10\x02" +
		"\x96\x9A\x05&\x14\x02\x97\x9A\x05\x18\r\x02\x98\x9A\x07C\x02\x02\x99\x92" +
		"\x03\x02\x02\x02\x99\x93\x03\x02\x02\x02\x99\x94\x03\x02\x02\x02\x99\x95" +
		"\x03\x02\x02\x02\x99\x96\x03\x02\x02\x02\x99\x97\x03\x02\x02\x02\x99\x98" +
		"\x03\x02\x02\x02\x9A\x15\x03\x02\x02\x02\x9B\x9C\x07\v\x02\x02\x9C\x9D" +
		"\x07E\x02\x02\x9D\x9E\x05<\x1F\x02\x9E\x9F\x07F\x02\x02\x9F\xA2\x05\x10" +
		"\t\x02\xA0\xA1\x07\f\x02\x02\xA1\xA3\x05\x10\t\x02\xA2\xA0\x03\x02\x02" +
		"\x02\xA2\xA3\x03\x02\x02\x02\xA3\x17\x03\x02\x02\x02\xA4\xA5\x07\b\x02" +
		"\x02\xA5\xA6\x07E\x02\x02\xA6\xA7\x05<\x1F\x02\xA7\xA8\x07F\x02\x02\xA8" +
		"\xAC\x07G\x02\x02\xA9\xAB\x05\x1A\x0E\x02\xAA\xA9\x03\x02\x02\x02\xAB" +
		"\xAE\x03\x02\x02\x02\xAC\xAA\x03\x02\x02\x02\xAC\xAD\x03\x02\x02\x02\xAD" +
		"\xAF\x03\x02\x02\x02\xAE\xAC\x03\x02\x02\x02\xAF\xB0\x07H\x02\x02\xB0" +
		"\x19\x03\x02\x02\x02\xB1\xB5\x05\x1C\x0F\x02\xB2\xB4\x05\x10\t\x02\xB3" +
		"\xB2\x03\x02\x02\x02\xB4\xB7\x03\x02\x02\x02\xB5\xB3\x03\x02\x02\x02\xB5" +
		"\xB6\x03\x02\x02\x02\xB6\x1B\x03\x02\x02\x02\xB7\xB5\x03\x02\x02\x02\xB8" +
		"\xBC\x07\n\x02\x02\xB9\xBA\x07\t\x02\x02\xBA\xBC\x05<\x1F\x02\xBB\xB8" +
		"\x03\x02\x02\x02\xBB\xB9\x03\x02\x02\x02\xBC\xBD\x03\x02\x02\x02\xBD\xBE" +
		"\x07B\x02\x02\xBE\x1D\x03\x02\x02\x02\xBF\xC3\x05 \x11\x02\xC0\xC3\x05" +
		"\"\x12\x02\xC1\xC3\x05$\x13\x02\xC2\xBF\x03\x02\x02\x02\xC2\xC0\x03\x02" +
		"\x02\x02\xC2\xC1\x03\x02\x02\x02\xC3\x1F\x03\x02\x02\x02\xC4\xC5\x07\x06" +
		"\x02\x02\xC5\xC8\x07E\x02\x02\xC6\xC9\x050\x19\x02\xC7\xC9\x05> \x02\xC8" +
		"\xC6\x03\x02\x02\x02\xC8\xC7\x03\x02\x02\x02\xC8\xC9\x03\x02\x02\x02\xC9" +
		"\xCB\x03\x02\x02\x02\xCA\xCC\x07C\x02\x02\xCB\xCA\x03\x02\x02\x02\xCB" +
		"\xCC\x03\x02\x02\x02\xCC\xCE\x03\x02\x02\x02\xCD\xCF\x05<\x1F\x02\xCE" +
		"\xCD\x03\x02\x02\x02\xCE\xCF\x03\x02\x02\x02\xCF\xD1\x03\x02\x02\x02\xD0" +
		"\xD2\x07C\x02\x02\xD1\xD0\x03\x02\x02\x02\xD1\xD2\x03\x02\x02\x02\xD2" +
		"\xD4\x03\x02\x02\x02\xD3\xD5\x05> \x02\xD4\xD3\x03\x02\x02\x02\xD4\xD5" +
		"\x03\x02\x02\x02\xD5\xD6\x03\x02\x02\x02\xD6\xD7\x07F\x02\x02\xD7\xD8" +
		"\x05\x10\t\x02\xD8!\x03\x02\x02\x02\xD9\xDA\x07\x07\x02\x02\xDA\xDB\x07" +
		"E\x02\x02\xDB\xDC\x05<\x1F\x02\xDC\xDD\x07F\x02\x02\xDD\xDE\x05\x10\t" +
		"\x02\xDE#\x03\x02\x02\x02\xDF\xE0\x07\x05\x02\x02\xE0\xE1\x05\x10\t\x02" +
		"\xE1\xE2\x07\x07\x02\x02\xE2\xE3\x07E\x02\x02\xE3\xE4\x05<\x1F\x02\xE4" +
		"\xE5\x07F\x02\x02\xE5\xE6\x07C\x02\x02\xE6%\x03\x02\x02\x02\xE7\xEF\x07" +
		"\x04\x02\x02\xE8\xEF\x07\x03\x02\x02\xE9\xEF\x07\r\x02\x02\xEA\xEC\x07" +
		"\x0E\x02\x02\xEB\xED\x05<\x1F\x02\xEC\xEB\x03\x02\x02\x02\xEC\xED\x03" +
		"\x02\x02\x02\xED\xEF\x03\x02\x02\x02\xEE\xE7\x03\x02\x02\x02\xEE\xE8\x03" +
		"\x02\x02\x02\xEE\xE9\x03\x02\x02\x02\xEE\xEA\x03\x02\x02\x02\xEF\xF0\x03" +
		"\x02\x02\x02\xF0\xF1\x07C\x02\x02\xF1\'\x03\x02\x02\x02\xF2\xF4\x05> " +
		"\x02\xF3\xF5\x07C\x02\x02\xF4\xF3\x03\x02\x02\x02\xF4\xF5\x03\x02\x02" +
		"\x02\xF5)\x03\x02\x02\x02\xF6\xF7\x05,\x17\x02\xF7\xF8\x07C\x02\x02\xF8" +
		"\u0106\x03\x02\x02\x02\xF9\xFA\x05.\x18\x02\xFA\xFB\x07C\x02\x02\xFB\u0106" +
		"\x03\x02\x02\x02\xFC\xFD\x054\x1B\x02\xFD\xFE\x07C\x02\x02\xFE\u0106\x03" +
		"\x02\x02\x02\xFF\u0100\x050\x19\x02\u0100\u0101\x07C\x02\x02\u0101\u0106" +
		"\x03\x02\x02\x02\u0102\u0103\x056\x1C\x02\u0103\u0104\x07C\x02\x02\u0104" +
		"\u0106\x03\x02\x02\x02\u0105\xF6\x03\x02\x02\x02\u0105\xF9\x03\x02\x02" +
		"\x02\u0105\xFC\x03\x02\x02\x02\u0105\xFF\x03\x02\x02\x02\u0105\u0102\x03" +
		"\x02\x02\x02\u0106+\x03\x02\x02\x02\u0107\u010B\x07\x11\x02\x02\u0108" +
		"\u010A\x05F$\x02\u0109\u0108\x03\x02\x02\x02\u010A\u010D\x03\x02\x02\x02" +
		"\u010B\u0109\x03\x02\x02\x02\u010B\u010C\x03\x02\x02\x02\u010C\u010E\x03" +
		"\x02\x02\x02\u010D\u010B\x03\x02\x02\x02\u010E\u010F\x05@!\x02\u010F-" +
		"\x03\x02\x02\x02\u0110\u0111\x07\x13\x02\x02\u0111\u0112\x07?\x02\x02" +
		"\u0112/\x03\x02\x02\x02\u0113\u011C\x05B\"\x02\u0114\u0119\x05:\x1E\x02" +
		"\u0115\u0116\x07A\x02\x02\u0116\u0118\x05:\x1E\x02\u0117\u0115\x03\x02" +
		"\x02\x02\u0118\u011B\x03\x02\x02\x02\u0119\u0117\x03\x02\x02\x02\u0119" +
		"\u011A\x03\x02\x02\x02\u011A\u011D\x03\x02\x02\x02\u011B\u0119\x03\x02" +
		"\x02\x02\u011C\u0114\x03\x02\x02\x02\u011C\u011D\x03\x02\x02\x02\u011D" +
		"1\x03\x02\x02\x02\u011E\u0120\x05B\"\x02\u011F\u0121\x05:\x1E\x02\u0120" +
		"\u011F\x03\x02\x02\x02\u0120\u0121\x03\x02\x02\x02\u01213\x03\x02\x02" +
		"\x02\u0122\u0124\x07\x0F\x02\x02\u0123\u0125\x07?\x02\x02\u0124\u0123" +
		"\x03\x02\x02\x02\u0124\u0125\x03\x02\x02\x02\u0125\u0126\x03\x02\x02\x02" +
		"\u0126\u012C\x07G\x02\x02\u0127\u0128\x050\x19\x02\u0128\u0129\x07C\x02" +
		"\x02\u0129\u012B\x03\x02\x02\x02\u012A\u0127\x03\x02\x02\x02\u012B\u012E" +
		"\x03\x02\x02\x02\u012C\u012A\x03\x02\x02\x02\u012C\u012D\x03\x02\x02\x02" +
		"\u012D\u012F\x03\x02\x02\x02\u012E\u012C\x03\x02\x02\x02\u012F\u0130\x07" +
		"H\x02\x02\u01305\x03\x02\x02\x02\u0131\u0133\x05F$\x02\u0132\u0131\x03" +
		"\x02\x02\x02\u0133\u0136\x03\x02\x02\x02\u0134\u0132\x03\x02\x02\x02\u0134" +
		"\u0135\x03\x02\x02\x02\u0135\u0138\x03\x02\x02\x02\u0136\u0134\x03\x02" +
		"\x02\x02\u0137\u0139\x07?\x02\x02\u0138\u0137\x03\x02\x02\x02\u0138\u0139" +
		"\x03\x02\x02\x02\u0139\u013A\x03\x02\x02\x02\u013A\u0140\x07G\x02\x02" +
		"\u013B\u013C\x050\x19\x02\u013C\u013D\x07C\x02\x02\u013D\u013F\x03\x02" +
		"\x02\x02\u013E\u013B\x03\x02\x02\x02\u013F\u0142\x03\x02\x02\x02\u0140" +
		"\u013E\x03\x02\x02\x02\u0140\u0141\x03\x02\x02\x02\u0141\u0143\x03\x02" +
		"\x02\x02\u0142\u0140\x03\x02\x02\x02\u0143\u0145\x07H\x02\x02\u0144\u0146" +
		"\x058\x1D\x02\u0145\u0144\x03\x02\x02\x02\u0145\u0146\x03\x02\x02\x02" +
		"\u01467\x03\x02\x02\x02\u0147\u014B\x07?\x02\x02\u0148\u014A\x05D#\x02" +
		"\u0149\u0148\x03\x02\x02\x02\u014A\u014D\x03\x02\x02\x02\u014B\u0149\x03" +
		"\x02\x02\x02\u014B\u014C\x03\x02\x02\x02\u014C9\x03\x02\x02\x02\u014D" +
		"\u014B\x03\x02\x02\x02\u014E\u0151\x058\x1D\x02\u014F\u0150\x078\x02\x02" +
		"\u0150\u0152\x05<\x1F\x02\u0151\u014F\x03\x02\x02\x02\u0151\u0152\x03" +
		"\x02\x02\x02\u0152;\x03\x02\x02\x02\u0153\u0154\b\x1F\x01\x02\u0154\u015E" +
		"\x05N(\x02\u0155\u015E\x05\f\x07\x02\u0156\u015E\x07?\x02\x02\u0157\u0158" +
		"\x07E\x02\x02\u0158\u0159\x05<\x1F\x02\u0159\u015A\x07F\x02\x02\u015A" +
		"\u015E\x03\x02\x02\x02\u015B\u015C\t\x03\x02\x02\u015C\u015E\x05<\x1F" +
		"\x10\u015D\u0153\x03\x02\x02\x02\u015D\u0155\x03\x02\x02\x02\u015D\u0156" +
		"\x03\x02\x02\x02\u015D\u0157\x03\x02\x02\x02\u015D\u015B\x03\x02\x02\x02" +
		"\u015E\u0196\x03\x02\x02\x02\u015F\u0160\f\x0F\x02\x02\u0160\u0161\t\x04" +
		"\x02\x02\u0161\u0195\x05<\x1F\x10\u0162\u0163\f\x0E\x02\x02\u0163\u0164" +
		"\t\x05\x02\x02\u0164\u0195\x05<\x1F\x0F\u0165\u0166\f\r\x02\x02\u0166" +
		"\u0167\x07,\x02\x02\u0167\u0195\x05<\x1F\x0E\u0168\u0169\f\f\x02\x02\u0169" +
		"\u016A\x07-\x02\x02\u016A\u0195\x05<\x1F\r\u016B\u016C\f\v\x02\x02\u016C" +
		"\u016D\x07.\x02\x02\u016D\u0195\x05<\x1F\f\u016E\u016F\f\n\x02\x02\u016F" +
		"\u0170\x07/\x02\x02\u0170\u0195\x05<\x1F\v\u0171\u0172\f\t\x02\x02\u0172" +
		"\u0173\x070\x02\x02\u0173\u0195\x05<\x1F\n\u0174\u0175\f\b\x02\x02\u0175" +
		"\u0176\x071\x02\x02\u0176\u0195\x05<\x1F\t\u0177\u0178\f\x07\x02\x02\u0178" +
		"\u0179\x073\x02\x02\u0179\u0195\x05<\x1F\b\u017A\u017B\f\x06\x02\x02\u017B" +
		"\u017C\x075\x02\x02\u017C\u0195\x05<\x1F\x07\u017D\u017E\f\x05\x02\x02" +
		"\u017E\u017F\x074\x02\x02\u017F\u0195\x05<\x1F\x06\u0180\u0181\f\x03\x02" +
		"\x02\u0181\u0182\t\x06\x02\x02\u0182\u0195\x05<\x1F\x04\u0183\u018C\f" +
		"\x11\x02\x02\u0184\u018D\x05D#\x02\u0185\u0186\x07@\x02\x02\u0186\u018D" +
		"\x05\f\x07\x02\u0187\u0188\x07@\x02\x02\u0188\u018D\x07?\x02\x02\u0189" +
		"\u018D\x07@\x02\x02\u018A\u018D\x07*\x02\x02\u018B\u018D\x07+\x02\x02" +
		"\u018C\u0184\x03\x02\x02\x02\u018C\u0185\x03\x02\x02\x02\u018C\u0187\x03" +
		"\x02\x02\x02\u018C\u0189\x03\x02\x02\x02\u018C\u018A\x03\x02\x02\x02\u018C" +
		"\u018B\x03\x02\x02\x02\u018D\u0195\x03\x02\x02\x02\u018E\u018F\f\x04\x02" +
		"\x02\u018F\u0190\x07D\x02\x02\u0190\u0191\x05> \x02\u0191\u0192\x07B\x02" +
		"\x02\u0192\u0193\x05> \x02\u0193\u0195\x03\x02\x02\x02\u0194\u015F\x03" +
		"\x02\x02\x02\u0194\u0162\x03\x02\x02\x02\u0194\u0165\x03\x02\x02\x02\u0194" +
		"\u0168\x03\x02\x02\x02\u0194\u016B\x03\x02\x02\x02\u0194\u016E\x03\x02" +
		"\x02\x02\u0194\u0171\x03\x02\x02\x02\u0194\u0174\x03\x02\x02\x02\u0194" +
		"\u0177\x03\x02\x02\x02\u0194\u017A\x03\x02\x02\x02\u0194\u017D\x03\x02" +
		"\x02\x02\u0194\u0180\x03\x02\x02\x02\u0194\u0183\x03\x02\x02\x02\u0194" +
		"\u018E\x03\x02\x02\x02\u0195\u0198\x03\x02\x02\x02\u0196\u0194\x03\x02" +
		"\x02\x02\u0196\u0197\x03\x02\x02\x02\u0197=\x03\x02\x02\x02\u0198\u0196" +
		"\x03\x02\x02\x02\u0199\u019E\x05<\x1F\x02\u019A\u019B\x07A\x02\x02\u019B" +
		"\u019D\x05<\x1F\x02\u019C\u019A\x03\x02\x02\x02\u019D\u01A0\x03\x02\x02" +
		"\x02\u019E\u019C\x03\x02\x02\x02\u019E\u019F\x03\x02\x02\x02\u019F\u01A2" +
		"\x03\x02\x02\x02\u01A0\u019E\x03\x02\x02\x02\u01A1\u01A3\x07A\x02\x02" +
		"\u01A2\u01A1\x03\x02\x02\x02\u01A2\u01A3\x03\x02\x02\x02\u01A3?\x03\x02" +
		"\x02\x02\u01A4\u01A5\t\x07\x02\x02\u01A5A\x03\x02\x02\x02\u01A6\u01A8" +
		"\x05F$\x02\u01A7\u01A6\x03\x02\x02\x02\u01A8\u01AB\x03\x02\x02\x02\u01A9" +
		"\u01A7\x03\x02\x02\x02\u01A9\u01AA\x03\x02\x02\x02\u01AA\u01AE\x03\x02" +
		"\x02\x02\u01AB\u01A9\x03\x02\x02\x02\u01AC\u01AF\x05@!\x02\u01AD\u01AF" +
		"\x054\x1B\x02\u01AE\u01AC\x03\x02\x02\x02\u01AE\u01AD\x03\x02\x02\x02" +
		"\u01AF\u01B3\x03\x02\x02\x02\u01B0\u01B2\x05D#\x02\u01B1\u01B0\x03\x02" +
		"\x02\x02\u01B2\u01B5\x03\x02\x02\x02\u01B3\u01B1\x03\x02\x02\x02\u01B3" +
		"\u01B4\x03\x02\x02\x02\u01B4C\x03\x02\x02\x02\u01B5\u01B3\x03\x02\x02" +
		"\x02\u01B6\u01B8\x07I\x02\x02\u01B7\u01B9\x05<\x1F\x02\u01B8\u01B7\x03" +
		"\x02\x02\x02\u01B8\u01B9\x03\x02\x02\x02\u01B9\u01BA\x03\x02\x02\x02\u01BA" +
		"\u01BB\x07J\x02\x02\u01BBE\x03\x02\x02\x02\u01BC\u01CD\x05H%\x02\u01BD" +
		"\u01CD\x07\x11\x02\x02\u01BE\u01CD\x07\x13\x02\x02\u01BF\u01CD\x07\x14" +
		"\x02\x02\u01C0\u01CD\x07\x15\x02\x02\u01C1\u01CD\x07\x16\x02\x02\u01C2" +
		"\u01CD\x07\x17\x02\x02\u01C3\u01CD\x07\x18\x02\x02\u01C4\u01CD\x07\x19" +
		"\x02\x02\u01C5\u01CD\x07\x1A\x02\x02\u01C6\u01CD\x07\x1B\x02\x02\u01C7" +
		"\u01CD\x07\x1C\x02\x02\u01C8\u01CD\x07\x1D\x02\x02\u01C9\u01CD\x07\x1E" +
		"\x02\x02\u01CA\u01CD\x07\x1F\x02\x02\u01CB\u01CD\x07 \x02\x02\u01CC\u01BC" +
		"\x03\x02\x02\x02\u01CC\u01BD\x03\x02\x02\x02\u01CC\u01BE\x03\x02\x02\x02" +
		"\u01CC\u01BF\x03\x02\x02\x02\u01CC\u01C0\x03\x02\x02\x02\u01CC\u01C1\x03" +
		"\x02\x02\x02\u01CC\u01C2\x03\x02\x02\x02\u01CC\u01C3\x03\x02\x02\x02\u01CC" +
		"\u01C4\x03\x02\x02\x02\u01CC\u01C5\x03\x02\x02\x02\u01CC\u01C6\x03\x02" +
		"\x02\x02\u01CC\u01C7\x03\x02\x02\x02\u01CC\u01C8\x03\x02\x02\x02\u01CC" +
		"\u01C9\x03\x02\x02\x02\u01CC\u01CA\x03\x02\x02\x02\u01CC\u01CB\x03\x02" +
		"\x02\x02\u01CDG\x03\x02\x02\x02\u01CE\u01CF\x07\x12\x02\x02\u01CF\u01D0" +
		"\x07E\x02\x02\u01D0\u01D1\x05J&\x02\u01D1\u01D2\x07F\x02\x02\u01D2I\x03" +
		"\x02\x02\x02\u01D3\u01D8\x05L\'\x02\u01D4\u01D5\x07A\x02\x02\u01D5\u01D7" +
		"\x05L\'\x02\u01D6\u01D4\x03\x02\x02\x02\u01D7\u01DA\x03\x02\x02\x02\u01D8" +
		"\u01D6\x03\x02\x02\x02\u01D8\u01D9\x03\x02\x02\x02\u01D9K\x03\x02\x02" +
		"\x02\u01DA\u01D8\x03\x02\x02\x02\u01DB\u01E1\x07?\x02\x02\u01DC\u01DF" +
		"\x078\x02\x02\u01DD\u01E0\x07?\x02\x02\u01DE\u01E0\x05N(\x02\u01DF\u01DD" +
		"\x03\x02\x02\x02\u01DF\u01DE\x03\x02\x02\x02\u01E0\u01E2\x03\x02\x02\x02" +
		"\u01E1\u01DC\x03\x02\x02\x02\u01E1\u01E2\x03\x02\x02\x02\u01E2M\x03\x02" +
		"\x02\x02\u01E3\u01E6\x07\"\x02\x02\u01E4\u01E6\x05P)\x02\u01E5\u01E3\x03" +
		"\x02\x02\x02\u01E5\u01E4\x03\x02\x02\x02\u01E6O\x03\x02\x02\x02\u01E7" +
		"\u01E8\t\b\x02\x02\u01E8Q\x03\x02\x02\x026VXeorx}\x83\x87\x8D\x99\xA2" +
		"\xAC\xB5\xBB\xC2\xC8\xCB\xCE\xD1\xD4\xEC\xEE\xF4\u0105\u010B\u0119\u011C" +
		"\u0120\u0124\u012C\u0134\u0138\u0140\u0145\u014B\u0151\u015D\u018C\u0194" +
		"\u0196\u019E\u01A2\u01A9\u01AE\u01B3\u01B8\u01CC\u01D8\u01DF\u01E1\u01E5";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!AntlrGlslParser.__ATN) {
			AntlrGlslParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(AntlrGlslParser._serializedATN));
		}

		return AntlrGlslParser.__ATN;
	}

}

export class StartContext extends ParserRuleContext {
	public function_prototype(): Function_prototypeContext[];
	public function_prototype(i: number): Function_prototypeContext;
	public function_prototype(i?: number): Function_prototypeContext | Function_prototypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Function_prototypeContext);
		} else {
			return this.getRuleContext(i, Function_prototypeContext);
		}
	}
	public function_definition(): Function_definitionContext[];
	public function_definition(i: number): Function_definitionContext;
	public function_definition(i?: number): Function_definitionContext | Function_definitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Function_definitionContext);
		} else {
			return this.getRuleContext(i, Function_definitionContext);
		}
	}
	public declaration_statement(): Declaration_statementContext[];
	public declaration_statement(i: number): Declaration_statementContext;
	public declaration_statement(i?: number): Declaration_statementContext | Declaration_statementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Declaration_statementContext);
		} else {
			return this.getRuleContext(i, Declaration_statementContext);
		}
	}
	public SEMICOLON(): TerminalNode[];
	public SEMICOLON(i: number): TerminalNode;
	public SEMICOLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(AntlrGlslParser.SEMICOLON);
		} else {
			return this.getToken(AntlrGlslParser.SEMICOLON, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_start; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitStart) {
			return visitor.visitStart(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_prototypeContext extends ParserRuleContext {
	public function_header(): Function_headerContext {
		return this.getRuleContext(0, Function_headerContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(AntlrGlslParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_function_prototype; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitFunction_prototype) {
			return visitor.visitFunction_prototype(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_definitionContext extends ParserRuleContext {
	public function_header(): Function_headerContext {
		return this.getRuleContext(0, Function_headerContext);
	}
	public compound_statement(): Compound_statementContext {
		return this.getRuleContext(0, Compound_statementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_function_definition; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitFunction_definition) {
			return visitor.visitFunction_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_headerContext extends ParserRuleContext {
	public type_usage(): Type_usageContext {
		return this.getRuleContext(0, Type_usageContext);
	}
	public IDENTIFIER(): TerminalNode { return this.getToken(AntlrGlslParser.IDENTIFIER, 0); }
	public LRB(): TerminalNode { return this.getToken(AntlrGlslParser.LRB, 0); }
	public RRB(): TerminalNode { return this.getToken(AntlrGlslParser.RRB, 0); }
	public function_parameter_list(): Function_parameter_listContext | undefined {
		return this.tryGetRuleContext(0, Function_parameter_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_function_header; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitFunction_header) {
			return visitor.visitFunction_header(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_parameter_listContext extends ParserRuleContext {
	public KW_VOID(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.KW_VOID, 0); }
	public single_variable_declaration(): Single_variable_declarationContext[];
	public single_variable_declaration(i: number): Single_variable_declarationContext;
	public single_variable_declaration(i?: number): Single_variable_declarationContext | Single_variable_declarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Single_variable_declarationContext);
		} else {
			return this.getRuleContext(i, Single_variable_declarationContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(AntlrGlslParser.COMMA);
		} else {
			return this.getToken(AntlrGlslParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_function_parameter_list; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitFunction_parameter_list) {
			return visitor.visitFunction_parameter_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_callContext extends ParserRuleContext {
	public LRB(): TerminalNode { return this.getToken(AntlrGlslParser.LRB, 0); }
	public RRB(): TerminalNode { return this.getToken(AntlrGlslParser.RRB, 0); }
	public TYPE(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.TYPE, 0); }
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.IDENTIFIER, 0); }
	public array_subscript(): Array_subscriptContext[];
	public array_subscript(i: number): Array_subscriptContext;
	public array_subscript(i?: number): Array_subscriptContext | Array_subscriptContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Array_subscriptContext);
		} else {
			return this.getRuleContext(i, Array_subscriptContext);
		}
	}
	public function_call_parameter_list(): Function_call_parameter_listContext | undefined {
		return this.tryGetRuleContext(0, Function_call_parameter_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_function_call; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitFunction_call) {
			return visitor.visitFunction_call(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_call_parameter_listContext extends ParserRuleContext {
	public KW_VOID(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.KW_VOID, 0); }
	public expression_list(): Expression_listContext | undefined {
		return this.tryGetRuleContext(0, Expression_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_function_call_parameter_list; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitFunction_call_parameter_list) {
			return visitor.visitFunction_call_parameter_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	public compound_statement(): Compound_statementContext | undefined {
		return this.tryGetRuleContext(0, Compound_statementContext);
	}
	public simple_statement(): Simple_statementContext | undefined {
		return this.tryGetRuleContext(0, Simple_statementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_statement; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Compound_statementContext extends ParserRuleContext {
	public LCB(): TerminalNode { return this.getToken(AntlrGlslParser.LCB, 0); }
	public RCB(): TerminalNode { return this.getToken(AntlrGlslParser.RCB, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_compound_statement; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitCompound_statement) {
			return visitor.visitCompound_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Simple_statementContext extends ParserRuleContext {
	public declaration_statement(): Declaration_statementContext | undefined {
		return this.tryGetRuleContext(0, Declaration_statementContext);
	}
	public expression_statement(): Expression_statementContext | undefined {
		return this.tryGetRuleContext(0, Expression_statementContext);
	}
	public selection_statement(): Selection_statementContext | undefined {
		return this.tryGetRuleContext(0, Selection_statementContext);
	}
	public iteration_statement(): Iteration_statementContext | undefined {
		return this.tryGetRuleContext(0, Iteration_statementContext);
	}
	public jump_statement(): Jump_statementContext | undefined {
		return this.tryGetRuleContext(0, Jump_statementContext);
	}
	public switch_statement(): Switch_statementContext | undefined {
		return this.tryGetRuleContext(0, Switch_statementContext);
	}
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_simple_statement; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitSimple_statement) {
			return visitor.visitSimple_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Selection_statementContext extends ParserRuleContext {
	public KW_IF(): TerminalNode { return this.getToken(AntlrGlslParser.KW_IF, 0); }
	public LRB(): TerminalNode { return this.getToken(AntlrGlslParser.LRB, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RRB(): TerminalNode { return this.getToken(AntlrGlslParser.RRB, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	public KW_ELSE(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.KW_ELSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_selection_statement; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitSelection_statement) {
			return visitor.visitSelection_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Switch_statementContext extends ParserRuleContext {
	public KW_SWITCH(): TerminalNode { return this.getToken(AntlrGlslParser.KW_SWITCH, 0); }
	public LRB(): TerminalNode { return this.getToken(AntlrGlslParser.LRB, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RRB(): TerminalNode { return this.getToken(AntlrGlslParser.RRB, 0); }
	public LCB(): TerminalNode { return this.getToken(AntlrGlslParser.LCB, 0); }
	public RCB(): TerminalNode { return this.getToken(AntlrGlslParser.RCB, 0); }
	public case_group(): Case_groupContext[];
	public case_group(i: number): Case_groupContext;
	public case_group(i?: number): Case_groupContext | Case_groupContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Case_groupContext);
		} else {
			return this.getRuleContext(i, Case_groupContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_switch_statement; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitSwitch_statement) {
			return visitor.visitSwitch_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Case_groupContext extends ParserRuleContext {
	public case_label(): Case_labelContext {
		return this.getRuleContext(0, Case_labelContext);
	}
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_case_group; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitCase_group) {
			return visitor.visitCase_group(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Case_labelContext extends ParserRuleContext {
	public COLON(): TerminalNode { return this.getToken(AntlrGlslParser.COLON, 0); }
	public KW_DEFAULT(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.KW_DEFAULT, 0); }
	public KW_CASE(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.KW_CASE, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_case_label; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitCase_label) {
			return visitor.visitCase_label(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Iteration_statementContext extends ParserRuleContext {
	public for_iteration(): For_iterationContext | undefined {
		return this.tryGetRuleContext(0, For_iterationContext);
	}
	public while_iteration(): While_iterationContext | undefined {
		return this.tryGetRuleContext(0, While_iterationContext);
	}
	public do_while_iteration(): Do_while_iterationContext | undefined {
		return this.tryGetRuleContext(0, Do_while_iterationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_iteration_statement; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitIteration_statement) {
			return visitor.visitIteration_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class For_iterationContext extends ParserRuleContext {
	public KW_FOR(): TerminalNode { return this.getToken(AntlrGlslParser.KW_FOR, 0); }
	public LRB(): TerminalNode { return this.getToken(AntlrGlslParser.LRB, 0); }
	public RRB(): TerminalNode { return this.getToken(AntlrGlslParser.RRB, 0); }
	public statement(): StatementContext {
		return this.getRuleContext(0, StatementContext);
	}
	public variable_declaration(): Variable_declarationContext | undefined {
		return this.tryGetRuleContext(0, Variable_declarationContext);
	}
	public expression_list(): Expression_listContext[];
	public expression_list(i: number): Expression_listContext;
	public expression_list(i?: number): Expression_listContext | Expression_listContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Expression_listContext);
		} else {
			return this.getRuleContext(i, Expression_listContext);
		}
	}
	public SEMICOLON(): TerminalNode[];
	public SEMICOLON(i: number): TerminalNode;
	public SEMICOLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(AntlrGlslParser.SEMICOLON);
		} else {
			return this.getToken(AntlrGlslParser.SEMICOLON, i);
		}
	}
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_for_iteration; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitFor_iteration) {
			return visitor.visitFor_iteration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class While_iterationContext extends ParserRuleContext {
	public KW_WHILE(): TerminalNode { return this.getToken(AntlrGlslParser.KW_WHILE, 0); }
	public LRB(): TerminalNode { return this.getToken(AntlrGlslParser.LRB, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RRB(): TerminalNode { return this.getToken(AntlrGlslParser.RRB, 0); }
	public statement(): StatementContext {
		return this.getRuleContext(0, StatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_while_iteration; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitWhile_iteration) {
			return visitor.visitWhile_iteration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Do_while_iterationContext extends ParserRuleContext {
	public KW_DO(): TerminalNode { return this.getToken(AntlrGlslParser.KW_DO, 0); }
	public statement(): StatementContext {
		return this.getRuleContext(0, StatementContext);
	}
	public KW_WHILE(): TerminalNode { return this.getToken(AntlrGlslParser.KW_WHILE, 0); }
	public LRB(): TerminalNode { return this.getToken(AntlrGlslParser.LRB, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RRB(): TerminalNode { return this.getToken(AntlrGlslParser.RRB, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(AntlrGlslParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_do_while_iteration; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitDo_while_iteration) {
			return visitor.visitDo_while_iteration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Jump_statementContext extends ParserRuleContext {
	public SEMICOLON(): TerminalNode { return this.getToken(AntlrGlslParser.SEMICOLON, 0); }
	public KW_CONTINUE(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.KW_CONTINUE, 0); }
	public KW_BREAK(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.KW_BREAK, 0); }
	public KW_DISCARD(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.KW_DISCARD, 0); }
	public KW_RETURN(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.KW_RETURN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_jump_statement; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitJump_statement) {
			return visitor.visitJump_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expression_statementContext extends ParserRuleContext {
	public expression_list(): Expression_listContext {
		return this.getRuleContext(0, Expression_listContext);
	}
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_expression_statement; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitExpression_statement) {
			return visitor.visitExpression_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Declaration_statementContext extends ParserRuleContext {
	public precision_declaration(): Precision_declarationContext | undefined {
		return this.tryGetRuleContext(0, Precision_declarationContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(AntlrGlslParser.SEMICOLON, 0); }
	public invariant_declaration(): Invariant_declarationContext | undefined {
		return this.tryGetRuleContext(0, Invariant_declarationContext);
	}
	public type_declaration(): Type_declarationContext | undefined {
		return this.tryGetRuleContext(0, Type_declarationContext);
	}
	public variable_declaration(): Variable_declarationContext | undefined {
		return this.tryGetRuleContext(0, Variable_declarationContext);
	}
	public interface_block_declaration(): Interface_block_declarationContext | undefined {
		return this.tryGetRuleContext(0, Interface_block_declarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_declaration_statement; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitDeclaration_statement) {
			return visitor.visitDeclaration_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Precision_declarationContext extends ParserRuleContext {
	public Q_PRECISION(): TerminalNode { return this.getToken(AntlrGlslParser.Q_PRECISION, 0); }
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	public qualifier(): QualifierContext[];
	public qualifier(i: number): QualifierContext;
	public qualifier(i?: number): QualifierContext | QualifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(QualifierContext);
		} else {
			return this.getRuleContext(i, QualifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_precision_declaration; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitPrecision_declaration) {
			return visitor.visitPrecision_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Invariant_declarationContext extends ParserRuleContext {
	public Q_INVARIANT(): TerminalNode { return this.getToken(AntlrGlslParser.Q_INVARIANT, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(AntlrGlslParser.IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_invariant_declaration; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitInvariant_declaration) {
			return visitor.visitInvariant_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Variable_declarationContext extends ParserRuleContext {
	public type_usage(): Type_usageContext {
		return this.getRuleContext(0, Type_usageContext);
	}
	public identifier_optarray_optassignment(): Identifier_optarray_optassignmentContext[];
	public identifier_optarray_optassignment(i: number): Identifier_optarray_optassignmentContext;
	public identifier_optarray_optassignment(i?: number): Identifier_optarray_optassignmentContext | Identifier_optarray_optassignmentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Identifier_optarray_optassignmentContext);
		} else {
			return this.getRuleContext(i, Identifier_optarray_optassignmentContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(AntlrGlslParser.COMMA);
		} else {
			return this.getToken(AntlrGlslParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_variable_declaration; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitVariable_declaration) {
			return visitor.visitVariable_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Single_variable_declarationContext extends ParserRuleContext {
	public type_usage(): Type_usageContext {
		return this.getRuleContext(0, Type_usageContext);
	}
	public identifier_optarray_optassignment(): Identifier_optarray_optassignmentContext | undefined {
		return this.tryGetRuleContext(0, Identifier_optarray_optassignmentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_single_variable_declaration; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitSingle_variable_declaration) {
			return visitor.visitSingle_variable_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_declarationContext extends ParserRuleContext {
	public KW_STRUCT(): TerminalNode { return this.getToken(AntlrGlslParser.KW_STRUCT, 0); }
	public LCB(): TerminalNode { return this.getToken(AntlrGlslParser.LCB, 0); }
	public RCB(): TerminalNode { return this.getToken(AntlrGlslParser.RCB, 0); }
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.IDENTIFIER, 0); }
	public variable_declaration(): Variable_declarationContext[];
	public variable_declaration(i: number): Variable_declarationContext;
	public variable_declaration(i?: number): Variable_declarationContext | Variable_declarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Variable_declarationContext);
		} else {
			return this.getRuleContext(i, Variable_declarationContext);
		}
	}
	public SEMICOLON(): TerminalNode[];
	public SEMICOLON(i: number): TerminalNode;
	public SEMICOLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(AntlrGlslParser.SEMICOLON);
		} else {
			return this.getToken(AntlrGlslParser.SEMICOLON, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_type_declaration; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitType_declaration) {
			return visitor.visitType_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_block_declarationContext extends ParserRuleContext {
	public LCB(): TerminalNode { return this.getToken(AntlrGlslParser.LCB, 0); }
	public RCB(): TerminalNode { return this.getToken(AntlrGlslParser.RCB, 0); }
	public qualifier(): QualifierContext[];
	public qualifier(i: number): QualifierContext;
	public qualifier(i?: number): QualifierContext | QualifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(QualifierContext);
		} else {
			return this.getRuleContext(i, QualifierContext);
		}
	}
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.IDENTIFIER, 0); }
	public variable_declaration(): Variable_declarationContext[];
	public variable_declaration(i: number): Variable_declarationContext;
	public variable_declaration(i?: number): Variable_declarationContext | Variable_declarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Variable_declarationContext);
		} else {
			return this.getRuleContext(i, Variable_declarationContext);
		}
	}
	public SEMICOLON(): TerminalNode[];
	public SEMICOLON(i: number): TerminalNode;
	public SEMICOLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(AntlrGlslParser.SEMICOLON);
		} else {
			return this.getToken(AntlrGlslParser.SEMICOLON, i);
		}
	}
	public identifier_optarray(): Identifier_optarrayContext | undefined {
		return this.tryGetRuleContext(0, Identifier_optarrayContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_interface_block_declaration; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitInterface_block_declaration) {
			return visitor.visitInterface_block_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Identifier_optarrayContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(AntlrGlslParser.IDENTIFIER, 0); }
	public array_subscript(): Array_subscriptContext[];
	public array_subscript(i: number): Array_subscriptContext;
	public array_subscript(i?: number): Array_subscriptContext | Array_subscriptContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Array_subscriptContext);
		} else {
			return this.getRuleContext(i, Array_subscriptContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_identifier_optarray; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitIdentifier_optarray) {
			return visitor.visitIdentifier_optarray(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Identifier_optarray_optassignmentContext extends ParserRuleContext {
	public identifier_optarray(): Identifier_optarrayContext {
		return this.getRuleContext(0, Identifier_optarrayContext);
	}
	public OP_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_ASSIGN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_identifier_optarray_optassignment; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitIdentifier_optarray_optassignment) {
			return visitor.visitIdentifier_optarray_optassignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	public function_call(): Function_callContext | undefined {
		return this.tryGetRuleContext(0, Function_callContext);
	}
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.IDENTIFIER, 0); }
	public LRB(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.LRB, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public RRB(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.RRB, 0); }
	public array_subscript(): Array_subscriptContext | undefined {
		return this.tryGetRuleContext(0, Array_subscriptContext);
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.DOT, 0); }
	public OP_INC(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_INC, 0); }
	public OP_DEC(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_DEC, 0); }
	public OP_ADD(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_ADD, 0); }
	public OP_SUB(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_SUB, 0); }
	public OP_LOGICAL_UNARY(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_LOGICAL_UNARY, 0); }
	public OP_BIT_UNARY(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_BIT_UNARY, 0); }
	public OP_MUL(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_MUL, 0); }
	public OP_DIV(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_DIV, 0); }
	public OP_MOD(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_MOD, 0); }
	public OP_SHIFT(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_SHIFT, 0); }
	public OP_RELATIONAL(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_RELATIONAL, 0); }
	public OP_EQUALITY(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_EQUALITY, 0); }
	public OP_BIT_AND(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_BIT_AND, 0); }
	public OP_BIT_XOR(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_BIT_XOR, 0); }
	public OP_BIT_OR(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_BIT_OR, 0); }
	public OP_LOGICAL_AND(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_LOGICAL_AND, 0); }
	public OP_LOGICAL_XOR(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_LOGICAL_XOR, 0); }
	public OP_LOGICAL_OR(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_LOGICAL_OR, 0); }
	public QUESTION(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.QUESTION, 0); }
	public expression_list(): Expression_listContext[];
	public expression_list(i: number): Expression_listContext;
	public expression_list(i?: number): Expression_listContext | Expression_listContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Expression_listContext);
		} else {
			return this.getRuleContext(i, Expression_listContext);
		}
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.COLON, 0); }
	public OP_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_ASSIGN, 0); }
	public OP_MODIFY(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_MODIFY, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_expression; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expression_listContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(AntlrGlslParser.COMMA);
		} else {
			return this.getToken(AntlrGlslParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_expression_list; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitExpression_list) {
			return visitor.visitExpression_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeContext extends ParserRuleContext {
	public KW_VOID(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.KW_VOID, 0); }
	public TYPE(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.TYPE, 0); }
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_type; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitType) {
			return visitor.visitType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_usageContext extends ParserRuleContext {
	public type(): TypeContext | undefined {
		return this.tryGetRuleContext(0, TypeContext);
	}
	public type_declaration(): Type_declarationContext | undefined {
		return this.tryGetRuleContext(0, Type_declarationContext);
	}
	public qualifier(): QualifierContext[];
	public qualifier(i: number): QualifierContext;
	public qualifier(i?: number): QualifierContext | QualifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(QualifierContext);
		} else {
			return this.getRuleContext(i, QualifierContext);
		}
	}
	public array_subscript(): Array_subscriptContext[];
	public array_subscript(i: number): Array_subscriptContext;
	public array_subscript(i?: number): Array_subscriptContext | Array_subscriptContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Array_subscriptContext);
		} else {
			return this.getRuleContext(i, Array_subscriptContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_type_usage; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitType_usage) {
			return visitor.visitType_usage(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Array_subscriptContext extends ParserRuleContext {
	public LSB(): TerminalNode { return this.getToken(AntlrGlslParser.LSB, 0); }
	public RSB(): TerminalNode { return this.getToken(AntlrGlslParser.RSB, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_array_subscript; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitArray_subscript) {
			return visitor.visitArray_subscript(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifierContext extends ParserRuleContext {
	public layout_qualifier(): Layout_qualifierContext | undefined {
		return this.tryGetRuleContext(0, Layout_qualifierContext);
	}
	public Q_PRECISION(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.Q_PRECISION, 0); }
	public Q_INVARIANT(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.Q_INVARIANT, 0); }
	public Q_SMOOTH(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.Q_SMOOTH, 0); }
	public Q_FLAT(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.Q_FLAT, 0); }
	public Q_CONST(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.Q_CONST, 0); }
	public Q_INOUT(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.Q_INOUT, 0); }
	public Q_IN(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.Q_IN, 0); }
	public Q_OUT(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.Q_OUT, 0); }
	public Q_CENTROID(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.Q_CENTROID, 0); }
	public Q_UNIFORM(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.Q_UNIFORM, 0); }
	public Q_VARYING(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.Q_VARYING, 0); }
	public Q_ATTRIBUTE(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.Q_ATTRIBUTE, 0); }
	public Q_HIGHP(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.Q_HIGHP, 0); }
	public Q_MEDIUMP(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.Q_MEDIUMP, 0); }
	public Q_LOWP(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.Q_LOWP, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_qualifier; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitQualifier) {
			return visitor.visitQualifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Layout_qualifierContext extends ParserRuleContext {
	public Q_LAYOUT(): TerminalNode { return this.getToken(AntlrGlslParser.Q_LAYOUT, 0); }
	public LRB(): TerminalNode { return this.getToken(AntlrGlslParser.LRB, 0); }
	public layout_qualifier_id_list(): Layout_qualifier_id_listContext {
		return this.getRuleContext(0, Layout_qualifier_id_listContext);
	}
	public RRB(): TerminalNode { return this.getToken(AntlrGlslParser.RRB, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_layout_qualifier; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitLayout_qualifier) {
			return visitor.visitLayout_qualifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Layout_qualifier_id_listContext extends ParserRuleContext {
	public layout_qualifier_id(): Layout_qualifier_idContext[];
	public layout_qualifier_id(i: number): Layout_qualifier_idContext;
	public layout_qualifier_id(i?: number): Layout_qualifier_idContext | Layout_qualifier_idContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Layout_qualifier_idContext);
		} else {
			return this.getRuleContext(i, Layout_qualifier_idContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(AntlrGlslParser.COMMA);
		} else {
			return this.getToken(AntlrGlslParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_layout_qualifier_id_list; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitLayout_qualifier_id_list) {
			return visitor.visitLayout_qualifier_id_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Layout_qualifier_idContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(AntlrGlslParser.IDENTIFIER);
		} else {
			return this.getToken(AntlrGlslParser.IDENTIFIER, i);
		}
	}
	public OP_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.OP_ASSIGN, 0); }
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_layout_qualifier_id; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitLayout_qualifier_id) {
			return visitor.visitLayout_qualifier_id(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	public BOOL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.BOOL_LITERAL, 0); }
	public number_literal(): Number_literalContext | undefined {
		return this.tryGetRuleContext(0, Number_literalContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_literal; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Number_literalContext extends ParserRuleContext {
	public INT_LITERAL(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.INT_LITERAL, 0); }
	public FLOAT_LITERAL(): TerminalNode | undefined { return this.tryGetToken(AntlrGlslParser.FLOAT_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return AntlrGlslParser.RULE_number_literal; }
	// @Override
	public accept<Result>(visitor: AntlrGlslParserVisitor<Result>): Result {
		if (visitor.visitNumber_literal) {
			return visitor.visitNumber_literal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


