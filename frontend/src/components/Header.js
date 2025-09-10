import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full">
      <nav className="bg-gray-900 text-white shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/Logo.png"
              alt="Logo"
              className="h-8"
            />
          </Link>
          <ul className="hidden md:flex space-x-8 text-sm font-medium justify-center flex-1">
            <li>
              <Link
                to="/"
                className="relative px-2 py-1 text-gray-200 hover:text-yellow-400 hover:bg-gray-800 rounded transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/companies"
                className="relative px-2 py-1 text-gray-200 hover:text-yellow-400 hover:bg-gray-800 rounded transition duration-200"
              >
                Companies
              </Link>
            </li>
            <li>
              <Link
                to="/companies/create"
                className="relative px-2 py-1 text-gray-200 hover:text-yellow-400 hover:bg-gray-800 rounded transition duration-200"
              >
                Add Company
              </Link>
            </li>
          </ul>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <ul className="md:hidden bg-gray-800 text-white px-4 pb-4 space-y-2">
            <li>
              <Link
                to="/"
                className="block py-2 px-2 rounded hover:text-yellow-400 hover:bg-gray-700 transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/companies"
                className="block py-2 px-2 rounded hover:text-yellow-400 hover:bg-gray-700 transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                Companies
              </Link>
            </li>
            <li>
              <Link
                to="/companies/create"
                className="block py-2 px-2 rounded hover:text-yellow-400 hover:bg-gray-700 transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                Add Company
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
