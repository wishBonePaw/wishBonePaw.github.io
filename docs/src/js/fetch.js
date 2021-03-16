const apiKey = "3VJ2XYZrTqvDfwAFbGWvvnZ5Vdfq25CqtmOn6TPveI5uveipq8";
const apiSecret = "LS31WFEruFqRs2zmqltHcDGO3kykp7jVXfXkfjUo";
const orgId = "IL542";
// var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({ apiKey: apiKey, secret: apiSecret });

client.animal
  .search({ organization: orgId })
  .then(function (response) {
    const data = response.data.animals;
    
    var s = $("#dogTemplate")[0].innerHTML.trim();
    var holder = document.createElement('div);
    holder.innerHTML = s;
    var template = holder.childNodes;
    var dog = document.getElementById('ourdogs');
    data.forEach(function(object) {
     
      //clone template
      var newItem = $(template).clone();
      
      //populate it
      var img = $(newItem).find(".thumb")
      $(img).attr("src", object.photos[0]).attr("alt", $(img).attr("alt") + object.name);
      $(newItem).find(".dogname").html(object.name);
      
      //append it
      $(".ourdogs").append(newItem);
    }
    //document.getElementById("json").textContent = JSON.stringify(data);
  })
  .catch(function (error) {
    document.getElementById("error").textContent = JSON.stringify(error);
  });
