export default {
  name: '9GAG',
  regex: /(?:www.)?9gag.com/,
  addElement: () => {
    const el = document.querySelector('.nav-menu .menu');
    const li = document.createElement('li');
    el.appendChild(li);
    const label = document.createElement('a');
    label.className = 'timed-label-9gag';
    label.innerHTML = '00:00:00';
    li.appendChild(label);
    // Important! Return the label element
    return label;
  }
};
