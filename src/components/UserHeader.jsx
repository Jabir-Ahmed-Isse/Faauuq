import React, { useState } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdOutlineExplore } from "react-icons/md";
import logo from "../assets/images/logo.jpg";
import { useNavigate } from "react-router-dom";
import CartSidebar from "./CartSidebar";

const Header = ({ cartCount = 0, isDarkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);

  const getUser = localStorage.getItem("user");
  const navigate = useNavigate();

  // Extract initials
  const initials = getUser
    ? (() => {
        const name = JSON.parse(getUser)?.name || "";
        return name
          .split(" ")
          .filter(Boolean)
          .map((word) => word[0]?.toUpperCase() || "")
          .slice(0, 2)
          .join("");
      })()
    : "";

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* ✅ FIXED HEADER — FULL DARK MODE SUPPORT */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex flex-col items-center text-gray-800 dark:text-white font-bold text-sm transition-transform duration-200 hover:scale-105"
          >
            <img
              src={logo}
              alt="FAARUUQ Logo"
              className="h-10 object-contain opacity-95 hover:opacity-100 transition"
            />
            <span className="-mt-1 tracking-widest font-semibold">FAARUUQ</span>
          </a>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <div
              className={`relative w-full max-w-md transition-all duration-300 ${
                isSearching ? "scale-105" : ""
              }`}
            >
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <FiSearch />
              </span>
              <input
                type="text"
                placeholder="Search books & stationery..."
                className="w-full pl-12 pr-36 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800 dark:text-gray-100"
                onFocus={() => setIsSearching(true)}
                onBlur={() => setIsSearching(false)}
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition transform hover:scale-110 shadow">
                <div className="flex items-center gap-1">
                  <MdOutlineExplore />
                  <span>Explore</span>
                </div>
              </button>
            </div>
          </div>

          {/* Nav Links + Cart */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            <li><a href="/" className="hover:text-blue-700 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300">Home</a></li>
            <li><a href="/about" className="hover:text-blue-700 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300">About</a></li>
            <li><a href="/products" className="hover:text-blue-700 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300">Books</a></li>
            <li><a href="/stationery" className="hover:text-blue-700 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300">Stationery</a></li>

            {getUser ? (
              <>
                {/* My Orders Link */}
                <li>
                  <a
                    href="/userorders"
                    className="hover:text-blue-700 dark:hover:text-blue-400 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    My Orders
                  </a>
                </li>

                {/* User Avatar Dropdown */}
                <li className="relative">
                  <button
                    onClick={() => setShowSignOut((prev) => !prev)}
                    className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-semibold hover:scale-110 transition-transform"
                    title={JSON.parse(getUser)?.name}
                  >
                    {initials}
                  </button>
                  {showSignOut && (
                    <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg min-w-32">
                      <button
                        onClick={() => navigate("/userorders")}
                        className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        My Orders
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <li><a href="/signin" className="hover:text-blue-700 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300">Sign in</a></li>
            )}

            {/* Cart Button */}
            <li>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 hover:scale-110 transition-transform"
              >
                <FaShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </li>

            {/* Dark Mode Toggle */}
            <li>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 dark:text-white text-2xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 px-5 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="py-2 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">Home</a>
              <a href="/about" className="py-2 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">About</a>
              <a href="/products" className="py-2 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">Books</a>
              <a href="/stationery" className="py-2 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">Stationery</a>

              {getUser ? (
                <>
                  <button
                    onClick={() => navigate("/userorders")}
                    className="py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <a href="/signin" className="py-2 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">Sign in</a>
              )}

              {/* Mobile Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaShoppingCart className="text-gray-700 dark:text-gray-300" />
                <span className="text-gray-700 dark:text-gray-300">Cart</span>
                {cartCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Dark Mode Toggle (Mobile) */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
                <span>{isDarkMode ? 'Light' : 'Dark'} Mode</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartData={null}
      />
    </>
  );
};

export default Header;