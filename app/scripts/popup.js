// Enable chromereload by uncommenting this line:
import $ from 'jquery';
import 'chromereload/devonly';
import { trackableWebsites } from './config';

let name;
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  // Since there can only be one active tab in one active window,
  // the array has only one element
  var tab = tabs[0];

  // To find the name of this website, we match the tab url
  // to the corresponding regex in our config file
  name = Object.keys(trackableWebsites).find((key) => {
    return trackableWebsites[key].regex.test(tab.url);
  });

  init();
});

// Start a long-lived connection with background for time tracking
const port = chrome.runtime.connect({ name: 'popup' });

/**
 * Format seconds to hh:mm:ss format
 */
const readableTime = (sec) => {
  const hours = parseInt(sec / 3600) % 24;
  const minutes = parseInt(sec / 60) % 60;
  const seconds = sec % 60;
  return '<span class="time-tracked-number">' + (hours < 10 ? '0' + hours : hours) + '</span>h<span class="time-tracked-number">' + (minutes < 10 ? '0' + minutes : minutes) + '</span>m<span class="time-tracked-number">' + (seconds < 10 ? '0' + seconds : seconds) + '</span>s';
};

/**
 * Format date to dd/mm/yyyy format
 */
const readableDate = (dateString) => {
  const date = new Date(dateString);
  const d = date.getDate();
  const m = date.getMonth() + 1; // Months are 0-11
  const y = date.getFullYear();
  return `${d < 10 ? '0' + d : d}/${m < 10 ? '0' + m : m}/${y}`;
};

/**
 * Update time in popup when receiving a message from background
 */
port.onMessage.addListener((message) => {
  if (message.action === 'UPDATE_TIME') {
    $('#template-today').html(readableTime(message.payload[name].today));
    $('#template-total').html(readableTime(message.payload[name].total));
    // Calculate average per day
    const days = Math.ceil((new Date()).setHours(23, 59, 59, 999) - (new Date(message.payload[name].startDate).setHours(0, 0, 0, 0))) / 1000 / 3600 / 24; // Date diff in days
    $('#template-average').html(readableTime(Math.round(message.payload[name].total / days)));
    // Add popup for startDate
    $('#template-start-date').html(readableDate(message.payload[name].startDate));
  }
});

/**
 * Initialize template
 */
const init = () => {
  $('#template-name').text(trackableWebsites[name].name);
  port.postMessage({ action: 'GET_TIME' });

  // Disconnect port on exit
  window.addEventListener('beforeunload', () => {
    port.disconnect();
  });
};
