// The function of adding a review on the product page
function cardProdFeedBack() {
  const btnCardDescr = document.querySelector('.card-product__descr-btn')
  const blockCardDescrText = document.querySelector('.card-product__descr-text')
  const blockCardDescr = document.querySelector('.card-product__descr-block')
  const blockCardArrow = document.querySelector('.card-product__descr-btn svg')

  const blockFeedback = document.querySelector('.feedback')
  const btnCardFeedBack = document.querySelector('.card-product__feedback-btn')
  const blockCardFeedBackArrow = document.querySelector('.card-product__feedback-btn svg')
  const btnCardFeedBackDO = document.querySelector('.card-product__feedback-btn-do')
  const blockFeedBackBlock = document.querySelector('.card-product__feedback-block')
  const blockFeedBackItem = document.querySelector('.card-product__feedback-item-block')
  const btnCloseFeedBack = document.querySelector('.feedback__btn-close')
  const btnShowMoreFeedback = document.querySelector('.card-product__feedback-more')

  const massInputPic = document.querySelectorAll('.rewiew-img')
  const massInputVid = document.querySelectorAll('.rewiew-vid')

  const sendReview = document.getElementById('send-rewiev')
  const massRaitInput = document.querySelectorAll('.rating-group input')

  const moduleRewiew = document.querySelector('.module-rewiew')
  const btnRewiew = document.getElementById('btn-rewiew')
  const overlayCard = document.querySelector('.overlay-card')


  // Listening to the product description button and the function of opening the description block
  if (!btnCardDescr) return

  btnCardDescr.addEventListener('click', function () {
    blockCardDescr.classList.toggle('descr-active')
    blockCardDescr.classList.toggle('descr-margin')
    blockCardDescrText.classList.toggle('descr-opacity')
    blockCardArrow.classList.toggle('rotate180')
    btnCardDescr.classList.toggle('active-card-page')
  })

  // Listening to the feedback button and the function of opening the feedback block
  if (!btnCardFeedBack) return

  btnCardFeedBack.addEventListener('click', function () {

    blockFeedBackItem.classList.toggle('descr-opacity')
    const height = blockFeedBackItem.classList.contains('descr-opacity') ? blockFeedBackItem.scrollHeight + 'px' : '44px';
    blockFeedBackBlock.style.maxHeight = height;
    blockFeedBackBlock.classList.toggle('mb-card')
    btnCardFeedBack.classList.toggle('active-card-page')
    btnCardFeedBackDO.classList.toggle('feedback__btn-do-active')
    blockCardFeedBackArrow.classList.toggle('rotate180')
  })

  // Listening to the "Leave a review" button, checking the user's online status and offering to log in.

  if (!btnCardFeedBackDO) return

  btnCardFeedBackDO.addEventListener('click', () => {

    let data = JSON.parse(localStorage.getItem('dataRegInput'))

    if (data && data[0].statusOnline) {
      blockFeedback.classList.remove('none')
      overlayCard.classList.add('overlay-card-active')
    }
    else {
      moduleRewiew.classList.remove('module-rewiew-active')
      overlayCard.classList.add('overlay-card-active')
    }
  })


  // Listening to the overlay
  overlayCard.addEventListener('click', () => {
    blockFeedback.classList.add('none')
    moduleRewiew.classList.add('module-rewiew-active')
    overlayCard.classList.remove('overlay-card-active')
  })

  //Listening to the block closing button for a review
  if (!btnCloseFeedBack) return
  btnCloseFeedBack.addEventListener('click', () => {
    const moduleRewiew = document.querySelector('.module-rewiew')
    const overlayCard = document.querySelector('.overlay-card')
    blockFeedback.classList.add('none')
    moduleRewiew.classList.add('module-rewiew-active')
    overlayCard.classList.remove('overlay-card-active')
  })


  //Listening to and adding pictures to a product review
  let imgMass = []

  massInputPic.forEach(el => {
    el.addEventListener('change', function (e) {
      const inputFile = e.target;
      const labelClass = '.' + inputFile.id + '-prev'
      const labelClassImg = document.querySelector(labelClass)
      const file = inputFile.files[0];

      if (file) {
        const reader = new FileReader();
        const img = document.createElement('img');

        reader.onload = function (e) {
          img.src = e.target.result;
          imgMass.push(e.target.result)
        };
        reader.readAsDataURL(file);

        const imgDouble = labelClassImg.querySelector('.added-img')
        if (imgDouble) imgDouble.remove()
        labelClassImg.appendChild(img)
      }
    })
  })


  // Listening to and adding video files to a product review

  let vidMass = []

  massInputVid.forEach(el => {
    el.addEventListener('change', function (e) {
      const inputVideoFile = e.target;
      const labelVidClass = '.' + inputVideoFile.id + '-prev'
      const labelClassVid = document.querySelector(labelVidClass)
      const videoFile = inputVideoFile.files[0];

      if (videoFile) {
        const reader = new FileReader();
        const video = document.createElement('video');

        reader.onload = function (e) {
          video.src = e.target.result;
          video.controls = true;
          vidMass.push(e.target.result)
        };

        reader.readAsDataURL(videoFile);

        const vidDouble = labelClassVid.querySelector('.added-vid')
        if (vidDouble) vidDouble.remove()
        labelClassVid.appendChild(video)
      }
    })
  })


  // The date the review was added to the product page
  function timeOfFeedBack() {
    const time = new Date()
    const timeObj = {
      year: time.getFullYear(),
      month: time.getMonth() + 1,
      day: time.getDate()
    }

    return timeObj
  }


  // Listening to the button for adding a product review
  if (!sendReview) return

  sendReview.addEventListener('click', function (e) {

    const currDate = timeOfFeedBack()
    const textareaVal = document.getElementById('rewiew').value;
    let checkIn;
    massRaitInput.forEach(el => {
      if (el.checked) checkIn = el
    })

    blockFeedback.classList.add('none')
    overlayCard.classList.remove('overlay-card-active')
    btnCardFeedBackDO.style.opacity = '0.3'
    btnCardFeedBackDO.style.pointerEvents = 'none'
    renderFeedbackPost(currDate, textareaVal, checkIn)

  })

  // Listening to the authorization button and redirecting to the authorization/registration page
  if (!btnRewiew) return

  btnRewiew.addEventListener('click', function () {
    window.location.href = "registration-page.html";
  })

  // The review rendering function on the product page
  function renderFeedbackPost(currDate, textareaVal, checkIn) {
    let divPic = document.createElement('div');
    let vidPic = document.createElement('div')

    imgMass.forEach(el => {
      const img = document.createElement('img');
      img.src = el;
      img.width = 200;
      img.height = 200;
      divPic.appendChild(img);
    })

    vidMass.forEach(el => {
      const video = document.createElement('video');
      video.src = el;
      video.width = 200;
      video.height = 200;
      video.controls = true;
      video.classList.add('added-vid')
      vidPic.appendChild(video);
    })

    const value = checkIn.value;
    //! Пост
    const htmlPost = `
<div id="new-post" class="card-product__feedback-item currpoint">

  <div class="card-product__feedback-data">
    <div class="card-product__feedback-data-name">
      <span>Mary</span>
      <span>${currDate.day}.${currDate.month}.${currDate.year}</span>
    </div>
    <div class="card-product__feedback-data-star">
      <div class="full-stars">
        <div class="rating-group">
          <!-- по умолчанию 0 -->
          <input name="fst" value="0" type="radio" disabled checked />
      
          <!-- рейтинг 1 -->
          <label for="fst-1-ren">
            <svg class="small-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg>
          </label>
          <input name="fst" id="fst-1-ren" value="1" type="radio" ${value == 1 ? 'checked' : ''}/>
      
          <!-- рейтинг 2 -->
          <label for="fst-2-ren">
            <svg class="small-star"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg>
          </label>
          <input name="fst" id="fst-2-ren" value="2" type="radio" ${value == 2 ? 'checked' : ''}/>
      
          <!-- рейтинг 3 -->
          <label for="fst-3-ren">
            <svg  class="small-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg>
          </label>
          <input name="fst" id="fst-3-ren" value="3" type="radio"  ${value == 3 ? 'checked' : ''}/>
      
          <!-- рейтинг 4 -->
          <label for="fst-4-ren">
            <svg class="small-star"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg>
          </label>
          <input name="fst" id="fst-4-ren" value="4" type="radio" ${value == 4 ? 'checked' : ''}/>
      
          <!-- рейтинг 5 -->
          <label for="fst-5-ren">
            <svg  class="small-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg>
          </label>
          <input name="fst" id="fst-5-ren" value="5" type="radio"  ${value == 5 ? 'checked' : ''}/>
        </div>
      </div>
    </div>
  </div>

    <p class="card-product__feedback-text">
      ${textareaVal}
         </p>

       <div class="card-product__feedback-photos new-photos">
    ${divPic.innerHTML}

            </div>

            <div class="card-product__feedback-video">
                ${vidPic.innerHTML}
          </div>    

      </div>
        `

    btnCardFeedBackDO.insertAdjacentHTML('afterend', htmlPost)
    heighPost()
  }

  // The function of measuring and changing the height of the block with reviews
  function heighPost() {
    const currBlockHeigh = document.getElementById('new-post')

    const postHeight = currBlockHeigh.scrollHeight + 'px'


    const height = blockFeedBackItem.classList.contains('descr-opacity') ? blockFeedBackItem.scrollHeight + postHeight : '44px';
    blockFeedBackBlock.style.maxHeight = height;
  }

  // Listening to the button with hidden reviews and their appearance after pressing the button
  if (!btnShowMoreFeedback) return

  btnShowMoreFeedback.addEventListener('click', function () {

    const showFirstFeedBack = document.querySelector('.card-product__feedback-item.none')
    if (!showFirstFeedBack) return
    showFirstFeedBack.classList.remove('none')

    const postHeight = showFirstFeedBack.scrollHeight + 'px'

    const height = blockFeedBackItem.classList.contains('descr-opacity') ? blockFeedBackItem.scrollHeight + postHeight : '44px';
    blockFeedBackBlock.style.maxHeight = height;

  })

}

cardProdFeedBack()