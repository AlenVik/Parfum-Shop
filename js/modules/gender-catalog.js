'use strict';

// The function of displaying the gender selection in the filter
function genderChoise() {
  const genderBtn = document.querySelector('.gender__catalog-btn')
  const genderList = document.querySelector('.gender__catalog-choise')
  const genderImg = document.querySelector('.gender__catalog-img')

  if (genderBtn) {
    genderBtn.addEventListener('click', function () {
      genderList.classList.toggle('none')
      genderImg.classList.toggle('rotate180')
    })
  }
}

genderChoise()