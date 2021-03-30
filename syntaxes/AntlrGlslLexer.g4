lexer grammar AntlrGlslLexer;

/////
//keywords----------------------------------------------------------------------
/////
KW_BREAK : 'break';
KW_CONTINUE: 'continue';
KW_DO : 'do';
KW_FOR : 'for';
KW_WHILE : 'while';
KW_SWITCH : 'switch';
KW_CASE : 'case';
KW_DEFAULT: 'default';
KW_IF : 'if';
KW_ELSE : 'else';
KW_DISCARD : 'discard';
KW_RETURN : 'return';
KW_STRUCT : 'struct';
KW_VOID : 'void';

/////
//qualifiers--------------------------------------------------------------------
/////
Q_PRECISION : 'precision';
Q_LAYOUT : 'layout';
Q_INVARIANT : 'invariant';
Q_SMOOTH : 'smooth';
Q_FLAT : 'flat';
Q_CONST : 'const';
Q_INOUT : 'inout';
Q_IN : 'in';
Q_OUT : 'out';
Q_CENTROID : 'centroid';
Q_UNIFORM : 'uniform';
Q_VARYING : 'varying';
Q_ATTRIBUTE : 'attribute';
Q_HIGHP : 'highp';
Q_MEDIUMP : 'mediump';
Q_LOWP : 'lowp';

/////
//types-------------------------------------------------------------------------
/////
TYPE 
    : TRANSPARENT_TYPE 
    | FLOAT_OPAQUE_TYPE 
    | SIGNED_INT_OPAQUE_TYPE 
    | UNSIGNED_INT_OPAQUE_TYPE
    ;

//transparent type
fragment
TRANSPARENT_TYPE 
    : 'int' 
    | 'uint' 
    | 'float'
    | 'bool' 
    | VECTOR_TYPE 
    | MATRIX_TYPE
    ;

fragment
VECTOR_TYPE : ('b' | 'i' | 'u')? 'vec' ('2' | '3' | '4');

fragment
MATRIX_TYPE : 'mat' ('2' | '3' | '4') ('x' ('2' | '3' | '4'))?;

//float opaque type
fragment
FLOAT_OPAQUE_TYPE : SAMPLER_TYPE (OPAQUE_TYPE_ENDING | FLOAT_OPAQUE_TYPE_SAMPLER_ONLY_ENDING);

fragment
FLOAT_OPAQUE_TYPE_SAMPLER_ONLY_ENDING 
    : '2DShadow' 
    | '2DArrayShadow' 
    | 'CubeShadow' 
    ;

//signed int opaque type
fragment
SIGNED_INT_OPAQUE_TYPE : 'i' SAMPLER_TYPE OPAQUE_TYPE_ENDING;

//unsigned int opaque type
fragment
UNSIGNED_INT_OPAQUE_TYPE : 'u' SAMPLER_TYPE OPAQUE_TYPE_ENDING ;

//type fragments
fragment
OPAQUE_TYPE_ENDING 
    : '2D' 
    | '3D' 
    | 'Cube' 
    | '2DArray' 
    ;

fragment
SAMPLER_TYPE : 'sampler';

/////
//literals----------------------------------------------------------------------
/////
//bool literals
BOOL_LITERAL 
    : 'true' 
    | 'false'
    ;

//int literals
INT_LITERAL : (DECIMAL_INT_LITERAL | OCTAL_INT_LITERAL | HEXADECIMAL_INT_LITERAL) [uU]?;

fragment
DECIMAL_INT_LITERAL : NONZERO_DIGIT DIGIT*;

fragment
OCTAL_INT_LITERAL : '0' OCTAL_DIGIT*;

fragment
HEXADECIMAL_INT_LITERAL : '0' [xX] HEXADECIMAL_DIGIT+;

//float literals
FLOAT_LITERAL 
    : FRACTIONAL_PART EXPONENT_PART? FLOATING_SUFFIX? 
    | DIGIT+ EXPONENT_PART FLOATING_SUFFIX?
    ;

fragment
FRACTIONAL_PART 
    : DIGIT+ '.' DIGIT+ 
    | '.' DIGIT+ 
    | DIGIT+ '.'
    ;

fragment
EXPONENT_PART : [eE] [+-]? DIGIT+;

fragment
FLOATING_SUFFIX 
    : 'f' 
    | 'F' 
    ;

/////
//operators---------------------------------------------------------------------
/////
OP_MUL : '*';
OP_ADD : '+';
OP_SUB : '-';
OP_DIV : '/';
OP_MOD : '%';
OP_INC : '++';
OP_DEC : '--';
OP_SHIFT 
    : '<<' 
    | '>>'
    ;
OP_RELATIONAL 
    : '<=' 
    | '<' 
    | '>' 
    | '>='
    ;
OP_EQUALITY 
    : '==' 
    | '!='
    ;
OP_BIT_AND : '&';
OP_BIT_XOR : '^';
OP_BIT_OR : '|';
OP_BIT_UNARY : '~';
OP_LOGICAL_AND : '&&';
OP_LOGICAL_OR :  '||';
OP_LOGICAL_XOR : '^^';
OP_LOGICAL_UNARY : '!';
OP_MODIFY : ('+' | '-' | '%' | '*' | '/' | '<<' | '>>' | '&' | '|' | '^') '=';
OP_ASSIGN : '=';

/////
//hidden------------------------------------------------------------------------
/////
PREPROCESSOR : '#' (('/'? ~[\r\n*/]) | '*')* ('/' ~[\r\n*/])? -> channel(HIDDEN);
NEW_LINE : ('\r\n' | '\r' | '\n') -> channel(HIDDEN);
SPACE : ' ' -> channel(HIDDEN);
TAB : '\t' -> channel(HIDDEN);

//comments
MULTI_LINE_COMMENT : '/*' .*? '*/' -> channel(HIDDEN);
SINGLE_LINE_COMMENT : '//' ~[\r\n]* -> channel(HIDDEN);

/////
//others------------------------------------------------------------------------
/////
IDENTIFIER : ('_' | LETTER) ('_' | LETTER | DIGIT)*;

fragment
LETTER : [a-zA-Z];

//numbers
fragment
DIGIT 
    : '0' 
    | NONZERO_DIGIT
    ;

fragment
NONZERO_DIGIT : [1-9];

fragment
OCTAL_DIGIT : [0-7];

fragment
HEXADECIMAL_DIGIT 
    : DIGIT 
    | [a-fA-F]
    ;

/////
//characters--------------------------------------------------------------------
/////
DOT : '.';
COMMA : ',';
COLON : ':';
SEMICOLON : ';';
QUESTION : '?';

//round brackets
LRB : '(';
RRB : ')';

//curly brackets
LCB : '{';
RCB : '}';

//square brackets
LSB : '[';
RSB : ']';
