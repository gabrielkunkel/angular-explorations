# Angular Explorations

## My Pomodoro Application

In partial completion of freeCodeCamp's Frontend Developer Certificate, I present to you
my pomodoro timer.

### Application Design

I really focused on getting to know Angular 1.4 and using test driven development throughout
the process. It is not intended to be pretty, but the testing coverage should be 100%. 

### User Stories

FreeCodeCamp's user stories include the following:

* I can start a 25 minute pomodoro, and the timer will go off once 25 minutes has elapsed.
* I can reset the clock for my next pomodoro.
* I can customize the length of each pomodoro.

I have added my own user stories that are more specific:

* When I click on the time, the clock starts counting down.
* When I click on the time again, the clock stops counting down.
* When the time has been counting down for 5s or more, a reset button is revealed.
* When I click on the reset button, the session time starts over and it is paused. The reset button has disappeared.
* Before the first time the clock runs there is a message instructing me to click on
the time to start my first session. It stays gone, unless the page is reloaded.

I intend to confirm this functionality by testing it with Protractor.
