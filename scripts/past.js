const album = document.getElementById('album');
const searchInput = document.querySelector("input[type='search']")
const checkContainer = document.getElementById('checkContainer')
const API_URL = "https://mindhub-xj03.onrender.com/api/amazing"
let completeArray

searchInput.addEventListener('input', crossFilter)
checkContainer.addEventListener('change', crossFilter)

fetch(API_URL)
  .then((response) => response.json())
  .then(array => {
    completeArray = array
    const pastEvents = completeArray.events.filter(event => event.date < completeArray.currentDate)
    renderPastCards(pastEvents)
    renderCheckBoxes(pastEvents)
  })


function crossFilter() {
  let inputFilter = inputFiltering(completeArray.events, searchInput.value)
  let categoryFilter = categoryFiltering(inputFilter)
  renderPastCards(categoryFilter)
}


function renderCheckBoxes(array) {
  //crea el array incluyendo categorias repetidas
  let eventsArray = array.map(event => event.category)
  //con set se almacenan valores unicos
  let setEvents = new Set(eventsArray)
  //transformar en array
  let arrayChecks = Array.from(setEvents)
  let checkboxes = ''
  arrayChecks.forEach(category => {
    checkboxes += `<label class="px-1">
                      <input type="checkbox" name="category" value="${category}" class="category"> 
                      ${category} 
                    </label>`
  })
  checkContainer.innerHTML = checkboxes
}


function inputFiltering(array, text) {
  let filteredArray = array.filter(event =>
    event.name.toLowerCase().includes(text.toLowerCase()))
  return filteredArray
}

function categoryFiltering(array) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']")
  let arrayChecks = Array.from(checkboxes)
  let arrayChecksChecked = arrayChecks.filter(check => check.checked)
  let arrayChecksCheckedValues = arrayChecksChecked.map(checkChecked => checkChecked.value)
  console.log(arrayChecksCheckedValues);
  let filteredArray = array.filter(event => arrayChecksCheckedValues.includes(event.category))
  if (arrayChecksChecked.length > 0) {
    return filteredArray
  }
  return array
}


function renderPastCards(array) {
  if (array.length == 0) {
    album.innerHTML = `<h3 class="display-1 fw-bolder"> Nothing Found </h2>`
    return
  }
  let cardsList = ''
  array.forEach(aEvent => {
      cardsList += `
      <div class="col">
      <div class="card border rounded shadow-sm">
        <img src="${aEvent.image}" alt="event" class="cards_img object-fit-cover">
        <div class="card-body">
          <h3>${aEvent.name}</h3>
          <p class="card-text ">${aEvent.description} </p>
          <div class="d-flex justify-content-between align-items-center mt-auto">
            <small class="text-muted">Price: ${aEvent.price} $</small>
            <div class="btn-group">
              <a href="./details.html?id=${aEvent._id}" class="btn btn-dark">Details</a>
            </div>
          </div>
        </div>
      </div>
   </div>
    `
  });
  album.innerHTML = cardsList
}