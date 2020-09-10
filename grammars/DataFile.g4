grammar DataFile;

WS: [ \t] -> skip;
ENDLINE: '\r'?'\n' -> skip;
EQ: '=';
OPEN_BRACE: '{';
CLOSE_BRACE: '}';
fragment DIGIT: [0-9];
INT: DIGIT+;
STRING: '"' .*? '"';
FLOAT: INT+ '.' INT+;
COMMENT: '#' .* ENDLINE -> skip;

fragment CHARACTER: [a-zA-Z_-];
WORD: CHARACTER+;

identifier: WORD;
declaration: WS* identifier WS* EQ WS* (declarationBody);

declarationBody: block | value;
block: OPEN_BRACE blockBody CLOSE_BRACE;
blockBody: (declaration)*;
value: INT | FLOAT | STRING | identifier;