const port = chrome.runtime.connect({name: 'Popup'}); // start a long-lived connection with background for time tracking

// get trackedTime from background
port.postMessage({action: 'GET_TRACKED_TIME'});

/**
 * Update time in popup when receiving a message from background
 */
port.onMessage.addListener(msg => {
  if (msg.action == 'UPDATE_TRACKED_TIME') {
    console.log($('#today'))
    $('#today').html(readableTime(msg.trackObject.today));
    $('#total').html(readableTime(msg.trackObject.total));
    // add popup for startDate
    $('#startDate').attr('title', readableDate(msg.trackObject.startDate));
  }
});

/**
 * Format seconds to hh:mm:ss format
 */
function readableTime(totalSec) {
  let hours = parseInt( totalSec / 3600 ) % 24;
  let minutes = parseInt( totalSec / 60 ) % 60;
  let seconds = totalSec % 60;

  return '<span class="time-tracked-number">' + (hours < 10 ? '0' + hours : hours) + '</span>h<span class="time-tracked-number">' + (minutes < 10 ? '0' + minutes : minutes) + '</span>m<span class="time-tracked-number">' + (seconds  < 10 ? '0' + seconds : seconds) + '</span>s';
}

/**
 * Format date to dd/mm/yyyy format
 */
function readableDate(dateString) {
  const date = new Date(dateString)
  const d = date.getDate()
  const m = date.getMonth() + 1 // months are 0-11
  const y = date.getFullYear()
  return `${d < 10 ? '0' + d : d}/${m < 10 ? '0' + m : m}/${y}`
}

/**
 * Add tooltip for startDate
 */
$('#startDate').tipsy({gravity: 's'});

/**
 * Add tooltip for CTA button
 */
$('#cta a').tipsy({gravity: 'sw', html: true, opacity: 1 });
