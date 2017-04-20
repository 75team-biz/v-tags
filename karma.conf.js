//import rollupConfig from './rollup.config.js';
//var rollupConfig = require("./rollup.config.js");
//var singleTestFile = process.argv[4];

// Karma configuration
// Generated on Mon Apr 10 2017 17:41:52 GMT+0800 (CST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon'],


    // list of files / patterns to load in the browser
    files:  [
      'test/*.js',
      'test/**/*.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/*.js': ['rollup'],
      'test/**/*.js': ['rollup']
    },

    rollupPreprocessor: {
      //plugins: rollupConfig.plugins,
      plugins: [
        require('rollup-plugin-alias')({
          'vue': 'node_modules/vue/dist/vue.esm.js'
        }),
        require('rollup-plugin-vue')({
          compileTemplate: false
        }),
        require('rollup-plugin-buble')({
          objectAssign: 'Vue.util.extend'
        }),
        require('rollup-plugin-node-resolve')({
          jsnext: true,
          main: true,
          browser: true
        }),
        require('rollup-plugin-node-builtins')(),
        require('rollup-plugin-node-globals')(),
      ],
      //plugins: require('./rollup.config.js').default.plugins,
      // will help to prevent conflicts between different tests entries
      moduleName: 'VTags',
      format: 'iife',
      sourceMap: 'inline',
      globals: {
        'assert': require('assert'),
        'process': require('process')
      }
    },

    plugins: [
        'karma-rollup-plugin',
        'karma-mocha',
        'karma-sinon',
        'karma-nyan-reporter'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['nyan'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['Chrome', 'Firefox', 'Safari', 'IE'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 1
  })
}
