
//Displaying a common block with notes of products
function filterCommonNote(params) {
  const blockNote = document.querySelector('.note__catalog-form-block')
  const select__3 = document.querySelector('.select3')
  const blockImgNote = document.querySelector('.note__catalog-form-block--img2 ')

  if (blockNote) {
    blockNote.addEventListener('click', function () {
      select__3.classList.toggle('none')
      blockImgNote.classList.toggle('rotate180')
    })
  }
}

filterCommonNote()