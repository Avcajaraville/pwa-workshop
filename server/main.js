import express from 'express';

import { router } from './router.js';

const app = express();
const port = 3000;

app.get('/images/:image.jpg', (req, res, next) => {
  // Simulate slow server response
  setTimeout(() => {
    res.sendFile(`${process.cwd()}/dist/images/${req.params.image}.jpg`);
  }, 1500);
});

app.use('/api', router);

app.get('/js/service-worker.js', (req, res, next) => {
  res.set('Service-Worker-Allowed', '/');
  next();
});

app.use(express.static(`${process.cwd()}/dist`));

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/server/index.html`);
});

app.listen(port, () => {
  console.log(`PWA workshp app listening at http://localhost:${port}`);
});
