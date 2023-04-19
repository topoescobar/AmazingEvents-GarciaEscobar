const API_URL = "https://mindhub-xj03.onrender.com/api/amazing"
const querySearch = document.location.search
const id = new URLSearchParams(querySearch).get("id")
let completeArray
let eventsArray

fetch(API_URL)
    .then((response) => response.json())
    .then((array) => {
        completeArray = array
        // console.log("completeArray", completeArray)
        eventsArray = getEventsArray(completeArray)
        renderEvent(eventsArray)

    })

function getEventsArray(array) {
    eventsArray = array.events.map(aEvent => {
        let reEvent = {}
        reEvent.id = aEvent._id
        reEvent.name = aEvent.name
        reEvent.image = aEvent.image
        reEvent.date = aEvent.date
        reEvent.description = aEvent.description
        reEvent.category = aEvent.category
        reEvent.place = aEvent.place
        reEvent.price = aEvent.price
        return reEvent
    })
    return eventsArray
}

function renderEvent(array) {
    const eventSelected = array.find(aEvent => aEvent.id == id)    
    const cardContainer = document.getElementById("cardContainer")
    
    cardContainer.innerHTML = `
        <div class="d-flex justify-content-center rounded p-2 detail_col">
            <img src=${eventSelected.image} class="object-fit-cover border rounded image_detail" alt="image_detail">
        </div>
        <div class="card mx-2 my-2 detail_col border rounded">  
            <div class="card-body">
                <h4 class="card-title">${eventSelected.name}</h4>
                <p class="card-text">${eventSelected.description}</p>
                <ul class="list-group" >
                    <li class="list-group-item"><p><span class="strong"> Date: </span> ${eventSelected.date} </p> </li>
                    <li class="list-group-item"><p><span class="strong"> Place: </span> ${eventSelected.place}</p> </li>
                    <li class="list-group-item"><p><span class="strong"> Price: </span> $ ${eventSelected.price}</p></li>
                </ul>            
            </div>
            <div class="btn-group">
                <form>
                    <input type="button" class="btn btn-dark" value="Go back" onclick="history.back()">
                </form>
            </div>
        </div>
        `
}