import React, { useState, useEffect } from "react";
import "./Filters.css";

function Filters({ filters, setFilters }) {
  const [showDateFilter, setShowDateFilter] = useState(false);



  return (
    <div className="filters">
      
      <select
        className="filter-button"
        value={filters.arrondissement}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            arrondissement: e.target.value,
          }))
        }
      >
        <option value="">Arrondissement</option>
        <option value="Ahuntsic-Cartierville">Ahuntsic</option>
        <option value="Rosemont–La Petite-Patrie">Rosemont</option>
        <option value="Plateau-Mont-Royal">Plateau</option>
        <option value="Villeray–Saint-Michel–Parc-Extension">Villeray</option>
      </select>

      
      <select
        className="filter-button"
        value={filters.sujet}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            sujet: e.target.value,
          }))
        }
      >
        <option value="">Sujet</option>
        <option value="Eau potable">Eau potable</option>
        <option value="Travaux publics">Travaux publics</option>
        <option value="Installations municipales">Installations municipales</option>
      </select>

      
      <button
        className="filter-button"
        onClick={() => setShowDateFilter(!showDateFilter)}
      >
        Date
      </button>

      
      {showDateFilter && (
        <div className="date-inputs">
          <input
            type="date"
            value={filters.dateDebut}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                dateDebut: e.target.value,
              }))
            }
          />
          <span>à</span>
          <input
            type="date"
            value={filters.dateFin}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                dateFin: e.target.value,
              }))
            }
          />
        </div>
      )}
    </div>
  );
}

export default Filters;
