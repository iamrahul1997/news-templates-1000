import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileNav = () => setIsMobileOpen(!isMobileOpen);

  const links = [
    { name: "Home", to: "/" },
    { name: "Featured", to: "#" },
    { name: "Politics", to: "#" },
    { name: "Business", to: "#" },
    { name: "Entertainment", to: "#" },
    { name: "Lifestyle", to: "#" },
    { name: "Sports", to: "#" },
    { name: "About Us", to: "#" },
    { name: "Contact", to: "#" },
  ];

  return (
    <>
      {/* Top bar */}
      <header className="topbar">
        <div className="container topbar__inner">
          <div className="brand">
            <span className="brand__kicker">SOLEDAD</span>
            <span className="brand__title">Info Tech</span>
          </div>

          <nav className="nav">
            {links.map((link, index) => (
              <Link
                key={link.name}
                className={`nav__link ${
                  index === 0 ? "nav__link--active" : ""
                }`}
                to={link.to}>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Hamburger Button */}
          <button
            className="hamburger"
            id="hamburger"
            onClick={toggleMobileNav}>
            &#9776;
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      {isMobileOpen && (
        <nav className="nav-mobile" id="nav-mobile">
          {links.map((link) => (
            <Link key={link.name} to={link.to}>
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
