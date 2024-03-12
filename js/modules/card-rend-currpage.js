//The function of displaying the product (on the product page) after switching to it from the catalog or slider

function rendCurrCardOnPage() {

  let data = JSON.parse(localStorage.getItem('dataBasketCurr'))
  const data2 = JSON.parse(localStorage.getItem('dataCurrProduct'))

  if (data === null) data = []
  if (!data2) return

  //Rendering of the product card based on the data in localStorage
  function rendPage() {
    const html = `
  <div class="container">
    <article class="card-product" id="${data2.id}" data-raiting="${data2.raiting}" data-popular="${data2.popular}" data-id=${data2.dataid}>
      <img class="card-product__img" src="${data2.str}" alt="card icon">

      <div class="card-product__info">
        <span class="card-product__brand">${data2.naming} by ${data2.author}</span>
        <div class="card-product__ml-info">
          <span class="card__ml">Volume ml.</span>
          <div class="card-product__block-ml">
            <a class="card-product__block-ml-btn active-card-page" href="#!" value="${10 / 10 * data2.price}"><span>10</span></a>
            <a class="card-product__block-ml-btn" href="#!" value="${30 / 10 * data2.price}"><span>30</span></a>
            <a class="card-product__block-ml-btn" href="#!" value="${50 / 10 * data2.price}"><span>50</span></a>
            <a class="card-product__block-ml-btn" href="#!" value="${100 / 10 * data2.price}"><span>100</span></a>
          </div>
        </div>
        <div class="card-product__count">
          <span class="card-product__count-text">
            number
          </span>

          <form class="card-product__count-form">
            <button class="card-product__count-form-btn minus">
              <img class="minus" src="./img/card/minus.svg" alt="">
            </button>
            <input min="1" max="50" value="1" class="card-product__input" type="number">
            <button class="card-product__count-form-btn plus">
              <img class="minus" src="./img/card/plus.svg" alt="">
            </button>
          </form>

        </div>

        <div class="card-product__price">
          <span class="card-product__price-cost">Cost:</span>
          <span class="card-product__price-num">${data2.price} $</span>
        </div>

        <button id="btnCurrCard" class="btn card-product__btn">
          <span>into a basket</span>
        </button>
      </div>
    </article>

  </div>
  `
    const cardProduct = document.querySelector('.card__product')

    if (!cardProduct) return
    cardProduct.insertAdjacentHTML('beforeend', html)
  }
  rendPage()


  let position = document.querySelector('.card-product__input')?.value
  if (!position) return

  //Selecting the number of milliliters and changing the backlight of the selected
  function chagneMlOnCurrCard() {
    const mlBlockCurrCard = document.querySelector('.card-product__block-ml')
    if (!mlBlockCurrCard) return
    const card2 = mlBlockCurrCard.closest('.card-product');
    const mlListInCurrBlock = card2.querySelectorAll('.card-product__block-ml-btn')

    mlListInCurrBlock.forEach(el => {
      el.addEventListener('click', function () {
        mlListInCurrBlock.forEach(el => el.classList.remove('active-card-page'))
        el.classList.add('active-card-page')
        const currCostInCard = Number(card2.querySelector('.active-card-page').getAttribute('value'))

        const rescurrCostInCard = currCostInCard + ' $'

        card2.querySelector('.card-product__price-num').textContent = rescurrCostInCard;
        document.querySelector('.card-product__input').value = 1
        position = 1
      })
    })
  }
  chagneMlOnCurrCard()

  //Changing the number of items in the product card
  function countCurrCardOnPage() {
    const minus = document.querySelector('.minus')
    const plus = document.querySelector('.plus')

    let input = document.querySelector('.card-product__input')

    plus.addEventListener('click', function (e) {
      e.preventDefault()
      const currCost = Number(document.querySelector('.active-card-page').getAttribute('value'))
      position++
      input.value = position
      let currText = parseInt(document.querySelector('.card-product__price-num').textContent)
      document.querySelector('.card-product__price-num').textContent = Number(currText += currCost) + ' $';
    })

    minus.addEventListener('click', function (e) {
      e.preventDefault()
      if (Number(input.value) === 1) return
      const currCost = Number(document.querySelector('.active-card-page').getAttribute('value'))
      position--
      input.value = position
      let currText = parseInt(document.querySelector('.card-product__price-num').textContent)
      document.querySelector('.card-product__price-num').textContent = Number(currText -= currCost) + ' $';
    })
  }
  countCurrCardOnPage()

  // Listening to the "Add to Cart" button and calling the function
  const btnCurrCard = document.getElementById('btnCurrCard')
  if (!btnCurrCard) return
  btnCurrCard.addEventListener('click', madeProductObject)

  //The function of creating a product object and adding a product to the cart and localStorage
  function madeProductObject() {

    let data = JSON.parse(localStorage.getItem('dataBasketCurr'))
    const data2 = JSON.parse(localStorage.getItem('dataCurrProduct'))

    if (data === null) data = []
    if (!data2) return

    const objOfChoseProduct = { position: Number(position), }

    const countProduct = document.getElementById('countStaff')
    const currCard = btnCurrCard.closest('.card-product')
    const currCardPrice = currCard.querySelector('.card-product__price-num').textContent
    const currCardMl = currCard.querySelector('.active-card-page span').textContent
    const strImg = currCard.querySelector('.card-product__img').getAttribute('src')
    const currCardBrand = currCard.querySelector('.card-product__brand').textContent

    countProduct.textContent = Number(countProduct.textContent) + Number(document.querySelector('.card-product__input').value)

    objOfChoseProduct.currCardId = currCard.id
    objOfChoseProduct.currCardPrice = parseInt(currCardPrice)
    objOfChoseProduct.currCardMl = currCardMl
    objOfChoseProduct.str = strImg
    objOfChoseProduct.brand = currCardBrand

    data.push(objOfChoseProduct)
    showMessageAddProduct()
    let processedArray = processArray(data);
    localStorage.setItem('dataBasketCurr', JSON.stringify(processedArray))
  }


  // Show a window with a notification about the addition of a product
  let timer;
  function showMessageAddProduct() {

    document.querySelector('.show-message').style.display = 'block';

    clearTimeout(timer)

    timer = setTimeout(() => {
      document.querySelector('.show-message').style.display = 'none';
    }, 2000);

  }

  //The function of checking for the uniqueness of objects in the array
  function processArray(data) {
    let uniqueMap = {};
    let resultArray = [];

    data.forEach(item => {
      let key = item.currCardId + '-' + item.currCardMl;
      if (uniqueMap[key]) {
        uniqueMap[key].position += Number(document.querySelector('.card-product__input').value)
        uniqueMap[key].currCardPrice += parseInt(item.currCardPrice)
      } else {
        uniqueMap[key] = { ...item };
      }
    });

    for (let key in uniqueMap) resultArray.push(uniqueMap[key]);
    return resultArray;
  }

}

rendCurrCardOnPage()


