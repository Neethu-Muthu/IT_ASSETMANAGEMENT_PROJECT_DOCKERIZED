import React from 'react'
//import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return (
    <>
   
    <Outlet />
    <ToastContainer  />
   
   
    
    </>
  )
}

export default MainLayout