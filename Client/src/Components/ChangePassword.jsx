import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword || !confirmPassword) {
      toast.error('All fields are required.');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/resetpassword", {
        otp,
        newPassword
      });
      console.log('Submitting:', { otp, newPassword });
      toast.success('Password changed successfully!');
      console.log(res.data);
    } catch (err) {
      toast.error('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg mt-28 bg-white">
      <h2 className="text-2xl font-semibold text-purple-700 mb-6">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="otp" className="block text-gray-700 font-medium mb-1">OTP:</label>
          <input
            type="text"
            id="otp"
            placeholder="Enter OTP"
            className="w-full px-3 py-2 border border-gray rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">New Password:</label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter new password"
            className="w-full px-3 py-2 border border-gray rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block  font-medium mb-1">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Re-enter new password"
            className="w-full px-3 py-2 border border-gray rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
