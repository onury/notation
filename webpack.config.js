'use strict';

const path = require('path');
const webpack = require('webpack');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const plugins = [];

const libraryName = 'Notation';
const libraryFileName = 'notation.js';
const libraryMinFileName = 'notation.min.js';

let outputFile = libraryFileName;

module.exports = env => {

    if (env.WEBPACK_OUT === 'minified') {
        // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
        plugins.push(new UglifyJsPlugin({
            test: /\.js$/,
            sourceMap: true,
            uglifyOptions: {
                ie8: false,
                ecma: 5,
                output: {
                    comments: false,
                    beautify: false
                },
                compress: true,
                warnings: true
            }
        }));
        outputFile = libraryMinFileName;
    }

    return {
        cache: false,
        entry: path.resolve(__dirname, 'src', 'index.js'),
        devtool: 'source-map',
        target: 'web',
        output: {
            path: path.resolve(__dirname, 'lib'),
            filename: outputFile,
            library: libraryName,
            libraryTarget: 'umd',
            umdNamedDefine: true,
            publicPath: 'lib/'
        },
        module: {
            rules: [
                {
                    test: /(\.jsx?)$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    },
                    exclude: /(node_modules|bower_components)/
                },
                {
                    test: /\.html?$/,
                    loader: 'html-loader'
                }
            ]
        },
        resolve: {
            modules: [path.resolve(__dirname, 'src')],
            extensions: ['.js']
        },
        // Configure the console output.
        stats: {
            colors: true,
            modules: false,
            reasons: true
        },
        plugins
    };
};
