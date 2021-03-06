/* eslint-env node */
// Karma configuration
// Generated on Mon Apr 22 2019 17:20:48 GMT+0100 (BST)
const webpackConfig = require('./webpack.config');

module.exports = function(config) {
    config.set({

        // enable / disable watching file and executing tests whenever any file changes
        'autoWatch': true,


        // base path that will be used to resolve all patterns (eg. files, exclude)
        'basePath': '',


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        'browsers': ['Chrome'],


        // enable / disable colors in the output (reporters and logs)
        'colors': true,


        // Concurrency level
        // how many browser should be started simultaneous
        'concurrency': Infinity,


        // list of files / patterns to exclude
        'exclude': [],


        // list of files / patterns to load in the browser
        'files': ['spec/**/*.spec.js'],


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        'frameworks': ['jasmine'],


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        'logLevel': config.LOG_INFO,


        // web server port
        'port': 9876,


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        'preprocessors': {
            'spec/**/*.spec.js': ['webpack']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        'reporters': ['progress'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        'singleRun': false,


        // WebPack configuration
        'webpack': webpackConfig
    })
};
