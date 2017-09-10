// ======================================================
// Manage notifications
// ======================================================
let notificationPeriod;

// Get notification period from local storage
chrome.storage.sync.get('notificationPeriod', (items) => {
  notificationPeriod = items.notificationPeriod;
});

// Update notification perdion when it gets updated from options
chrome.storage.onChanged.addListener((changes) => {
  notificationPeriod = changes.notificationPeriod.newValue;
});

const capitalize = (s) => s.replace(/\b\w/g, l => l.toUpperCase());

const readableTime = (sec) => {
  const hours = parseInt(sec / 3600) % 24;
  const minutes = parseInt(sec / 60) % 60;
  return `${hours > 0 ? hours + 'hours' : ''}${minutes} minutes`;
};

export const getNotificationPeriod = () => notificationPeriod;

export const createNotification = (name, track) => {
  chrome.notifications.create({
    type: 'basic',
    title: `${capitalize(name)}Timed`,
    message: `You've been browsing on ${capitalize(name)} for ${readableTime(track.today)} today.`,
    iconUrl: 'images/watch_128_padding16.png'
  });
};
