
function finishOrder() {

  // The function of displaying the values of the amount and quantity of goods on the order page
  function setPriceInOrderPage() {
    let commonSum = 0;
    const data = JSON.parse(localStorage.getItem('dataBasketCurr'))

    if (!data) return
    data.forEach(el => commonSum += el.currCardPrice)

    if (!document.getElementById('orderNum') || !document.getElementById('orderSum')) return

    document.getElementById('orderNum').textContent = data.length;
    document.getElementById('orderSum').textContent = commonSum
    document.getElementById('orderSum2').textContent = commonSum
  }
  setPriceInOrderPage()


  // The function of receiving data of the delivery address, if this information was not previously filled in in the user profile and completing the order
  function checkOrderInputs() {
    const btnConfirm = document.querySelector('.order__current-btn')
    const inputsLIstOrd = document.querySelectorAll('.order__delivery-form input')
    const overlayOrder = document.querySelector('.overlay-reg')
    const moduleFinish = document.querySelector('.module-finish')

    if (!btnConfirm) return

    btnConfirm.addEventListener('click', function () {

      let data = JSON.parse(localStorage.getItem('dataRegInput'))

      if (data && !data[0].dataaddres) {
        const resultMass = Array.from(inputsLIstOrd).every(input => input.value.trim() !== '');
        if (!resultMass) {
          alert('Please fill in all fields')
        }
        else {
          overlayOrder.classList.add('overlay-reg-active')
          moduleFinish.classList.remove('module-finish-active')
        }
      } else {
        overlayOrder.classList.add('overlay-reg-active')
        moduleFinish.classList.remove('module-finish-active')
      }
    })

  }
  checkOrderInputs()

  // Going to the main page of the site after completing the order, zeroing the array with the order in Local Storage
  function closeFinishOrder() {
    const overlayOrder = document.querySelector('.overlay-reg')
    const moduleFinish = document.querySelector('.module-finish')
    const btnFinish = document.getElementById('btnFinish')

    if (!btnFinish) return
    btnFinish.addEventListener('click', function () {
      overlayOrder.classList.remove('overlay-reg-active')
      moduleFinish.classList.add('module-finish-active')
      window.location.href = "index.html"
      localStorage.removeItem('dataBasketCurr');
    })
  }
  closeFinishOrder()

  //The function of rendering the recipient's information, if it was previously filled in in the profile and in Local Storage
  function randerInfoClient() {

    const infoBlock = document.querySelector('.order__info')
    let data = JSON.parse(localStorage.getItem('dataRegInput'))

    if (data && data[0].dataaddres && data[0].statusOnline) {
      if (!infoBlock) return
      while (infoBlock.firstElementChild) infoBlock.removeChild(infoBlock.firstElementChild);

      const htmlAddr = `
                 <div>
                  <span class="title-address-for-send">Billing address:</span>
                  <ul class="address-for-send">
                <li>Country: ${data[0].dataaddres.country}</li>
                <li>City: ${data[0].dataaddres.city}</li>
                 <li>Region: ${data[0].dataaddres.area}</li>
                <li>Address: ${data[0].dataaddres.address}</li>
                <li>Name: ${data[0].dataaddres.firstName}</li>
                <li>Surname: ${data[0].dataaddres.secondName}</li>
                <li>Email: ${data[0].dataaddres.mail}</li>
                <li>Phone: ${data[0].dataaddres.phone}</li>
              </ul>
              </div>
              `
      infoBlock.classList.add('dataadress-page')
      infoBlock.insertAdjacentHTML('beforeend', htmlAddr)
    }
  }
  randerInfoClient()
}

finishOrder()
