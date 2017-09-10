export default {
  regex: /(?:www.)?facebook.com/,
  addElement: () => {
    const el = document.querySelector('[role="navigation"]');
    const label = document.createElement('div');
    label.className = `timed-label-facebook`;
    label.innerHTML = '00:00:00';
    el.insertBefore(label, el.firstChild);
    // Important! Return the label element
    return label;
  }
};
