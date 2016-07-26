'use strict';

var trackerTimer = null; // 1s timer that tracks time spent on facebook

var timeTrackedToday = 0; // time spent on facebook today
var timeTrackedTotal = 0; // time spent on facebook all time

var ports = []; // when multiple facebook tabs, save all the long-lived connection port inside this array

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
 * Update time on content scripts label to be shown on Facebook DOM
 * @param  {Port} ports all the opened long-lived connections to send the time to
 */
function updateTime() {
  ++timeTrackedToday;
  ++timeTrackedTotal;
  console.log(ports);
  for (var i = ports.length - 1; i >= 0; i--) {
    ports[i].postMessage({
      action: 'updateTrackedTime',
      timeTrackedToday: timeTrackedToday,
      timeTrackedTotal: timeTrackedTotal
    });
  }
}

/**
 * Run when a new long-lived connection is established (i.e. a new Facebook tab opens)
 */
chrome.runtime.onConnect.addListener(port => {

  // add this port to the list of all ports
  console.log('New port opened.');
  ports.push(port);

  // listen to messages from the content scripts
  port.onMessage.addListener(msg => {
    console.log(msg.action)
    if (msg.action == 'startTrackingTime')
      startTrackerTimer();
    if (msg.action == 'stopTrackingTime')
      stopTrackerTimer();
  });

  port.onDisconnect.addListener(port => {
    for (var i = ports.length - 1; i >= 0; i--) {
      if (ports[i].sender.id == port.sender.id) {
        ports.splice(i, 1);
        console.log('Port closed.');
        break;
      }
    }
  })
});