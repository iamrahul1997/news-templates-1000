import React from "react";
import "../css/common.css";

export default function Footer() {
  return (
    <footer className="footer font-inter">
      <div className="footer-content">
        {/* Logo & Description */}
        <div className="footer-section">
          <div className="logo footer-logo">
            <div className="logo-icon">₿</div>
            <div className="logo-text">
              Cryptocoin<span>Press</span>
            </div>
          </div>
          <p className="footer-description">
            Your trusted source for cryptocurrency news, blockchain technology
            insights, and market analysis. Stay informed about Bitcoin,
            Ethereum, and the latest in digital finance.
          </p>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li>
              <a href="#">Bitcoin</a>
            </li>
            <li>
              <a href="#">Blockchain</a>
            </li>
            <li>
              <a href="#">Altcoins</a>
            </li>
            <li>
              <a href="#">Regulation</a>
            </li>
            <li>
              <a href="#">Market</a>
            </li>
          </ul>
        </div>

        {/* Popular Articles */}
        <div className="footer-section">
          <h3>Popular Articles</h3>
          <ul>
            <li>
              <a href="#">Bitcoin Halving 2024: What to Expect</a>
            </li>
            <li>
              <a href="#">Ethereum 2.0 Staking Guide</a>
            </li>
            <li>
              <a href="#">Top 10 Altcoins to Watch</a>
            </li>
            <li>
              <a href="#">DeFi vs Traditional Banking</a>
            </li>
            <li>
              <a href="#">NFTs: A Complete Beginner's Guide</a>
            </li>
          </ul>
        </div>

        {/* Recent Articles */}
        <div className="footer-section">
          <h3>Recent Articles</h3>
          <ul>
            <li>
              <a href="#">Bitcoin Surges Past $30,000 Mark</a>
            </li>
            <li>
              <a href="#">New SEC Crypto Regulations</a>
            </li>
            <li>
              <a href="#">Ethereum Gas Fees Hit Record Low</a>
            </li>
            <li>
              <a href="#">Major Bank Adopts Bitcoin Trading</a>
            </li>
            <li>
              <a href="#">Crypto Market Analysis: Week Ahead</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          © 2025 CryptocoinPress - Cryptocurrency News & Updates. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
