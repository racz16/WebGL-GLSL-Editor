# Change Log

## [Unreleased]
For new feature plans see the [GitHub Projects](https://github.com/racz16/WebGL-GLSL-Editor/projects) page.

## [1.2.1] - 2021.04.09.
### Added
- Support for the extensions
- Range formatting
- Generating preprocessed GLSL
### Improved
- Improved code completion in preprocessor directives, in layout qualifiers and before struct members
- Improved syntax highlight (const variables)
- Improved diagnostic (warnings)
- Displaying a message if the injected code contains errors
- Updated packages
- Other small updates
### Fixed
- Diagnostic problems in Linux
- Code completion in comments
- Inconsistent go to definition behaviour
- Inconsistent find references behaviour
- Displaying signature and hover information even if the variable or the function not exist
- Problem with renaming constructors
- Truncated diagnostic messages
- Other small fixes

## [1.2.0] - 2021.03.16.
### Added
- Formatting
- Syntax highlight in HTML scritps
- Code injection
### Removed
- Generation of ShaderToy variables (replaced by the more general code injection)
### Improved
- Improved folding
- Updated packages and other dependencies
- Other small updates
### Fixed
- Wrong documentation of the acos and the round functions
- Trying to use the type of variables with unknown type
- Local variables don't hide other vairables properly
- Variable marked as unused, if it's declaration contains type declaration or interface block
- The extension can't start properly if the first opened file contains build error
- Different files' diagnostic results interfere with each other
- Trying to use the name of unnamed type declarations or variable declarations
- Types declared in function header scoped locally and marked as unused
- Array variables appear without []-s in the completion window
- Closed files provide diagnostic information
- Local types' constructors don't provide signature help
- Go to type definition doesn't work if the type is unnamed
- Signature helper tries to show the name of unnamed parameters
- Incorrect syntax highlight of some number literals
- Incorrect syntax highlight if there is a comment between the keyword struct and the type name
- Other small fixes

## [1.1.1] - 2020.08.13.
### Improved
- Diagnostic (can show more than one errors)
- Updated packages
- Other small updates
### Fixed
- Showing outdated diagnostic results
- Trying to show documentation for undocumented variables

## [1.1.0] - 2020.06.03.
### Added
- Function signature helper
- Call hierarchy
- Color picker
- Generating Shadertoy variables
### Improved
- Syntax highlight
- Completion item details
- Diagnostic (hints for unused types, functions, variables)
- Bundling
- Reduced package size
- Updated packages
- Other small updates
### Fixed
- Marking non-array variables as multidimensional arrays
- Wrong tokenization of builtin types in some cases 
- Other small fixes

## [1.0.1] - 2020.04.12.
### Improved
- Syntax highlight
- Reduced package size
- Updated dependencies
### Fixed
- Function definition related features are working again
- Floating point numbers no longer trigger code completion

## [1.0.0] - 2020.02.19.
### Added
- Syntax highlight
- Diagnostics
- Offline documentation
- Code completion
- Rename
- Highlights
- Hover
- Symbols
- Go to/Peek declarations
- Go to/Peek definitions
- Go to/Peek type definitions
- Go to/Find all/Peek implementations
- Go to/Find all/Peek references
- Commands for online documentation