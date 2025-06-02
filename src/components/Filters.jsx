import React, { useState, useEffect, useRef } from 'react';
import './Filters.css';

function Filters({ filters, setFilters, arrondissements, sujets }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const current = prev[type];
      const isChecked = current.includes(value);
      return {
        ...prev,
        [type]: isChecked ? current.filter((v) => v !== value) : [...current, value],
      };
    });
  };

  const handleDateChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearAll = () => {
    setFilters({
      arrondissements: [],
      sujets: [],
      dateDebut: '',
      dateFin: ''
    });
  };

  return (
    <div className="filters" ref={dropdownRef}>
      <div className="dropdown">
        <button className="filter-button" onClick={() => toggleDropdown('arrondissements')}>
          Arrondissement
        </button>
        {openDropdown === 'arrondissements' && (
          <div className="dropdown-content">
            {arrondissements.map((arr, i) => (
              <label key={i}>
                <input
                  type="checkbox"
                  checked={filters.arrondissements.includes(arr)}
                  onChange={() => handleCheckboxChange('arrondissements', arr)}
                />
                {arr}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="dropdown">
        <button className="filter-button" onClick={() => toggleDropdown('sujets')}>
          Sujet
        </button>
        {openDropdown === 'sujets' && (
          <div className="dropdown-content">
            {sujets.map((sujet, i) => (
              <label key={i}>
                <input
                  type="checkbox"
                  checked={filters.sujets.includes(sujet)}
                  onChange={() => handleCheckboxChange('sujets', sujet)}
                />
                {sujet}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="dropdown">
        <button className="filter-button" onClick={() => toggleDropdown('dates')}>
          Date
        </button>
        {openDropdown === 'dates' && (
          <div className="dropdown-content">
            <input
              type="date"
              value={filters.dateDebut}
              onChange={(e) => handleDateChange('dateDebut', e.target.value)}
            />
            <span>à</span>
            <input
              type="date"
              value={filters.dateFin}
              onChange={(e) => handleDateChange('dateFin', e.target.value)}
            />
          </div>
        )}
      </div>

      <button className="filter-button" onClick={clearAll}>
        Tout effacer
      </button>
    </div>
  );
}

export default Filters;
