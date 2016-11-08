'use strict';

var port = chrome.runtime.connect({ name: 'Popup' }); // start a long-lived connection with background for time tracking

// get trackedTime from background
port.postMessage({ action: 'GET_TRACKED_TIME' });

// dom elements
var timeTrackedTodayLabel = document.getElementById('time-tracked-today-label');
var timeTrackedTotalLabel = document.getElementById('time-tracked-total-label');
var installDateLabel = document.getElementById('install-date-label');

/**
 * Update time in popup when receiving a message from background
 */
port.onMessage.addListener(function (msg) {
  if (msg.action == 'UPDATE_TRACKED_TIME') {
    timeTrackedTodayLabel.innerHTML = readableTime(msg.trackObject.today);
    timeTrackedTotalLabel.innerHTML = readableTime(msg.trackObject.total);
    installDateLabel.innerHTML = new Date(msg.installDate);
  }
});

/**
 * Transform seconds to hh:mm:ss format
 */
function readableTime(totalSec) {
  var hours = parseInt(totalSec / 3600) % 24;
  var minutes = parseInt(totalSec / 60) % 60;
  var seconds = totalSec % 60;

  return '<span class="time-tracked-number">' + (hours < 10 ? '0' + hours : hours) + '</span>h<span class="time-tracked-number">' + (minutes < 10 ? '0' + minutes : minutes) + '</span>m<span class="time-tracked-number">' + (seconds < 10 ? '0' + seconds : seconds) + '</span>s';
}