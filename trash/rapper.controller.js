module.exports = angular.module('app')
  .controller('rapper', function () {
    var ctrl = this
    ctrl.emcee = require('./text.txt');
  })
