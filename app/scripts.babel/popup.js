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
  	console.log(msg)
  	timeTrackedTodayLabel.innerHTML = msg.timeTrackedToday;
  	timeTrackedTotalLabel.innerHTML = msg.timeTrackedTotal;
  	installDateLabel.innerHTML = msg.installDate;
  }
    
});

console.log('\'Allo \'Allo! Popup');
