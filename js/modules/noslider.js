
import noUslierFunc from './library/nouislider.js';
noUslierFunc()
import wNum from "./wNumb.js";
wNum()

function sliderInput() {
  const sliderBonus = document.getElementById('slider');

  if (sliderBonus) {
    noUiSlider.create(slider, {
      start: 3,
      connect: 'lower',
      step: 1,
      range: {
        'min': 0,
        'max': 10
      }
    });
  }


  const sliderFilter = document.getElementById('sliderFilter')
  if (sliderFilter) {
    noUiSlider.create(sliderFilter, {
      start: [0, 100],
      connect: true,
      tooltips: true,
      range: {
        'min': 0,
        'max': 100
      },
      format: wNumb({
        decimals: 0,
        thousand: '',
        suffix: '',
      })
    });
  }
}

export default sliderInput