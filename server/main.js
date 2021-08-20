import express from 'express';

import { router } from './router.js';

const app = express();
const port = 3000;

app.get('/images/:image.jpg', (req, res, next) => {
  // Simulate slow server response
  setTimeout(
    () => res.sendFile(`${process.cwd()}/dist/images/${req.params.image}.jpg`),
    1500
  );
});

app.use(express.static(`${process.cwd()}/dist`));

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/server/index.html`);
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`PWA workshp app listening at http://localhost:${port}`);
});
