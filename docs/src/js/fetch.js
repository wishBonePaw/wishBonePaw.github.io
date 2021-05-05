const apiKey = "3VJ2XYZrTqvDfwAFbGWvvnZ5Vdfq25CqtmOn6TPveI5uveipq8";
const apiSecret = "LS31WFEruFqRs2zmqltHcDGO3kykp7jVXfXkfjUo";
var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({ apiKey: apiKey, secret: apiSecret });

client.animal
  .search({organization_id: "IL542"})
  .then(function (response) {
    const data = response.data;
    document.getElementById("json").textContent = JSON.stringify(data);
  })
  .catch(function (error) {
    document.getElementById("error").textContent = JSON.stringify(error);
  });
