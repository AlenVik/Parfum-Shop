// Get the buttons and subsections of the "Address" tab on the "My Account" page
function addAddr() {

  //The object for receiving the recipient's address data
  let objInputData = {};
  const addbtn = document.querySelector('.address__add-btn');
  const addbtnSave = document.querySelector('.address-add__form-btn');
  const addbtnCancel = document.querySelector('.address-add__form-btn-cancel');
  const addOffAdr = document.querySelector('.address-without');
  const addFormAdr = document.querySelector('.address-add')
  const addrSavedHtml = document.querySelector('.address-saved')

  //Listening the "add", "save", "cancel" buttons in the "address", My account subsection

  // The "add" button

  if (addbtn) {
    addbtn.addEventListener('click', () => {
      addOffAdr.classList.add('none')
      addFormAdr.classList.remove('none')
    })
  }

  // The "Cancel" button

  if (addbtnCancel) {
    addbtnCancel.addEventListener('click', (e) => {
      e.preventDefault()
      const data = JSON.parse(localStorage.getItem('dataRegInput'))
      for (let i = 0; i < data.length; i++) {
        if (data[i].statusOnline === true && data[i].dataaddres) {
          addOffAdr.classList.add('none')
          formDataRender(data[i])
        }
        else {
          addOffAdr.classList.remove('none')
          addFormAdr.classList.add('none')
        }
      }
    })
  }

  // The "Save" button

  if (addbtnSave) {
    addbtnSave.addEventListener('click', (e) => {
      e.preventDefault()
      formAddrData()
    })
  }

  // Get all the data from the delivery address form
  function formAddrData() {
    const inputs = document.querySelectorAll('.address-add__form input')
    inputs.forEach(input => {
      objInputData[input.name] = input.value;
      input.value = ''
    });

    const values = Object.values(objInputData);
    values.some(value => value !== "") ? addDataToLC(objInputData) : alert('Fill in at least one field!')
  }

  // Add all data from the delivery address form object to Local Storage

  function addDataToLC(objInputData) {
    const data = JSON.parse(localStorage.getItem('dataRegInput'))

    for (let i = 0; i < data.length; i++) {
      if (data[i].statusOnline === true) {
        data[i].dataaddres = objInputData
        formDataRender(data[i])
      }
    }
    localStorage.setItem('dataRegInput', JSON.stringify(data));
  }

  // Get all the details of the delivery address form from Local Storage
  function getDataFromLC() {
    const data = JSON.parse(localStorage.getItem('dataRegInput'))
    if (!data) return;

    for (let i = 0; i < data.length; i++) {
      if (data[i].statusOnline === true) {
        let objInputDataAddres = data[i]
        formDataRender(objInputDataAddres)
      }
    }
  }
  getDataFromLC()

  // Display all the data received from the delivery address form on the "My Account" page, the "Address" subsection
  function formDataRender(objInputDataAddres) {

    if (!objInputDataAddres.dataaddres) return

    const html = `
         <div class="address-saved__block">
            <div class="address-saved__succes">
              <img src="./../../../img/newaccount/check-circle.svg" alt="check icon">
              <span>The address has been successfully changed</span>
            </div>
            <span class="address-saved__text">The following addresses will be used when placing order by default</span>
            <div class="address-saved__payaddress">
              <span>Billing address:</span>
              <ul class="address-saved__data">
                <li>${objInputDataAddres.dataaddres.firstName} ${objInputDataAddres.dataaddres.secondName}</li>
                <li>${objInputDataAddres.dataaddres.country}</li>
                 <li>${objInputDataAddres.dataaddres.address}</li>
                <li>${objInputDataAddres.dataaddres.city}</li>
                <li>${objInputDataAddres.dataaddres.area}</li>
                <li>${objInputDataAddres.dataaddres.index}</li>
                <li>${objInputDataAddres.dataaddres.mail}</li>
                <li>${objInputDataAddres.dataaddres.phone}</li>
              </ul>
              <button class="address-saved__change">To change</button>
              <button class="address-deleted__change">Remove</button>
            </div>

          </div>
    `
    if (addFormAdr && addOffAdr && addrSavedHtml) {
      addFormAdr.classList.add('none')
      addOffAdr.classList.add('none')
      addrSavedHtml.classList.remove('none')
      addrSavedHtml.insertAdjacentHTML('beforeend', html)
      changeDataForm()
    }
  }

  //To change or delete all data received from the delivery address form on the "My Account" page, the "Address" subsection

  function changeDataForm() {

    const addChangeBtn = document.querySelector('.address-saved__change')
    const addDeletBtn = document.querySelector('.address-deleted__change')

    if (!addChangeBtn && !addDeletBtn) return

    // The "edit" button
    addChangeBtn.addEventListener('click', () => {
      addFormAdr.classList.remove('none')
      const removeBlock = addrSavedHtml.querySelector('.address-saved__block')

      if (removeBlock) removeBlock.remove()
      addrSavedHtml.classList.add('none')
    })
    //The "delete" button
    addDeletBtn.addEventListener('click', () => {
      const removeBlock = addrSavedHtml.querySelector('.address-saved__block')
      if (removeBlock) removeBlock.remove()

      const data = JSON.parse(localStorage.getItem('dataRegInput'))
      if (!data) return;

      for (let i = 0; i < data.length; i++) {
        if (data[i].statusOnline === true) {
          delete data[i].dataaddres
          localStorage.setItem('dataRegInput', JSON.stringify(data));
        }
      }
      addOffAdr.classList.remove('none')
      addrSavedHtml.classList.add('none')
    })
  }
  changeDataForm()
}

addAddr()