fetch('mockdata.json')
  .then(function (response) {
  return response.json();
}).then(function (data) {
  appendData(data);
}).catch(function (error) {
    document.getElementById('error').textContent = JSON.stringify(error);
});

function appendData(data) {
  var mainContainer = document.getElementById("ourdogs");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.innerHtml = data[i].name;
    mainContainer.appendChild(div);
  }
}

// function readJsonFile(file, callback) {
//   var rawFile = new XMLHttpRequest();
//   rawFile.overrideMimeType("application/json");
//   rawFile.open("GET", file, true);
//   rawFile.onreadystatechange = function() {
//     if (rawFile.readyState === 4 && rawFile.status == "200") {
//       callback(rawFile.responseText);
//     }
//   }
//   rawFile.send(null);
// }

// readJsonFile("./mockdata.json", function(text){
//   var data = JSON.parse(text);
//   document.getElementById("json").textContent = JSON.stringify(data);
// });
