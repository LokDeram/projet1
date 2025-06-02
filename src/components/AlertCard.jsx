import React from "react";
import { Link } from "react-router-dom";
import "./AlertCard.css";

function AlertCard({ alert }) {
  return (
    <div className="alert-card">
      <Link to={`/alert/${alert._id}`} className="alert-title-link">

        <h3 className="alert-title">{alert.titre}</h3>
      </Link>
      <p className="alert-sujet">{alert.sujet}</p>
     
      <p><strong>Date :</strong> {alert.date ? new Date(alert.date).toLocaleDateString() : 'Date inconnue'}</p>

    </div>
  );
}

export default AlertCard;
