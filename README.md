#  Avis et Alertes Montréal – Application PWA

Ce projet est une **application web progressive (PWA)** qui permet de consulter les **avis et alertes émis par la Ville de Montréal**. Il inclut une **interface moderne**, un **système de filtres**, le **mode hors-ligne**, et l’intégration des **notifications push** via un serveur backend Express.js.

---

##  Fonctionnalités principales

-  **Abonnement aux notifications push**
-  Récupération en temps réel des avis et alertes via l'API officielle de Montréal
-  **Filtres dynamiques** : arrondissement, sujet, date
-  Interface **responsive** compatible mobile et desktop
-  **Mode hors-ligne** avec Service Worker
-  Backend Express avec base de données Firebase pour les abonnements

---

##  Organisation du projet

avis-alertes-montreal/
├── backend/ # Serveur Express pour les notifications
│ ├── firebase/ # Fichier firebaseConfig.js (non versionné)
│ ├── routes/ # Routes : subscribe, unsubscribe, alerts...
│ └── index.js # Point d'entrée du serveur
├── public/ # Fichiers statiques (manifest.json, service-worker.js)
├── src/ # Code source React (frontend)
│ ├── components/ # Composants UI
│ ├── pages/ # Pages principales
│ ├── data/ # Fonctions API et gestion des notifications
│ └── App.jsx # Composant racine
├── .gitignore
├── package.json # Dépendances du frontend
└── README.md # Fichier actuel


## Instructions pour installer et exécuter le code

 Installer les dépendances : npm install

Backend : cd backend
npm install



## Exécution locale

Lancer le backend : cd backend
node index.js


Lancer le frontend : npm run dev


## Remarques techniques
Le backend utilise webpush pour envoyer des notifications.

Les abonnements sont sauvegardés dans Firebase Firestore.

Un fichier service-worker.js gère le cache et les notifications côté client.

Le site fonctionne même hors connexion.