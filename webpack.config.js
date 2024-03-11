/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
//@ts-check
'use strict';
/** @typedef {import('webpack').Configuration} WebpackConfig **/

const path = require('path');
const webpack = require('webpack');

/**@type {import('webpack').Configuration}*/
const desktopExtensionConfig = {
    target: 'node',
    mode: 'development',
    entry: './src/extension-desktop.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension-desktop.js',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]',
    },
    devtool: 'source-map',
    externals: {
        vscode: 'commonjs vscode',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
};

/** @type WebpackConfig */
const webExtensionConfig = {
    target: 'webworker',
    mode: 'none',
    entry: './src/extension-web.ts',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'extension-web.js',
        libraryTarget: 'commonjs',
        devtoolModuleFilenameTemplate: '../../[resource-path]',
    },
    devtool: 'source-map',
    externals: {
        vscode: 'commonjs vscode',
    },
    resolve: {
        mainFields: ['module', 'main'],
        extensions: ['.ts', '.js'],
        fallback: {
            assert: require.resolve('assert'),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    performance: {
        hints: false,
    },
};

const webviewConfig = {
    mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
    externals: {
        vscode: 'commonjs vscode', // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
        // modules added here also need to be added in the .vscodeignore file
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devtool: 'nosources-source-map',
    infrastructureLogging: {
        level: 'log', // enables logging required for problem matchers
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{ loader: 'ts-loader' }],
            },
        ],
    },
    target: ['web', 'es2020'],
    entry: './src/webview.ts',
    experiments: { outputModule: true },
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: 'webview.js',
        libraryTarget: 'module',
        chunkFormat: 'module',
    },
};

module.exports = [desktopExtensionConfig, webExtensionConfig, webviewConfig];
