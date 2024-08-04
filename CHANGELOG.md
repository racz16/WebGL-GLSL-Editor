<!-- markdownlint-disable MD026 -->
# Change Log

## [1.3.8] - 2024.03.12.

### Improved

* Making builtin macros available in normal code completion (with values), not only in preprocessor lines
* Adding a tooltip and a link to inlay hints
* Updated packages

## [1.3.7] - 2023.11.25.

### Improved

* Added default icon for GLSL files
* Added a button (top-right corner of the editor) to generate preprocessed code
* Extended the syntax highlight to work with strings in .tsx files (thanks George Corney)
* Updated packages
* Other small updates

### Fixed

* Cleaned up the platform-specific packages
* Other small fixes

## [1.3.6] - 2023.07.09.

### Improved

* Added a new configuration to control if you like floating suffixes or not
* Updated packages
* Other small updates

### Fixed

* Fixed a problem where the color picker generated numbers with floating suffixes in GLSL ES 100
* Fixed a bug that caused problems when used with translation extensions
* Fixed a code completion bug where local variables didn't hide global variables and user types didn't hide builtin types
* Fixed a bug where unnamed variables and structs broke code completion
* Fixed a bug where variable usage was considered as an unnamed variable declaration
* Other small fixes

## [1.3.5] - 2023.05.09.

### Improved

* Extending the syntax highlight to work in JavaScript and TypeScript strings
* Updated packages
* Other small updates

### Fixed

* Fixed the diagnostics on MacOS (thanks Matt Curtis)
* Fixed the formatter, so it no longer removes the line continuation character
* Other small fixes

## [1.3.4] - 2023.02.25.

### Improved

* Adding a configuration to be able to disable diagnostics
* Adding the possibility of multiline function parameter lists to the formatter
* Updated packages
* Other small updates

### Fixed

* Fixing a bug when the color picker removed the .0 from floats and caused compiler errors
* Fixing a character encoding problem that caused different problems, including disappearing characters after formatting files
* Other small fixes

## [1.3.3] - 2022.09.18.

### Improved

* Enabled almost all desktop features to the web extension (exceptions are: diagnostics, preprocessed code generation, and offline documentation)
* Reduced package size
* Updated packages
* Other small updates

### Fixed

* Removing the configuration to enable or disable Inlay Hints (VS Code already has builtin configuration for this)
* Other small fixes

## [1.3.2]

* I made a mistake when I published it, don't use this version!

## [1.3.1] - 2022.06.25.

### Improved

* Added diagnostic support for compound file extensions (thanks RAX7)
* Updated packages

## [1.3.0] - 2022.04.05.

### Added

* Inlay hints

### Improved

* Extending the formatting with options
* Enabling the extension as a web extension (only syntax highlight)
* Syntax highlight (interface blocks, array constructors, comments, declaration, definition, read-only)
* Providing function signatures in the call hierarchy
* Extending references with builtin types and builtin variables
* Extending highlight with builtin variables
* Extending brace matching with parentheses and brackets
* Go to references, if there is only one usage
* Updated packages
* Other small updates

### Fixed

* Wrong syntax highlight in embedded code while using other extensions (thanks michaelmcleodnz)
* Wrong documentation of the cross function
* Interface block layout qualifier code completion bug
* Other small fixes

## [1.2.2] - 2021.08.21.

### Improved

* Improved code completion in functions and variables
* Updated packages

### Fixed

* Math formulas in the documentation
* Signature helper in user functions
* Preprocessed code generation in large files

## [1.2.1] - 2021.04.09.

### Added

* Support for the extensions
* Range formatting
* Generating preprocessed GLSL

### Improved

* Improved code completion in preprocessor directives, in layout qualifiers and before struct members
* Improved syntax highlight (const variables)
* Improved diagnostic (warnings)
* Displaying a message if the injected code contains errors
* Updated packages
* Other small updates

### Fixed

* Diagnostic problems in Linux
* Code completion in comments
* Inconsistent go to definition behavior
* Inconsistent find references behavior
* Displaying signature and hover information even if the variable or the function doesn't exist
* Problem with renaming constructors
* Truncated diagnostic messages
* Other small fixes

## [1.2.0] - 2021.03.16.

### Added

* Formatting
* Syntax highlight in HTML scripts
* Code injection

### Removed

* Generation of ShaderToy variables (replaced by the more general code injection)

### Improved

* Improved folding
* Updated packages and other dependencies
* Other small updates

### Fixed

* Wrong documentation of the acos and the round functions
* Trying to use the type of variables with an unknown type
* Local variables don't hide other variables properly
* Variable marked as unused if its declaration contains type declaration or interface block
* The extension can't start properly if the first opened file contains a build error
* Different files' diagnostic results interfere with each other
* Trying to use the name of unnamed type declarations or variable declarations
* Types declared in function header scoped locally and marked as unused
* Array variables appear without []-s in the completion window
* Closed files provide diagnostic information
* Local types' constructors don't provide signature help
* Go to type definition doesn't work if the type is unnamed
* Signature helper tries to show the name of unnamed parameters
* Incorrect syntax highlight of some number literals
* Incorrect syntax highlight if there is a comment between the keyword struct and the type name
* Other small fixes

## [1.1.1] - 2020.08.13.

### Improved

* Diagnostic (can show more than one error)
* Updated packages
* Other small updates

### Fixed

* Showing outdated diagnostic results
* Trying to show documentation for undocumented variables

## [1.1.0] - 2020.06.03.

### Added

* Function signature helper
* Call hierarchy
* Color picker
* Generating Shadertoy variables

### Improved

* Syntax highlight
* Completion item details
* Diagnostic (hints for unused types, functions, variables)
* Bundling
* Reduced package size
* Updated packages
* Other small updates

### Fixed

* Marking non-array variables as multidimensional arrays
* Wrong tokenization of builtin types in some cases
* Other small fixes

## [1.0.1] - 2020.04.12.

### Improved

* Syntax highlight
* Reduced package size
* Updated dependencies

### Fixed

* Function definition-related features are working again
* Floating point numbers no longer trigger code completion

## [1.0.0] - 2020.02.19.

### Added

* Syntax highlight
* Diagnostics
* Offline documentation
* Code completion
* Rename
* Highlights
* Hover
* Symbols
* Go to/Peek declarations
* Go to/Peek definitions
* Go to/Peek type definitions
* Go to/Find all/Peek implementations
* Go to/Find all/Peek references
* Commands for online documentation
