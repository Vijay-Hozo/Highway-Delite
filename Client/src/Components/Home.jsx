import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const Home = () => {
  const Navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    handleUser();
  }, []);

  const handleUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data.user);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/forgotpassword", {
        email: profile.email,
      });
      console.log(res.data);
      Navigate('/changepassword',{state: {email:profile.email}})
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-red-600 text-4xl font-bold mb-8">
        Welcome to Highway Deliter
      </h1>
      {profile ? (
        <div className="bg-gray shadow-lg rounded-lg p-6 w-full max-w-md text-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {profile.first_name} {profile.last_name}
          </h2>
          <p className="text-purple font-semibold mb-4">{profile.email}</p>
        </div>
      ) : (
        <p className="text-gray">Loading profile...</p>
      )}
      <button onClick={handleChange}
      className="mt-10 bg-purple w-[200px] hover:bg-red text-white py-3 rounded-lg transition-all duration-300 shadow-lg">
        Forgot Password
      </button>
    </div>
  );
};

export default Home;
