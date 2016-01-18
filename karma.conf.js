/* eslint-env node */
var path = require('path');

var _ = require('lodash');
var here = require('path-here');

// SET-UP SETTINGS

/**
 * @description Here we're setting the process.env.NODE_ENV to test
 * in case we run karma.conf.js straight through WebStorm, for instance,
 * instead of using the node command. This is used throughout
 * webpack.config and other configuration files to communicate what's
 * supposed to be running/not running. This is the case for all the settings.
 *
 * @type {string}
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

// coverage always true when testing
var coverage = true // = process.env.COVERAGE === 'true';

// ci determines if autowatch and single run will be true or false
var ci = process.env.NODE_ENV === 'test:ci'; // will be true or false
if (coverage) {
  console.log('-- recording coverage --');
}

// crucial to all run after the NODE_ENV has been set to 'test'
var webpackConfig = require('./webpack.config');
var entry = path.join(webpackConfig.context, webpackConfig.entry);
var preprocessors = {};
preprocessors[entry] = ['webpack'];



// SETTINGS INPUT

module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './node_modules/jquery/dist/jquery.js',
      entry
    ],
    exclude: [],
    preprocessors: preprocessors,
    reporters: getReporters(),
    webpack: webpackConfig,
    webpackMiddleware: {noInfo: true},
    coverageReporter: {
      reporters: [
        {type: 'lcov', dir: 'coverage/', subdir: '.'},
        {type: 'json', dir: 'coverage/', subdir: '.'},
        {type: 'text-summary'}
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: !ci,
    browsers: ['PhantomJS'],
    singleRun: ci,
    browserNoActivityTimeout: 180000,
    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-coverage',
      'karma-phantomjs-launcher'
    ]
  });
};

function getReporters() {
  var reps = ['progress'];
  if (coverage) {
    reps.push('coverage');
  }
  return reps;
}
