import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload; // Expecting the entire item object as payload
      const existingItem = state.cartItems.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity; // Increase quantity if item already exists
      } else {
        // Add new item to the cart with all its properties
        state.cartItems.push(newItem);
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.cartItems = []; // Clear the cart items
    },
  },
});

// Export the actions to use in your components
export const { addItem, removeItem, increaseQuantity, decreaseQuantity ,clearCart} = cartSlice.actions;

// Export the reducer to be included in the store
export default cartSlice.reducer;
