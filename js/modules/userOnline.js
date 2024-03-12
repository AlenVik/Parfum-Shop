
// Функция обновления статуса и замены всех ссылок со страницы регистрации на страницу аккаунта
function onlineStatus() {
  const data = JSON.parse(localStorage.getItem('dataRegInput'))

  if (data && data[0].statusOnline === true) {
    const user = document.getElementById('userLogo')
    user.classList.add('account-active')

    let links = document.getElementsByTagName('a');

    for (let i = 0; i < links.length; i++) {
      let href = links[i].getAttribute('href');
      href && href.includes('registration-page.html') && links[i].setAttribute('href', href.replace('registration-page.html', 'newaccount-page.html'));
    }
  }

  let data2 = JSON.parse(localStorage.getItem('dataBasketCurr'))
  if (data2 !== null) {
    //Calculate and display the number of product items in the basket icon
    let currNumOfPosition = Number(document.getElementById('countStaff').textContent)
    data2.forEach(card => currNumOfPosition += card.position)
    document.getElementById('countStaff').textContent = currNumOfPosition
  }
}
onlineStatus()