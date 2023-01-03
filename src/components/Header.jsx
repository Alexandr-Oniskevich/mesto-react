import React from "react";
import logo from "../../src/images/logo.svg";

function Header() {
  return (
    <header className="header">
      <a href="" className="header__link">
        <img src={logo} alt="Логотип Место" className="header__logo" />
      </a>
    </header>
  );
}

export default Header;
