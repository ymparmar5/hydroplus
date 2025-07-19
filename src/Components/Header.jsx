import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:py-3">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="h-12 w-auto object-contain" />
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <NavLink to="/" className={({ isActive }) => `text-base font-medium px-2 py-1 rounded transition-colors duration-200 ${isActive ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'}`}>Home</NavLink>
          {/* <NavLink to="/shop" className={({ isActive }) => `text-base font-medium px-2 py-1 rounded transition-colors duration-200 ${isActive ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'}`}>Shop</NavLink> */}
          <NavLink to="/contact" className={({ isActive }) => `text-base font-medium px-2 py-1 rounded transition-colors duration-200 ${isActive ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'}`}>Contact</NavLink>
          <NavLink to="/about" className={({ isActive }) => `text-base font-medium px-2 py-1 rounded transition-colors duration-200 ${isActive ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'}`}>About</NavLink>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {/* Search Icon & Bar */}
          <div className="relative flex items-center">
            {isSearchOpen && (
              <div className="absolute right-0 top-10 w-64 z-50">
                <SearchBar />
              </div>
            )}
            <button
              className="p-2 rounded-full hover:bg-blue-100 transition-colors"
              onClick={() => setIsSearchOpen((v) => !v)}
              aria-label="Toggle search"
            >
              <i className="fa-solid fa-magnifying-glass text-xl text-blue-700"></i>
            </button>
          </div>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-blue-100 transition-colors"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <i className={`fa-solid text-xl text-blue-700 ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-lg border-t border-blue-100 animate-fade-in-down">
          <ul className="flex flex-col gap-2 py-4 px-6">
            <li>
              <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `block text-base font-medium px-2 py-2 rounded transition-colors duration-200 ${isActive ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'}`}>Home</NavLink>
            </li>
            {/* <li>
              <NavLink to="/shop" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `block text-base font-medium px-2 py-2 rounded transition-colors duration-200 ${isActive ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'}`}>Shop</NavLink>
            </li> */}
            <li>
              <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `block text-base font-medium px-2 py-2 rounded transition-colors duration-200 ${isActive ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'}`}>Contact</NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `block text-base font-medium px-2 py-2 rounded transition-colors duration-200 ${isActive ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'}`}>About</NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
