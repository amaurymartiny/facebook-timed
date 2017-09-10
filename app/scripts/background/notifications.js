// ======================================================
// Manage notifications
// ======================================================
let notificationPeriod;

chrome.storage.sync.get('notificationPeriod', (items) => {
  notificationPeriod = items.notificationPeriod;
});

export const getNotificationPeriod = () => {
  return notificationPeriod;
};

export const createNotification = (name, track) => {
  chrome.notifications.create({
    type: 'basic',
    title: 'Timed',
    message: `You've been browsing on ${name} for ${track.today} minutes today.`,
    iconUrl: 'images/watch_128_padding16.png'
  });
};
