// Enable chromereload by uncommenting this line:
import $ from 'jquery';
import 'chromereload/devonly';

// Start a long-lived connection with background for time tracking
const port = chrome.runtime.connect({ name: 'options' });

chrome.storage.sync.get('notificationPeriod', (items) => {
  $('#notificationPeriodInput').val(items.notificationPeriod || 30).change(function () {
    const val = $(this).val();
    chrome.storage.sync.set({
      notificationPeriod: val
    });
  });
});

$('.notification-example a').click(() => {
  port.postMessage({ action: 'SHOW_NOTIFICATION' });
});
