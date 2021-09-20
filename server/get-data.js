import fs from 'fs';

// THIS IS NOT A GOOD PRACTICE! Just for ilustration purposes!
let charactersRDR2 = null;

export async function getAll() {
  const files = await fs.promises.readdir(`${process.cwd()}/server/data`);
  const characters = await Promise.all(
    files
      .filter((file) => file.endsWith('.json'))
      .map(async (file) => {
        const data = await fs.promises.readFile(
          `${process.cwd()}/server/data/${file}`
        );
        return JSON.parse(data).characters;
      })
  );
  charactersRDR2 = characters.flat();
}

export function getRandom() {
  if (!charactersRDR2) {
    return 'No one!';
  }

  return charactersRDR2[Math.floor(Math.random() * charactersRDR2.length)];
}
