import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, increaseQuantity, decreaseQuantity } from './Redux/cartSlice';
import OrderConfirmationModal from './modal.jsx';
import { clearCart } from './Redux/cartSlice.js'; 
import axios from "axios";
import { Link } from 'react-router-dom';
const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [userAddress, setUserAddress] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.user.id : null;

  useEffect(() => {
    const fetchUserAddress = async () => {
      if (userId) {
        try {
          const response = await axios.get("http://localhost:5000/api/address", {
            params: { userId },
          });
          if (response.data) {
            const { street, city, phone, zip } = response.data;
            const fullAddress = `${street}, ${city}, ${zip.trim()}, Phone: ${phone}`;
            setUserAddress(fullAddress);
          } else {
            setUserAddress("Address not found");
          }
        } catch (error) {
          console.error(error);
          setUserAddress("Failed to fetch address");
        }
      }
    };
    fetchUserAddress();
  }, [userId]);

  const totalAmount = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace('$', ''));
    return total + itemPrice * item.quantity;
  }, 0);

  const handleApplyCoupon = () => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(totalAmount * 0.1);
      setCouponError('');
    } else {
      setDiscount(0);
      setCouponError('Invalid coupon code');
    }
  };

  const handlePlaceOrder = async () => {
    const userid = JSON.parse(localStorage.getItem("user"));
    const userId = userid.user.id;
    const userName = userid.user.name;
    const orderDetails = {
      userId: userId,
      userName: userName,
      products: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.price,
      })),
      address: userAddress,
      paymentMethod: paymentMethod,
      totalAmount: totalAmount - discount,
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/orders', orderDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(clearCart());
      setIsModalOpen(true);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error('Error placing order:', error.response ? error.response.data : error.message);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="font-[sans-serif] bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <h2 className="text-2xl font-extrabold text-pink-600 text-center">Your Shopping Cart</h2>
        <h2 className="text-2xl font-extrabold text-gray-700 text-center gap-2">Check Your Address before placing your order</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-center text-xl text-gray-600">Cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="p-4 sm:p-6 bg-white shadow-md rounded-md relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div className="w-full sm:w-32 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="w-full">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">{item.name}</h3>
                      <ul className="mt-2 sm:mt-4 text-sm text-gray-800 space-y-1 sm:space-y-2">
                        <li>Size: {item.size}</li>
                        <li>Color: {item.color}</li>
                      </ul>
                      <hr className="border-gray-300 my-2 sm:my-4" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                        <div className="flex items-center gap-3">
                          <h4 className="text-sm font-bold text-gray-800">Qty:</h4>
                          <button
                            type="button"
                            className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center"
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <span className="font-bold text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center"
                            onClick={() => dispatch(increaseQuantity(item.id))}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between w-full sm:w-auto">
                          <h4 className="text-lg font-bold text-gray-800">
                            ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                          </h4>
                          <button
                            type="button"
                            className="ml-4 sm:ml-6"
                            onClick={() => dispatch(removeItem(item.id))}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-gray-400 hover:text-red-500 cursor-pointer"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Order Summary Section */}
          <motion.div
            className="bg-white rounded-md p-4 sm:p-6 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Order Summary</h3>
            <ul className="text-gray-800 text-sm divide-y mt-4">
              <li className="flex justify-between py-3">Subtotal <span className="font-bold">${totalAmount.toFixed(2)}</span></li>
              <li className="flex justify-between py-3">Shipping <span className="font-bold">$0.00</span></li>
              <li className="flex justify-between py-3">Tax <span className="font-bold">$0.00</span></li>
              <li className="flex justify-between py-3 font-bold">Total <span>${(totalAmount - discount).toFixed(2)}</span></li>
            </ul>

            {/* Apply Coupon Section */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">Apply Coupon</h3>
              <div className="flex items-center mt-3">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="ml-3 bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-red-500 text-sm">{couponError}</p>}
            </div>

                 {/* User Address Section */}
                 <div className="mt-6 p-4 rounded-md shadow-md bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">Your Address</h3>
              {userAddress ? (
                <p className="text-gray-700">{userAddress}</p>
              ) : (
                <p className="text-red-700 text-xl font-bold">Please add your address
                in your profile</p>
                
              )}
              <Link className='flex justify-center text-black' to='/dashboard'>Go to Dashboard</Link>
            </div>

            {/* Payment Method Section */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">Payment Method</h3>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-2 border border-gray-300 rounded-md w-full p-2"
              >
                <option value="COD">Cash on Delivery</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>

            {/* Place Order Button */}
            <button
              type="button"
              onClick={handlePlaceOrder}
              className={`mt-6 w-full py-3 rounded-md text-white ${
                cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>
          </motion.div>
        </div>
      </div>
            <OrderConfirmationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Cart;
