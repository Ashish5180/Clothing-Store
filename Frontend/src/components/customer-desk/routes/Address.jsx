import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCity, FaPhoneAlt } from 'react-icons/fa';

function Address() {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    phone: "",
    zip: "",
  });

  // Get user object from local storage and parse it
  const user = JSON.parse(localStorage.getItem("user")); // Ensure this is an object with user ID

  // Check if user object is available and get userId
  const userId = user.user.id;
  

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value }); // Update address state on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!userId) {
      alert("User ID not found"); // Alert if userId is not available
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/address", {
        ...address, // Spread the address object
        userId, // Include the userId
      });
      alert("Address saved successfully"); // Alert on success
      setAddress({ street: "", city: "", phone: "", zip: "" }); // Reset the address state
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address"); // Alert on failure
    }
  };

 

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 border border-gray-300 sm:rounded-md"
    >
      <form onSubmit={handleSubmit}>
        <label className="block mb-6">
          <span className="text-gray-700 flex items-center">
            <FaMapMarkerAlt className="mr-2" /> Street / Landmark
          </span>
          <motion.input
            name="street"
            type="text"
            value={address.street} // Bind value
            onChange={handleChange} // Handle input change
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter your street or landmark"
            whileFocus={{ scale: 1.05 }}
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700 flex items-center">
            <FaCity className="mr-2" /> City
          </span>
          <motion.input
            name="city"
            type="text"
            value={address.city} // Bind value
            onChange={handleChange} // Handle input change
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter your city"
            whileFocus={{ scale: 1.05 }}
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700 flex items-center">
            <FaPhoneAlt className="mr-2" /> Phone
          </span>
          <motion.input
            name="phone"
            type="text"
            value={address.phone} // Bind value
            onChange={handleChange} // Handle input change
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter your phone number"
            whileFocus={{ scale: 1.05 }}
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Delivery information (with Pincode)</span>
          <motion.textarea
            name="zip"
            value={address.zip} // Bind value
            onChange={handleChange} // Handle input change
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="3"
            placeholder="Enter your delivery information"
            whileFocus={{ scale: 1.05 }}
          ></motion.textarea>
        </label>

        
          <button
            type="submit"

            className="h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800"
          >
            Save
          </button>
        
      </form>
    </motion.div>
  );
}

export default Address;
