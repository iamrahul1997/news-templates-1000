import { Link } from "react-router-dom";
import React from "react";

function Header() {
  return (
    <header className="header" role="banner">
      <nav
        className="header__nav container"
        role="navigation"
        aria-label="Primary navigation">
        <div className="header__logo">WallPoster</div>
        <ul className="header__nav-links" role="menubar">
          <li role="none">
            <Link
              to="#"
              role="menuitem"
              aria-label="Navigate to Market section">
              Market
            </Link>
          </li>
          <li role="none">
            <Link
              to="#"
              role="menuitem"
              aria-label="Navigate to Analysis section">
              Analysis
            </Link>
          </li>
          <li role="none">
            <Link to="#" role="menuitem" aria-label="Navigate to DeFi section">
              DeFi
            </Link>
          </li>
          <li role="none">
            <Link to="#" role="menuitem" aria-label="Navigate to NFT section">
              NFT
            </Link>
          </li>
          <li role="none">
            <Link to="#" role="menuitem" aria-label="Navigate to Learn section">
              Learn
            </Link>
          </li>
          <li role="none">
            <Link
              to="#"
              role="menuitem"
              aria-label="Navigate to Regulatory section">
              Regulatory
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
