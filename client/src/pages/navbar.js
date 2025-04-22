import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "shadow-lg bg-white"
          : "bg-gradient-to-b from-yellow-50 to-orange-50"
      }`}
    >
      {/* Top navbar section */}
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link
          to="/"
          className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300"
        >
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-14 w-auto drop-shadow-md"
          />
        </Link>

        {/* SearchGlobal - Improved design */}
        <div className="hidden md:block w-[40%] px-6">
          <div className="relative group">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 group-hover:text-orange-500 h-4 w-4 transition-colors duration-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Tìm món ăn yêu thích..."
              className="border border-orange-200 bg-white/80 backdrop-blur-sm rounded-full pl-10 pr-4 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 shadow-sm hover:shadow-md"
            />
          </div>
        </div>

        {/* Auth and Cart - Improved styling */}
        <div className="flex items-center gap-6">
          <Link to="/auth" className="flex items-center group">
            <div className="relative bg-orange-100 rounded-full p-2.5 group-hover:bg-orange-200 transition-colors duration-200 shadow-sm group-hover:shadow-md">
              <svg
                className="h-5 w-5 text-orange-600 group-hover:text-orange-700 transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <span className="ml-2 text-orange-800 font-medium group-hover:text-orange-900 transition-colors hidden sm:block">
              Đăng nhập
            </span>
          </Link>
          <Link to="/Cart" className="flex items-center group">
            <div className="relative bg-orange-100 rounded-full p-2.5 group-hover:bg-orange-200 transition-colors duration-200 shadow-sm group-hover:shadow-md">
              <svg
                className="h-5 w-5 text-orange-600 group-hover:text-orange-700 transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border border-white shadow-sm">
                0
              </span>
            </div>
            <span className="ml-2 text-orange-800 font-medium group-hover:text-orange-900 transition-colors hidden sm:block">
              Giỏ hàng
            </span>
          </Link>
        </div>
      </div>

      {/* Category navigation - Improved design */}
      <div
        className={`${
          scrolled
            ? "bg-gradient-to-r from-orange-400 to-red-400"
            : "bg-gradient-to-r from-orange-500 to-red-500"
        } shadow-sm transition-colors duration-300`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex justify-center space-x-1 py-2.5 overflow-x-auto no-scrollbar">
            <NavLink
              to="/Foods"
              className={({ isActive }) =>
                `flex items-center justify-center px-3 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-white/25 text-white font-medium shadow-inner"
                    : "text-white hover:bg-white/15 font-medium"
                }`
              }
            >
              <svg
                className="h-4 w-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 11s.3-2.2-3-4c-3.1 1.8-3 4-3 4m6 4v3c0 1.1-.9 2-2 2H9a2 2 0 01-2-2v-3" />
                <path d="M12 19v4m-2-2h4M3 11h18M5 11V7c0-1.1.9-2 2-2h10a2 2 0 012 2v4" />
              </svg>
              <span className="text-sm whitespace-nowrap">Thức ăn</span>
            </NavLink>

            <NavLink
              to="/Drinks"
              className={({ isActive }) =>
                `flex items-center justify-center px-3 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-white/25 text-white font-medium shadow-inner"
                    : "text-white hover:bg-white/15 font-medium"
                }`
              }
            >
              <svg
                className="h-4 w-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.8 5a4 4 0 00-3.8-3H10a4 4 0 00-3.8 3M12 12v9M5 8h14M8 12h8" />
              </svg>
              <span className="text-sm whitespace-nowrap">Đồ uống</span>
            </NavLink>

            <NavLink
              to="/Desserts"
              className={({ isActive }) =>
                `flex items-center justify-center px-3 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-white/25 text-white font-medium shadow-inner"
                    : "text-white hover:bg-white/15 font-medium"
                }`
              }
            >
              <svg
                className="h-4 w-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a6 6 0 00-6 6c0 1.5 1 3 2 4l2 2c1 1 2 2.5 2 4a6 6 0 006-6c0-1.5-1-3-2-4l-2-2c-1-1-2-2.5-2-4z" />
                <path d="M6 14c-2 1-3 3.5-3 6h18c0-2.5-1-5-3-6" />
              </svg>
              <span className="text-sm whitespace-nowrap">Tráng miệng</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
