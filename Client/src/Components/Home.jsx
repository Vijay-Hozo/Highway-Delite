import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import back from "../assets/Image/back.svg"
import profilepic from "../assets/Image/profile.svg"
import mail from "../assets/Image/mail.svg"
import { toast } from "react-toastify";

const Home = () => {
  const Navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    handleUser();
  }, []);

  const handleUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/forgotpassword`, {
        email: profile.email,
      });
      toast.success(res.data.message);
      Navigate('/changepassword',{state: {email:profile.email}})
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray p-6 relative">
    <div className="absolute top-4 left-4 cursor-pointer" onClick={() => Navigate("/")}>
      <img src={back} alt="Back" className="w-10 h-10" />
    </div>
    <h1 className="text-purple text-4xl font-bold mb-8 text-center">
      Welcome to Highway Deliter
    </h1>
    {profile ? (
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center flex flex-col items-center">
        <img src={profilepic} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {profile.first_name} {profile.last_name}
        </h2>
        <div className="flex items-center justify-center space-x-2">
          <img src={mail} alt="Mail" className="w-6 h-6" />
          <p className="text-purple font-semibold">{profile.email}</p>
        </div>
      </div>
    ) : (
      <p className="text-black">Loading profile...</p>
    )}
    <button 
      onClick={handleChange}
      className="mt-10 bg-purple hover:bg-red text-white py-3 px-8 rounded-lg transition-all duration-300 shadow-lg"
    >
      Forgot Password
    </button>
  </div>
  
  );
};

export default Home;
