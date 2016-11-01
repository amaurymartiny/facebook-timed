'use strict';

const trackingTimePort = chrome.runtime.connect({name: 'trackingTime'}); // start a long-lived connection with background for time tracking

// get trackedTime from background
trackingTimePort.postMessage({action: 'getTrackedTime'});

// dom elements
const timeTrackedTodayLabel = document.getElementById('time-tracked-today-label');
const timeTrackedTotalLabel = document.getElementById('time-tracked-total-label');
const installDateLabel = document.getElementById('install-date-label');

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
  let hours = parseInt( totalSec / 3600 ) % 24;
  let minutes = parseInt( totalSec / 60 ) % 60;
  let seconds = totalSec % 60;

  return '<span class="time-tracked-number">' + (hours < 10 ? '0' + hours : hours) + '</span>h<span class="time-tracked-number">' + (minutes < 10 ? '0' + minutes : minutes) + '</span>m<span class="time-tracked-number">' + (seconds  < 10 ? '0' + seconds : seconds) + '</span>s';
}
