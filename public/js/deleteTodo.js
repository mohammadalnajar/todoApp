const delIcons = document.querySelectorAll('.icon[type=del]');

delIcons.forEach((icon) => {
  icon.addEventListener('click', function () {
    deleteTodo(this);
  });
});

function deleteTodo(icon) {
  const { id } = icon.parentElement.parentElement.dataset;
  const listItem = icon.parentElement.parentElement.parentElement;
  listItem.remove();
  fetch('todos', {
    method: 'DELETE',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  window.location.reload(false);
}
