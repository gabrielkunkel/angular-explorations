/* eslint-env node */
/* eslint-disable */

var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');
// var HtmlWebpackPlugin = require('html-webpack-plugin')
var here = require('path-here');
var _ = require('lodash');

var path = require('path');

var packageJson = require(here('package.json'));

var context = process.env.NODE_ENV || 'development';
var exclude = /node_modules/;


// GET SHARED

// This is what ultimately gets exported and shared with karma.conf
var configFns = {
  development: getDevConfig,
  production: getProdConfig,
  test: getTestConfig,
  'test:ci': getTestCIConfig
};

var config = configFns[context](); // This returns the result of the context's configFn
addCommonPlugins();

console.log('building version %s in %s mode', packageJson.version, context);

module.exports = config;


/**
 * @description This is the boilerplate configuration object that will be merged with test
 * object in getTestConfig.
 *
 * @returns {{context: *, entry: string, stats: {colors: boolean, reasons: boolean}, devtool: string, plugins: Array, resolve: {extensions: string[]}, module: {loaders: Array}, eslint: {emitError: boolean, failOnError: boolean, failOnWarning: boolean, quiet: boolean}}}
 */
function getDevConfig() {
  var devConfig = {
    context: here('src'), // adjust this to allow for tests in a different folder
    entry: './app.module.js',

    stats: {
      colors: true,
      reasons: true
    },

    devtool: 'eval',

    plugins: [],

/*    resolve: {
      extensions: ['', '.js']
    },*/

    module: {
      loaders: _.union(
        getJavaScriptLoaders(),
        [
          {
            test: /\.(html|txt)$/,
            loader: "raw-loader",
            exclude: exclude
          },
          {
            test: /\.css$/,
            loaders: ['style', 'css']
          },
          {
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader?name=/res/[name].[ext]?[hash]'
          }
        ]
      )
    },
    eslint: {
      emitError: false,
      failOnError: false,
      failOnWarning: false,
      quiet: true
    }
  };

  if (process.env.CI !== 'true') {
    devConfig.plugins = [
      new WebpackNotifierPlugin()
    ];
  }
  return devConfig;
}

function getJavaScriptLoaders() {
  if (context.indexOf('test') === -1 && process.env.COVERAGE !== 'true') {
    return [
      {
        test: /\.js$/,
        loaders: ['ng-annotate', 'babel-loader?presets[]=es2015&cacheDirectory', 'eslint'],
        exclude: exclude
      }
    ];
  } else {
    return [
      {
        test: /\.(test|mock|spec)\.js$/, // include only mock and test files
        loaders: ['ng-annotate', 'babel-loader?presets[]=es2015&cacheDirectory', 'eslint'],
        exclude: exclude
      },
      {
        test: /\.js$/,
        loaders: ['isparta'],
        exclude: /node_modules|\.(test|mock|spec)\.js$|jquery\.js$/ // jquery for karma in webstorm
      }
    ];
  }
}


// FOR PRODUCTION CONFIGURATION
function getProdConfig(noUglify) {
  var prodConfig = _.merge({}, getDevConfig(), {
    output: {
      path: here('dist'),
      filename: 'bundle.js'
    },
    devtool: 'source-map',
    eslint: {
      emitError: true,
      failOnError: true
    }
  });

  prodConfig.plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ];


  // allow getting rid of the UglifyJsPlugin
  // https://github.com/webpack/webpack/issues/1079
  if (!noUglify) {
    prodConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    }));
  }
  return prodConfig;
}

//TEST CONFIGURATION
function getTestConfig() {
  return _.merge({}, getDevConfig(), {
    entry: './app.module.spec.js'
  });
}

function getTestCIConfig() {
  var noUglify = true;
  return _.merge({}, getProdConfig(noUglify), {
    entry: './app.module.spec.js',
    module: {
      postLoaders: [
        // we do this because we don't want the tests uglified
        {test: /\.js$/, loader: 'uglify', exclude: /\.test\.js$|\.mock\.js$/}
      ]
    },
    'uglify-loader': {
      compress: {warnings: false}
    }
  });
}


function addCommonPlugins() {
  config.plugins = config.plugins || [];

  config.plugins.unshift(new webpack.BannerPlugin(getBanner(), {raw: true}));
  // put the global variables before everything else
  config.plugins.unshift(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    VERSION: JSON.stringify(packageJson.version)
  }));
}

function getBanner() {
  return '//! ' + packageJson.name + ' version ' +
    packageJson.version +
    ' built with ♥ by ' +
    (packageJson.contributors || [packageJson.author]).join(', ') +
    ' with JavaScript, AngularJs, Webpack, ESLint, Karma Test Runner, and some ES6.' +
      ' Code coverage provided by Istanbul.' +
      ' See the Github repository at '+
    packageJson.repository.url;
}
