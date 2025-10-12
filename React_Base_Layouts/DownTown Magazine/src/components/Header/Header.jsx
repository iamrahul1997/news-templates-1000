import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <span className="header__logo-icon"></span>
          <span className="header__logo-text">Downtown Magazine Pro</span>
        </div>

        <nav
          className="header__nav"
          role="navigation"
          aria-label="Main navigation">
          <button
            className="header__menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
            onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul
            className={`header__nav-list ${isMenuOpen ? "open" : ""}`}
            id="main-navigation">
            <li>
              <Link to="#news" className="header__nav-link">
                NEWS
              </Link>
            </li>
            <li>
              <Link to="#women" className="header__nav-link">
                WOMEN
              </Link>
            </li>
            <li>
              <Link to="#celebrity" className="header__nav-link">
                CELEBRITY
              </Link>
            </li>
            <li>
              <Link to="#travel" className="header__nav-link">
                TRAVEL
              </Link>
            </li>
            <li>
              <Link to="#food" className="header__nav-link">
                FOOD
              </Link>
            </li>
            <li>
              <Link to="#music" className="header__nav-link">
                MUSIC
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header__user-actions">
          <button className="header__search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
