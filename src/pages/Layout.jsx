import React from "react";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer/Footer"
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
