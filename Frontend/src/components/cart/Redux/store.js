import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartSlice'; // Adjust this path as necessary
import { createTransform } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

// You can create a transform that serializes and deserializes certain data
const transforms = createTransform(
  (inboundState) => {
    // Transform the state coming from the persisted store
    return inboundState; // No transformation needed
  },
  (outboundState) => {
    // Transform the state going to the persisted store
    return outboundState; // No transformation needed
  }
);

const persistedReducer = persistReducer(
  {
    ...persistConfig,
    transforms: [transforms],
  },
  cartReducer
);

// Create the Redux store with serializable checks disabled
export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    // other reducers can go here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);
