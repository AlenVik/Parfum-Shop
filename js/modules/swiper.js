import Swiper from './library/swiper-bundle.js';

function swiperFunc() {
  const swiper = new Swiper('.swiper1', {
    direction: 'horizontal',
    loop: true,
    initialSlide: 2,

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

  const swiper2 = new Swiper('.swiper2', {
    direction: 'horizontal',
    slidesPerView: 3,
    loop: true,
    spaceBetween: 20,
    autoplay: false,
    navigation: {
      nextEl: '#nextArrow',
      prevEl: '#prevArrow',
    },
  });
}

swiperFunc()
