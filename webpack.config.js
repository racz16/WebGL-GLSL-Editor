/* eslint-disable @typescript-eslint/no-var-requires */
//@ts-check

'use strict';

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

const path = require('path');
const webpack = require('webpack');

/**@type {import('webpack').Configuration}*/
const config = {
    target: 'node', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/

    entry: './src/extension.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
    output: {
        // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]',
    },
    devtool: 'source-map',
    externals: {
        vscode: 'commonjs vscode', // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    },
    resolve: {
        // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
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
    mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
    target: 'webworker', // extensions run in a webworker context
    entry: {
        'web-extension': './src/web-extension.ts',
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './dist'),
        libraryTarget: 'commonjs',
        devtoolModuleFilenameTemplate: '../../[resource-path]',
    },
    resolve: {
        mainFields: ['browser', 'module', 'main'], // look for `browser` entry point in imported node modules
        extensions: ['.ts', '.js'], // support ts-files and js-files
        fallback: {
            // Webpack 5 no longer polyfills Node.js core modules automatically.
            // see https://webpack.js.org/configuration/resolve/#resolvefallback
            // for the list of Node.js core module polyfills.
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
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1, // disable chunks by default since web extensions must be a single bundle
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser', // provide a shim for the global `process` variable
        }),
    ],
    externals: {
        vscode: 'commonjs vscode', // ignored because it doesn't exist
    },
    performance: {
        hints: false,
    },
    devtool: 'nosources-source-map', // create a source map that points to the original source file
    infrastructureLogging: {
        level: 'log', // enables logging required for problem matchers
    },
};

module.exports = [config, webExtensionConfig];
