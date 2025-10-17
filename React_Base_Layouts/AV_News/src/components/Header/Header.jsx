import React, { useState } from "react";
import "../css/common.css";

export default function MainHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Main Header */}
      <header role="banner font-inter">
        <div className="main-header">
          <div className="header-content">
            <div className="logo">
              <div className="logo-icon">₿</div>
              <div className="logo-text">
                AV News<span>Press</span>
              </div>
            </div>
            <div className="header-right">
              <div className="price-ticker">
                <span>BTC: $28,690</span>
                <span className="price-separator">|</span>
                <span>ETH: $1,850</span>
              </div>
              <button className="subscribe-btn">SUBSCRIBE</button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav role="navigation" aria-label="Main navigation font-inter">
        <div className="nav-menu">
          <div className="nav-content">
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>

            <ul
              className={`nav-links ${mobileMenuOpen ? "open" : ""}`}
              id="navLinks">
              <li className="active">Home</li>
              <li>Bitcoin</li>
              <li>Ethereum</li>
              <li>Altcoins</li>
              <li>Market</li>
              <li>Blockchain</li>
              <li>Business</li>
              <li>Guides</li>
              <li>Contact Us</li>
            </ul>

            <div className="search-box">
              <input type="text" placeholder="Search..." />
              <i className="fas fa-search"></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
