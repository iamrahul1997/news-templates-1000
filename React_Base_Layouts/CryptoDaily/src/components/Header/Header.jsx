import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/common.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo">CryptoDaily</div>
          <ul className={`nav-menu ${menuOpen ? "active" : ""}`} id="navMenu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="#">Markets</Link>
            </li>
            <li>
              <Link to="#">DeFi</Link>
            </li>
            <li>
              <Link to="#">NFTs</Link>
            </li>
            <li>
              <Link to="# ">Analysis</Link>
            </li>
            <li>
              <Link to="#">Learn</Link>
            </li>
          </ul>
          <div className="menu-toggle" id="menuToggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </div>
    </header>
  );
}
