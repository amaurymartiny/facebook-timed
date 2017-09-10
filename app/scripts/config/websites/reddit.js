export default {
  regex: /(?:www.)?reddit.com/,
  addElement: () => {
    const el = document.querySelector('#header-bottom-right');
    // Add a separator
    const separator = document.createElement('span');
    separator.innerHTML = '|';
    separator.className = 'separator';
    el.insertBefore(separator, el.firstChild);
    // Add the label containing the tracked time
    const label = document.createElement('span');
    label.className = 'timed-label-reddit';
    label.innerHTML = '00:00:00';
    el.insertBefore(label, el.firstChild);
    return label;
  }
};
