// ======================================================
// Content script to be injected on the tracked website
// ======================================================
import 'chromereload/devonly';
import * as label from './contentscript/label';
import { trackableWebsites } from './config';

// To find the name of this website, we match the window.location.host path
// to the corresponding regex in our config file
const name = Object.keys(trackableWebsites).find((key) => {
  return trackableWebsites[key].regex.test(window.location.host);
});

// Start a long-lived connection with background for time tracking
const port = chrome.runtime.connect({ name });

// ======================================================
// Time tracking event detection
// ======================================================
let idleTimer; // the 5s timer that checks idleness of user

/**
 * Resets the idle timer, triggered when a user event (e.g. click, mousemove) is detected
 */
const resetIdleTimer = () => {
  clearTimeout(idleTimer);
  startTrackingTime();
  idleTimer = setTimeout(stopTrackingTime, 5000); // 1000 millisec = 1 sec
};

// Reset idleness on the following events
window.addEventListener('load', resetIdleTimer);
window.addEventListener('mousemove', resetIdleTimer);
window.addEventListener('mousedown', resetIdleTimer);
window.addEventListener('keypress', resetIdleTimer);
window.addEventListener('DOMMouseScroll', resetIdleTimer);
window.addEventListener('mousewheel', resetIdleTimer);
window.addEventListener('touchmove', resetIdleTimer);
window.addEventListener('MSPointerMove', resetIdleTimer);

// Stop counting time when the page closes, and disconnect port
window.addEventListener('beforeunload', () => {
  stopTrackingTime();
  port.disconnect();
});

// ======================================================
// Communication with background script
// ======================================================
let isTrackingTime = false; // Variable to check if app is currently tracking time spent on facebook
/**
 * Sends a message to background to start tracking time
 */
const startTrackingTime = () => {
  if (isTrackingTime) return; // if we're already tracking time then do nothing
  isTrackingTime = true;
  port.postMessage({ action: 'SET_ACTIVE', payload: isTrackingTime });
};

/**
 * Sends a message to background to stop tracking time
 */
const stopTrackingTime = () => {
  isTrackingTime = false;
  port.postMessage({ action: 'SET_ACTIVE', payload: isTrackingTime });
};

/**
 * Update time on facebook page when receiving a message from background
 */
port.onMessage.addListener((message) => {
  if (message.action === 'UPDATE_TIME') {
    label.update(message.payload.today);
  }
});

// Initialize a label on the DOM
label.init(name);
