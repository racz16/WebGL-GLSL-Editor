Set-Location "syntaxes"
Remove-Item "../src/_generated" -Recurse -ErrorAction Ignore
npx antlr4ts -o "../src/_generated" "AntlrGlslLexer.g4"
npx antlr4ts -o "../src/_generated" -no-listener -visitor "AntlrGlslParser.g4"