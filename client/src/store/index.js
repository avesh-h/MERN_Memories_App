import { configureStore } from "@reduxjs/toolkit";
import { createPostsSlice } from "./posts";

const store = configureStore({
  reducer: {
    post: createPostsSlice.reducer,
  },
});

export default store;
