/* eslint no-console: 0 */
/* eslint angular/log: 0 */

describe("The Timer", function() {

  describe("Main Component Directive", function() {
    var scope, rootScope, compile, $element, directive, timer,
      controller

    beforeEach(angular.mock.module('app'))

    beforeEach(inject(function ($rootScope, $compile, timerService) {
      timer = timerService
      rootScope = $rootScope
      compile = $compile
      scope = rootScope.$new()
      directive = angular.element('<gk-timer-directive></gk-timer-directive>')
      $element = compile(directive)(scope)
      scope.$digest()

      controller = directive.controller("gk-timer-directive")
    }));

    it("can access the html of the template", function() {
      var resetButton = $element.find('.reset-button')
      expect($element.html()).toContain('reset-button');
    }); // end it

    it("includes the 'clockface' directive template", function() {
      var clockface = $element.find('.timer-clockface')
      expect($element.html()).toContain("inner");
    }); // end it
    
    it("adds class ng-hide to reset button div by default", function() {
      var resetButton = $element.find('.reset-button')
      expect(resetButton.hasClass('ng-hide')).toBe(true);
    }); // end it

  }); // end describe Main Component Directive



  describe("Main Component Controller", function() {
    var ctrl, scope, rootScope, timer

    beforeEach(angular.mock.module('app'))

    beforeEach(inject(function ($controller, $rootScope, timerService) {
      rootScope = $rootScope
      scope = rootScope.$new()
      ctrl = $controller('timerContainerCtrl')
      timer = timerService
    }))

    describe("the reset button", function () {
      it("should return false for default current time", function () {
        expect(ctrl.resetButton()).toBe(false);
      }); // end it

      it("should return false if it's less than 5s into a pomodoro", function () {
        timer.sessionState = 'pomodoro'
        timer.currentTime = timer.sessionLength - 4000
        expect(ctrl.resetButton()).toBe(false);
      }); // end it

      it("should return false if it's less than 5s into a break", function () {
        timer.sessionState = 'break'
        timer.currentTime = timer.breakLength - 4000
        expect(ctrl.resetButton()).toBe(false);
      }); // end it

      it("should return true if it's greater than 5s into a pomodoro", function () {
        timer.sessionState = 'pomodoro'
        timer.currentTime = timer.sessionLength - 6000
        expect(ctrl.resetButton()).toBe(true);
      }); // end it

      it("should return true if it's greater than 5s into a break", function () {
        timer.sessionState = 'break'
        timer.currentTime = timer.breakLength - 6000
        expect(ctrl.resetButton()).toBe(true);
      }); // end it

      it("should reset the currentTime to seessionLength when clicked", function() {
        timer.sessionState = 'pomodoro'
        timer.currentTime = timer.sessionLength - 10000
        ctrl.resetTimer()
        expect(timer.currentTime).toBe(timer.sessionLength);
      }); // end it

      it("should reset the currentTime to breakLength if it's break session", function() {
        timer.sessionState = 'break'
        timer.currentTime = timer.breakLength - 10000
        ctrl.resetTimer()
        expect(timer.currentTime).toBe(timer.breakLength);
      }); // end it

    }); // end describe reset button

  }); // end describe main component controller



  describe("The clockface controller", function () {
    var ctrl, scope, rootScope, timer, interval

    beforeEach(angular.mock.module('app'))

    beforeEach(inject(function ($controller, $rootScope, $interval, timerService) {
      rootScope = $rootScope
      scope = rootScope.$new()
      ctrl = $controller('timerClockfaceCtrl', { $scope: scope })
      timer = timerService
      interval = $interval
    }))
    
    it("should toggle between countdown and stop on click w/ toggle.Timer!", function() {
      timer.currentTime = 1500000
      ctrl.toggleTimer()
      interval.flush(10000)
      ctrl.toggleTimer()
      expect(ctrl.displayTime).toBe('24:50');
    }); // end it
    
    it("should return 'h:mm:ss' if time is greater than or equal to 3600000", function() {
      timer.currentTime = 3610000
      ctrl.toggleTimer()
      interval.flush(10000)
      ctrl.toggleTimer()
      expect(ctrl.displayTime).toBe('1:00:00');
    }); // end it

    it("should alter the currentTime when the sessionLength changes, while it is paused", function() {


    }); // end it



  }); // end describe clockface controller


  describe("Time Adjuster Controller", function () {
    var ctrl, scope, rootScope, timer, interval

    beforeEach(angular.mock.module('app'))

    beforeEach(inject(function ($controller, $rootScope, $interval, timerService) {
      rootScope = $rootScope
      scope = rootScope.$new()
      ctrl = $controller('timeAdjusterCtrl', { $scope: scope })
      timer = timerService
      interval = $interval
    }))

    it("increases the breakLength by the minute", function() {
      timer.breakLength = 300000
      ctrl.increaseBreakLength()
      expect(timer.breakLength).toBe(360000);
    }); // end it

    it("decreases the breakLength by the minute", function() {
      timer.breakLength = 300000
      ctrl.decreaseBreakLength()
      expect(timer.breakLength).toBe(240000);
    }); // end it

    it("increases the sessionLength by the minute", function() {
      timer.sessionLength = 1500000
      ctrl.increaseSessionLength()
      expect(timer.sessionLength).toBe(1560000);
    }); // end it

    it("decreases the sessionLength by the minute", function() {
      timer.sessionLength = 1500000
      ctrl.decreaseSessionLength()
      expect(timer.sessionLength).toBe(1440000);
    }); // end it

  }); // end describe time adjuster controller

}); // end describe
