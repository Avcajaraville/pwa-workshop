import express from 'express';

import { getAll } from './get-data.js';
import { router as apiRouter } from './api.router.js';
import { router as pushRouter } from './push.router.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/images/:image.jpg', (req, res, next) => {
  // Simulate slow server response
  setTimeout(() => {
    res.sendFile(`${process.cwd()}/dist/images/${req.params.image}.jpg`);
  }, 1500);
});

app.use('/push', pushRouter);
app.use('/api', apiRouter);

app.get('/js/service-worker.js', (req, res, next) => {
  res.set('Service-Worker-Allowed', '/');
  next();
});

app.use(express.static(`${process.cwd()}/dist`));

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/server/index.html`);
});

getAll().then(() => {
  app.listen(port, () => {
    console.log(`PWA workshop app listening at http://localhost:${port}`);
  });
});
