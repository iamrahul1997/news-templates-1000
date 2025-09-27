import { useState } from "react";
import React from "react";
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav role="navigation" aria-label="Main navigation">
        <a href="#" className="logo">
          NewsHub
        </a>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-toggle"
          aria-label="Toggle mobile menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation menu */}
        <div className={`nav-container ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-links" role="menubar">
            <li role="menuitem">
              <a href="#world" aria-label="World news section">
                World
              </a>
            </li>
            <li role="menuitem">
              <a href="#business" aria-label="Business news section">
                Business
              </a>
            </li>
            <li role="menuitem">
              <a href="#technology" aria-label="Technology news section">
                Technology
              </a>
            </li>
            <li role="menuitem">
              <a href="#sports" aria-label="Sports news section">
                Sports
              </a>
            </li>
            <li role="menuitem">
              <a href="#entertainment" aria-label="Entertainment news section">
                Entertainment
              </a>
            </li>
            <li role="menuitem">
              <a href="#science" aria-label="Science news section">
                Science
              </a>
            </li>
          </ul>
          <form className="search-bar" role="search">
            <input
              type="search"
              placeholder="Search news..."
              aria-label="Search news"
              required
            />
            <button type="submit" aria-label="Submit search">
              🔍
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}

export default Header;
