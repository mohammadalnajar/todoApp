const checkboxes = document.querySelectorAll(
  '.form-check-input[type=checkbox]'
);
console.log(checkboxes);
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', function () {
    const { id } = this.parentElement.dataset;
    if (this.checked) {
      checkboxUpdate(id, true);
      updateStyle(this, true);

      console.log(`Checkbox with id ${id} is checked..`);
    } else {
      checkboxUpdate(id, false);
      updateStyle(this, false);
      console.log(`Checkbox with id ${id} is not checked..`);
    }
  });
});

function checkboxUpdate(id, boolean) {
  fetch('/todos', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id, done: boolean }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));

  // refreshing page after put request
  window.location.reload(false);
}
function updateStyle(box, boolean) {
  const label = box.parentElement.children[1];
  const parent = box.parentElement;
  if (boolean === true) {
    label.classList.add('checked');
    parent.classList.add('checked');
  } else if (boolean === false) {
    label.classList.remove('checked');
    parent.classList.remove('checked');
  }
}
