import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index";

export const getAllPosts = createAsyncThunk("user/getPosts", async (page) => {
  const allposts = await api.fetchPosts(page);
  // console.log("Getposts=======>", allposts);
  return allposts;
});

export const getPostsBySearch = createAsyncThunk(
  "user/searchPosts",
  async (searchQuery) => {
    try {
      const { data } = await api.fetchPostsBySearch(searchQuery);
      // console.log("Searched Post=====>", data.data);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createPost = createAsyncThunk(
  "user/createPost",
  async (postData) => {
    // console.log("Form Data", postData);

    const singlePost = await api.createPost(postData);
    return singlePost;
  }
);

export const updatePost = createAsyncThunk(
  "user/updatePost",
  async (fullData) => {
    const { id, update } = fullData;
    const updatedData = await api.updatePost(id, update);
    return updatedData;
  }
);

export const deletePost = createAsyncThunk(
  "user/deletePost",
  async (deleteId) => {
    await api.deletePost(deleteId);
  }
);

export const likePost = createAsyncThunk("user/likePost", async (Id) => {
  await api.likePost(Id);
});

export const createPostsSlice = createSlice({
  name: "POSTS",
  initialState: {
    getCall: false,
    posts: [],
    currentPage: null,
    numberOfPages: null,
  },
  reducers: {
    // getallPosts() {},
    // createPost() {},
    getPostsCall(state) {
      state.getCall = !state.getCall;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
        return state;
      })
      .addCase(getPostsBySearch.fulfilled, (state, action) => {
        state.posts = action.payload;
        return state;
      })
      .addCase(createPost.fulfilled)
      .addCase(updatePost.fulfilled)
      .addCase(deletePost.fulfilled)
      .addCase(likePost.fulfilled);
  },
});

export const postActions = createPostsSlice.actions;
