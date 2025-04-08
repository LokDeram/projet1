import React from 'react';
import { useParams, Link } from 'react-router-dom';
import alerts from '../data/alerts';
import './AlertDetailPage.css';

function AlertDetailPage() {
  const { id } = useParams();
  const alert = alerts.find((a) => a.id === parseInt(id));

  if (!alert) {
    return (
      <div className="detail-container">
        <h2>Alerte introuvable</h2>
        <Link to="/">← Retour à la liste</Link>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <h2>{alert.titre}</h2>
      <p><strong>Arrondissement :</strong> {alert.arrondissement}</p>
      <p><strong>Date :</strong> {alert.date}</p>
      <p><strong>Sujet :</strong> {alert.sujet}</p>
      <p className="alert-description">{alert.description}</p>
      
    </div>
  );
}

export default AlertDetailPage;
