import React, { useState } from 'react';
import { FaUserAlt, FaEyeSlash, FaEye } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import Cookies from 'js-cookie';

const getRandomPosition = (max) => {
  return Math.floor(Math.random() * max);
};

const Signin = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [otp, setOtp] = useState(''); // State for OTP
  const [isOtpVisible, setIsOtpVisible] = useState(false); // Toggle for OTP section
  const [error, setError] = useState(''); // Error state
  const [success, setSuccess] = useState(''); // Success state
  const navigate = useNavigate(); // Hook for navigation

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setError(''); // Reset error
    setSuccess(''); // Reset success

    try {
      // Request OTP
      await axios.post('http://localhost:5000/api/signin', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsOtpVisible(true); // Show OTP input section
      setSuccess('OTP has been sent to your email.'); // Success message
    } catch (error) {
      setError(error.response?.data?.error || 'Error requesting OTP. Please try again.');
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    setError(''); // Reset error
    setSuccess(''); // Reset success

    try {
      const response = await axios.post('http://localhost:5000/api/verify', { email: formData.email, otp }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const userData = response.data;
      const token = userData.user.token;
      Cookies.set('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setSuccess('Account logged in successfully!');

      // Redirect after successful OTP verification
      setTimeout(() => {
        navigate('/dashboard'); // Redirect to dashboard
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'Error verifying OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden">
      {/* Bouncing Balls */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Ball animations (same as before) */}
        {/* ... */}
      </div>

      {/* Sign In Form */}
      <motion.div
        className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md mx-4 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error */}
        {success && <p className="text-green-500 text-center">{success}</p>} {/* Display success */}

        {!isOtpVisible ? (
          <form onSubmit={handleSubmitEmail}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <div className="flex items-center p-2 rounded-md bg-gray-50 shadow-neu">
                <FaUserAlt className="text-gray-500 mr-2" />
                <motion.input
                  className="bg-transparent w-full outline-none"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your registered email"
                  value={formData.email}
                  onChange={handleChange} // Handle email input changes
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  required
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className={`
                  px-4 py-2 rounded-full 
                  flex items-center gap-2 
                  text-slate-500
                  shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
                  transition-all
                  hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
                  hover:text-violet-500
                `}
                type="submit" // Ensure button type is submit
              >
                <FiLock />
                <span>Request OTP</span>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmitOtp}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="otp">
                Enter OTP
              </label>
              <div className="flex items-center p-2 rounded-md bg-gray-50 shadow-neu">
                <motion.input
                  className="bg-transparent w-full outline-none"
                  type="text"
                  name="otp"
                  id="otp"
                  placeholder="Enter the OTP sent to your email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)} // Handle OTP input changes
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  required
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className={`
                  px-4 py-2 rounded-full 
                  flex items-center gap-2 
                  text-slate-500
                  shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
                  transition-all
                  hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
                  hover:text-violet-500
                `}
                type="submit" // Ensure button type is submit
              >
                <FiLock />
                <span>Verify OTP</span>
              </button>
            </div>
          </form>
        )}

        <motion.p
          className="text-gray-600 mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Don't have an account? <Link to="/signup" className="text-red-500 hover:underline">Sign up here</Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Signin;
