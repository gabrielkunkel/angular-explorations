/* eslint no-undef: 0 */


//////////// Conditional Requires for Development /////////////
/* istanbul ignore if: only necessary for development environment */
if (process.env.NODE_ENV === 'development') {
  require('../src/index.html')
}

//////////// Initialize Angular //////////////////////////////
var angular = require('angular')
angular.module('app', [])

//////////// Require Application Indices /////////////////////
require('./factories')
require('./timer')

//////////// Require CSS /////////////////////////////////////
require('./main.css')