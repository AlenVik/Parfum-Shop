import sliderInput from "./noslider.js"
sliderInput()
import objMassCard from "./data/objMassCard.js";

//The function of random display of products on the page after clicking on the pagination
function randomCardsOnMainPage() {
  let stayOfFilter = { gender: [], notes: '', author: '', price: [] }
  const catalogCard = document.querySelector('.catalog__card')

  if (!catalogCard) return

  const paginationLInks = document.querySelectorAll('.catalog__pagination-link')
  paginationLInks.forEach(link => {
    link.addEventListener('click', function (e) {
      const target = e.target.closest('.catalog__pagination-link')
      paginationLInks.forEach(el => {
        target !== el ? el.classList.remove('pagination-arrow-active') : link.classList.add('pagination-arrow-active')
        activeArrows()
      });
      const resObj = shuffleArray(objMassCard)
      while (catalogCard.firstElementChild) catalogCard.removeChild(catalogCard.firstElementChild);
      randerPage(resObj)
      listenLinks()
      changeMlCard()
      afterLoad()
    })

  })

  // Show a window with a notification about the addition of a product

  let timer;

  function showMessageAddProduct() {
    document.querySelector('.show-message').style.display = 'block';
    clearTimeout(timer)
    timer = setTimeout(() => {
      document.querySelector('.show-message').style.display = 'none';
    }, 2000);
  }


  // The function of activation and attenuation of the arrows in the pagination
  function activeArrows() {
    const arrLeft = document.querySelector('.arrow-left');
    const arrRight = document.querySelector('.arrow-right');
    paginationLInks[0].classList.contains('pagination-arrow-active') ? arrLeft.classList.add('arrow--opacity') : arrLeft.classList.remove('arrow--opacity');
    paginationLInks[paginationLInks.length - 1].classList.contains('pagination-arrow-active') ? arrRight.classList.add('arrow--opacity') : arrRight.classList.remove('arrow--opacity');
  }
  activeArrows()

  // The function of listening and moving the active page using the arrows in the pagination
  document.addEventListener('click', clickArrows);
  function clickArrows(e) {
    const arrowLeft = e.target.closest('.arrow-left');
    const arrowRight = e.target.closest('.arrow-right');
    if (arrowLeft || arrowRight) {
      const currEl = document.querySelector('.pagination-arrow-active');
      currEl.classList.remove('pagination-arrow-active');
      arrowLeft ? currEl.previousElementSibling.classList.add('pagination-arrow-active') : currEl.nextElementSibling.classList.add('pagination-arrow-active');
      activeArrows();
      while (catalogCard.firstElementChild) catalogCard.removeChild(catalogCard.firstElementChild);
      randerPage(shuffleArray(objMassCard));
      listenLinks()
      changeMlCard()
      afterLoad()

    }
  }


  //The function of shuffling the order of objects in the array
  function shuffleArray(objMassCard) {
    for (var i = objMassCard.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [objMassCard[i], objMassCard[j]] = [objMassCard[j], objMassCard[i]];
    }
    return objMassCard
  }

  //The function of rendering the product catalog on the main page of the site
  function randerPage(obj, length = 12) {

    let htmlBlock = []

    for (let i = 0; i < length; i++) {

      const htmlCard = `
  <article class="card" id="${obj[i].id}" data-raiting="${obj[i].raiting}" data-popular="${obj[i].popular}" data-id=${obj[i].dataid}>
  <a href="card-page.html" class="card__link">
    <img class="card__img" src=${obj[i].str} alt="card icon">
    <span class="card__brand">${obj[i].naming} by ${obj[i].author}</span>
  </a>
  <div class="card__ml-info">
    <span class="card__ml">Volume ml.</span>
    <div class="card__block-ml">
      <a class="card__block-ml-btn active-card-page" href="#!"><span>10</span></a>
      <a class="card__block-ml-btn" href="#!"><span>30</span></a>
      <a class="card__block-ml-btn" href="#!"><span>50</span></a>
      <a class="card__block-ml-btn" href="#!"><span>100</span></a>
    </div>
  </div>
  <div class="card__price">
    <span class="card__price-cost">Cost:</span>
    <span class="card__price-num" value="${obj[i].price}">${obj[i].price} $</span>
  </div>

  <button class="btn basket-btns">
    <span>into a basket</span>
  </button>
</article>
  `
      htmlBlock.push(htmlCard)
    }

    if (!catalogCard) return
    catalogCard.insertAdjacentHTML('beforeend', htmlBlock.join(''))
  }
  randerPage(objMassCard)


  //Listening to inputs and a function for receiving and displaying cards with the selected brand (author)
  const inputBrands = document.querySelectorAll('.select__content2 input')
  inputBrands.forEach(input => input.addEventListener('click', filterBrands))

  function filterBrands(event) {
    const input = event.target;
    if (input.checked && input.name !== 'allbrands') {
      stayOfFilter.author = input.name
      renderNewCardsByFilter()
    } else {
      stayOfFilter.author = ''
      renderNewCardsByFilter()
    }
  }

  // Listening to a track (range) and a function for receiving and displaying cards with a selected price range
  sliderFilter.noUiSlider.on('change', filterRangePrice);

  function filterRangePrice(values) {
    let [minval, maxval] = values;
    if (stayOfFilter.price !== 0) stayOfFilter.price = [];
    stayOfFilter.price.push(minval, maxval)
    renderNewCardsByFilter()
  }


  // Listening to inputs and a function for receiving and displaying cards with the selected gender
  const inputs = document.querySelectorAll('input[name="gender"]');
  inputs.forEach(input => input.addEventListener('click', madeMassGender));

  function madeMassGender(event) {
    const input = event.target;
    if (input.name === 'gender') {
      if (input.checked) {
        stayOfFilter.gender.push(input.id)
        renderNewCardsByFilter()
      }
      else {
        const index = stayOfFilter.gender.indexOf(input.id);
        index !== -1 ? stayOfFilter.gender.splice(index, 1) : false
        renderNewCardsByFilter()
      }
    }
  }

  // Listening to inputs and a function for receiving and displaying cards with the selected note
  const inputNotes = document.querySelectorAll('.select3 input')
  inputNotes.forEach(input => input.addEventListener('click', filterMassNotes))

  function filterMassNotes(event) {
    const input = event.target;
    if (input.checked && input.name !== 'allnotes') {
      stayOfFilter.notes = input.name
      renderNewCardsByFilter()
    } else {
      stayOfFilter.notes = ''
      renderNewCardsByFilter()
    }
  }

  //The function of filtering an object with cards based on the filter status object
  function filterCardsByFilterState(objMassCard, stayOfFilter) {
    return objMassCard.filter(card => {
      if (stayOfFilter.gender.length > 0 && !stayOfFilter.gender.includes(card.gender)) return false;
      if (stayOfFilter.notes && card.notes !== stayOfFilter.notes) return false;
      if (stayOfFilter.author && card.dataid !== stayOfFilter.author) return false;
      if (stayOfFilter.price.length === 2 && (card.price < stayOfFilter.price[0] || card.price > stayOfFilter.price[1])) return false;

      return true;
    });
  }

  // Getting a new object after filtering the array (based on the new filter state)
  function renderNewCardsByFilter() {
    let filteredCards = filterCardsByFilterState(objMassCard, stayOfFilter);
    if (filteredCards.length > 12) filteredCards.splice(12)
    while (catalogCard.firstElementChild) catalogCard.removeChild(catalogCard.firstElementChild);
    randerPage(filteredCards, filteredCards.length)
    changeMlCard()
    afterLoad()
    listenLinks()
  }


  //The button and the function of resetting the filter settings
  const resetBtn = document.getElementById('resetBtn')
  resetBtn.addEventListener('click', resetFilterSettings)

  function resetFilterSettings() {
    stayOfFilter = { gender: [], notes: '', author: '', price: [] }
    document.querySelectorAll('.gender__catalog input').forEach(el => el.checked ? el.checked = false : undefined)
    document.querySelectorAll('.select__input2').forEach(el => el.checked ? el.checked = false : undefined)
    document.querySelector('.select__title-span2 ').textContent = 'Все бренды'
    document.querySelectorAll('.select__input3').forEach(el => el.checked ? el.checked = false : undefined)
    document.querySelector('.select__title-span3 ').textContent = 'Все ноты'
    sliderFilter.noUiSlider.reset();
    renderNewCardsByFilter()
  }


  // Find all the cards, sort according to one of the 5 selected filters
  const inputSelects = document.querySelectorAll('.select input');
  inputSelects.forEach(input => input.addEventListener('click', sortCardOnPage));

  function sortCardOnPage(e) {

    const catalogCard = document.querySelector('.catalog__card');
    const cardsMass = document.querySelectorAll('.card');

    if (e.target.name === 'fromlast') spreadFun(Array.from(cardsMass).reverse())

    if (e.target.name === 'raiting') spreadFun(Array.from(cardsMass).sort((a, b) => b.getAttribute('data-raiting') - a.getAttribute('data-raiting')))

    if (e.target.name === 'popular') spreadFun(Array.from(cardsMass).sort((a, b) => b.getAttribute('data-popular') - a.getAttribute('data-popular')))

    if (e.target.name === 'ascending') spreadFun(Array.from(cardsMass).sort((a, b) => a.querySelector('.card__price-num').getAttribute('value') - b.querySelector('.card__price-num').getAttribute('value')))

    if (e.target.name === 'descending') spreadFun(Array.from(cardsMass).sort((a, b) => b.querySelector('.card__price-num').getAttribute('value') - a.querySelector('.card__price-num').getAttribute('value')))

    function spreadFun(massive) {
      catalogCard.innerHTML = '';
      catalogCard.append(...massive);
    }
  }

  // Click on the card and find the ID of the card in the array of objects

  function listenLinks() {
    const massLinkCards = document.querySelectorAll('.card__link')
    massLinkCards.forEach(link => link.addEventListener('click', () => objMassCard.forEach(el => el.id === Number(link.closest('.card').id) ? localStorage.setItem('dataCurrProduct', JSON.stringify(el)) : undefined)))

  }
  listenLinks()


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



  //Receive the selected card with the selected quantity of goods
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

  //Checking for uniqueness of objects in the array
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

}

randomCardsOnMainPage()



