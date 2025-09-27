import React from "react";
// import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-green-800 text-green-100 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-2xl font-extrabold hover:text-green-400">
          routing
        </a>

        {/* Menu */}
        <ul className="flex gap-6">
          <li>
            <a href="/" className="hover:text-green-400">
              Home
            </a>
          </li>
          <li>
            <a href="article" className="hover:text-green-400">
              Blog
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              Demos
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
