'use strict';

var idleTimer; // the 5s timer that checks idleness of user
var isTrackingTime = false; // variable to check if app is currently tracking time spent on facebook

// reset idleness on the following events;
window.addEventListener('load', resetIdleTimer, false);
window.addEventListener('mousemove', resetIdleTimer, false);
window.addEventListener('mousedown', resetIdleTimer, false);
window.addEventListener('keypress', resetIdleTimer, false);
window.addEventListener('DOMMouseScroll', resetIdleTimer, false);
window.addEventListener('mousewheel', resetIdleTimer, false);
window.addEventListener('touchmove', resetIdleTimer, false);
window.addEventListener('MSPointerMove', resetIdleTimer, false);

// stop counting time when the page closes
window.addEventListener('beforeunload', stopTrackingTime, false);

/**
 * Resets the idle timer, triggered when a user event (click, mousemove) is detected
 */
function resetIdleTimer() {
    clearTimeout(idleTimer);
    startTrackingTime();
    idleTimer = setTimeout(stopTrackingTime, 5000); // 1000 millisec = 1 sec
};

/**
 * Sends a message to background to start tracking time
 */
function startTrackingTime() {
    if (isTrackingTime) return; // if we're already tracking time then do nothing
    isTrackingTime = true;
    chrome.runtime.sendMessage({action: 'startTrackingTime'}, function(response) {});
    console.log('start tracking time');
}

/**
 * Sends a message to background to stop tracking time
 */
function stopTrackingTime() {
    isTrackingTime = false;
    chrome.runtime.sendMessage({action: 'stopTrackingTime'}, function(response) {});
    console.log('stop tracking time');
}

console.log('\'Allo \'Allo! Content script');
