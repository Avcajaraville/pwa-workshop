import { publicKey } from './public-key.js';

if ('serviceWorker' in navigator) {
  serviceWorkerRegistration().catch((err) => console.error(err));
} else {
  console.log('Service Worker is not supported in your browser');
}

let register;

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('[data-type="notify"]')
    .addEventListener('click', () => {
      fetch('/push/get-notification');
    });

  document
    .querySelector('[data-type="subscribe"]')
    .addEventListener('click', async () => {
      await navigator.serviceWorker.ready;

      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey,
      });

      await fetch('/push/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'content-type': 'application/json',
        },
      });
    });
});

async function serviceWorkerRegistration() {
  register = await navigator.serviceWorker.register('./js/service-worker.js', {
    scope: '../',
  });
}
