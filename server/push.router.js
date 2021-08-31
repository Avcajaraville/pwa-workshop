import express from 'express';
import webpush from 'web-push';
import dotenv from 'dotenv';

import { getRandom } from './get-data.js';

dotenv.config();

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  'https://cabesapp-pwa-workshop.herokuapp.com',
  publicVapidKey,
  privateVapidKey
);

const pushTokens = new Map();

const router = express.Router();

router.post('/subscribe', (req, res) => {
  const payload = JSON.stringify({
    title: 'PWA push notifications are active',
  });
  const subscription = req.body;

  if (!pushTokens.has(subscription.keys.auth)) {
    pushTokens.set(subscription.keys.auth, subscription);
  }

  webpush.sendNotification(subscription, payload);
  res.status(201).json({});
});

router.get('/get-notification', (req, res, next) => {
  for (let subscription of pushTokens.values()) {
    webpush.sendNotification(
      subscription,
      JSON.stringify({ title: `Greetings from ${getRandom()}` })
    );
  }
  res.sendStatus(200);
});

export { router };
