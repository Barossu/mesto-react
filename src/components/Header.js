import React from 'react';
import logoImage from '../images/logo_header.svg';

function Header() {
  return(
    <header className="header">
      <img className="header__logo" alt="Логотип" src={logoImage} />
    </header>
  )
};

export default Header;