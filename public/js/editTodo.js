const editIcons = document.querySelectorAll('.icon[type=edit]');

editIcons.forEach((icon) => {
  icon.addEventListener('click', function () {
    if (!this.classList.contains('clicked')) {
      // the first click is changing the label into input field
      changeFieldToInput(this);
    } else if (this.classList.contains('clicked')) {
      // second click
      this.classList.remove('clicked');
      // add here the put request
      updateTodo(this);
    }
  });
});

function setAttributes(el, options) {
  Object.keys(options).forEach((attr) => {
    el.setAttribute(attr, options[attr]);
  });
}

function updateTodo(icon) {
  const input = icon.parentElement.parentElement.children[1];
  const { id } = input.dataset;
  fetch('/todos', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id, todo: input.value }),
  });

  console.log('put request sent');
  window.location.reload(false);
}

function changeFieldToInput(icon) {
  const label = icon.parentElement.parentElement.children[1];
  const id = label.getAttribute('for');
  const parent = icon.parentElement.parentElement;
  const input = document.createElement('input');

  setAttributes(input, {
    type: 'text',
    class: 'form-control',
    value: label.innerText,
    'data-id': id,
  });

  parent.appendChild(input);
  parent.replaceChild(input, label);
  icon.classList.add('clicked');
  input.focus();

  input.addEventListener('focusout', function (e) {
    setTimeout(() => {
      parent.replaceChild(label, input);
      icon.classList.remove('clicked');
    }, 200);
  });
}
