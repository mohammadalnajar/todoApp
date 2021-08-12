const form = document.querySelector('.form-add');

form.addEventListener('submit', function () {
  addTodo();
});

function addTodo() {
  const select = document.querySelector('.form-select');
  const priority = select.options[select.selectedIndex].value;
  const todo = document.querySelector('.form-add .form-control').value;

  fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todo, priority }),
  });
}
