# How to build, run and package

## Windows

1. Download and install Visual Studio Code (<https://code.visualstudio.com/Download>)
2. Download and install NodeJS (<https://nodejs.org/en/download>)
3. Download and install git (<https://git-scm.com/downloads>)
4. Download and install the JRE (<https://java.com/en/download>)
5. Open PowerShell
6. Install the Antlr CLI

        npm install -g antlr4ts-cli

7. Clone the repository

        git clone https://github.com/racz16/WebGL-GLSL-Editor.git

8. Go inside the repository's root folder

        cd WebGL-GLSL-Editor

9. Install dependencies

        npm install

10. Generate code

        npm run compile-antlr-windows

    You have to run this script again, every time you change the AntlrGlslLexer.g4 or the AntlrGlslParser.g4 files in the syntaxes folder.

11. Run the extension

    Open the repository's root folder in Visual Studio Code and press F5.

### Package the extension (optional)

12. Package the extension

    If you want to create all 11 platform-specific packages (will open 11 terminals)

        npm run package

    If you only want to create the Windows-specific package

        npm run package-win32-x64

## Linux

1. Open the Terminal
2. Install Visual Studio Code

        snap install --classic code

3. Install npm

        sudo apt install npm

4. Install git

        sudo apt install git

5. Install the JRE

        sudo apt install default-jre

6. Install the Antlr CLI

        sudo npm install -g antlr4ts-cli

7. Clone the repository

        git clone https://github.com/racz16/WebGL-GLSL-Editor.git

8. Go inside the repository's root folder

        cd WebGL-GLSL-Editor

9. Install dependencies

        npm install

10. Generate code

        npm run compile-antlr-linux

    You have to run this script again, every time you change the AntlrGlslLexer.g4 or the AntlrGlslParser.g4 files in the syntaxes folder.

11. Run the extension

    Open the repository's root folder in Visual Studio Code and press F5.

### Package the extension (optional)

12. Package the extension

    If you want to create all 11 platform-specific packages (will open 11 terminals)

        npm run package

    If you only want to create the Linux-specific package

        npm run package-linux-x64
