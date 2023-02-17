#!/bin/bash

cd "syntaxes"
rm -r -d "../src/_generated"
npx antlr4ts -o "../src/_generated" "AntlrGlslLexer.g4"
npx antlr4ts -o "../src/_generated" -no-listener -visitor "AntlrGlslParser.g4"