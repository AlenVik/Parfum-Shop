//The function of opening/closing the product filter when clicked
function filter() {
  const filterBtn = document.querySelector('.catalog__settings-filter')
  const catalogBlog = document.querySelector('.catalog__block')
  const catalogForm = document.querySelector('.catalog__form')
  const catalogCards = document.querySelector('.catalog__card')
  const selectForm = document.querySelector('.select__form')

  if (filterBtn) filterBtn.addEventListener('click', openFilterSettngs)

  // The function of opening/closing the product filter when clicked + adaptive filter display settings
  function openFilterSettngs() {
    catalogBlog.classList.toggle('none')

    window.innerWidth > 768 ? catalogForm.classList.toggle('catalog__form--active') : catalogForm.classList.toggle('catalog__form--active-mob')

    filterBtn.classList.toggle('catalog__settings-filter--active')
    catalogCards.classList.toggle('container-grid')

    if (catalogCards.classList.contains('container-grid')) {

      catalogCards.style.marginLeft = 'auto';
      window.innerWidth > 768 ? catalogForm.style.position = 'absolute' : catalogForm.style.position = 'relative';
      if (window.innerWidth > 768) selectForm.style.marginLeft = '325px';

    } else {
      catalogCards.style.marginLeft = 'unset';
      catalogForm.style.position = 'unset';
      selectForm.style.marginLeft = '0';
    }
  }
}

filter()