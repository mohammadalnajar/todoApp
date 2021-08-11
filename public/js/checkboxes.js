const checkboxes = document.querySelectorAll(
  '.form-check-input[type=checkbox]'
);
console.log(checkboxes);
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', function () {
    const { id } = this.parentElement.dataset;
    if (this.checked) {
      checkboxUpdate(id, true);
      console.log(`Checkbox with id ${id} is checked..`);
    } else {
      checkboxUpdate(id, false);
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
