
// The function of opening/closing the sorting block on the main page
function select() {

  const selectSingle = document.querySelector('.select');
  const selectSingle_title = document.querySelector('.select__title');
  const selectSingle_labels = document.querySelectorAll('.select__label');
  const selectTitleSpan = document.querySelector('.select__title-span')

  if (selectSingle) {
    selectSingle_title.addEventListener('click', () => 'active' === selectSingle.getAttribute('data-state') ? selectSingle.setAttribute('data-state', '') : selectSingle.setAttribute('data-state', 'active'));
  }

  for (let i = 0; i < selectSingle_labels.length; i++) {
    selectSingle_labels[i].addEventListener('click', (e) => {
      selectTitleSpan.textContent = e.target.textContent;
      selectSingle.setAttribute('data-state', '');
    });
  }
}

select()