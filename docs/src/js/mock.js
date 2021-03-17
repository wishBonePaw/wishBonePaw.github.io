fetch('https://wishbonepaw.github.io/src/js/mockdata.json')
  .then(function (response) {
    return response.json();
}).then(function (data) {
  appendData(data);
}).catch(function (error) {
    document.getElementById('error').textContent = JSON.stringify(error);
});

function appendData(data) {
  var mainContainer = document.getElementById("ourdogs");
  mainContainer.textContent = JSON.stringify(data);
}
