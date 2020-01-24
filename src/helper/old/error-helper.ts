
export class ErrorHelper {

    /*public static addIncompatibleTypesError(tu: TypeUsage, tu2: TypeUsage, ec: ExpressionContext): void {
        if (tu2 !== null && tu2.declaration !== null && (!tu2.declaration.isConvertibleTo(tu.declaration) || tu2.arrayDepth !== tu.arrayDepth)) {
            this.addError(DiagnosticSeverity.Error, tu.name + ', ' + tu2.name + ' : incompatible types', ec.start.startIndex, ec.stop.stopIndex + 1);
        }
    }

    public static addVoidQualifierError(pqc: Precision_qualifierContext): void {
        if (pqc !== null) {
            const message = 'void : Only floating point, integer or opaque type declaration can have the type preceded by a precision qualifier. Unacceptable type';
            const start = pqc.start.startIndex;
            const stop = pqc.stop.stopIndex + 1;
            this.addError(DiagnosticSeverity.Error, message, start, stop);
        }
    }

    public static addDuplicatedFunctionDefinitionError(fd: FunctionDeclaration): void {
        if (this.isFunctionDuplicated(fd)) {
            const message = "'" + fd.name + '\' function already has a body';
            const start = fd.signatureInterval.startIndex;
            const stop = fd.signatureInterval.stopIndex;
            this.addError(DiagnosticSeverity.Error, message, start, stop, new RemoveElementFix(fd.interval.startIndex, fd.interval.stopIndex, 'remove function'));
        }
    }

    private static isFunctionDuplicated(fd: FunctionDeclaration): boolean {
        for (const fd2 of Scope.FUNCTION_DEFINITIONS) {
            if (fd !== fd2 && fd.logicalFunction.equalsSignature(fd2.logicalFunction) && fd.nameInterval.stopIndex > fd2.nameInterval.stopIndex) {
                return true;
            }
        }
        return false;
    }

    public static addInconsistentFunctionParameterQualifiersError(vd: VariableDeclaration, qu: QualifierUsage, pq: Parameter_qualifierContext): void {
        for (const fqu of vd.type.qualifiers) {
            if (!qu.qualifier.isCompatibleWith(fqu.qualifier)) {
                const message = fqu.qualifier.name + ', ' + qu.qualifier.name + ' : inconsistent qualifiers';
                this.addError(DiagnosticSeverity.Error, message, pq.start.startIndex, pq.start.stopIndex + 1);
            }
        }
    }

    public static addIdentifierWarnings(element: Element): void {
        this.addReservedIdentifierNameWarning(element);
        this.addTooLongIdentifierNameWarning(element);
    }

    private static addReservedIdentifierNameWarning(element: Element): void {
        if (element.name.startsWith('__') || element.name.startsWith('gl_')) {
            const message = element.name.startsWith("__") ? element.name + ' : two consecutive underscores are reserved for future use' : element.name + ' : the gl_ identifier prefix is reserved for use by OpenGL';
            const start = element.nameInterval.startIndex;
            const stop = element.nameInterval.stopIndex;
            this.addError(DiagnosticSeverity.Warning, message, start, stop);
        }
    }

    private static addTooLongIdentifierNameWarning(element: Element): void {
        if (element.name.length > 1024) {
            const message = 'some compilers may not support identifiers with name longer than 1024 characters';
            const start = element.nameInterval.startIndex;
            const stop = element.nameInterval.stopIndex;
            this.addError(DiagnosticSeverity.Warning, message, start, stop);
        }
    }

    public static addBoolExpressionExpectedError(tu: TypeUsage, start: number, stop: number): void {
        if (tu !== null && tu.name !== 'bool') {
            const message = 'boolean expression expected';
            this.addError(DiagnosticSeverity.Error, message, start, stop);
        }
    }

    public static addNoVersionMacroWarning(): void {
        if (GlslProcessor.getTokens() !== null && GlslProcessor.getTokens().length !== 0) {
            const ft = GlslProcessor.getTokens()[0];
            if (ft.type !== AntlrGlslLexer.MACRO || !ft.text.startsWith('#version')) {
                this.addError(DiagnosticSeverity.Warning, 'The shader should starts with the version macro', ft.startIndex, ft.stopIndex + 1);
            }
        }
    }

    public static addReturnError(currentFunctionReturnType: TypeUsage, ctx: Jump_statementContext): void {
        if (ctx.expression() !== null && currentFunctionReturnType.isVoid()) {
            this.addError(DiagnosticSeverity.Error, 'return : void function cannot return a value', ctx.expression().start.startIndex, ctx.expression().stop.stopIndex + 1);
        } else if (ctx.expression() === null && !currentFunctionReturnType.isVoid()) {
            this.addError(DiagnosticSeverity.Error, 'return : non-void function must return a value ', ctx.KW_RETURN().symbol.startIndex, ctx.KW_RETURN().symbol.stopIndex + 1);
        }
    }

    public static addIntegerOverflowError(num: number, ctx: Number_literalContext): void {
        if (num >= Math.pow(2, 32)) {
            const message = num + " : integer overflow";
            const start = ctx.INT_LITERAL().symbol.startIndex;
            const stop = ctx.INT_LITERAL().symbol.stopIndex + 1;
            this.addError(DiagnosticSeverity.Error, message, start, stop);
        }
    }

    public static addCannotConvertError(td1: TypeDeclaration, td2: TypeDeclaration, start: number, stop: number): void {
        this.addError(DiagnosticSeverity.Error, '\'assign\' :  cannot convert from \'' + td2 + '\' to \'' + td1 + '\'', start, stop);
    }

    //
    //
    //
    public static addUndeclaredTypeUsageError(tu: TypeUsage): void {
        const message = tu.name + ' : not declared type';
        const start = tu.nameInterval.startIndex;
        const stop = tu.nameInterval.stopIndex;
        this.addError(DiagnosticSeverity.Error, message, start, stop);
    }

    public static addUndeclaredVariableUsageError(vu: VariableUsage): void {
        const message = vu.name + ' : undeclared identifier';
        const start = vu.nameInterval.startIndex;
        const stop = vu.nameInterval.stopIndex;
        this.addError(DiagnosticSeverity.Error, message, start, stop);
    }

    public static addError(severity: DiagnosticSeverity, message: string, start: number, stop: number): void {
        //ErrorDescription ed = ErrorDescriptionFactory.createErrorDescription(severity, message, org.netbeans.api.editor.EditorRegistry.lastFocusedComponent ().getDocument(), new ErrorPosition(start), new ErrorPosition(stop));
        const ed = new UniqueSyntaxError(severity, message, start, stop);
        Scope.ERRORS.push(ed);
    }

    public static addErrorWithFixes(severity: DiagnosticSeverity, message: string, start: number, stop: number, ...fixes: Array<GlslErrorFix>): void {
        const ed = new UniqueSyntaxError(severity, message, start, stop);
        for (const fix of fixes) {
            ed.addFix(fix);
        }
        Scope.ERRORS.push(ed);
    }*/

}
