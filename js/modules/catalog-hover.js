
// The function of displaying the menu (by gender) in the header + an adaptive version of the display as part of the burger
function catalog() {

  const catalogBtn = document.getElementById('btn-catalog')
  const catalogList = document.querySelector('.header__form-catalog-item')
  const mobileNav = document.querySelector('.mobile-header__top')
  const overlay = document.querySelector('.overlay')
  const btnMobileNavClose = document.querySelector('.mobile-header__top-close')
  const headerLogo = document.getElementById('headerLogo')

  catalogBtn.addEventListener('click', () => {
    if (window.innerWidth > 700) {
      catalogList.classList.toggle('active-hover')
    } else {
      mobileNav.style.display = 'block'
      if (!overlay) return
      overlay.classList.add('overlay-active')
      headerLogo.style.opacity = 0
    }
  })

  btnMobileNavClose.addEventListener('click', function () {
    mobileNav.style.display = 'none'

    if (!overlay) return
    overlay.classList.remove('overlay-active')
    headerLogo.style.opacity = 1
  })

  if (!overlay) return
  overlay.addEventListener('click', function () {
    mobileNav.style.display = 'none'
    overlay.classList.remove('overlay-active')
    headerLogo.style.opacity = 1
  })

  document.addEventListener('click', function (e) {
    if (!catalogBtn.contains(e.target)) catalogList.classList.remove('active-hover')
    if (e.target.classList.contains('header__form-catalog-link')) catalogList.classList.add('active-hover')
  })
}

catalog()