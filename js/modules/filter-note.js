
//  Hide or display a block with notes or a note search in the search form
function filterNote() {
  const selectSingle3 = document.querySelector('.select3');
  const selectSingle_title3 = document.querySelector('.select__title3');
  const selectSingle_labels3 = document.querySelectorAll('.select__label3');
  const selectTitleSpan3 = document.querySelector('.select__title-span3')
  const selectContentSearchNote = document.querySelector('.select__content3-search')

  if (selectSingle3) {
    selectSingle_title3.addEventListener('click', (e) => {
      if ('active' === selectSingle3.getAttribute('data-state')) {
        selectSingle3.setAttribute('data-state', '');
        selectContentSearchNote.classList.add('none')
      } else {
        selectSingle3.setAttribute('data-state', 'active');
        selectContentSearchNote.classList.remove('none')
      }
    });

    for (let i = 0; i < selectSingle_labels3.length; i++) {
      selectSingle_labels3[i].addEventListener('click', (e) => {
        selectTitleSpan3.textContent = e.target.textContent;
        selectContentSearchNote.classList.add('none')
        selectSingle3.setAttribute('data-state', '');
      });
    }
  }
}

filterNote()