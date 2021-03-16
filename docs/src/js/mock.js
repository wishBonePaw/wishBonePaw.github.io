var fr = new FileReader();
fr.onload = function(){
  document.getElementById('json').textContent = fr.result;
  fr.readAsText(./mockdata.json);
}
