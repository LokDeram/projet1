import express from 'express';
import db from '../firebase.js';

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const subscription = req.body;
    const { endpoint } = subscription;

    const existing = await db.collection('subscriptions')
      .where('endpoint', '==', endpoint)
      .get();

    if (existing.empty) {
      await db.collection('subscriptions').add(subscription);
      console.log(" Abonnement ajouté :", endpoint);
    } else {
      console.log(" Déjà abonné :", endpoint);
    }

    res.json({ success: true, message: 'Abonnement enregistré.' });
  } catch (error) {
    console.error(" Erreur d'abonnement :", error);
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});



router.post('/unsubscribe', async (req, res) => {
  const { endpoint } = req.body;

  if (!endpoint) {
    return res.status(400).json({ success: false, message: 'Endpoint manquant.' });
  }

  try {
    console.log("Endpoint reçu :", endpoint);
    const snapshot = await db.collection('subscriptions')
      .where('endpoint', '==', endpoint)
      .get();

    if (snapshot.empty) {
      console.log("Aucun document trouvé à supprimer !");
      return res.status(404).json({ success: false, message: 'Aucun abonnement trouvé.' });
    }

    const deletions = snapshot.docs.map(doc => {
      console.log("Suppression de :", doc.id);
      return db.collection('subscriptions').doc(doc.id).delete();
    });

    await Promise.all(deletions);

    return res.json({ success: true, message: 'Désabonnement effectué.' });
  } catch (error) {
    console.error('Erreur de désabonnement :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

export default router;
