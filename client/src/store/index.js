import { configureStore } from "@reduxjs/toolkit";
import { createPostsSlice } from "./posts";
import { authSlice } from "./auth";

const store = configureStore({
  reducer: {
    post: createPostsSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
