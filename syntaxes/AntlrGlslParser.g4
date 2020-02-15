parser grammar AntlrGlslParser;

options{
    tokenVocab = AntlrGlslLexer;
}

start : (function_prototype | function_definition | declaration_statement | SEMICOLON)*;

/////
//functions---------------------------------------------------------------------
/////
function_prototype : function_header SEMICOLON;

function_definition : function_header compound_statement;

function_header : type_usage IDENTIFIER LRB function_parameter_list? RRB;

function_parameter_list 
    : KW_VOID
    | single_variable_declaration (COMMA single_variable_declaration)*
    ;

function_call : (TYPE | IDENTIFIER) array_subscript* LRB function_call_parameter_list? RRB;

function_call_parameter_list
    : KW_VOID
    | expression_list 
    ;

/////
//statements--------------------------------------------------------------------
/////
statement 
    : compound_statement
    | simple_statement
    ;

compound_statement : LCB statement* RCB;

simple_statement 
    : declaration_statement 
    | expression_statement 
    | selection_statement 
    | iteration_statement 
    | jump_statement 
    | switch_statement
    | SEMICOLON
    ;

selection_statement : KW_IF LRB expression RRB statement (KW_ELSE statement)?;

//switch-case
switch_statement : KW_SWITCH LRB expression RRB LCB case_group* RCB;

case_group : case_label statement*;

case_label : (KW_DEFAULT | KW_CASE expression) COLON;

//iteration
iteration_statement 
    : for_iteration 
    | while_iteration 
    | do_while_iteration
    ;

for_iteration : KW_FOR LRB (variable_declaration | expression_list)? SEMICOLON? expression? SEMICOLON? expression_list? RRB statement;

while_iteration : KW_WHILE LRB expression RRB statement;

do_while_iteration : KW_DO statement KW_WHILE LRB expression RRB SEMICOLON;

jump_statement : (KW_CONTINUE | KW_BREAK | KW_DISCARD | KW_RETURN expression?) SEMICOLON;

expression_statement : expression_list SEMICOLON?;

/////
//declarations------------------------------------------------------------------
/////
declaration_statement 
    : precision_declaration SEMICOLON
    | invariant_declaration SEMICOLON
    | type_declaration SEMICOLON
    | variable_declaration SEMICOLON
    | interface_block_declaration SEMICOLON
    ;

precision_declaration : Q_PRECISION qualifier* type;

invariant_declaration : Q_INVARIANT IDENTIFIER;

variable_declaration : type_usage (identifier_optarray_optassignment (COMMA identifier_optarray_optassignment)*)?;

single_variable_declaration : type_usage identifier_optarray_optassignment?;

type_declaration : KW_STRUCT IDENTIFIER? LCB (variable_declaration SEMICOLON)* RCB;

interface_block_declaration: qualifier* (IDENTIFIER LCB (variable_declaration SEMICOLON)* RCB (identifier_optarray)?)?;

identifier_optarray : IDENTIFIER array_subscript*;

identifier_optarray_optassignment : identifier_optarray (OP_ASSIGN expression)?;

/////
//expressions-------------------------------------------------------------------
/////
expression 
    : literal 
    | function_call 
    | IDENTIFIER
    | LRB expression RRB 
    | expression (array_subscript | DOT function_call | DOT IDENTIFIER | DOT | OP_INC | OP_DEC ) 
    | (OP_ADD | OP_SUB | OP_LOGICAL_UNARY | OP_BIT_UNARY | OP_INC | OP_DEC) expression 
    | expression (OP_MUL | OP_DIV | OP_MOD) expression 
    | expression (OP_ADD | OP_SUB) expression 
    | expression OP_SHIFT expression 
    | expression OP_RELATIONAL expression 
    | expression OP_EQUALITY expression 
    | expression OP_BIT_AND expression 
    | expression OP_BIT_XOR expression 
    | expression OP_BIT_OR expression 
    | expression OP_LOGICAL_AND expression 
    | expression OP_LOGICAL_XOR expression 
    | expression OP_LOGICAL_OR expression 
    | expression QUESTION expression_list COLON expression_list
    | expression (OP_ASSIGN | OP_MODIFY) expression
    ;

expression_list: expression (COMMA expression)* COMMA?;

/////
//types-------------------------------------------------------------------------
/////
type 
    : KW_VOID
    | TYPE
    | IDENTIFIER
    ;

type_usage : qualifier* (type | type_declaration) array_subscript*;

array_subscript : LSB expression? RSB;

//
//qualifiers
//
qualifier
    : layout_qualifier
    | Q_PRECISION
    | Q_INVARIANT
    | Q_SMOOTH
    | Q_FLAT
    | Q_CONST
    | Q_INOUT
    | Q_IN
    | Q_OUT
    | Q_CENTROID
    | Q_UNIFORM
    | Q_VARYING
    | Q_ATTRIBUTE
    | Q_HIGHP
    | Q_MEDIUMP
    | Q_LOWP
    ;

layout_qualifier : Q_LAYOUT LRB layout_qualifier_id_list RRB;

layout_qualifier_id_list : layout_qualifier_id (COMMA layout_qualifier_id)*;

layout_qualifier_id : IDENTIFIER (OP_ASSIGN (IDENTIFIER | literal))?;

//
//literals
//
literal 
    : BOOL_LITERAL 
    | number_literal
    ;

number_literal 
    : INT_LITERAL 
    | FLOAT_LITERAL
    ;
