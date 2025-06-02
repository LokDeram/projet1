import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log("Service Worker enregistré :", registration);
      })
      .catch(error => {
        console.error("Erreur SW :", error);
      });
  });
}
