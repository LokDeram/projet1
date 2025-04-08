import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import AlertCard from './components/AlertCard';
import SubscribeBox from './components/SubscribeBox';
import AlertDetailPage from './pages/AlertDetailPage';

import alerts from './data/alerts';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const [filters, setFilters] = useState({
    arrondissement: '',
    sujet: '',
    dateDebut: '',
    dateFin: ''
  });

  const filteredAlerts = alerts.filter((alert) => {
    const matchSearch = alert.titre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchArrondissement = filters.arrondissement
      ? alert.arrondissement === filters.arrondissement
      : true;
    const matchSujet = filters.sujet
      ? alert.sujet === filters.sujet
      : true;
    const matchDateDebut = filters.dateDebut
      ? new Date(alert.date) >= new Date(filters.dateDebut)
      : true;
    const matchDateFin = filters.dateFin
      ? new Date(alert.date) <= new Date(filters.dateFin)
      : true;

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
              <Filters filters={filters} setFilters={setFilters} />

              <div className="content-layout">
                <div className="left-column">
                <div className="alert-count">
    {filteredAlerts.length === 0
      ? 'Aucune alerte trouvée.'
      : `${filteredAlerts.length} alerte${filteredAlerts.length > 1 ? 's' : ''} trouvée${filteredAlerts.length > 1 ? 's' : ''}.`}
  </div>
                  {filteredAlerts.length === 0 ? (
                    <p>Aucune alerte trouvée.</p>
                  ) : (
                    filteredAlerts.map((alert) => (
                      <AlertCard key={alert.id} alert={alert} />
                    ))
                  )}
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
