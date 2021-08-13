(() => {
  const priIcons = document.querySelectorAll('.icon[type=priority]');
  priIcons.forEach((icon) => {
    const { priority } = icon.parentElement.parentElement.children[1].dataset;
    switch (priority) {
      case 'High':
        icon.style.color = 'red';
        break;
      case 'Medium':
        icon.style.color = 'orange';
        break;
      case 'Low':
        icon.style.color = 'Green';
        break;
    }
  });
})();
