// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import the auth slice

// Create the Redux store
const store = configureStore({
    reducer: {
        auth: authReducer, // Add auth slice to the store
    },
});

export default store;
