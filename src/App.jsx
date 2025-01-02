import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Layout from './pages/Layout';
import AddBlog from './pages/AddBlog';
import AllBlogs from './pages/AllBlogs';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Protected from './components/AuthLayout'
import EditBlog from './pages/EditBlog';
import Blog from './pages/Blog'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import Profile from './pages/Profile'
//dummy
import Company from './pages/Dummy/Company';
import Features from './pages/Dummy/Feautures';
import Pricing from './pages/Dummy/Pricing';
import AffiliateProgram from './pages/Dummy/Affliate';
import PressKit from './pages/Dummy/PressKit';
import Support from './pages/Dummy/Support';
import Help from './pages/Dummy/Help';
import ContactUs from './pages/Dummy/ContactUs';
import CustomerSupport from './pages/Dummy/Customercare';


function App(){
  return (
      <Router>
        <ToastContainer/>
        <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

          <Route path='/' element={<Protected authentication={true}><Layout/></Protected>}>
          <Route path='/home' element={<Protected authentication={true}><Home/></Protected>}/>
          <Route path='/addBlog' element={<Protected authentication={true}><AddBlog/></Protected>}/>
          <Route path='/allBlogs' element={<Protected authentication={true}><AllBlogs/></Protected>}/>
          <Route path='/blog/:slug' element={<Protected authentication={true}><Blog/></Protected>}/>
          <Route path='/editBlog/:slug' element={<Protected authentication={true}><EditBlog/></Protected>}/>
          <Route path='/profile' element={<Protected authentication={true}><Profile/></Protected>}/>
          <Route
                    path='/company'
                    element={<Protected authentication={true}><Company /></Protected>}
                />
                <Route
                    path='/features'
                    element={<Protected authentication={true}><Features /></Protected>}
                />
                <Route
                    path='/pricing'
                    element={<Protected authentication={true}><Pricing /></Protected>}
                />
                <Route
                    path='/affiliate'
                    element={<Protected authentication={true}><AffiliateProgram /></Protected>}
                />
                <Route
                    path='/press'
                    element={<Protected authentication={true}><PressKit /></Protected>}
                />
                <Route
                    path='/support'
                    element={<Protected authentication={true}><Support /></Protected>}
                />
                <Route
                    path='/help'
                    element={<Protected authentication={true}><Help /></Protected>}
                />
                <Route
                    path='/contact-us'
                    element={<Protected authentication={true}><ContactUs /></Protected>}
                />
                <Route
                    path='/customer-support'
                    element={<Protected authentication={true}><CustomerSupport /></Protected>}
                />
        </Route>
          <Route path='/signup' element={<Protected authentication={false}><Signin/></Protected>}/>
          <Route path='/login' element={<Protected authentication={false}><Login/></Protected>}/>
        </Routes>
      </Router>
  )
}

export default App;
