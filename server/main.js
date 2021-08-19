import express from 'express';

const app = express();
const port = 3000;

app.use(express.static(`${process.cwd()}/dist`));

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/server/index.html`);
});

app.listen(port, () => {
  console.log(`PWA workshp app listening at http://localhost:${port}`);
});
