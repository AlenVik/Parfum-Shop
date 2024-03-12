
// The function of displaying "Cost" in the product filter
function costCatalogInput() {
  const costCatalogBtn = document.querySelector('.cost__catalog-btn')
  const costForm = document.querySelector('.cost__catalog-form ')
  const costimg = document.querySelector('.cost__catalog-img')

  if (costCatalogBtn) {
    costCatalogBtn.addEventListener('click', function () {
      costForm.classList.toggle('none')
      costimg.classList.toggle('rotate180')
    })
  }

}

costCatalogInput()

