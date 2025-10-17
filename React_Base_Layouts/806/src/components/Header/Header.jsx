import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-green-900 shadow-md backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 lg:px-12 flex items-center justify-between py-3 font-bold text-lg relative font-poppins">
        <Link
          to="/"
          className="text-green-100 text-2xl font-extrabold transition duration-300 hover:text-green-400 hover:scale-105">
          Website_Name
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block lg:hidden text-green-100 focus:outline-none transition duration-300 hover:text-green-400">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } lg:flex flex-col lg:flex-row gap-6 text-green-100 absolute lg:static top-full left-0 w-full lg:w-auto bg-green-900 lg:bg-transparent px-6 py-4 lg:p-0 transition-all duration-300`}>
          <li>
            <Link
              to="#"
              className="block lg:inline-block transition duration-300 hover:text-green-400 hover:scale-105">
              Demos +
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block lg:inline-block transition duration-300 hover:text-green-400 hover:scale-105">
              Blog +
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block lg:inline-block transition duration-300 hover:text-green-400 hover:scale-105">
              Post Demos +
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block lg:inline-block transition duration-300 hover:text-green-400 hover:scale-105">
              Authors
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block lg:inline-block transition duration-300 hover:text-green-400 hover:scale-105">
              Contacts
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block lg:inline-block transition duration-300 hover:text-green-400 hover:scale-105">
              Smartphones
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block lg:inline-block transition duration-300 hover:text-green-400 hover:scale-105">
              Tablets
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
