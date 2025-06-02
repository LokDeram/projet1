
export async function fetchAlerts() {
  try {
    const response = await fetch('http://localhost:4000/avis-alertes'); 
    if (!response.ok) throw new Error('Erreur lors du chargement des alertes');

    const formatted = await response.json();

    
    localStorage.setItem("cachedAlerts", JSON.stringify(formatted));

    return formatted;
  } catch (error) {
    console.error('Erreur lors du fetch des alertes :', error);
    return [];
  }
}
