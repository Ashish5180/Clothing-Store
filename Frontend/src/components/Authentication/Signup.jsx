import React, { useState } from 'react';
import { FaUserAlt, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory for redirection
import axios from 'axios';
import Cookies from 'js-cookie';

const getRandomPosition = (max) => {
  return Math.floor(Math.random() * max);
};

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // Declare error state
  const [success, setSuccess] = useState(''); // Declare success state
  const navigate = useNavigate(); // Initialize useHistory for redirection

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error
    setSuccess(''); // Reset success

    try {
      const response = await axios.post('https://clothing-store-xyw8.onrender.com/signUp', formData, {
        withCredentials: true, 
        headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify(formData),
    },
    
      });
      setSuccess('Account created successfully! Redirecting to sign in...');
      const userData = response.data; 
      const token = userData.user.token;

      Cookies.set('token', token);
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirect after a successful signup
      setTimeout(() => {
        navigate('/dashboard'); // Redirect to sign-in page after 2 seconds
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'Error creating account. Please try again.');
    }
  };

  // Generate random positions for the balls
  const balls = Array.from({ length: 4 }, () => ({
    x: Math.random() * (window.innerWidth - 50),
    y: Math.random() * (window.innerHeight - 50),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Ball 1 */}
        <motion.div
          className="absolute bg-yellow-300 rounded-full"
          style={{ width: 100, height: 100 }}
          initial={{ x: getRandomPosition(window.innerWidth - 100), y: getRandomPosition(window.innerHeight - 100) }}
          animate={{
            x: [getRandomPosition(window.innerWidth - 100), getRandomPosition(window.innerWidth - 100), getRandomPosition(window.innerWidth - 100)],
            y: [getRandomPosition(window.innerHeight - 100), getRandomPosition(window.innerHeight - 100), getRandomPosition(window.innerHeight - 100)],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bg-yellow-300 rounded-full"
          style={{ width: 100, height: 100 }}
          initial={{ x: getRandomPosition(window.innerWidth - 100), y: getRandomPosition(window.innerHeight - 100) }}
          animate={{
            x: [getRandomPosition(window.innerWidth - 100), getRandomPosition(window.innerWidth - 100), getRandomPosition(window.innerWidth - 100)],
            y: [getRandomPosition(window.innerHeight - 100), getRandomPosition(window.innerHeight - 100), getRandomPosition(window.innerHeight - 100)],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bg-yellow-300 rounded-full"
          style={{ width: 100, height: 100 }}
          initial={{ x: getRandomPosition(window.innerWidth - 100), y: getRandomPosition(window.innerHeight - 100) }}
          animate={{
            x: [getRandomPosition(window.innerWidth - 100), getRandomPosition(window.innerWidth - 100), getRandomPosition(window.innerWidth - 100)],
            y: [getRandomPosition(window.innerHeight - 100), getRandomPosition(window.innerHeight - 100), getRandomPosition(window.innerHeight - 100)],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bg-yellow-300 rounded-full"
          style={{ width: 100, height: 100 }}
          initial={{ x: getRandomPosition(window.innerWidth - 100), y: getRandomPosition(window.innerHeight - 100) }}
          animate={{
            x: [getRandomPosition(window.innerWidth - 100), getRandomPosition(window.innerWidth - 100), getRandomPosition(window.innerWidth - 100)],
            y: [getRandomPosition(window.innerHeight - 100), getRandomPosition(window.innerHeight - 100), getRandomPosition(window.innerHeight - 100)],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Add other balls similarly */}
      </div>
      </div>
      
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {/* Display error or success messages */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <div className="flex items-center p-3 rounded-md bg-gray-50">
              <FaUserAlt className="text-gray-500 mr-3" />
              <input
                className="bg-transparent w-full outline-none"
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </motion.div>

          {/* Email Field */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <div className="flex items-center p-3 rounded-md bg-gray-50">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                className="bg-transparent w-full outline-none"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center p-3 rounded-md bg-gray-50 relative">
              <FaLock className="text-gray-500 mr-3" />
              <input
                className="bg-transparent w-full outline-none"
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div
                className="absolute right-5 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </motion.div>

          <div className='flex justify-center'>
            {/* Submit Button */}
            <button
              type="submit"
              className={`
                px-4 py-2 rounded-full 
                flex items-center gap-2 
                text-slate-500
                shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
                transition-all
                hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
                hover:text-violet-500
              `}
            >
              <FiLock />
              <span>Create Account</span>
            </button>
          </div>
        </form>

        {/* Login Redirect */}
        <motion.p
          className="text-gray-600 mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Already have an account?{' '}
          <Link to="/signin" className="text-indigo-600 hover:underline">
            Sign in here
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Signup;
