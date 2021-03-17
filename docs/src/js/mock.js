fetch('mockdata.json')
  .then(function (response) {
}).then(function (data) {
  appendData(data);
}).catch(function (error) {
    document.getElementById('error').textContent = JSON.stringify(error);
});

function appendData(data) {
  var mainContainer = document.getElementById("ourdogs");
  mainContainer.textContent = JSON.parse(data);
}
