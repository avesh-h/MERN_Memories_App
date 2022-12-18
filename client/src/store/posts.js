import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index";

export const getAllPosts = createAsyncThunk("user/getPosts", async () => {
  const allposts = await api.fetchPosts();
  return allposts;
});

export const createPost = createAsyncThunk(
  "user/createPost",
  async (postData) => {
    console.log("Form Data", postData);

    await api.createPost(postData);
  }
);

export const updatePost = createAsyncThunk(
  "user/updatePost",
  async (fullData) => {
    // console.log("Updated Data in thunk", fullData);
    const { id, update } = fullData;
    await api.updatePost(id, update);
  }
);

export const deletePost = createAsyncThunk(
  "user/deletePost",
  async (deleteId) => {
    // console.log("delete id in thunk", deleteId);
    await api.deletePost(deleteId);
  }
);

export const likePost = createAsyncThunk("user/likePost", async (Id) => {
  console.log("like id in thunk", Id);
  await api.likePost(Id);
});

export const createPostsSlice = createSlice({
  name: "POSTS",
  initialState: [],
  reducers: {
    // getallPosts() {},
    // createPost() {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.fulfilled, (state, action) => {
        // state = [...state, ...action.payload];
        state = action.payload;
        return state;
      })
      .addCase(createPost.fulfilled)
      .addCase(updatePost.fulfilled)
      .addCase(deletePost.fulfilled)
      .addCase(likePost.fulfilled);
  },
});

export const postActions = createPostsSlice.actions;
