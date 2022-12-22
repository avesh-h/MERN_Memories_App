import { createReducer } from "@reduxjs/toolkit";
import { getPosts } from "../actions/postsActions";

const initialState = [];

export const getPostReducer = createReducer(initialState, (builder) => {
  builder.addCase(getPosts, (state, action) => {
    console.log("Action payload in reducer", action);
  });
});
