export default {
  name: 'YouTube',
  regex: /(?:www.)?youtube.com/,
  addElement: () => {
    const el = document.querySelector('#yt-masthead-user');
    // Add the label containing the tracked time
    const label = document.createElement('span');
    label.className = 'timed-label-youtube';
    label.innerHTML = '00:00:00';
    el.insertBefore(label, el.firstChild);
    // Important! Return the label element
    return label;
  }
};
