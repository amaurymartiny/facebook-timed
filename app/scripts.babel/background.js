'use strict';

var trackerTimer = null; // 1s timer that tracks time spent on facebook

var timeTrackedToday = 0;
var timeTrackedTotal = 0;

// chrome.runtime.onInstalled.addListener(details => {
//     console.log('previousVersion', details.previousVersion);
// });

/**
 * Listen to messages from the content scripts
 */
chrome.runtime.onConnect.addListener(port => {

  //
  console.assert(port.name == 'trackingTime');

  /**
   * Start tracking time spent on facebook
   */
  function startTrackerTimer() {
    if (trackerTimer) return;
    trackerTimer = setInterval(updateTime, 1000);
  }

  /**
   * Stop tracking time spent on facebook
   */
  function stopTrackerTimer() {
    clearInterval(trackerTimer);
    trackerTimer = null;
  }

  /**
   * Update the time tracked
   */
  function updateTime() {
    ++timeTrackedToday;
    ++timeTrackedTotal;
    port.postMessage({
      action: 'updateTrackedTime',
      timeTrackedToday: timeTrackedToday,
      timeTrackedTotal: timeTrackedTotal
    });
  }

  port.onMessage.addListener(msg => {
    console.log(msg.action)
    if (msg.action == 'startTrackingTime')
      startTrackerTimer();
    if (msg.action == 'stopTrackingTime')
      stopTrackerTimer();
  });
});