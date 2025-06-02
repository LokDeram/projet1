import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAlerts } from '../data/alerts';

export default function AlertDetailPage() {
  const { id } = useParams();
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const isOffline = !navigator.onLine;
    if (isOffline) {
      const cached = localStorage.getItem("cachedAlerts");
      if (cached) {
        const alerts = JSON.parse(cached);
        const selected = alerts.find(a => String(a._id) === String(id));
        setAlert(selected);
      }
    } else {
      fetchAlerts().then(data => {
        const selected = data.find(a => String(a._id) === String(id));
        setAlert(selected);
      });
    }
  }, [id]);

  if (!alert) return <p>Chargement ou alerte introuvable (hors ligne ?)</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{alert.titre}</h2>
      <p><strong>Sujet :</strong> {alert.sujet}</p>
      <p><strong>Date :</strong> {alert.date}</p>
      
    </div>
  );
}
