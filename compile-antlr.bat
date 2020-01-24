rmdir /Q /S "syntaxes/.antlr" && ^
rmdir /Q /S "src/_generated" && ^
antlr4ts -o "src/_generated" "syntaxes/AntlrGlslLexer.g4" && ^
antlr4ts -o "src/_generated" -no-listener -visitor "syntaxes/AntlrGlslParser.g4"