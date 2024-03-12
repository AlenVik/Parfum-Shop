
import objMassCard from "./data/objMassCard.js";


// The function of displaying product cards in the slider
function sliderSwiper2Cards() {
  const obj = objMassCard;
  let htmlBlockSlider = []

  for (let i = 0; i < objMassCard.length; i++) {

    const htmlSliderCard = `
         <div class="swiper-slide">
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
    </div>
  `
    htmlBlockSlider.push(htmlSliderCard)
  }

  const swiperSliderBlock = document.querySelector('.swiper-wrapper-block')

  if (!swiperSliderBlock) return
  swiperSliderBlock.insertAdjacentHTML('beforeend', htmlBlockSlider.join(''))


  // Click on the card and find the ID of the card in the array of objectss
  function listenLinks() {
    const massLinkCards = document.querySelectorAll('.card__link')
    massLinkCards.forEach(link => link.addEventListener('click', () => objMassCard.forEach(el => el.id === Number(link.closest('.card').id) ? localStorage.setItem('dataCurrProduct', JSON.stringify(el)) : undefined)))

  }
  listenLinks()
}

sliderSwiper2Cards()