import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index";

export const signup = createAsyncThunk("auth/signup", async (formData) => {
  try {
    const { data } = await api.signUp(formData);
    return data;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
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
  initialState: { authData: null, userExist: false },
  reducers: {
    auth(state, action) {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      // state.userExist = !state.userExist;
      return {
        ...state.authData,
        authData: action.payload,
        userExist: !state.userExist,
      };
    },
    logout(state) {
      localStorage.removeItem("profile");
      state.userExist = !state.userExist;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        state.authData = action.payload;
        if (action.payload !== undefined) {
          localStorage.setItem(
            "profile",
            JSON.stringify({ ...action?.payload })
          );
          state.userExist = !state.userExist;
          return state;
        } else {
          return state;
        }
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.authData = action.payload;
        console.log("ISIT PAtyload======>", state.authData);
        if (
          action.payload !== undefined &&
          typeof action.payload !== "string"
        ) {
          localStorage.setItem(
            "profile",
            JSON.stringify({ ...action?.payload })
          );
          state.userExist = !state.userExist;
          return state;
        } else {
          return state;
        }
      });
  },
});

export const authActions = authSlice.actions;
