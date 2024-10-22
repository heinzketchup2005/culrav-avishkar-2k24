// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    email: null,
    role: null,
    userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.email = action.payload.email; // Make sure to pass email in payload
            state.role = action.payload.role; // Dynamically set the role from the payload
            state.userData = action.payload.userData; // Expect userData to be in the payload
        },
        logout: (state) => {
            state.status = false;
            state.email = null;
            state.role = null;
            state.userData = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
