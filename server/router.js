import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/:collection', (req, res, next) => {
  fs.readFile(
    `${process.cwd()}/server/data/${req.params.collection}.json`,
    (err, data) => {
      if (err) {
        throw err;
      }
      // Simulate slow server response
      setTimeout(() => res.json(JSON.parse(data)), 1500);
    }
  );
});

export { router };
