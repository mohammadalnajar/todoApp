const editIcons = document.querySelectorAll('.icon[type=edit]');

editIcons.forEach((icon) => {
  icon.addEventListener('click', function () {
    const label = this.parentElement.parentElement.children[1];
    const id = label.getAttribute('for');
    console.log(label.innerText);
    label.innerHTML = ` <input type="text" class="form-control" value="${label.innerText}" data-id=${id}>`;
  });
});
