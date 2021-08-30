import fs from 'fs';

// THIS IS NOT A GOOD PRACTICE! Just for ilustration purposes!
let charactersRDR2 = null;

export async function getAll() {
  return fs.promises
    .readdir(`${process.cwd()}/server/data`)
    .then((files) => {
      return Promise.all(
        files.map((file) =>
          fs.promises
            .readFile(`${process.cwd()}/server/data/${file}`)
            .then((data) => JSON.parse(data).characters)
        )
      );
    })
    .then((characters) => {
      charactersRDR2 = characters.flat();
      return charactersRDR2;
    });
}

export function getRandom() {
  if (!charactersRDR2) {
    return 'No one!';
  }

  return charactersRDR2[Math.floor(Math.random() * charactersRDR2.length)];
}
