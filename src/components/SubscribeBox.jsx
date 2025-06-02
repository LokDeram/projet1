import React, { useEffect, useState } from "react";
import "./SubscribeBox.css";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i)
    outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

function SubscribeBox() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [swRegistration, setSwRegistration] = useState(null);

  const VAPID_PUBLIC_KEY = "BDTmAPEv_ekjLnjV0uGghSUVQXq6JtPm7jQMIxvp2CLyYtV-RYCB4-T5ejnPmMKANFVhJFggbwcBye1jqC_KmPQ";

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        setSwRegistration(registration);
        return registration.pushManager.getSubscription();
      }).then((subscription) => {
        setIsSubscribed(!!subscription);
      });
    }
  }, []);

  const subscribeUser = async () => {
    try {
      const subscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });

      await fetch("http://localhost:4000/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsSubscribed(true);
      alert("Vous êtes maintenant abonné aux alertes !");
    } catch (err) {
      console.error("Erreur d’abonnement :", err);
    }
  };

 const unsubscribeUser = async () => {
  const subscription = await swRegistration.pushManager.getSubscription();

  if (subscription) {
    console.log(" Endpoint à désabonner :", subscription.endpoint); 

    await subscription.unsubscribe();

    await fetch("http://localhost:4000/subscribe/unsubscribe", {

      method: "POST",
      body: JSON.stringify({ endpoint: subscription.endpoint }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  setIsSubscribed(false);
  alert("Vous avez été désabonné des alertes.");
};


  return (
    <div className="subscribe-box">
      <h3>S’abonner aux alertes</h3>
      <p>Recevez les nouvelles alertes dès qu’elles sont publiées par la Ville de Montréal.</p>
      {isSubscribed ? (
        <button onClick={unsubscribeUser}>Se désabonner</button>
      ) : (
        <button onClick={subscribeUser}>M’abonner</button>
      )}
    </div>
  );
}

export default SubscribeBox;
