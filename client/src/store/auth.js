import { createSlice } from "@reduxjs/toolkit";

export const authSLice = createSlice({
  name: "AUTH",
  initialState: { authData: null },
  reducers: {
    auth(state, action) {
      // console.log("auth From redux", action.payload);
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action.payload };
    },
    logout() {
      localStorage.removeItem("profile");
    },
  },
});

export const authActions = authSLice.actions;
