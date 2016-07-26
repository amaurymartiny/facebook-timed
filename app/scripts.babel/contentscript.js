'use strict';

var idleTimer; // the 5s timer that checks idleness of user
var isTrackingTime = false; // variable to check if app is currently tracking time spent on facebook

// reset idleness on the following events;
document.addEventListener('load', resetIdleTimer, false);
document.addEventListener('mousemove', resetIdleTimer, false);
document.addEventListener('mousedown', resetIdleTimer, false);
document.addEventListener('keypress', resetIdleTimer, false);
document.addEventListener('DOMMouseScroll', resetIdleTimer, false);
document.addEventListener('mousewheel', resetIdleTimer, false);
document.addEventListener('touchmove', resetIdleTimer, false);
document.addEventListener('MSPointerMove', resetIdleTimer, false);

function resetIdleTimer() {
    clearTimeout(idleTimer);
    startTrackTimer();
    idleTimer = setTimeout(stopTrackTimer, 5000); // 1000 millisec = 1 sec
};

function startTrackTimer() {
    if (isTrackingTime) return; // if we're already tracking time then do nothing
    isTrackingTime = true;
    console.log('start tracking time');
}

function stopTrackTimer() {
    isTrackingTime = false;
    console.log('stop tracking time');
}

console.log('\'Allo \'Allo! Content script');
