import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
    }

    try {
      const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/resetpassword`, {
        email: email,
        otp: otp,
        password: newPassword,
      });

      toast.success("Password changed successfully!");
      navigate("/home");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray rounded-lg shadow-lg mt-28 bg-white">
      <h2 className="text-2xl font-semibold text-purple mb-6">
        Change Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border-b-2 border-gray focus:outline-none py-2 focus:border-purple"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border-b-2 border-gray focus:outline-none py-2 focus:border-purple"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full border-b-2 border-gray focus:outline-none py-2 focus:border-purple"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Re-enter new password"
            className="w-full border-b-2 border-gray focus:outline-none py-2 focus:border-purple"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple text-white py-2 px-4 rounded-md hover:bg-red focus:outline-none focus:ring-purple"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
