import express from 'express';
import webpush from '../utils/webpush.js';
import db from '../firebase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { title, message } = req.body;

  const payload = JSON.stringify({
    title: title || "Nouvelle alerte",
    body: message || "Une nouvelle alerte est disponible."
  });

  try {
    const snapshot = await db.collection('subscriptions').get();

    const notifications = snapshot.docs.map(doc =>
      webpush.sendNotification(doc.data(), payload).catch(err => {
        console.error("Erreur envoi :", err);
      })
    );

    await Promise.all(notifications);

    res.status(200).json({ message: 'Notifications envoyées via Firebase' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur envoi Firebase' });
  }
});

export default router;
