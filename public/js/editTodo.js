const editIcons = document.querySelectorAll('.icon[type=edit]');

editIcons.forEach((icon) => {
  icon.addEventListener('click', function () {
    if (this.classList.contains('clicked')) {
      let input = this.parentElement.parentElement.children[1];
      console.log(input.value);
      // add here the put request
      console.log('taraaaa!!! hahaha');
    } else {
      let label = this.parentElement.parentElement.children[1];
      const id = label.getAttribute('for');
      let parent = this.parentElement.parentElement;
      let input = document.createElement('input');
      setAttributes(input, {
        type: 'text',
        class: 'form-control',
        value: label.innerText,
        'data-id': id,
      });
      input.addEventListener('focus', function () {
        console.log('heyyy');
      });
      parent.appendChild(input);
      parent.replaceChild(input, label);
      this.classList.add('clicked');
    }
  });
});

function setAttributes(el, options) {
  Object.keys(options).forEach((attr) => {
    el.setAttribute(attr, options[attr]);
  });
}
