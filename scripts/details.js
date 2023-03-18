const querySearch = document.location.search
console.log("queryseacrh:" + querySearch);

const id = new URLSearchParams(querySearch).get("id")
console.log("URLSearchParams ID: " + id);

const eventsArray = data.events.map(aEvent =>{
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
console.log(eventsArray);

const eventSelected = eventsArray.find(aEvent => aEvent.id == id)
console.log(eventSelected);

const cardContainer = document.getElementById("cardContainer")

cardContainer.innerHTML = `
    <div class="d-flex justify-content-center rounded p-2 detail_col">
        <img src=${eventSelected.image} class="rounded object-fit-cover image_detail" alt="image_detail">
    </div>
    <div class="card mx-2 my-2 detail_col">  
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