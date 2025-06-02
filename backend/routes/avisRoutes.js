import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  const alertsUrl =
    'https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=fc6e5f85-7eba-451c-8243-bdf35c2ab336';
  const geoJsonUrl =
    'https://donnees.montreal.ca/dataset/556c84af-aebf-4ca9-9a9c-2f246601674c/resource/d249e452-46f5-422f-91ae-898c98eea6cc/download/avis-alertes.geojson';

  try {
    const alertResponse = await axios.get(alertsUrl);
    const alertRecords = alertResponse.data.result.records;

    const geoResponse = await axios.get(geoJsonUrl);
    const geoData = geoResponse.data;

    const normalize = (str) =>
      str?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/–/g, "-")
        .replace(/[’']/g, "")
        .replace(/[^a-z0-9 ]/gi, "")
        .trim();

    const coordinatesByNormalizedTitle = {};
    geoData.features.forEach((feature) => {
      const title = normalize(feature.properties.titre);
      if (title && feature.geometry?.coordinates) {
        coordinatesByNormalizedTitle[title] = {
          geometry: feature.geometry,
        };
      }
    });

    const formatted = alertRecords.map((item) => {
      const rawTitle = item.titre || 'Alerte sans titre';
      const normalizedTitle = normalize(rawTitle);
      const geoInfo = coordinatesByNormalizedTitle[normalizedTitle];

      return {
        _id: item._id,
        titre: rawTitle,
        sujet: item.type || 'Sujet inconnu',
        arrondissement: extractArrondissementFromTitre(rawTitle),
        date: (item.date_debut || item.date || '').split('T')[0] || 'Date inconnue',
        geometry: geoInfo?.geometry || null,
      };
    });

    res.json(formatted);
  } catch (error) {
    console.error('Erreur côté serveur :', error.message);
    res.status(500).json({ error: 'Erreur lors du fetch des données' });
  }
});

function extractArrondissementFromTitre(titre) {
  if (!titre) return 'Arrondissement inconnu';

  const regex = /arr(?:\.|\b|ondissement)?(?: de)? ([A-Za-zÀ-ÿ\-’'–, ]{3,})/i;
  const match = titre.match(regex);
  if (match && match[1]) {
    return match[1].split(/[–,-]/)[0].trim();
  }

  const lower = titre.toLowerCase();
  const fallbackIndex = lower.lastIndexOf('arrondissement de ');
  if (fallbackIndex !== -1) {
    return titre
      .substring(fallbackIndex + 18)
      .split(/[–,-]/)[0]
      .trim();
  }

  return 'Arrondissement inconnu';
}

export default router;
