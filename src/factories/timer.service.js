function timerServiceFunction ($interval) {
  var canceled, canceledCheck, service = {}

  service.STOP = 0
  service.INTERVAL = 1000
  service.sessionState = 'pomodoro'
  service.sessionActive = false
  service.currentTime = 1500000
  service.sessionLength = 1500000
  service.breakLength = 300000
  service.thisSessionStartTime = 0

  service.startCountdown = function () {
    service.sessionActive = true
    canceled = $interval(function () {
      service.currentTime -= 1000

      if (service.currentTime === 0 && service.sessionState === 'pomodoro') {
        service.currentTime = service.breakLength
        service.sessionState = 'break'
      }

      if (service.currentTime === 0 && service.sessionState === 'break') {
        service.currentTime = service.sessionLength
        service.sessionState = 'pomodoro'
      }
    }, 1000)
  }

  service.stopCountdown = function () {
    service.sessionActive = false
    if (angular.isDefined(canceled)) {
      canceledCheck = $interval.cancel(canceled)
    }
    canceled = undefined
    return canceledCheck
  }

  service.resetCountdown = function () {
    if (service.sessionState === 'pomodoro') {
      service.currentTime = service.sessionLength
    }
    else if (service.sessionState === 'break') {
      service.currentTime = service.breakLength
    }
  }

  return service;
}

module.exports = angular.module('app')
    .factory('timerService', timerServiceFunction)