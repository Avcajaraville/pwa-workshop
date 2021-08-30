import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const publicKey = process.env.PUBLIC_VAPID_KEY;

if (!publicKey) {
  throw new Error('No public key found on .env file. Add an .env file containing a public key with PUBLIC_VAPID_KEY');
}

fs.writeFile('./dist/js/public-key.js', `export const publicKey = '${publicKey}';`, 'utf8', () => {
  console.log('Public key generated successfully');
});