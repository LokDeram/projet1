
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import AlertCard from './components/AlertCard';
import SubscribeBox from './components/SubscribeBox';
import AlertDetailPage from './pages/AlertDetailPage';

import './App.css';
import React, { useEffect, useState } from 'react';
import { fetchAlerts } from './data/alerts';

function App() {
  const [alertes, setAlertes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    arrondissements: [],
    sujets: [],
    dateDebut: '',
    dateFin: ''
  });

  useEffect(() => {
    fetchAlerts().then(data => {
      setAlertes(data);
    });
  }, []);

  const arrondissements = [...new Set(alertes.map(a => a.arrondissement).filter(a => a && a !== 'Arrondissement inconnu'))];
  const sujets = [...new Set(alertes.map(a => a.sujet).filter(Boolean))];

  const filteredAlerts = alertes.filter((alert) => {
    const formatDate = (dateString) => new Date(dateString).toISOString().split('T')[0];

    const matchArrondissement =
      filters.arrondissements.length === 0 ||
      filters.arrondissements.includes(alert.arrondissement);

    const matchSujet =
      filters.sujets.length === 0 ||
      filters.sujets.includes(alert.sujet);

    const matchDateDebut = filters.dateDebut
      ? formatDate(alert.date) >= filters.dateDebut
      : true;

    const matchDateFin = filters.dateFin
      ? formatDate(alert.date) <= filters.dateFin
      : true;

    const matchSearch = alert.titre.toLowerCase().includes(searchTerm.toLowerCase());

    return matchSearch && matchArrondissement && matchSujet && matchDateDebut && matchDateFin;
  });

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              <Filters
                filters={filters}
                setFilters={setFilters}
                arrondissements={arrondissements}
                sujets={sujets}
              />
              <div className="content-layout">
                <div className="left-column">
                  <div className="alert-count">
                    {filteredAlerts.length === 0
                      ? 'Aucune alerte trouvée.'
                      : `${filteredAlerts.length} alerte${filteredAlerts.length > 1 ? 's' : ''} trouvée${filteredAlerts.length > 1 ? 's' : ''}.`}
                  </div>
                  {filteredAlerts.map((alert) => (
                    <AlertCard key={alert._id} alert={alert} />
                  ))}
                </div>
                <div className="right-column">
                  <SubscribeBox />
                </div>
              </div>
            </>
          }
        />
        <Route path="/alert/:id" element={<AlertDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
