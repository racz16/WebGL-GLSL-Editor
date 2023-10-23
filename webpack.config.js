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

module.exports = [desktopExtensionConfig, webExtensionConfig];
