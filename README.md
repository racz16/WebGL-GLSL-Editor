# WebGL GLSL Editor

[![VS Code Marketplace](https://vsmarketplacebadge.apphb.com/version-short/raczzalan.webgl-glsl-editor.svg)](https://marketplace.visualstudio.com/items?itemName=raczzalan.webgl-glsl-editor)
[![VS Code Marketplace downloads](https://vsmarketplacebadge.apphb.com/downloads-short/raczzalan.webgl-glsl-editor.svg)](https://marketplace.visualstudio.com/items?itemName=raczzalan.webgl-glsl-editor)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5e8500dbaa1d42449f785c4ba06372d5)](https://app.codacy.com/manual/racz1666/WebGL-GLSL-Editor?utm_source=github.com&utm_medium=referral&utm_content=racz16/WebGL-GLSL-Editor&utm_campaign=Badge_Grade_Dashboard)

This extension adds language support for GLSL ES 100 (WebGL 1 and OpenGL ES 1.00) and GLSL ES 300 (WebGL 2 and OpenGL ES 3.00). It supports most of the well-known VS Code language features like syntax highlight, IntelliSense and more, see the details below.

## Features
### Syntax highlight
The extension colorizes types, builtin types, variables, builtin variables, functions, keywords, qualifiers, operators, macros and comments.

![syntax highlighting](res/png/screenshots/syntax-highlighting.png)
### Diagnostic
The extension uses [glslang](https://github.com/KhronosGroup/glslang), the Khronos Group's reference GLSL compiler to provide diagnostic informations. It also grays out the unused functions, types and variables.

![diagnostic](res/png/screenshots/diagnostic.png)
### Offline documentation
The extension uses [docs.gl](http://docs.gl) to provide the offline documentation for builtin variables and builtin functions.

![offline documentation](res/png/screenshots/documentation.png)
### Signature help
The extension can display a signature helper for functions and constructors (except matrix constructors).

![signature help](res/png/screenshots/signature-help.png)
### Code completion
The extension provides types, variables, functions, constructors, keywords, qualifiers, qualifier parameters and code snippets using IntelliSense, accoarding to the current scope and shader stage. Member variables and vector swizzles are also supported.

![code completion](res/png/screenshots/completion.png)
### Rename
You can rename types (and constructors), interface blocks, variables and functions.

![rename](res/png/screenshots/rename.png)
### Highlights
The extension can highlight all the occurrences of the selected type, variable function or constructor.

![highlights](res/png/screenshots/highlights.png)
### Hover
The extension can provide useful informations or documentation summary if you hover over types, variables, functions or constructors.

![hover](res/png/screenshots/hover.png)
### Symbols
The extension can provide outline information and breadcrumbs about the types, interface blocks, variables and functions.

![outline and breadcrumbs](res/png/screenshots/outline-and-breadcrumbs.png)

You can easily find types, interface blocks, variables and functions.

![find symbol](res/png/screenshots/find-symbol.png)
### Color picker
The extension can display a color picker if you initialize or reassign a vec3 or vec4 variable whihch name contains the word 'color' or 'colour' and the assigned expression is a vec3 or vec4 constructor and it's parameters are number literals.

![color picker](res/png/screenshots/color-picker.png)
### Generation of Shadertoy variables
The extension can generate all the Shadertoy uniform vairables if necessary.

![shadertoy](res/png/screenshots/shadertoy.png)
### Show/Peek call hierarchy
The extension can visualize the functions' and constructors' incoming ang outgoing calls as a graph.

![call hierarchy](res/png/screenshots/call-hierarchy.png)
### Go to/Peek declarations
You can find (go to / peek) the declaration of a type, a variable, a function or a constructor.

![declarations](res/png/screenshots/declarations.png)
### Go to/Peek definitions
You can find (go to / peek) the definition of a type, a variable, a function or a constructor.

![definitions](res/png/screenshots/definitions.png)
### Go to/Peek type definitions
You can find (go to / peek) the type definition of a variable, a function or a constructor.

![type definitions](res/png/screenshots/type-definitions.png)
### Go to/Find all/Peek implementations
You can find (go to / find all / peek) the implementation of a function.

![implementations](res/png/screenshots/implementations.png)
### Go to/Find all/Peek references
You can find (go to / find all / peek) the references of a type, a variable, a function or a constructor.

![references](res/png/screenshots/references.png)
### Commands for online documentation
You can easily access several online documentations by commands.

![online documentation](res/png/screenshots/online-documentation.png)

## Configuration
* `webgl-glsl-editor.strictRename`: Prevents invalid renames
* `webgl-glsl-editor.alwaysOpenOnlineDoc`: Documentation is always opened online in the browser
* `webgl-glsl-editor.alwaysOpenOfflineDocInNewTab`: Offline documentation is always opened in new tab

## Known Issues
You can find the known issues on [GitHub](https://github.com/racz16/WebGL-GLSL-Editor/issues). Feel free to add new issues, but please provide some sort of informations to I can reproduce the problem.

## Release Notes
For more information, see the [changelog](CHANGELOG.md).

### 1.1.0
- Function signature helper
- Call hierarchy
- Color picker
- Generating Shadertoy variables
- Improved syntax highlight
- Improved code completion
- Improved diagnostic
- Other small changes and bugfixes

### 1.0.1
- Improved syntax highlight
- Other small changes and bugfixes

### 1.0.0
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

## License
Copyright 2020 Rácz Zalán

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

For diagnostics, the extension uses the glslang, you can read it's license here: [glslang license](https://raw.githubusercontent.com/KhronosGroup/glslang/master/LICENSE.txt).

For the documentation, the extension uses docs.gl, you can read it's license here: [docs.gl license](http://docs.gl/about.html).
