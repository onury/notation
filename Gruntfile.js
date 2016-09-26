/*!
 *  Grunt Configurations
 */
module.exports = function (grunt) {
    'use strict';

    var path = require('path');
    var webpack = require('webpack');

    var params = {
        libName: 'notation', // lib variable
        libFileName: 'notation', // file name
        srcPath: path.resolve(__dirname, 'src'),
        outPath: path.resolve(__dirname, 'dist'),
        entryPath: path.resolve(__dirname, 'src/index.js'),
        publicPath: 'dist/',
        host: 'localhost',
        port: 9991
    };
    params.baseURL = 'http://' + params.host + ':' + params.port + '/';

    var webpackConfig = require('./webpack.config.js')(params);

    // ----------------------------
    //  GRUNT CONFIG
    // ----------------------------

    grunt.initConfig({

        // 'pkg': grunt.file.readJSON('package.json'),

        // ----------------------------
        //  CONFIGURE TASKS
        // ----------------------------

        'webpack': {
            options: webpackConfig.main,
            watch: {
                watch: true,
                keepalive: true
            },
            full: {},
            min: {
                output: {
                    filename: params.libFileName + '.min.js'
                },
                plugins: [
                    new webpack.optimize.UglifyJsPlugin({ minimize: true })
                ]
            }
        },

        'webpack-dev-server': webpackConfig.server,

        'jasmine_nodejs': {
            options: {
                specNameSuffix: 'spec.js',
                helperNameSuffix: 'helper.js',
                useHelpers: false,
                random: false,
                seed: null,
                defaultTimeout: null, // defaults to 5000
                stopOnFailure: false,
                traceFatal: true,
                reporters: {
                    console: {
                        colors: true,
                        cleanStack: 1,
                        verbosity: 4,
                        listStyle: 'indent',
                        activity: false
                    }
                },
                customReporters: []
            },
            all: {
                specs: ['test/**']
            }
        },

        'docma': {
            traceFatal: true,
            options: {
                config: './docma.config.json'
            }
        },

        'watch': {
            test: {
                files: [
                    'src/**/*',
                    'test/*.spec.js'
                ],
                tasks: ['jasmine_nodejs']
            }
        }
    });

    // ----------------------------
    //  LOAD GRUNT PLUGINS
    // ----------------------------

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // ----------------------------
    //  REGISTER TASKS
    // ----------------------------

    // grunt.registerTask('watch-wp', ['webpack:watch']);
    grunt.registerTask('min', ['webpack:min']);
    grunt.registerTask('build', ['webpack:full', 'webpack:min']);
    grunt.registerTask('test', ['build', 'jasmine_nodejs']);
    grunt.registerTask('watch-test', ['watch:test']);
    grunt.registerTask('release', ['build', 'docma']);

    // Open either one:
    // http://localhost:9991/webpack-dev-server
    // http://localhost:9991/example
    // http://localhost:9991/webpack-dev-server/example
    grunt.registerTask('serve', ['webpack-dev-server:start']);

    grunt.registerTask('default', ['watch-test']);

    // While developing:
    // run 2 tasks in separate terminals:
    // grunt serve (and open http://localhost:9991/example)
    // grunt watch (for auto-compiling templates and auto-running jasmine tests)
};
