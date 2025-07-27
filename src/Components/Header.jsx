import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' 
        : 'bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 backdrop-blur-sm'
    }`}>
      <div className=" mx-auto ">
        <div className="flex items-center justify-between ">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group mx-3">
            <div className="relative">
              <img src="/logo.svg" alt="logo" className="h-[60px] lg:h-[100px] object-contain group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-base font-medium px-4 py-2 rounded-xl transition-all duration-300 relative group ${
                  isActive 
                    ? 'text-primary bg-primary/20 border border-primary/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`
              }
            >
              Home
              <div className="absolute inset-0 bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NavLink>
            
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `text-base font-medium px-4 py-2 rounded-xl transition-all duration-300 relative group ${
                  isActive 
                    ? 'text-primary bg-primary/20 border border-primary/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`
              }
            >
              About
              <div className="absolute inset-0 bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NavLink>
            
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `text-base font-medium px-4 py-2 rounded-xl transition-all duration-300 relative group ${
                  isActive 
                    ? 'text-primary bg-primary/20 border border-primary/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`
              }
            >
              Contact
              <div className="absolute inset-0 bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NavLink>
            {/* <NavLink 
              to="/shop" 
              className={({ isActive }) => 
                `text-base font-medium px-4 py-2 rounded-xl transition-all duration-300 relative group ${
                  isActive 
                    ? 'text-primary bg-primary/20 border border-primary/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`
              }
            >
              shop
              <div className="absolute inset-0 bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NavLink> */}
            {/* <NavLink 
              to="/exhibitions" 
              className={({ isActive }) => 
                `text-base font-medium px-4 py-2 rounded-xl transition-all duration-300 relative group ${
                  isActive 
                    ? 'text-primary bg-primary/20 border border-primary/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`
              }
            >
              exhibitions
              <div className="absolute inset-0 bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NavLink> */}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-3">
            {/* Search Icon - Mobile */}
            <button
              className="md:hidden p-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
              onClick={() => setShowMobileSearch((prev) => !prev)}
              aria-label="Toggle search bar"
            >
              <Search className="w-5 h-5 text-white" />
            </button>

            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <ShoppingCart className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User Icon */}
            <Link to="/signin" className="p-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <User className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="md:hidden mt-4 mb-4 flex justify-center">
            <SearchBar onClose={() => setShowMobileSearch(false)} />
          </div>
        )}

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 animate-slide-down">
            <div className="p-4 space-y-2">
              <NavLink 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `block text-base font-medium px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'text-primary bg-primary/20 border border-primary/30' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                Home
              </NavLink>
              
             
              
              <NavLink 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `block text-base font-medium px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'text-primary bg-primary/20 border border-primary/30' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                Contact
              </NavLink>
              <NavLink 
                to="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `block text-base font-medium px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'text-primary bg-primary/20 border border-primary/30' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                About
              </NavLink>
            </div>
          </nav>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-down {
          0% { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-slide-down { 
          animation: slide-down 0.3s ease-out; 
        }
      `}</style>
    </header>
  );
};

export default Header;
