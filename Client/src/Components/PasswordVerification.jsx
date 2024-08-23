import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyOtp = () => {
    const [email,setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/verify`, {
                email : email,
                otp
            });
            toast.success(res.data.message);
            navigate("/home"); 
            localStorage.setItem("token", res.data.token);
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-10">
            <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
                <form onSubmit={handleVerifyOtp} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        className="border-b-2 border-gray focus:outline-none py-2 focus:border-purple"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-purple hover:bg-purple-700 text-white py-2 rounded-lg transition-all duration-300 shadow-lg"
                    >
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;
