const apiKey = process.env.PETFINDER_API_KEY;
const apiSecret = process.env.PETFINDER_SECRET;
var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({ apiKey: apiKey, secret: apiSecret });

client.animal
  .search()
  .then(function (response) {
    const data = response.data;
    document.getElementById("json").textContent = JSON.stringify(data);
  })
  .catch(function (error) {
    document.getElementById("error").textContent = JSON.stringify(error);
  });