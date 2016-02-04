module.exports = angular.module('app')
  .controller('timerClockfaceCtrl', function ($scope, $filter, timerService) {
    var ctrl = this;
    var timerRunning = false
    var timer = timerService

    var timerFormat = function (time) {
      if (time >= 3600000) {
        return 'h:mm:ss'
      }
      else if (time < 3600000) {
        return 'mm:ss'
      }
    }

    ctrl.displayTime = $filter('date')(timer.currentTime, timerFormat(timer.currentTime), '+0000')

    $scope.$watch(function() {
      return timer.currentTime;
    }, function (newValue, oldValue) {
      if (newValue !== oldValue) {
        ctrl.displayTime = $filter('date')(newValue, timerFormat(newValue), '+0000')
      }
    })

    // session length wired up
    $scope.$watch(function() {
      return timer.sessionLength;
    }, function (newValue, oldValue) {
      if (newValue !== oldValue &&
        timer.sessionActive === false &&
        timer.currentTime === oldValue
      ) {
        timer.currentTime = newValue
      }
    })

    ctrl.toggleTimer = function () {
      if(timerRunning === false) {
        timer.startCountdown()
        timerRunning = true
      }
      else if (timerRunning === true) {
        timer.stopCountdown()
        timerRunning = false
      }

    }


  })
;