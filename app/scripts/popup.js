// Enable chromereload by uncommenting this line:
import $ from 'jquery';
// import * from 'jquery.tipsy';
import 'chromereload/devonly';

// Start a long-lived connection with background for time tracking
const port = chrome.runtime.connect({ name: 'popup' });

/**
 * Format seconds to hh:mm:ss format
 */
const readableTime = (sec) => {
  let hours = parseInt(sec / 3600) % 24;
  let minutes = parseInt(sec / 60) % 60;
  let seconds = sec % 60;
  return '<span class="time-tracked-number">' + (hours < 10 ? '0' + hours : hours) + '</span>h<span class="time-tracked-number">' + (minutes < 10 ? '0' + minutes : minutes) + '</span>m<span class="time-tracked-number">' + (seconds  < 10 ? '0' + seconds : seconds) + '</span>s';
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
    $('#template-name').text(message.payload.name);
    $('#template-today').html(readableTime(message.payload.today));
    $('#template-total').html(readableTime(message.payload.total));
    // Add popup for startDate
    $('#template-start-date').attr('title', readableDate(message.payload.startDate));
  }
});

/**
 * Add tooltip for startDate
 */
// $('#template-start-date').tipsy({gravity: 's'});
