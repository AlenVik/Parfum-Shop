function countProductsBusket() {

  document.addEventListener('DOMContentLoaded', afterLoad)
  document.addEventListener('DOMContentLoaded', changeMlCard)

  // Get the selected card with the selected quantity of products, add it to localStorage, check for uniqueness
  function afterLoad() {
    const listBtn = document.querySelectorAll('.basket-btns')
    listBtn.forEach(btn => {

      btn.addEventListener('click', function () {
        let data = JSON.parse(localStorage.getItem('dataBasketCurr'))
        let massOfProduct;

        data === null ? massOfProduct = [] : massOfProduct = data;

        const objOfChoseProduct = { position: 1, }

        const countProduct = document.getElementById('countStaff')
        const currCard = btn.closest('.card')
        const currCardPrice = currCard.querySelector('.card__price-num').textContent
        const currCardMl = currCard.querySelector('.active-card-page span').textContent
        const strImg = currCard.querySelector('.card__img').getAttribute('src')
        const currCardBrand = currCard.querySelector('.card__brand').textContent
        countProduct.textContent++
        objOfChoseProduct.currCardId = currCard.id
        objOfChoseProduct.currCardPrice = parseInt(currCardPrice)
        objOfChoseProduct.currCardMl = currCardMl
        objOfChoseProduct.str = strImg
        objOfChoseProduct.brand = currCardBrand;

        massOfProduct.push(objOfChoseProduct)
        showMessageAddProduct()
        let processedArray = processArray(massOfProduct);
        localStorage.setItem('dataBasketCurr', JSON.stringify(processedArray))
      })
    })
  }

  // Checking for uniqueness of objects in the array
  function processArray(massOfProduct) {

    let uniqueMap = {};
    let resultArray = [];

    massOfProduct.forEach(item => {
      let key = item.currCardId + '-' + item.currCardMl;
      if (uniqueMap[key]) {
        uniqueMap[key].position++;
        uniqueMap[key].currCardPrice += parseInt(item.currCardPrice)
      } else {
        uniqueMap[key] = { ...item };
      }
    });

    for (let key in uniqueMap) resultArray.push(uniqueMap[key]);
    return resultArray;
  }

  // Change the number of milliliters in the card (put the appropriate class on the selected element)

  function changeMlCard() {
    const mlList = document.querySelectorAll('.card__block-ml-btn')

    mlList.forEach(ml => {
      ml.addEventListener('click', function (e) {
        const card = ml.closest('.card');
        const mlListInCard = card.querySelectorAll('.card__block-ml-btn')
        const currCostInCard = Number(card.querySelector('.card__price-num').getAttribute('value'))
        mlListInCard.forEach(el => el.classList.remove('active-card-page'))
        ml.classList.add('active-card-page')
        const value = Number(ml.querySelector('span').textContent)
        card.querySelector('.card__price-num').textContent = value / 10 * currCostInCard + " $"

      })
    })
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
}

countProductsBusket()

