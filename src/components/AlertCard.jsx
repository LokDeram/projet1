import React from "react";
import { Link } from "react-router-dom";
import "./AlertCard.css";

function AlertCard({ alert }) {
  return (
    <div className="alert-card">
      <Link to={`/alert/${alert.id}`} className="alert-title-link">
        <h3 className="alert-title">{alert.titre}</h3>
      </Link>
      <p className="alert-sujet">{alert.sujet}</p>
      <p><strong>Arrondissement :</strong> {alert.arrondissement}</p>
      <p><strong>Date :</strong> {alert.date}</p>
    </div>
  );
}

export default AlertCard;
