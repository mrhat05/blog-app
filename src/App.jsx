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
        </Route>
          <Route path='/signup' element={<Protected authentication={false}><Signin/></Protected>}/>
          <Route path='/login' element={<Protected authentication={false}><Login/></Protected>}/>
        </Routes>
      </Router>
  )
}

export default App;
