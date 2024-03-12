

function renderBuskPage() {

  let data = JSON.parse(localStorage.getItem('dataBasketCurr'))

  const basketBlock = document.querySelector('.basket__card-block')

  if (!data) {
    if (document.querySelector('.basket__current-sum') || document.querySelector('.basket__current-forpayment-sum') || document.getElementById('basketNum')) {
      document.querySelector('.basket__current-sum').textContent = 0 + ` $`
      document.querySelector('.basket__current-forpayment-sum').textContent = 0 + ` $`
      document.getElementById('basketNum').textContent = 0 + ` $`
    }
    return
  }

  //The function of displaying information that the basket is empty
  function emptyBasketMessage(numOfProduct) {
    const basketEmpty = document.querySelector('.basket__empty')
    if (Number(numOfProduct) > 0) basketEmpty.style.display = 'none'
  }
  emptyBasketMessage(document.getElementById('countStaff').textContent)

  //The function of rendering products in the cart on the page
  function randerCards(data) {

    let htmlBasketBlock = []

    for (let i = 0; i < data.length; i++) {

      const htmlCardBask = `
    <div id=${data[i].currCardId} class="basket__card">

    <div class="basket__card-inner">

      <div class="basket__card-checkbox">
        <label class="basket__card-checkbox-label">
          <input type="checkbox">
          <div class="basket-card-checkbox"></div>
        </label>
      </div>

      <img class="basket__card-img" src="${data[i].str}" alt="basket icon">
      <div class="basket__card-info">
        <span>${data[i].brand}, <span class="basket__card-ml">${data[i].currCardMl}</span>ml</span>
        <button class="basket__card-info-btn">
          <span>Delete</span>
          <img src="./img/basket-card/x.svg" alt="del icon">
        </button>
      </div>
      <span class="basket__card-price" value="${data[i].currCardPrice / data[i].position}">
        ${data[i].currCardPrice} $
      </span>

      <div class="basket__card-count">
        <form class="count__form">
          <button class="count__form-btn minus">
            <img  src="./img/card/minus.svg" alt="minus icon">
          </button>
          <input min="1" max="50" value="${data[i].position}" class="count__form-input" type="number">
          <button class="count__form-btn plus">
            <img src="./img/card/plus.svg" alt="plus icon">
          </button>
        </form>

      </div>
    </div>
  </div>
    `
      htmlBasketBlock.push(htmlCardBask)
    }

    if (!basketBlock) return
    basketBlock.insertAdjacentHTML('beforeend', htmlBasketBlock.join(''))
  }
  randerCards(data)

  // The function of deleting a position from the basket
  function deleteCardFromBask() {

    const basketBlock = document.querySelector('.basket__card-block');

    if (!basketBlock) return
    basketBlock.addEventListener('click', function (e) {
      const btn = e.target.closest('.basket__card-info-btn')

      if (!btn) return

      const idOfEl = btn.closest('.basket__card').id
      const mlOfEl = btn.closest('.basket__card').querySelector('.basket__card-ml').textContent

      let currCardPos;
      const [newData] = data.map(el => {
        if (el.currCardId === idOfEl && el.currCardMl === mlOfEl) {
          const indexOfEl = data.indexOf(el)
          currCardPos = el.position
          data.splice(indexOfEl, 1)
          return data
        }
      }).filter(el => el !== undefined)

      while (basketBlock.firstElementChild) basketBlock.removeChild(basketBlock.firstElementChild);
      randerCards(newData)

      const span = document.createElement('span');
      span.classList.add('basket__empty')
      span.textContent = 'The basket is empty so far'
      basketBlock.appendChild(span)

      setCostCardsONpage(newData)

      let currNumOfPosition = Number(document.getElementById('countStaff').textContent)
      let newTextpos = currNumOfPosition - currCardPos
      document.getElementById('countStaff').textContent = newTextpos;

      localStorage.setItem('dataBasketCurr', JSON.stringify(newData))
      emptyBasketMessage(document.getElementById('countStaff').textContent)
    }
    )
  }

  deleteCardFromBask()

  //The function of setting the values of the cost and the number of products on the page
  function setCostCardsONpage(data) {

    if (data) {

      let commonCosts = 0;
      const basketNum = document.getElementById('basketNum')
      data.forEach(el => commonCosts += el.currCardPrice)
      if (!document.querySelector('.basket__current-sum')) return
      document.querySelector('.basket__current-sum').textContent = commonCosts + ` $`
      document.querySelector('.basket__current-forpayment-sum').textContent = commonCosts + ` $`

      basketNum.textContent = data.length;
    }
    if (data === null) {
      document.querySelector('.basket__current-sum').textContent = 0 + ` $`
      document.querySelector('.basket__current-forpayment-sum').textContent = 0 + ` $`
      document.getElementById('basketNum').textContent = 0 + ` $`
    }

  }

  setCostCardsONpage(data)


  // Changing the number of items in the product card
  function countCommonCardsOnPage() {
    const minusItem = document.querySelectorAll('.count__form-btn.minus')
    const plusItem = document.querySelectorAll('.count__form-btn.plus')

    let position = document.querySelector('.count__form-input')?.value
    if (!position) return

    plusItem.forEach(plus => {
      plus.addEventListener('click', function (e) {
        e.preventDefault()
        let card = e.target.closest('.basket__card')
        let cardMl = card.querySelector('.basket__card-ml').textContent
        let input = card.querySelector('.count__form-input')
        data.forEach(el => {
          if (el.currCardId === card.id && el.currCardMl === cardMl) {
            el.position++
            const priceForOnePosition = Number(card.querySelector('.basket__card-price').getAttribute('value'))

            el.currCardPrice += priceForOnePosition;
            input.value = el.position;
            card.querySelector('.basket__card-price').textContent = parseFloat(card.querySelector('.basket__card-price').textContent) + priceForOnePosition + ` $`
          }
        })
        localStorage.setItem('dataBasketCurr', JSON.stringify(data))
        setCostCardsONpage(data)

        document.getElementById('countStaff').textContent++
        emptyBasketMessage(document.getElementById('countStaff').textContent)
      })
    })

    minusItem.forEach(minus => {
      minus.addEventListener('click', function (e) {
        e.preventDefault()
        let card = e.target.closest('.basket__card')
        let cardMl = card.querySelector('.basket__card-ml').textContent
        let input = card.querySelector('.count__form-input')

        if (Number(input.value) === 1) return

        data.forEach(el => {
          if (el.currCardId === card.id && el.currCardMl === cardMl) {
            el.position--
            const priceForOnePosition = Number(card.querySelector('.basket__card-price').getAttribute('value'))

            el.currCardPrice -= priceForOnePosition;
            input.value = el.position;
            card.querySelector('.basket__card-price').textContent = parseFloat(card.querySelector('.basket__card-price').textContent) - priceForOnePosition + ` $`
          }
        })
        localStorage.setItem('dataBasketCurr', JSON.stringify(data))
        setCostCardsONpage(data)

        document.getElementById('countStaff').textContent--
        emptyBasketMessage(document.getElementById('countStaff').textContent)
      })
    })

  }
  countCommonCardsOnPage()



  // A function that displays a module with a suggestion to log in or continue without
  function showModuleRegAuth() {
    const btnRegAuth = document.querySelector('.basket__current-btn')
    const moduleOrder = document.querySelector('.module-order')
    const overlayOrder = document.querySelector('.overlay-reg')
    const btnWithAuth = document.getElementById('btnMod1')
    const btnWithoutAuth = document.getElementById('btnMod2')

    if (!btnRegAuth || !moduleOrder || !overlayOrder || !btnWithAuth || !btnWithoutAuth) return

    btnRegAuth.addEventListener('click', function (e) {
      const data = JSON.parse(localStorage.getItem('dataRegInput'))

      if (data && data[0].statusOnline) {
        window.location.href = "order-page.html"
      } else {
        moduleOrder.classList.remove('module-order-active')
        document.querySelector('.overlay-reg').classList.add('overlay-reg-active')
      }

    })

    overlayOrder.addEventListener('click', function () {
      moduleOrder.classList.add('module-order-active')
      document.querySelector('.overlay-reg').classList.remove('overlay-reg-active')
    })

    btnWithAuth.addEventListener('click', function () {
      window.location.href = "registration-page.html"
    })

    btnWithoutAuth.addEventListener('click', function () {
      window.location.href = "order-page.html"
    })

  }
  showModuleRegAuth()

}

renderBuskPage()