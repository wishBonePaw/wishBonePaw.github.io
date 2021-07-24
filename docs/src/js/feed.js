var kennel = document.querySelector("#kennel");
var counts = document.querySelectorAll("#dog_count");

//---------- testing petfinder
//todo: obfuscation
var key = "3VJ2XYZrTqvDfwAFbGWvvnZ5Vdfq25CqtmOn6TPveI5uveipq8";
var secret = "LS31WFEruFqRs2zmqltHcDGO3kykp7jVXfXkfjUo";
var org = "IL542";

var animals = [];

fetch("https://api.petfinder.com/v2/oauth2/token", {
  method: "POST",
  body:
    "grant_type=client_credentials&client_id=" +
    key +
    "&client_secret=" +
    secret,
  headers: {
    "Content-type": "application/x-www-form-urlencoded",
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("[TOKEN]", data);

    return fetch(
      "https://api.petfinder.com/v2/animals?limit=100&organization=" + org,
      {
        headers: {
          Authorization: data.token_type + " " + data.access_token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("[ANIMALS]", data);
        //console.log("[visualViewport.width]", visualViewport.width);
        animals = data.animals;
        counts.forEach((count) => (count.innerHTML = animals.length));
        animals.sort(function (a, b) {
          return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
        });
        animals.forEach(createCard);
      })
      .catch(function (err) {
        console.log("[ERROR]", err);
      });
  });

function createCard(dog, index, array) {
  var cardWrapper = document.createElement("div");
  cardWrapper.className = "mdl-cell mdl-cell--2-col";
  // (index + 1) % 5 != 0
  //   ? cardWrapper.className = 'mdl-cell mdl-cell--2-col mdl-cell--2-row'
  //   : cardWrapper.className = 'mdl-cell mdl-cell--4-col mdl-cell--4-row';

  var cardPhoto = document.createElement("img");
  cardPhoto.className = "img-responsive";
  cardPhoto.src = dog.primary_photo_cropped.small;
  cardPhoto.style.width = "100%";
  cardPhoto.style.borderRadius = "15px";
  cardWrapper.appendChild(cardPhoto);

  var cardTitle = document.createElement("div");
  cardTitle.style.alignmentBaseline = "baseline";
  cardTitle.style.textAlign = "center";
  cardTitle.className = "col mdl-typography--title";
  cardTitle.appendChild(document.createTextNode(dog.name));

  cardWrapper.appendChild(cardTitle);

  componentHandler.upgradeElement(cardWrapper);
  kennel.appendChild(cardWrapper);
}
