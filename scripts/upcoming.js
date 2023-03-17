const album = document.getElementById('album');
const searchInput = document.querySelector("input[type='search']")
const checkContainer = document.getElementById('checkContainer')

searchInput.addEventListener('input', crossFilter)
checkContainer.addEventListener('change', crossFilter)

renderUpcomingCards(data.events)
renderCheckBoxes(data.events)

function crossFilter() {
  let inputFilter = inputFiltering(data.events, searchInput.value)
  let categoryFilter = categoryFiltering(inputFilter)
  renderUpcomingCards(categoryFilter)
}

function renderUpcomingCards(array) {
  if (array.length == 0) {
    album.innerHTML = `<h3 class="display-1 fw-bolder"> Nothing Found </h2>`
    return
  }
  let cardsList = ''
  array.forEach(aEvent => {
    if (aEvent.date >= data.currentDate) {
      cardsList += `
      <div class="col card_col">
      <div class="card border rounded shadow-sm">
        <img src="${aEvent.image}" alt="event" class="cards_img object-fit-cover">
        <div class="card-body">
          <h3>${aEvent.name}</h3>
          <p class="card-text ">${aEvent.description} </p>
          <div class="d-flex justify-content-between align-items-center mt-auto">
            <small class="text-muted">Price: ${aEvent.price} $</small>
            <div class="btn-group">
              <a href="./details.html?id=${aEvent.}" class="btn btn-dark">Details</a>
            </div>
          </div>
        </div>
      </div>
   </div>
    `
    }
  });
  album.innerHTML = cardsList
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



/* 
for (aEvent of data.events)  {
    if(aEvent.date >= data.currentDate) {
        cardsList+= `
        <div class="col card_col">
        <div class="card border rounded shadow-sm">
          <img src="${aEvent.image}" alt="event" class="cards_img object-fit-cover">
          <div class="card-body">
            <h3>${aEvent.name}</h3>
            <p class="card-text ">${aEvent.description} </p>
            <div class="d-flex justify-content-between align-items-center mt-auto">
              <small class="text-muted">Price: ${aEvent.price} $</small>
              <div class="btn-group">
                <a href="./details.html" class="btn btn-dark">Details</a>
              </div>
            </div>
          </div>
        </div>
     </div>
      `
    }
    album.innerHTML = cardsList
}
 */