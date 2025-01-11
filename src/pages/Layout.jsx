import React from "react";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer/Footer"
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = () => {
  const isDarkMode=useSelector((state)=>state.darkMode.isDarkMode)
  return (
    <div>
      <Navbar />
      <main className={`pt-20 ${isDarkMode?"bg-darkBgColor":"white"}`}>
        <Outlet />
      </main>
      <Footer classNames={'hidden sm:block'}/>
    </div>
  );
};

export default Layout;
