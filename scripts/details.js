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
    <div class="d-flex justify-content-center rounded mx-2 my-2 detail_col">
        <img src=${eventSelected.image} class="rounded object-fit-cover" alt="image_detail">
    </div>
    <div class="card mx-2 my-2 detail_col">  
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
            <p>Details: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, nihil.</p>
            <p>Details: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, nihil.</p>
            <p>Details: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, nihil.</p>
        </div>
        <div class="btn-group">
            <form>
                <input type="button" class="btn btn-dark" value="Go back" onclick="history.back()">
            </form>
        </div>
    </div> `