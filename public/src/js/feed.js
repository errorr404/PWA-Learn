var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector(
  '#close-create-post-modal-btn'
);
var sharedMomentsArea = document.querySelector('#shared-moments');

function openCreatePostModal() {
  createPostArea.style.display = 'block';
  // if (deferredPrompt) {
  //   deferredPrompt.prompt();

  //   deferredPrompt.userChoice.then(function(choiceResult) {
  //     console.log(choiceResult.outcome);

  //     if (choiceResult.outcome === 'dismissed') {
  //       console.log('User cancelled installation');
  //     } else {
  //       console.log('User added to home screen');
  //     }
  //   });

  //   deferredPrompt = null;
  // }
  // for unregistring the sw
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.getRegistration().then(registrations => {
  //     // this one is for if we have more then one service worker
  //     // for (let registration of registrations) {
  //     //   console.log('unregister is called...');
  //     //   registration.unregister();
  //     // }

  //     // if we have only one service worker
  //     registrations.unregister();
  //   });
  // }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

function clearCards() {
  while (sharedMomentsArea.hasChildNodes()) {
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

// function onSaveButtonClicked(event){
//   console.log('button is clicked...');
//   if('caches' in window){
//     caches.open('user-requested')
//         .then(cache => {
//           cache.addAll([
//             'https://httpbin.org/get',
//           '/src/images/sf-boat.jpg'])
//         })
//   }

// }

function createCard(data) {
  var cardWrapper = document.createElement('div');
  cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
  var cardTitle = document.createElement('div');
  cardTitle.className = 'mdl-card__title';
  cardTitle.style.backgroundImage = 'url('+ data.image + ')';
  cardTitle.style.backgroundSize = 'cover';
  cardTitle.style.height = '180px';
  cardWrapper.appendChild(cardTitle);
  var cardTitleTextElement = document.createElement('h2');
  cardTitleTextElement.className = 'mdl-card__title-text';
  cardTitleTextElement.textContent = data.title;
  cardTitleTextElement.style.color = 'red';
  cardTitle.appendChild(cardTitleTextElement);
  var cardSupportingText = document.createElement('div');
  cardSupportingText.className = 'mdl-card__supporting-text';
  cardSupportingText.textContent = data.location;
  cardSupportingText.style.textAlign = 'center';
  // var cardSaveButton = document.createElement('button');
  // cardSaveButton.textContent = 'save';
  // cardSaveButton.addEventListener('click',onSaveButtonClicked);
  // cardSupportingText.appendChild(cardSaveButton);
  cardWrapper.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}

function UpdateCard(data) {
  clearCards();
  for (var i = 0;i< data.length;i++){
    createCard(data[i]);
  }
}
var url = 'https://pwagram-d7044.firebaseio.com/posts.json';
var networkDataReceived = false;

fetch(url)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    console.log('data from web', data);
    var dataArr = [];
    for( var key in data) {
      dataArr.push(data[key]);
    }
    UpdateCard(dataArr);
  });

if ('caches' in window) {
  caches
    .match(url)
    .then(response => { 
      if (response) return response.json();
    })
    .then(data => {
      console.log('data form cache', data);
      if (!networkDataReceived) {
    var dataArr = [];
        for( var key in data) {
          dataArr.push(data[key]);
        }
        UpdateCard(dataArr);
      }
    });
}
