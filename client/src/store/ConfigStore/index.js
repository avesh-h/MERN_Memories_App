import { configureStore } from "@reduxjs/toolkit";
import { getPostReducer } from "../reducers/postsReducers";

const store = configureStore({
  reducer: {
    get: getPostReducer,
  },
});

export default store;
