
// Displaying a common block with brands
function filterCommonBrand() {
  const block = document.querySelector('.brend__catalog-form-block')
  const select__2 = document.querySelector('.select2')
  const blockImg = document.querySelector('.brend__catalog-form-block--img2 ')

  if (block) {
    block.addEventListener('click', function () {
      select__2.classList.toggle('none')
      blockImg.classList.toggle('rotate180')
    })
  }
}

filterCommonBrand()