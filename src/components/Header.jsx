import React from 'react';
import './Header.css'; 
import logo from '../assets/20180302011534!Logo_Montréal.svg';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <img src={logo} alt="Ville de Montréal" className="header-logo" />
        <a href="#" className="account-link">Mon compte</a>
      </div>
    </header>
  );
}

export default Header;
