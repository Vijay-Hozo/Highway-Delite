import React from "react";
import signin from "../assets/Image/SIgnIn.jpg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../Redux/createSlice";
import { toast } from "react-toastify";

const PasswordInput = ({ value, onChange }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative w-full">
      <input
        type={isPasswordVisible ? "text" : "password"}
        placeholder="Password"
        className="w-full border-b-2 border-gray focus:outline-none py-2 focus:border-purple"
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0"
        onClick={togglePasswordVisibility}
      >
        {isPasswordVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fillRule="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            color="bg-purple"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      console.log(res.data);
      dispatch(login(res.data.user));
      localStorage.setItem("token", res.data.token);
      navigate("/home");
      toast.success("Login Success");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-around w-full min-h-screen p-10 bg-bgWhite">
      <div className="w-1/2 flex justify-center">
        <img
          src={signin}
          alt="Sign Up"
          className="w-full h-auto max-w-lg md:max-w-full md:h-[600px] object-cover hidden md:block"
        />
      </div>
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg min-w-0 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mr-20">
        <div className="flex justify-between">
          <div className="font-bold text-2xl mb-8">
            <span className="text-purple">Fill What We Know</span>
            <span className="text-red">!</span>
          </div>
        </div>
        <form className="flex flex-col space-y-6" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            className="border-b-2 border-gray focus:outline-none py-2 focus:border-purple"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-purple hover:bg-red text-white py-3 rounded-lg transition-all duration-300 shadow-lg"
          >
            Sign In
          </button>

          <button className="bg-white hover:bg-red text-black py-3 rounded-lg transition-all duration-300 shadow-lg">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
