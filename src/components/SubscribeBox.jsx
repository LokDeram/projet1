import React from "react";
import "./SubscribeBox.css";

function SubscribeBox() {
  const handleClick = () => {
    alert("La fonctionnalité d’abonnement n’est pas encore disponible.");
  };

  return (
    <div className="subscribe-box">
      <h3>S’abonner aux alertes</h3>
      <p>Recevez les nouvelles alertes dès qu’elles sont publiées par la Ville de Montréal.</p>
      <button onClick={handleClick}>M’abonner</button>
    </div>
  );
}

export default SubscribeBox;
