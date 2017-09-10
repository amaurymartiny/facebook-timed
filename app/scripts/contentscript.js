// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';

// Content script to be injected on the tracked website (i.e. facebook or reddit...)

let idleTimer; // the 5s timer that checks idleness of user
let isTrackingTime = false; // variable to check if app is currently tracking time spent on facebook
const port = chrome.runtime.connect({ name: 'facebook' }); // start a long-lived connection with background for time tracking

// ======================================================
// Time tracking with event detection
// ======================================================
// Reset idleness on the following events
window.addEventListener('load', resetIdleTimer);
window.addEventListener('mousemove', resetIdleTimer);
window.addEventListener('mousedown', resetIdleTimer);
window.addEventListener('keypress', resetIdleTimer);
window.addEventListener('DOMMouseScroll', resetIdleTimer);
window.addEventListener('mousewheel', resetIdleTimer);
window.addEventListener('touchmove', resetIdleTimer);
window.addEventListener('MSPointerMove', resetIdleTimer);

/**
 * Stop counting time when the page closes, and disconnect port
 */
window.addEventListener('beforeunload', () => {
  stopTrackingTime();
  port.disconnect();
});

/**
 * Resets the idle timer, triggered when a user event (e.g. click, mousemove) is detected
 */
function resetIdleTimer () {
  clearTimeout(idleTimer);
  startTrackingTime();
  idleTimer = setTimeout(stopTrackingTime, 5000); // 1000 millisec = 1 sec
}

/**
 * Sends a message to background to start tracking time
 */
function startTrackingTime () {
  if (isTrackingTime) return; // if we're already tracking time then do nothing
  isTrackingTime = true;
  port.postMessage({ action: 'SET_ACTIVE', payload: isTrackingTime });
  console.log('startTrackingTime');
}

/**
 * Sends a message to background to stop tracking time
 */
function stopTrackingTime () {
  isTrackingTime = false;
  port.postMessage({ action: 'SET_ACTIVE', payload: isTrackingTime });
}

// ======================================================
// Showing time on label
// ======================================================
/**
 * Modify Facebook DOM to add label with time tracked
 */
(function () {
  let el = document.querySelector('[role="navigation"]');
  timeLabel = document.createElement('div');
  timeLabel.id = 'timed-label';
  timeLabel.innerHTML = '00:00:00';
  el.insertBefore(timeLabel, el.firstChild);
})();

/**
 * Update time on facebook page when receiving a message from background
 */
port.onMessage.addListener(msg => {
  if (msg.action === 'UPDATE_TRACKED_TIME')
    updateLabel(msg.trackObject.today);
});

/**
 * Update time shown on label with updated value
 */
function updateLabel(timeTrackedToday) {
  // update time label with hh:mm:ss format
  var hours = parseInt(timeTrackedToday / 3600) % 24;
  var minutes = parseInt(timeTrackedToday / 60) % 60;
  var seconds = timeTrackedToday % 60;
  var hhmmss = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds  < 10 ? '0' + seconds : seconds);
  timeLabel.innerHTML = hhmmss;
}

