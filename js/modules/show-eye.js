'use strict';

//Show/hide the password when click on the eye
function showEyes() {

  const mass = document.querySelectorAll('.pass')
  const pics1 = document.querySelectorAll('.current__pass-img')
  const pics2 = document.querySelectorAll('.new__pass-img')
  const pics3 = document.querySelectorAll('.repeat-new__pass-img')
  const currInput = document.querySelector('.current__pass input')
  const newInput = document.querySelector('.new__pass input')
  const repInput = document.querySelector('.repeat-new__pass input')

  mass.forEach(el => el.addEventListener('click', showPassEyes))

  function showPassEyes(e) {
    if (e.target.classList.contains('current__pass-img')) {
      pics1.forEach(element => element.classList.toggle('none'))
      currInput.type = currInput.type === 'password' ? 'text' : 'password';
    }
    if (e.target.classList.contains('new__pass-img')) {
      pics2.forEach(element => element.classList.toggle('none'))
      newInput.type = newInput.type === 'password' ? 'text' : 'password';
    }
    if (e.target.classList.contains('repeat-new__pass-img')) {
      pics3.forEach(element => element.classList.toggle('none'))
      repInput.type = repInput.type === 'password' ? 'text' : 'password';
    }
  }
}

showEyes()