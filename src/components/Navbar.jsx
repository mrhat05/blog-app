import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0); 

  const handleMenuClose = () => {
    setIsMenuOpen(false);//
  };

  const Logout = async () => {
    await authService.logout();
    localStorage.removeItem("authStatus");
    localStorage.removeItem("userData");
    dispatch(logout());
    handleMenuClose();
    navigate("/login");
  };

  const handleScroll = () => {
    if (window.scrollY < lastScrollY) {
      setShowNavbar(true);
    } else {

      setShowNavbar(false);
    }
    setLastScrollY(window.scrollY); 
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 text-white shadow-xl transition-all duration-300 ease-in-out ${
        showNavbar ? "top-0" : "-top-20"
      } fixed w-full z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start gap-5 sm:justify-between items-center h-20">
          <button
            className="text-3xl sm:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>

          <NavLink to="/home" className="text-xl font-bold">
            Blogify
          </NavLink>

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute top-20 left-4 w-3/4 sm:w-auto bg-white text-black sm:static sm:bg-transparent sm:flex sm:items-center sm:space-x-6 z-50 shadow-lg`}
          >
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 text-black bg-gray-200 p-3 rounded-md sm:bg-opacity-80"
                  : "block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 sm:text-white hover:text-black hover:bg-gray-200 p-3 rounded-md sm:hover:bg-opacity-80"
              }
              onClick={handleMenuClose}
            >
              Home
            </NavLink>

            <NavLink
              to="/allBlogs"
              className={({ isActive }) =>
                isActive
                  ? "block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 text-black bg-gray-200 p-3 rounded-md sm:bg-opacity-80"
                  : "block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 sm:text-white hover:text-black hover:bg-gray-200 p-3 rounded-md sm:hover:bg-opacity-80"
              }
              onClick={handleMenuClose}
            >
              All Blogs
            </NavLink>

            <NavLink
              to="/addBlog"
              className={({ isActive }) =>
                isActive
                  ? "block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 text-black bg-gray-200 p-3 rounded-md sm:bg-opacity-80"
                  : "block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 sm:text-white hover:text-black hover:bg-gray-200 p-3 rounded-md sm:hover:bg-opacity-80"
              }
              onClick={handleMenuClose}
            >
              Add Blog
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 text-black bg-gray-200 p-3 rounded-md sm:bg-opacity-80"
                  : "block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 sm:text-white hover:text-black hover:bg-gray-200 p-3 rounded-md sm:hover:bg-opacity-80"
              }
              onClick={handleMenuClose}
            >
              Profile
            </NavLink>

            <button
              onClick={Logout}
              className="block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-black hover:bg-gray-200 p-3 rounded-md sm:text-white sm:hover:bg-opacity-80"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
