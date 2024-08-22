import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import { useDispatch } from 'react-redux'
import { login } from './Redux/createSlice'
import Home from './Components/Home'
import PasswordVerification from './Components/PasswordVerification';
import ChangePassword from './Components/ChangePassword';
// import ForgotPassword from './Components/ForgotPassword'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      dispatch(login(token));
    }
  },[dispatch])
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<PasswordVerification />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App