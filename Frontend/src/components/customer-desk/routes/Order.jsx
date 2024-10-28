import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const UserOrders = ({ userId }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [cancelError, setCancelError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            const userid = JSON.parse(localStorage.getItem("user"));
            const userId = userid.user.id;
            try {
                const response = await axios.get(`http://localhost:5000/api/orders/${userId}`);
                setOrders(response.data);
            } catch (err) {
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    const handleCancelOrder = async () => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${selectedOrderId}/cancel`);
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order._id === selectedOrderId ? { ...order, status: 'Cancelled' } : order
                )
            );
            setShowModal(false);
            setSelectedOrderId(null);
        } catch (err) {
            setCancelError('Failed to cancel the order');
        }
    };

    const handleReturnAndReplace = async (orderId) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${orderId}/return`);
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, status: 'Return Initiated' } : order
                )
            );
        } catch (err) {
            console.error('Failed to initiate return', err);
        }
    };

    if (loading) return <p className="text-center mt-4">Loading...</p>;
    if (error) return <p className="text-center mt-4 text-red-600">{error}</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Your Orders</h2>
            {orders.length === 0 ? (
                <p className="text-center mt-4 text-lg text-gray-600">No orders found.</p>
            ) : (
                <div className="space-y-8">
                    {orders.map(order => (
                        <motion.div 
                            key={order._id} 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: 20 }} 
                            transition={{ duration: 0.4 }}
                            className={`border border-gray-300 rounded-lg shadow-lg bg-white p-6 hover:shadow-xl transform transition-all duration-300 ${order.status === 'Cancelled' ? 'bg-red-100' : ''}`}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-xl">Order ID: {order._id}</h3>
                                <span className="text-lg font-bold text-green-600">${order.totalAmount.toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-gray-500">Created At: {new Date(order.createdAt).toLocaleString()}</p>
                            {order.status === 'Cancelled' ? (
                                <p className="text-red-600 font-bold mt-2">Your order has been cancelled.</p>
                            ) : (
                                <>
                                    <h4 className="mt-4 font-semibold text-lg text-gray-700">Products:</h4>
                                    <ul className="list-disc list-inside space-y-2">
                                        {order.products.map(product => (
                                            <li key={product.id} className="flex justify-between items-center border-b border-gray-200 py-2">
                                                <span className="text-gray-800">{product.name}</span>
                                                <span className="text-gray-600">Qty: {product.quantity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex space-x-4 mt-4">
                                        <button 
                                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                                            onClick={() => {
                                                setShowModal(true);
                                                setSelectedOrderId(order._id);
                                            }}
                                        >
                                            Cancel Order
                                        </button>
                                        <button 
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                                            onClick={() => handleReturnAndReplace(order._id)}
                                        >
                                            Return and Replace
                                        </button>
                                    </div>
                                    {order.status === 'Return Initiated' && (
                                        <p className="text-blue-600 font-bold mt-2">Return Initiated for this order.</p>
                                    )}
                                </>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Confirm Cancellation</h3>
                        <p>Are you sure you want to cancel this order?</p>
                        {cancelError && <p className="text-red-600 mt-2">{cancelError}</p>}
                        <div className="flex justify-between mt-4">
                            <button 
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                onClick={handleCancelOrder}
                            >
                                Yes, Cancel
                            </button>
                            <button 
                                className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
                                onClick={() => setShowModal(false)}
                            >
                                No, Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserOrders;
