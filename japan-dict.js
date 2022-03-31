function getCardWord (card) {
  return card.querySelector('span:nth-of-type(1)').innerText.trim()
}
function getCardHiragana (card) {
  return card.querySelector('span:nth-of-type(2)').innerText.trim()
}
function getCardEnglish (card) {
  return [...card.querySelector('ul').querySelectorAll('li')].map(e=>e.innerText.trim()).filter(e=>e).join('//')
}
function getCurrentPageListItem () {
  return document.querySelector('.page-item.active')
}
function getCurrentPageNumber () {
  return parseInt(getCurrentPageListItem().innerText.trim())
}
function hasNextPage () {
  return !getCurrentPageListItem().nextElementSibling.classList.contains('disabled')
}


/** MAIN */
const cards = [...document.querySelectorAll('.xlarge.text-normal.me-4')].map(e=>e.parentElement)

const cardsInfo = cards.map(c => {
  return [
    getCardWord(c),
    getCardHiragana(c),
    getCardEnglish(c)
  ]
})
fetch('http://localhost:3333/acc', {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify(cardsInfo)
})

// Continue?
if (1 && hasNextPage()) {
  setTimeout(function () {
    getCurrentPageListItem().nextElementSibling.firstElementChild.click()
  }, 2000)
}