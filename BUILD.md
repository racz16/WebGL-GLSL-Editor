# How to build, run and package

## Windows

1. Download and install Visual Studio Code (<https://code.visualstudio.com/Download>)
2. Download and install NodeJS (<https://nodejs.org/en/download>)
3. Download and install git (<https://git-scm.com/downloads>)
4. Download and install the JRE (<https://java.com/en/download>)
5. Open PowerShell or cmd
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

10. Open the repository's root folder in Visual Studio Code

    ```ps1
    code .
    ```

    When Visual Studio Code opens, it'll suggest you to install the recommanded extensions. They're all useful, but __TypeScript + Webpack Problem Matchers__ is required, without it, you won't be able to run the extension.

11. Press __F5__, to run the extension. In the __Run and Debug__ tab, you can choose between the desktop and the web version.

    By running the __run-in-browser__ script, you can try the web extension in an actual browser.

### Package the extension (optional)

12. Package the extension <!-- markdownlint-disable-line MD029 -->

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

10. Open the repository's root folder in Visual Studio Code

    ```bash
    code .
    ```

    When Visual Studio Code opens, it'll suggest you to install the recommanded extensions. They're all useful, but __TypeScript + Webpack Problem Matchers__ is required, without it, you won't be able to run the extension.

11. Press __F5__, to run the extension. In the __Run and Debug__ tab, you can choose between the desktop and the web version.

    By running the __run-in-browser__ script, you can try the web extension in an actual browser.

### Package the extension (optional)

12. Package the extension <!-- markdownlint-disable-line MD029 -->

    If you want to create all 11 platform-specific packages (will open 11 terminals)

    ```bash
    npm run package
    ```

    If you only want to create the Linux-specific package

    ```bash
    npm run package-linux-x64
    ```
