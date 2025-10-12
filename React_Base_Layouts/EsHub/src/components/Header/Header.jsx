import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <nav
          className="main-navigation"
          role="navigation"
          aria-label="Main navigation">
          <Link to="/" className="site-logo" aria-label=" EsHub">
            <img
              src="https://demo.tagdiv.com/newspaper_magazine_pro/wp-content/uploads/2020/06/logo-header.png.webp"
              alt="Crypto News - Breaking cryptocurrency and blockchain news"
            />
          </Link>

          <ul
            className={`navigation-menu ${isMenuOpen ? "open" : ""}`}
            role="menubar"
            id="main-menu">
            <li role="none">
              <Link to="/" role="menuitem">
                Home
              </Link>
            </li>
            <li role="none">
              <Link to="/global" role="menuitem">
                Global
              </Link>
            </li>
            <li role="none">
              <Link to="/lifestyle" role="menuitem">
                Lifestyle
              </Link>
            </li>
            <li role="none">
              <Link to="/fashion" role="menuitem">
                Fashion
              </Link>
            </li>
            <li role="none">
              <Link to="/gaming" role="menuitem">
                Gaming
              </Link>
            </li>
            <li role="none">
              <Link to="/fitness" role="menuitem">
                Fitness
              </Link>
            </li>
            <li role="none">
              <Link to="/video" role="menuitem">
                Video
              </Link>
            </li>
            <li role="none">
              <Link to="/more" role="menuitem">
                More
              </Link>
            </li>
          </ul>

          <button
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="main-menu">
            <span className="hamburger-line" aria-hidden="true"></span>
            <span className="hamburger-line" aria-hidden="true"></span>
            <span className="hamburger-line" aria-hidden="true"></span>
          </button>
        </nav>
      </div>
    </header>
  );
}
