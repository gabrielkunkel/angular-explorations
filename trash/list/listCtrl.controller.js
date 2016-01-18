module.exports = angular.module('app')
  .controller('listCtrl', function () {
    var ctrl = this
    ctrl.list = ['test', 'execute', 'refactor']

    ctrl.add = function (str) {
      ctrl.list.push(str)
    }
  })
