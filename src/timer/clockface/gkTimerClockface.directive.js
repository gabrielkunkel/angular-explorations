module.exports = angular.module('app')
  .directive('gkTimerClockfaceDirective', function () {
    return {
      restrict: 'EA',
      scope: {
        displayTime: '=',
        toggleTimer: '='
      },
      controller: 'timerClockfaceCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      transclude: true,
      replace: true,
      template: require('./gk-timer-clockface.html')
    }
  })