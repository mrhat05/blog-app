import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import authService from "../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { toggleDarkMode } from "../store/darkModeSlice";
import SliderSwitch from "../components/SliderSwitch";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
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
      className={`text-white shadow-xl transition-all duration-300 ease-in-out ${
        showNavbar ? "top-0" : "-top-20"
      } fixed w-full z-50 dark:text-white ${
        isDarkMode
          ? "bg-radial-dark"
          : "bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 ">
        <div className="flex justify-between items-center h-20">
          {/* Hamburger & Logo */}
          <div className="flex items-center">
            <button
              className="text-3xl lg:hidden focus:outline-none mr-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
            <NavLink to="/home" className="text-xl font-bold">
              Blogify
            </NavLink>
          </div>

      
            <div
            onClick={() => {
              if (isDarkMode) localStorage.setItem("darkMode", "false");
              else localStorage.setItem("darkMode", "true");
              dispatch(toggleDarkMode());
            }}
            className="lg:hidden"
          >
            <SliderSwitch checked={isDarkMode} />
          </div>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute lg:relative lg:flex lg:items-center lg:space-x-6 lg:bg-transparent ${
              isDarkMode ? "bg-darkNavBgColor text-white" : "bg-white text-black"
            } w-3/4 lg:w-auto top-20 left-4 lg:top-0 p-4 lg:p-0 shadow-lg lg:shadow-none rounded-lg m-2`}
          >

          { !isMenuOpen &&(
            <div
            onClick={() => {
              if (isDarkMode) localStorage.setItem("darkMode", "false");
              else localStorage.setItem("darkMode", "true");
              dispatch(toggleDarkMode());
            }}
            className=""
          >
            <SliderSwitch checked={isDarkMode} />
          </div>)
          }
 <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 text-black bg-gray-200 p-3 rounded-md lg:bg-opacity-80"
                  : "block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 lg:text-white hover:text-black hover:bg-gray-200 p-3 rounded-md lg:hover:bg-opacity-80"
              }
              onClick={handleMenuClose}
            >
              Home
            </NavLink>

            <NavLink
              to="/allBlogs"
              className={({ isActive }) =>
                isActive
                  ? "block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 text-black bg-gray-200 p-3 rounded-md lg:bg-opacity-80"
                  : "block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 lg:text-white hover:text-black hover:bg-gray-200 p-3 rounded-md lg:hover:bg-opacity-80"
              }
              onClick={handleMenuClose}
            >
              All Blogs
            </NavLink>

            <NavLink
              to="/addBlog"
              className={({ isActive }) =>
                isActive
                  ? "block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 text-black bg-gray-200 p-3 rounded-md lg:bg-opacity-80"
                  : "block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 lg:text-white hover:text-black hover:bg-gray-200 p-3 rounded-md lg:hover:bg-opacity-80"
              }
              onClick={handleMenuClose}
            >
              Add Blog
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 text-black bg-gray-200 p-3 rounded-md lg:bg-opacity-80"
                  : "block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 lg:text-white hover:text-black hover:bg-gray-200 p-3 rounded-md lg:hover:bg-opacity-80"
              }
              onClick={handleMenuClose}
            >
              Profile
            </NavLink>
            <NavLink onClick={Logout} className="block text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-black hover:bg-gray-200 p-3 rounded-md lg:text-white lg:hover:bg-opacity-80">
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
