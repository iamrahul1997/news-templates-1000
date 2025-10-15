import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 font-poppins">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold">
          XYZ News
        </Link>

        {/* Desktop Nav */}
        <nav
          id="main-nav"
          className="hidden md:flex space-x-6 font-bold text-sm uppercase">
          <Link to="/" className="hover:text-gray-700">
            Home
          </Link>
          <Link to="/features" className="hover:text-gray-700">
            Features
          </Link>
          <Link to="/buy-theme" className="hover:text-gray-700">
            Buy Theme
          </Link>
          <Link to="/entertainment" className="hover:text-gray-700">
            Entertainment
          </Link>
          <Link to="/politics" className="hover:text-gray-700">
            Politics
          </Link>
          <Link to="/fashion" className="hover:text-gray-700">
            Fashion
          </Link>
          <Link to="/technology" className="hover:text-gray-700">
            Technology
          </Link>
          <Link to="/business" className="hover:text-gray-700">
            Business
          </Link>
        </nav>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          {/* Hamburger: hidden on large */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded hover:bg-gray-100 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Profile icon */}
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 15
                   c2.485 0 4.797.75 6.879 2.043M15 11
                   a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden flex flex-col space-y-2 px-6 pb-4 font-bold text-sm uppercase">
          <Link to="/" className="block hover:text-gray-700">
            Home
          </Link>
          <Link to="/features" className="block hover:text-gray-700">
            Features
          </Link>
          <Link to="/buy-theme" className="block hover:text-gray-700">
            Buy Theme
          </Link>
          <Link to="/entertainment" className="block hover:text-gray-700">
            Entertainment
          </Link>
          <Link to="/politics" className="block hover:text-gray-700">
            Politics
          </Link>
          <Link to="/fashion" className="block hover:text-gray-700">
            Fashion
          </Link>
          <Link to="/technology" className="block hover:text-gray-700">
            Technology
          </Link>
          <Link to="/business" className="block hover:text-gray-700">
            Business
          </Link>
        </nav>
      )}
    </header>
  );
}
