/*const divAlbum = document.getElementById('album');

 function displayAlbum() {
  for (activity of data.events) {
    const card = document.createElement('div');
    card.classList.add('col', 'card_col');
    card.innerHTML = `
        <div class="card border rounded shadow-sm">
          <img src="${activity.image}" alt="event" class="cards_img object-fit-cover">
          <div class="card-body">
            <h3>${activity.name}</h3>
            <p class="card-text ">${activity.description} </p>
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">Price: $$$</small>
              <div class="btn-group">
                <a href="./details.html" class="btn btn-dark">Details</a>
              </div>
            </div>
          </div>
        </div>
      `
    divAlbum.append(card);
  }
}

displayAlbum();

 function searching() {
  let cards = document.querySelectorAll('.card_col')
  let searchInput = document.getElementById("search").value
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].innerText.toLowerCase().includes(searchInput.toLowerCase())) {
      cards[i].classList.remove("is_hidden");
    } else {
      cards[i].classList.add("is_hidden");
    }
  }
} 
 */

const searchInput = document.querySelector("input[type='search']")
const checkContainer = document.getElementById('checkContainer')
const album = document.getElementById('album')

searchInput.addEventListener('input', crossFilter)
checkContainer.addEventListener('change', crossFilter)

renderCards(data.events)
renderCheckBoxes(data.events)

function crossFilter() {
  let inputFilter = inputFiltering(data.events, searchInput.value)
  let categoryFilter = categoryFiltering(inputFilter)
  renderCards(categoryFilter)
}

function renderCheckBoxes(array) {
  //crea el array incluyendo categorias repetidas
  let eventsArray = array.map(event => event.category)
  // console.log(eventsArray)

  //con set se almacenan valores unicos
  let setEvents = new Set(eventsArray)
  // console.log(setEvents)

  //transformar en array
  let arrayChecks = Array.from(setEvents)
  // console.log(arrayChecks)
  let checkboxes = ''
  arrayChecks.forEach(category => {
    checkboxes += `<label class="px-1">
                      <input type="checkbox" name="category" value="${category}" class="category"> 
                      ${category} 
                    </label>`
  })
  checkContainer.innerHTML = checkboxes
}


function renderCards(array) {
  if (array.length == 0) {
    album.innerHTML = `<h3 class="display-1 fw-bolder"> Nothing Found </h2>`
    return
  }
  let cards = ''
  array.forEach(event => {
    cards += `
     <div class="col card_col">
        <div class="card border rounded shadow-sm">
          <img src="${event.image}" alt="event" class="cards_img object-fit-cover">
          <div class="card-body">
            <h3>${event.name}</h3>
            <p class="card-text ">${event.description} </p>
            <div class="d-flex justify-content-between align-items-center mt-auto">
              <small class="text-muted">Price: ${event.price} $</small>
              <div class="btn-group">
                <a href="./details.html?id=${event._id}" class="btn btn-dark">Details</a>
              </div>
            </div>
          </div>
        </div>
     </div>
      `
  })
  album.innerHTML = cards
}

function inputFiltering(array, text) {
  let filteredArray = array.filter(event =>
    event.name.toLowerCase().includes(text.toLowerCase()))
  return filteredArray
}

function categoryFiltering(array) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']")
  // console.log(checkboxes); 
  let arrayChecks = Array.from(checkboxes)
  // console.log(arrayChecks);
  let arrayChecksChecked = arrayChecks.filter(check => check.checked)
  // console.log(arrayChecksChecked);
  let arrayChecksCheckedValues = arrayChecksChecked.map(checkChecked => checkChecked.value)
  console.log(arrayChecksCheckedValues);
  let filteredArray = array.filter(event => arrayChecksCheckedValues.includes(event.category))
  // console.log(filteredArray);
  if (arrayChecksChecked.length > 0) {
    return filteredArray
  }
  return array
}