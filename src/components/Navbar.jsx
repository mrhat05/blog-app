import React from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function Navbar(){
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const Logout = async () => {
    await authService.logout();

    localStorage.removeItem("authStatus");
    localStorage.removeItem("userData");
    dispatch(logout());
    navigate('/login')
  }

  return (
    <nav className="bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          <NavLink to="/home" className="text-xl font-bold " >
            Blogify
          </NavLink>
          <div className="space-x-2">
            <NavLink
              to="/home"
              className={({isActive})=>(
                isActive
                ?"text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 text-black bg-white p-3 rounded-md bg-opacity-70"
                :"text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-black hover:bg-white p-3 rounded-md hover:bg-opacity-70"
              )}
            >
              Home
            </NavLink>
            <NavLink
              to="/allBlogs"
              className={({isActive})=>(
                isActive
                ?"text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 text-black bg-white p-3 rounded-md bg-opacity-70"
                :"text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-black hover:bg-white p-3 rounded-md hover:bg-opacity-70"
              )}
            >
              All Blogs
            </NavLink>
            <NavLink
              to="/addBlog"
              className={({isActive})=>(
                isActive
                ?"text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 text-black bg-white p-3 rounded-md bg-opacity-70"
                :"text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-black hover:bg-white p-3 rounded-md hover:bg-opacity-70"
              )}
            >
              Add Blog
            </NavLink>
            <NavLink>
              <button
                onClick={Logout}
                className="text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-black hover:bg-white p-3 rounded-md hover:bg-opacity-70"
              >
                Logout
              </button>
            </NavLink>
          </div>  
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
