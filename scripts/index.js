const divAlbum = document.getElementById('album');

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

// displayAlbum();

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

const arrayEvents = data.events
const renderList = (arrayEvents) => {
  divAlbum.innerHTML = '';
  arrayEvents.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = item.city;
    displayDiv.append(listItem);
  })
}


let choices = [];
const categoryList = document.querySelectorAll('.category');
console.log(categoryList)


categoryList.forEach(category => {
  category.addEventListener('change', () => {
    category.checked ? 
      choices.push(category.value)
      : choices.splice( choices.indexOf(category.value), 1 );
    console.log(choices)
    const filteredArray = arrayEvents.filter(item => choices.includes(item.category));
    console.log(filteredArray)
    renderList(filteredArray)
  })
})
