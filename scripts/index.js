const divAlbum = document.getElementById('album');

    for (activity of data.events) {
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
        <div class="card shadow-sm">
          <img src="${activity.image}" alt="event" class="cards_img object-fit-cover border rounded">
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
