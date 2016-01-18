module.exports = angular.module('app')
  .directive('gkTimerDirective', function () {
    return {
      restrict: 'EA',
      scope: {
        resetButton: '@',
        resetTimer: '='
      },
      controller: 'timerContainerCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      transclude: true,
      replace: true,
      template: require('./gk-timer-container.html')
    }
  })