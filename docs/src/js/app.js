var deferredPrompt;
var kennel = document.querySelector('#kennel');
var count = document.querySelector('#dog_count');


if (!window.Promise) {
  window.Promise = Promise;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then(function () {
    //console.log("Service worker registered!");
  })
  .catch(function(err) {
    console.log(err);
  });
}

window.addEventListener('beforeinstallprompt', function(event) {
    //console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferredPrompt = event;
    return false;
});

// var promise = new Promise(function(resolve, reject) {
//   setTimeout(function() {
//     resolve('This is executed once the timer is done');
//     //reject({code: 500, message: 'An error occurred!'});
//     //console.log('This is executed once the timer is done');   
//     }, 3000);
// });

// fetch('https://httpbin.org/ip')
//   .then(function(response) {console.log(response);
//   return response.json();
//   })
//   .then(function(data) {
//     console.log(data);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

// fetch('https://httpbin.org/post', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   },
//   body: JSON.stringify({message: 'Does this work?'})
// })
//   .then(function(response) {
//     console.log(response);
//     return response.json();
//   })
//   .then(function(data) {
//     console.log(data);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

// promise.then(function(text) {
//   return text;
// }, function(err) {
//   console.log(err.code, err.message)
// }).then(function(newText) {
//   console.log(newText);
// });

// promise.then(function(text) {
//   return text;
// }).then(function(newText) {
//   console.log(newText);
// }).catch(function(err) {
//   console.log(err.code, err.message);
// })

// console.log('This is executed right after setTimeout');

//---------- testing petfinder 
var key = "3VJ2XYZrTqvDfwAFbGWvvnZ5Vdfq25CqtmOn6TPveI5uveipq8";
var secret = "LS31WFEruFqRs2zmqltHcDGO3kykp7jVXfXkfjUo";
var org = 'IL542';

var animals = [];

fetch('https://api.petfinder.com/v2/oauth2/token', {
  method: 'POST',
  body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  }  
}).then(function(response) {
  return response.json();
}).then(function(data) {
  console.log('[TOKEN]', data);

  return fetch('https://api.petfinder.com/v2/animals?limit=100&organization=' + org,
  {headers : {
    'Authorization': data.token_type + ' ' + data.access_token,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}).then(function(response) {
  return response.json();
}).then(function(data) {
  console.log('[ANIMALS]', data);
  console.log('[visualViewport.width]', visualViewport.width);
  animals = data.animals;
  count.innerHTML = animals.length;
  animals.sort(function(a,b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); });
  animals.forEach(createCard);
}).catch(function(err) {
  console.log('[ERROR]', err);
});
});



function createCard(dog, index, array) {
  var cardWrapper = document.createElement('div');
  cardWrapper.className = 'mdl-cell mdl-cell--2-col';
  // (index + 1) % 5 != 0 
  //   ? cardWrapper.className = 'mdl-cell mdl-cell--2-col mdl-cell--2-row'
  //   : cardWrapper.className = 'mdl-cell mdl-cell--4-col mdl-cell--4-row';


  var cardPhoto = document.createElement('img');
  cardPhoto.className = 'img-responsive';
  cardPhoto.src = dog.primary_photo_cropped.small;
  cardPhoto.style.width = '100%';
  cardPhoto.style.borderRadius = '15px';
  cardWrapper.appendChild(cardPhoto);

  var cardTitle = document.createElement('div');
  cardTitle.style.alignmentBaseline = 'baseline';
  cardTitle.style.textAlign = 'center';
  cardTitle.className = 'col mdl-typography--title';
  cardTitle.appendChild(document.createTextNode(dog.name))

  cardWrapper.appendChild(cardTitle);

  componentHandler.upgradeElement(cardWrapper);
  kennel.appendChild(cardWrapper);
}

// testing date
if (!Date.now) {
  Date.now = function() { return new Date().getTime(); }
}

var timeStamp = Math.floor(Date.now() / 1000);
console.log('[TIME]', timeStamp);
