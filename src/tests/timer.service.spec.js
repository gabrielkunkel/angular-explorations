describe("The pomodoroClock factory", function() {
  var timer, $interval, canceledCheck, originalCurrent


  beforeEach(function () {
    angular.mock.module('app')
  });

  beforeEach(inject(function (timerService) {
    timer = timerService
  }))

  it("has a current time property", function() {
    expect(timer.currentTime).toBeDefined();
    expect(timer.currentTime).toEqual(jasmine.any(Number));
  }); // end it

  it("has a stop property set to 0", function() {
    expect(timer.STOP).toBe(0);
  }); // end it
  
  it("has a break length property", function() {
    expect(timer.breakLength).toBeDefined();
    expect(timer.breakLength).toEqual(jasmine.any(Number));
  }); // end it

  it("has a session length property", function() {
    expect(timer.sessionLength).toBeDefined();
    expect(timer.sessionLength).toEqual(jasmine.any(Number));
  }); // end it

  it("has an interval time of 1000 so it will be equal to 1 second", function() {
    expect(timer.INTERVAL).toBe(1000);
  }); // end it

  describe("methods", function() {

    beforeEach(inject(function (_$interval_) {
      $interval = _$interval_
      originalCurrent = 0
    }))

    it("decrements the currentTime every 1000 ms by 1000", function() {
      // start countdown
      timer.startCountdown()

      // move the interval along
      $interval.flush(4000)

      // check that the time is what it should be
      expect(timer.currentTime).toBe(1496000);
    }); // end it

    it("stops when you tell it to", function() {

      // start countdown
      timer.startCountdown()

      // move the interval along
      $interval.flush(5000)
      expect(timer.currentTime).toBe(1495000);

      // stop countdown
      canceledCheck = timer.stopCountdown()
      expect(canceledCheck).toBe(true);
    }); // end it

    it("switches between break and session time at 0", function() {

      // start countdown
      timer.startCountdown()

      // move currentTime to 0
      $interval.flush(timer.sessionLength)
      expect(timer.currentTime).toBe(timer.breakLength);

      // move currentTime to 0 again
      $interval.flush(timer.breakLength)
      expect(timer.currentTime).toBe(timer.sessionLength);

    }); // end it
    
    it("resets in pomodoro session state", function() {
      originalCurrent = timer.currentTime
      timer.sessionState = 'pomodoro'

      // start countdown
      timer.startCountdown()

      // move currentTime a ways
      $interval.flush(5000)
      expect(timer.currentTime).toBe(originalCurrent - 5000);

      // reset the time for the sessionState
      timer.resetCountdown()
      expect(timer.currentTime).toBe(timer.sessionLength);
    }); // end it

    it("resets in break session state", function() {
      timer.currentTime = timer.breakLength
      originalCurrent = timer.currentTime
      timer.sessionState = 'break'

      // start countdown
      timer.startCountdown()

      // move currentTime a ways
      $interval.flush(5000)
      expect(timer.currentTime).toBe(originalCurrent - 5000);

      // reset the time for the sessionState
      timer.resetCountdown()
      expect(timer.currentTime).toBe(timer.breakLength);
    }); // end it



  }); // end describe



}); // end describe