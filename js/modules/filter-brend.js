
// Hide or display the brand selection or search block
function filterBrend() {
  const selectSingle2 = document.querySelector('.select2');
  const selectSingle_title2 = document.querySelector('.select__title2');
  const selectSingle_labels2 = document.querySelectorAll('.select__label2');
  const selectTitleSpan2 = document.querySelector('.select__title-span2')
  const selectContentSearch = document.querySelector('.select__content2-search')

  if (selectSingle_title2) {
    selectSingle_title2.addEventListener('click', (e) => {
      if ('active' === selectSingle2.getAttribute('data-state')) {
        selectSingle2.setAttribute('data-state', '');
        selectContentSearch.classList.add('none')
      } else {
        selectSingle2.setAttribute('data-state', 'active');
        selectContentSearch.classList.remove('none')
      }
    });

    for (let i = 0; i < selectSingle_labels2.length; i++) {
      selectSingle_labels2[i].addEventListener('click', (e) => {
        selectTitleSpan2.textContent = e.target.textContent;
        selectContentSearch.classList.add('none')
        selectSingle2.setAttribute('data-state', '');
      });
    }
  }
}

filterBrend()