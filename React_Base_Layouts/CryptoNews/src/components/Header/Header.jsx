import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="navbar font-roboto">
        <div className="nav-container">
          <div className="logo">
            <h2>
              <Link to="/">CryptoNews</Link>
            </h2>
          </div>
          <ul className="nav-menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/#latest-crypto-news-section">News</Link>
            </li>
            <li>
              <Link to="/#category-section">Analysis</Link>
            </li>
            <li>
              <Link to="/#recent-posts-section">Markets</Link>
            </li>
            <li>
              <Link to="/guides">Guides</Link>
            </li>
            <li>
              <Link to="/#footer">About</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
