'use strict';

var trackingTimePort = chrome.runtime.connect({name: 'trackingTime'}); // start a long-lived connection with background for time tracking

// get trackedTime from background
trackingTimePort.postMessage({action: 'getTrackedTime'});

// dom elements
var timeTrackedTodayLabel = document.getElementById('time-tracked-today-label');
var timeTrackedTotalLabel = document.getElementById('time-tracked-total-label');
var installDateLabel = document.getElementById('install-date-label');

/**
 * Update time in popup when receiving a message from background
 */
trackingTimePort.onMessage.addListener(msg => {
  if (msg.action == 'updateTrackedTime') {
    timeTrackedTodayLabel.innerHTML = readableTime(msg.timeTrackedToday);
    timeTrackedTotalLabel.innerHTML = readableTime(msg.timeTrackedTotal);
    installDateLabel.innerHTML = new Date(msg.installDate);
  }
    
});

/**
 * Transform seconds to hh:mm:ss format
 */
function readableTime(totalSec) {
  var hours = parseInt( totalSec / 3600 ) % 24;
  var minutes = parseInt( totalSec / 60 ) % 60;
  var seconds = totalSec % 60;

  return '<span class="time-tracked-number">' + (hours < 10 ? '0' + hours : hours) + '</span>h<span class="time-tracked-number">' + (minutes < 10 ? '0' + minutes : minutes) + '</span>m<span class="time-tracked-number">' + (seconds  < 10 ? '0' + seconds : seconds) + '</span>s';
}

// // Decode utf8 characters properly
// const cid = 'fDytCVJ9hSD0jNdXj5mgibrbbFF3AyAJ';
// const domain = 'amaurymartiny.auth0.com';

// const lock = new Auth0Lock(cid, domain);

// lock.show();

// var connection = config.connection;
// var prompt = config.prompt;

// var initializationOptions = {
//   assetsUrl:  config.assetsUrl,
//   cdn:        config.cdn
// };

// var lock = new Auth0Lock(config.clientID, config.auth0Domain, initializationOptions);
// lock.show({
//   // icon:            '{YOUR_LOGO_URL}',
//   callbackURL:        config.callbackURL,
//   responseType:       config.callbackOnLocationHash ? 'token' : 'code',
//   dict:               config.dict,
//   connections:        connection ? [connection] : null,
//   rememberLastLogin:  !prompt,
//   container:          'widget-container',
//   authParams:         config.internalOptions
// });