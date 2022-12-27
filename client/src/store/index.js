import { configureStore } from "@reduxjs/toolkit";
import { createPostsSlice } from "./posts";
import { authSLice } from "./auth";

const store = configureStore({
  reducer: {
    post: createPostsSlice.reducer,
    auth: authSLice.reducer,
  },
});

export default store;
