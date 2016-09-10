import '/imports/startup/client';

let serviceWorkerRegistration;

if ('serviceWorker' in navigator) {
 navigator.serviceWorker.register('sw.js').then(function() {
  return navigator.serviceWorker.ready;
 }).catch(function(error) {
  console.log('Service Worker error', error);
 });
}
