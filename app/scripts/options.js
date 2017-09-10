// Enable chromereload by uncommenting this line:
import $ from 'jquery';
import 'chromereload/devonly';

chrome.storage.sync.get('notificationPeriod', (items) => {
  $('#notificationPeriodInput').val(items.notificationPeriod || 10).change(function () {
    const val = $(this).val();
    console.log(val)
    chrome.storage.sync.set({
      notificationPeriod: val
    });
  });
});
