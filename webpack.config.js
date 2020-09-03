const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const libraryName = 'notation';
const libPath = path.resolve(__dirname, 'lib');
const srcPath = path.resolve(__dirname, 'src');
const publicPath = 'lib/';

module.exports = env => {

    const config = {
        // turn off NodeStuffPlugin and NodeSourcePlugin plugins. Otherwise
        // objects like `process` are mocked or polyfilled.
        node: false, // !!! IMPORTANT

        context: __dirname,
        cache: false,
        entry: path.join(srcPath, 'index.js'),
        devtool: 'source-map',
        output: {
            library: libraryName,
            filename: libraryName.toLowerCase() + '.js'
        },
        module: {
            rules: [
                {
                    test: /(\.jsx?)$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/preset-env']
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
            modules: [srcPath],
            extensions: ['.js']
        },
        // Configure the console output.
        stats: {
            colors: true,
            modules: false,
            reasons: true,
            // suppress "export not found" warnings about re-exported types
            warningsFilter: /export .* was not found in/
        },
        plugins: [],
        optimization: {
            minimizer: []
        }
    };

    if (env.WEBPACK_OUT === 'coverage') {
        Object.assign(config.output, {
            filename: '.' + libraryName + '.cov.js',
            path: libPath,
            libraryTarget: 'commonjs2',
            umdNamedDefine: false
        });
    } else {

        // production & development
        Object.assign(config.output, {
            path: libPath,
            // filename: libraryName.toLowerCase() + '.js',
            publicPath,
            libraryTarget: 'umd',
            umdNamedDefine: true,
            // this is to get rid of 'window is not defined' error.
            // https://stackoverflow.com/a/49119917/112731
            globalObject: 'this'
        });

        if (env.WEBPACK_OUT === 'production') {
            config.devtool = 'source-map';
            config.output.filename = libraryName.toLowerCase() + '.min.js';
            config.optimization.minimizer.push(new UglifyJsPlugin({
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
        }
    }

    return config;
};
