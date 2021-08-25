if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./js/service-worker.js', {scope: '../'})
} else {
  console.log('Service Worker is not supported in your browser');
}
