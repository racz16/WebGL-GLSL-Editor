Set-Location "syntaxes"
Remove-Item "../src/_generated" -Recurse -ErrorAction Ignore
antlr4ts -o "../src/_generated" "AntlrGlslLexer.g4"
antlr4ts -o "../src/_generated" -no-listener -visitor "AntlrGlslParser.g4"