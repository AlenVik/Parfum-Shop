
// Registration/authorization function and all related details
function myAccount() {

  // Elements for receiving data during registration
  const myEmail = document.getElementById('myEmail')
  const myPass = document.getElementById('myPass')
  const btnReg = document.getElementById('btn-reg')
  const btnModule = document.getElementById('btn-module')
  const woman = document.getElementById('woman')
  const man = document.getElementById('man')
  const robot = document.getElementById('chekrobot')
  const remember = document.getElementById('chekcremember')
  const user = document.getElementById('userLogo')

  const btnExit = document.getElementById('exit')

  const turnOnModule = document.querySelector('.module-reg')

  //Elements for obtaining data during authorization

  const myEmailAuth = document.getElementById('emailAuth')
  const myPassAuth = document.getElementById('passAuth')
  const btnEnter = document.getElementById('enter')

  const objDataReg = {}

  // Button and authorization function

  if (btnEnter) btnEnter.addEventListener('click', authorizationAcc)

  function authorizationAcc(e) {
    e.preventDefault()
    const login = myEmailAuth.value;
    const password = myPassAuth.value;
    let massAcc = JSON.parse(localStorage.getItem('dataRegInput'));
    if (!massAcc) return

    massAcc.forEach(el => {
      if (el.mail == login && el.pass == password) {
        el.statusOnline = true
        localStorage.setItem('dataRegInput', JSON.stringify(massAcc))
        window.location.href = "newaccount-page.html";
      }
    })
  }

  // Click on the button, receive data from the account registration form, add it in the data object and register
  if (btnReg) btnReg.addEventListener('click', registrationAcc)
  function registrationAcc(e) {
    e.preventDefault()

    if (myEmail.value !== '' && myPass.value !== '') {
      objDataReg.mail = myEmail.value
      objDataReg.pass = myPass.value
      objDataReg.woman = woman.checked === true ? objDataReg.woman = true : objDataReg.woman = false;
      objDataReg.man = man.checked === true ? objDataReg.man = true : objDataReg.man = false;
      objDataReg.robot = robot.checked === true ? objDataReg.robot = true : objDataReg.robot = false;
      objDataReg.remember = remember.checked === true ? objDataReg.remember = true : objDataReg.remember = false;
      objDataReg.statusOnline = true;

      user.classList.add('account-active')
      document.querySelector('.overlay-reg').classList.add('overlay-reg-active')
      turnOnModule.classList.remove('module-reg-active')

      let massAcc = localStorage.getItem('dataRegInput');

      massAcc ? massAcc = JSON.parse(massAcc) : massAcc = []

      massAcc.push(objDataReg)

      localStorage.setItem('dataRegInput', JSON.stringify(massAcc))

    } else {
      alert("Введите почту и пароль")
    }

    if (!btnModule) return
    btnModule.addEventListener('click', () => window.location.href = "newaccount-page.html")
  }

  //The button and the listening of the button to log out of the account
  if (btnExit) btnExit.addEventListener('click', exitFromAcc)

  //The function of logging out of the account when the button is pressed
  function exitFromAcc() {
    const data = JSON.parse(localStorage.getItem('dataRegInput'))

    if (data[0].statusOnline === true) data[0].statusOnline = false;
    localStorage.setItem('dataRegInput', JSON.stringify(data));

    //Replacing the account details page with the authorization/registration page
    let links = document.getElementsByTagName('a');

    for (let i = 0; i < links.length; i++) {
      let href = links[i].getAttribute('href');
      href && href.includes('newaccount-page.html') && links[i].setAttribute('href', href.replace('newaccount-page.html', 'registration-page.html'))
    }
    window.location.href = "registration-page.html";
  }

}

myAccount()

