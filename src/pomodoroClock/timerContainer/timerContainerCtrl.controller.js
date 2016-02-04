module.exports = angular.module('app')
  .controller('timerContainerCtrl', function (timerService) {
    var timer = timerService
    var ctrl = this

    ctrl.resetTimer = function () {
      timer.stopCountdown()
      timer.resetCountdown()
    }

    ctrl.resetButton = function () {
      if (timer.sessionState === 'pomodoro' && timer.currentTime < timer.sessionLength - 5000) {
        return true
      }
      else if (timer.sessionState === 'pomodoro' && timer.currentTime > timer.sessionLength){
        return true
      }
      else if (timer.sessionState === 'break' && timer.currentTime < timer.breakLength - 5000) {
        return true
      }
      else if (timer.sessionState === 'break' && timer.currentTime > timer.breakLength) {
        return true
      }
      return false
    }

  })