var fr = new FileReader();
fr.onload = function(){

  fr.readAsText(./mockdata.json).then(
  document.getElementById('json').textContent = fr.result;
    )
}
