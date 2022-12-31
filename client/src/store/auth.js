import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index";

export const signup = createAsyncThunk("auth/signup", async (formData) => {
  try {
    const { data } = await api.signUp(formData);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const signin = createAsyncThunk("auth/signin", async (formData) => {
  try {
    const { data } = await api.signIn(formData);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
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
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        state.authData = action.payload;
        localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
        return state;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.authData = action.payload;
        localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
        return state;
      });
  },
});

export const authActions = authSlice.actions;
