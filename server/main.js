import express from 'express';

import { router } from './router.js';

const app = express();
const port = 3000;

app.use(express.static(`${process.cwd()}/dist`));

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/server/index.html`);
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`PWA workshp app listening at http://localhost:${port}`);
});
