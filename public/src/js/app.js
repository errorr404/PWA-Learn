var defferedPrompt;
// check for serviveWorker is supported by browser or not
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => console.log('Service worker registred!!'))
    .catch(err => console.log(err));
}

window.addEventListener('beforeinstallprompt', e => {
  console.log('beforeinstallprompt fired...');
  e.preventDefault();
  defferedPrompt = e;
  return false;
});
