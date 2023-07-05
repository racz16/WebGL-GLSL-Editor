# How to build, run and package

## Windows

1. Download and install Visual Studio Code (<https://code.visualstudio.com/Download>)
2. Download and install NodeJS (<https://nodejs.org/en/download>)
3. Download and install git (<https://git-scm.com/downloads>)
4. Download and install the JRE (<https://java.com/en/download>)
5. Open PowerShell
6. Clone the repository

    ```ps1
    git clone https://github.com/racz16/WebGL-GLSL-Editor.git
    ```

7. Go inside the repository's root folder

    ```ps1
    cd WebGL-GLSL-Editor
    ```

8. Install dependencies

    ```ps1
    npm install
    ```

9. Generate code

    ```ps1
    npm run compile-antlr-windows
    ```

    You have to run this script again, every time you change the AntlrGlslLexer.g4 or the AntlrGlslParser.g4 files in the syntaxes folder.

10. Run the extension

    Open the repository's root folder in Visual Studio Code and press F5.

### Package the extension (optional)

11. Package the extension <!-- markdownlint-disable-line MD029 -->

    If you want to create all 11 platform-specific packages (will open 11 terminals)

    ```ps1
    npm run package
    ```

    If you only want to create the Windows-specific package

    ```ps1
    npm run package-win32-x64
    ```

## Linux

1. Open the Terminal
2. Install Visual Studio Code

    ```bash
    snap install --classic code
    ```

3. Install npm

    ```bash
    sudo apt install npm
    ```

4. Install git

    ```bash
    sudo apt install git
    ```

5. Install the JRE

    ```bash
    sudo apt install default-jre
    ```

6. Clone the repository

    ```bash
    git clone https://github.com/racz16/WebGL-GLSL-Editor.git
    ```

7. Go inside the repository's root folder

    ```bash
    cd WebGL-GLSL-Editor
    ```

8. Install dependencies

    ```bash
    npm install
    ```

9. Generate code

    ```bash
    npm run compile-antlr-linux
    ```

    You have to run this script again, every time you change the AntlrGlslLexer.g4 or the AntlrGlslParser.g4 files in the syntaxes folder.

10. Run the extension

    Open the repository's root folder in Visual Studio Code and press F5.

### Package the extension (optional)

11. Package the extension <!-- markdownlint-disable-line MD029 -->

    If you want to create all 11 platform-specific packages (will open 11 terminals)

    ```bash
    npm run package
    ```

    If you only want to create the Linux-specific package

    ```bash
    npm run package-linux-x64
    ```
