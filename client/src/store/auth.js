import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk("auth/signup", (formData) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

export const signin = createAsyncThunk("auth/signin", (formData) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

export const authSLice = createSlice({
  name: "AUTH",
  initialState: { authData: null },
  reducers: {
    auth(state, action) {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action.payload };
    },
    logout() {
      localStorage.removeItem("profile");
    },
  },
});

export const authActions = authSLice.actions;
