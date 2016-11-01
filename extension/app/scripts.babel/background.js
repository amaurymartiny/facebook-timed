'use strict';

let trackerTimer = null; // 1s timer that tracks time spent on facebook

let timeTrackedToday = window.localStorage.getItem('timeTrackedToday') || 0; // time spent on facebook today
let timeTrackedTotal = window.localStorage.getItem('timeTrackedTotal') || 0; // time spent on facebook all time

let ports = []; // when multiple facebook tabs, save all the long-lived connection port inside this array

let lastUsedDay = localStorage.getItem('lastUsedDay'); // date of last usage

// ======================================================
// Do on install
// ======================================================
/**
 * Check whether new version is installed
 */
chrome.runtime.onInstalled.addListener(details => {
    if (details.reason == 'install') {
      // save the beginning time of use in localStorage
      localStorage.setItem('installDate', new Date());
    } else if (details.reason == 'update') {
      console.log('Timed updated from ' + details.previousVersion + ' to ' + chrome.runtime.getManifest().version + '.');
    }
});

// ======================================================
// Time tracking
// ======================================================
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
  // whenever we stop tracking time, we save the time to localStorage
  window.localStorage.setItem('timeTrackedToday', timeTrackedToday);
  window.localStorage.setItem('timeTrackedTotal', timeTrackedTotal);
}

/**
 * Update time on content scripts label to be shown on Facebook DOM
 */
function updateTime() {
  ++timeTrackedToday;
  ++timeTrackedTotal;

  // reset timeTrackedToday if day changed
  const todayDay = (new Date()).getUTCDate(); // what day is today?
  if (lastUsedDay != todayDay) { // reset tracker is todayDay is not last used day
    timeTrackedToday = 0;
    lastUsedDay = todayDay;
    localStorage.setItem('lastUsedDay', lastUsedDay)
  }

  // update time on all ports
  sendToAllPorts();
}

// ======================================================
// Communication with content scripts
// ======================================================
/**
 * Send all tracked time information from background to all open ports (popups and tabs)
 */
function sendToAllPorts() {
  for (let i = ports.length - 1; i >= 0; i--) {
    ports[i].postMessage({
      action: 'updateTrackedTime',
      installDate: localStorage.getItem('installDate'),
      timeTrackedToday: timeTrackedToday,
      timeTrackedTotal: timeTrackedTotal
    });
  }
}

/**
 * Run when a new long-lived connection is established (i.e. when a new Facebook tab opens)
 */
chrome.runtime.onConnect.addListener(port => {

  // add this port to the list of all ports
  console.log('New port opened.');
  ports.push(port);

  // listen to messages from the content scripts
  port.onMessage.addListener(msg => {
    console.log(msg.action)
    switch(msg.action) {
      case 'startTrackingTime':
        startTrackerTimer();
        break;
      case 'stopTrackingTime':
        stopTrackerTimer();
        break;
      case 'getTrackedTime':
        sendToAllPorts();
        break;
    }
  });

  port.onDisconnect.addListener(port => {
    // remove port from the list of all ports
    for (var i = ports.length - 1; i >= 0; i--) {
      if (ports[i].sender.id == port.sender.id) {
        ports.splice(i, 1);
        console.log('Port closed.');
        break;
      }
    }
  })
});

// ======================================================
// Communication with web app (to get token)
// ======================================================
/**
 * Receive new token from Timed web page after authentication
 */
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  console.log('New token received.');
  localStorage.setItem('idToken', request.id_token);
});

// ======================================================
// Communication with server (to update times on server)
// ======================================================
/**
 * General helper function to create a XHR object
 */
function createXHR(method, endpoint, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8080/api' + endpoint, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // JSON.parse does not evaluate the attacker's scripts.
      return callback(JSON.parse(xhr.responseText));
    }
  }
  xhr.send();
}

/**
 * Helper object to do the API requests
 */
const callAPI = {
  get: (endpoint, callback) => createXHR('GET', endpoint, callback),
  put: (endpoint, callback) => createXHR('PUT', endpoint, callback)
}

/**
 * Get the trackId of our website
 */
function getTrackId() {
  callAPI.get('/websites', (res) => {
    console.log(res)
  })
}
getTrackId();