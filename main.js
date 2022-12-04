import { handleNumberInput, handleIbanInput, handleAddButtonClick } from './src/js/mainPageHandlers'

function init () {
  const invoiceInput = document.getElementById("number-invoice-input")
  const ibanInput = document.getElementById("number-iban-input")
  const addButton = document.getElementById("add-button")

  invoiceInput.addEventListener("input", handleNumberInput)
  ibanInput.addEventListener("input", handleIbanInput)
  addButton.addEventListener("click", handleAddButtonClick)
}

init()
