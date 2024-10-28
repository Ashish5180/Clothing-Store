import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaHome } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { Outlet, Link } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null); // Initialize user as null
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        console.log('Dashboard component rendered'); // Check if component is rendering

        // Retrieve user data from local storage
        const storedUser = localStorage.getItem('user');
        

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                
                setUser(parsedUser.user); // Set user to the nested user object
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
        setLoading(false); // Set loading to false after fetching
    }, []);

    // Show loading state while fetching
    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto p-4 ">
            {/* Navbar with User Profile */}
            <div className="flex justify-between items-center mb-8 p-4 bg-[#F5F5F5] rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                    {/* Display user email and name */}
                    {user ? (
                        <motion.div
                            className="text-lg text-black font-semibold"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            Hello, {user.name} 
                        </motion.div>
                    ) : (
                        <motion.div
                            className="text-lg text-black font-semibold"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            Hello, Guest
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Account Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Your Orders */}
                <Link to="order">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="border rounded-lg p-4 flex items-center space-x-4 bg-[#F5F5F5] shadow-lg"
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaBox size={40} className="text-yellow-500" />
                        <div>
                            <h2 className="text-lg font-medium">Your Orders</h2>
                            <p>Track, return, or buy things again</p>
                        </div>
                    </motion.div>
                </Link>

                {/* Your Addresses */}
                <Link to="address">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="border rounded-lg p-4 flex items-center space-x-4 bg-[#F5F5F5] shadow-lg"
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaHome size={40} className="text-yellow-500" />
                        <div>
                            <h2 className="text-lg font-medium">Your Addresses</h2>
                            <p>Edit addresses for orders and gifts</p>
                        </div>
                    </motion.div>
                </Link>

                {/* Account */}
                <Link to="account">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="border rounded-lg p-4 flex items-center space-x-4 bg-[#F5F5F5] shadow-lg"
                        whileTap={{ scale: 0.95 }}
                    >
                        <AiOutlineLogout size={40} className="text-gray-500" />
                        <div>
                            <h2 className="text-lg font-medium">Account</h2>
                            <p>Logout, and Deactivate account</p>
                        </div>
                    </motion.div>
                </Link>
            </div>

            {/* This will render the nested route components */}
            <div className="mt-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
