module.exports = angular.module('app')
  .controller('timeAdjusterCtrl', function ($scope, $filter, timerService) {
    var ctrl = this;
    var timer = timerService
    var timerFormat = function (time) {
      if (time >= 3600000) {
        return 'h:mm:ss'
      }
      else if (time < 3600000) {
        return 'mm:ss'
      }
    }

    ctrl.displayBreakLength = $filter('date')(timer.breakLength, timerFormat(timer.breakLength), '+0000')

    ctrl.displaySessionLength = $filter('date')(timer.sessionLength, timerFormat(timer.sessionLength), '+0000')

    ctrl.increaseBreakLength = function () {
      if (timer.breakLength < 3600000) {
        timer.breakLength += 60000
      }
    }

    ctrl.decreaseBreakLength = function () {
      if (timer.breakLength > 0) {
        timer.breakLength -= 60000
        ctrl.displayBreakLength -= 60000
      }
    }

    $scope.$watch(function () {
      return timer.breakLength
    }, function (newVal, oldVal) {
      if (newVal !== oldVal) {
        ctrl.displayBreakLength = $filter('date')(timer.breakLength, timerFormat(timer.breakLength), '+0000')
      }
    })

    ctrl.increaseSessionLength = function () {
      if (timer.sessionLength < 3600000) {
        timer.sessionLength += 60000
      }
    }

    ctrl.decreaseSessionLength = function () {
      if (timer.sessionLength > 0) {
        timer.sessionLength -= 60000
      }
    }

    $scope.$watch(function () {
      return timer.sessionLength
    }, function (newVal, oldVal) {
      if (newVal !== oldVal) {
        ctrl.displaySessionLength = $filter('date')(timer.sessionLength, timerFormat(timer.sessionLength), '+0000')
      }
    })
  })