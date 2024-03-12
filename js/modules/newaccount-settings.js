// New Account settings function
function newAccountSett() {

  //The function of setting the username in the greeting
  function nameOfAcc() {
    const nameUser = document.getElementById('nameUser')
    const panel = document.querySelector('.panel')
    const data = JSON.parse(localStorage.getItem('dataRegInput'))

    if (!nameUser || !panel || !data) return

    if (data[0].statusOnline === true) {
      nameUser.textContent = data[0].mail;
      panel.style.display = "block";
    }
  }
  nameOfAcc()


  // The function of changing the active block on the account page
  function changeBlock() {
    const accListSet = document.querySelectorAll('.newaccount__block-item')
    const massAcc = document.querySelectorAll('.mass_set')

    accListSet.forEach(el => {
      el.addEventListener('click', function (e) {
        accListSet.forEach(elem => elem.classList.remove('active-acc'))
        const id = e.target.closest('.newaccount__block-item').id;
        e.target.closest('.newaccount__block-item').classList.add('active-acc')

        massAcc.forEach(el => el.classList.toggle('none', !el.classList.contains(id)));
      })
    })
  }
  changeBlock()


  //The function of changing the first name, last name, email and password in the account
  function changeDataInfo() {

    const newName = document.getElementById('newName')
    const newSecondName = document.getElementById('newSecondName')
    const newEmail = document.getElementById('newEmail')

    const currPass = document.getElementById('currPass')
    const newPass = document.getElementById('newPass')
    const repeatNewPass = document.getElementById('repeatNewPass')

    const btnSaveChanges = document.getElementById('btnSaveChanges')

    if (btnSaveChanges)

      btnSaveChanges.addEventListener('click', function (e) {
        e.preventDefault()
        const data = JSON.parse(localStorage.getItem('dataRegInput'))

        for (let i = 0; i < data.length; i++) {
          if (data[i].statusOnline === true) {
            if (newName.value !== '') {
              data[i].newname = newName.value;
              newName.value = ''
            }
            if (newSecondName.value !== '') {
              data[i].secondname = newSecondName.value;
              newSecondName.value = ''
            }
            if (newEmail.value !== '') {
              data[i].mail = newEmail.value;
              newEmail.value = ''
              window.location.href = "newaccount-page.html";
            }
            if (currPass.value !== '' && newPass.value !== '' && repeatNewPass.value !== '') {
              if (currPass.value === data[i].pass && newPass.value === repeatNewPass.value) {
                data[i].pass = newPass.value;
                currPass.value = ''
                newPass.value = ''
                repeatNewPass.value = ''
              }
            }
          }
        }

        localStorage.setItem('dataRegInput', JSON.stringify(data));
      })
  }
  changeDataInfo()
}

newAccountSett()