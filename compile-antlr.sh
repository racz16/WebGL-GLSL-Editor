#!/bin/bash

cd "syntaxes"
rm -r -d "../src/_generated"
antlr4ts -o "../src/_generated" "AntlrGlslLexer.g4"
antlr4ts -o "../src/_generated" -no-listener -visitor "AntlrGlslParser.g4"