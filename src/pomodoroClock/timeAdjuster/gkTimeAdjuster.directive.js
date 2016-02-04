module.exports = angular.module('app')
  .directive('gkTimeAdjusterDirective', function () {
    return {
      scope: {
        increaseBreakLength: '=',
        decreaseBreakLength: '=',
        increaseSessionLength: '=',
        decreaseSessionLength: '=',
        displayBreakLength: '@',
        displaySessionLength: '@'
      },
      controller: 'timeAdjusterCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      template: require('./gk-time-adjuster.html')
    }
  })