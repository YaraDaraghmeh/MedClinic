import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-md dark:bg-darkBlue fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-3xl flex justify-between items-center mx-auto p-4">
        <a
          href="/"
          className="text-3xl text-blue-800 font-bold text-primary dark:text-lightBlue"
        >
          MediCare
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg text-gray-700 dark:text-lightGray focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-controls="navbar-menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>

        {/* Nav Links + Mobile Login Button */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none p-4 md:p-0 transition-all`}
          id="navbar-menu"
        >
          <ul className="flex flex-col md:flex-row md:space-x-6">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `navbar-link py-2 px-4 text-lg font-semibold text-textColor dark:text-lightGray transition-all ${
                      isActive ? "active" : ""
                    }`
                  }
                  end
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Login Button (Visible in Mobile Menu) */}

          <button className="block md:hidden login-btn mt-4">Log in</button>
        </div>

        {/* Desktop Login Button */}
        <button className="hidden md:block login-btn">Log in</button>
      </div>
    </nav>
  );
};

export default Header;
