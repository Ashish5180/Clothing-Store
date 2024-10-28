// components/OrderConfirmationModal.js
import React from 'react';
import { motion } from 'framer-motion';

const OrderConfirmationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render anything if not open

  // Animation properties
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        transition={{ duration: 0.3 }} // Adjust the duration for your animation
      >
        <h2 className="text-2xl font-bold mb-4">Order Placed!</h2>
        <p className="mb-4">Your order has been successfully placed and will be delivered within 3-4 working days.
          Go to your profile to view your order details.
        </p>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default OrderConfirmationModal;
