import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content font-roboto">
          <p>© {new Date().getFullYear()} CryptoNews. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
