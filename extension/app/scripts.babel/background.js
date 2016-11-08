'use strict';

let trackerTimer = null; // 1s timer that tracks time spent on facebook

let ports = []; // when multiple facebook tabs, save all the long-lived connection port inside this array

let lastUsedDay = localStorage.getItem('lastUsedDay'); // date of last usage

// The track object that will be updated to the server
let trackObject = JSON.parse(localStorage.getItem('trackObject')) || {
  // there are other properties when the extension is connected to the web app (_id, auth0Id, website)
  today: 0, // time spent on facebook today
  total: 0 // time spent on facebook all time
};

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
  localStorage.setItem('trackObject', JSON.stringify(trackObject))

  // // whenever we stop tracking time, we update the time on the server
  // putTrackObject();
}

/**
 * Update time on content scripts label to be shown on Facebook DOM
 */
function updateTime() {
  trackObject.today = trackObject.today + 1;
  trackObject.total = trackObject.total + 1;

  // reset time tracked today if day changed
  const todayDay = (new Date()).getUTCDate(); // what day is today?
  if (lastUsedDay != todayDay) { // reset tracker is todayDay is not last used day
    trackObject.today = 0;
    lastUsedDay = todayDay;
    localStorage.setItem('lastUsedDay', lastUsedDay)
  }

  // update time on all ports
  sendToAllPorts();
}

// ======================================================
// Communication via messages
// ======================================================
/**
 * Send tracked time when receive corresponding action
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (msg.action == 'GET_TRACKED_TIME') {
    sendToAllPorts();
  }
});

/**
 * Send all tracked time information from background to all open ports (popups and tabs)
 */
function sendToAllPorts() {
  for (let i = ports.length - 1; i >= 0; i--) {
    ports[i].postMessage({
      action: 'UPDATE_TRACKED_TIME',
      installDate: localStorage.getItem('installDate'),
      trackObject: trackObject
    });
  }
}

// ======================================================
// Communication via long-lived connection (only for start/stop tracking time)
// ======================================================
/**
 * Run when a new long-lived connection is established (i.e. when a new Facebook tab opens)
 */
chrome.runtime.onConnect.addListener(port => {

  // add this port to the list of all ports
  console.log('New port opened:', port.name);
  ports.push(port);

  // listen to messages from the content scripts
  port.onMessage.addListener(msg => {
    console.log(msg.action)
    switch(msg.action) {
      case 'START_TRACKING_TIME':
        startTrackerTimer();
        break;
      case 'STOP_TRACKING_TIME':
        stopTrackerTimer();
        break;
      case 'GET_TRACKED_TIME':
        sendToAllPorts();
        break;
    }
  });

  port.onDisconnect.addListener(port => {
    // remove port from the list of all ports
    for (var i = ports.length - 1; i >= 0; i--) {
      if (ports[i].sender.id == port.sender.id) {
        ports.splice(i, 1);
        console.log('Port closed:', port.name);
        break;
      }
    }
  })
});

// ======================================================
// Communication with web app via External message
// ======================================================
/**
 * Receive new token from Timed web page after authentication
 */
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  switch(request.action) {
    case 'SET_NEW_TOKEN':
      localStorage.setItem('id_token', request.id_token);
      console.log('New token received.');
      break;
    case 'SET_NEW_PROFILE':
      localStorage.setItem('profile', JSON.stringify(request.profile));
      break;
  }

  // update the track object
  getTrackObject();
});

// ======================================================
// Communication with server 
// ======================================================
/**
 * General helper function to create a XHR object
 */
function createXHR(method, endpoint, data, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, 'http://localhost:8080/api' + endpoint, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  if (localStorage.getItem('id_token'))
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // JSON.parse does not evaluate the attacker's scripts.
      return callback(JSON.parse(xhr.responseText));
    }
  }
  xhr.send(JSON.stringify(data));
}

/**
 * Helper object to do the API requests
 */
let callAPI = {
  get: (endpoint, callback) => createXHR('GET', endpoint, null, callback),
  put: (endpoint, data, callback) => createXHR('PUT', endpoint, data, callback)
}

/**
 * Get the track object of our website
 */
function getTrackObject() {
  // if we are not logged in, then abort
  if (!localStorage.getItem('id_token'))
    return;

  let query = encodeURIComponent('https://facebook.com'); //TODO future: get this from contentscript.
  callAPI.get('/websites/find?url=' + query, (res) => {
    let websiteId = res[0]._id;
    callAPI.get('/tracks/find?website=' + websiteId, (res) => {
      // don't update today and total
      trackObject._id = res[0]._id;
      trackObject.auth0Id = res[0].auth0Id;
      trackObject.website = res[0].website;

      // we save these data to localStorage
      localStorage.setItem('trackObject', JSON.stringify(trackObject))
    })
  });
}
// call it once in the beginning
getTrackObject();

// /**
//  * Update (PUT) the track object on the server
//  */
// function putTrackObject(argument) {
//   // if we are not logged in, then abort
//   if (!localStorage.getItem('id_token'))
//     return;


//   // update track object from up-to-date values
//   // TODO put up-to-date values inside trackObject
//   trackObject.timeTrackedToday = timeTrackedToday;
//   trackObject.timeTrackedTotal = timeTrackedToday;

//   callAPI.put('/tracks/' + trackObject._id, trackObject, (res) => {
//     console.log('Tracked times updated on server.');
//   })
// }