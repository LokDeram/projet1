import React from 'react';
import './SearchBar.css';
import loupeicon from "../assets/icone-loupe-gris.png"

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-section">
      <div className="search-inner">
        <h2>Avis et alertes</h2>
        <p className="search-subtitle">Trouver un avis</p>
        <div className="search-bar">
            <img src={loupeicon} alt="Search Icon" className="search-icon" />
          <input
            type="text"
            placeholder="Que cherchez-vous ?"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
