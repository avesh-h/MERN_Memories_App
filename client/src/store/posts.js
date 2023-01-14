import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index";

export const getAllPosts = createAsyncThunk("user/getPosts", async (page) => {
  const allposts = await api.fetchPosts(page);
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

export const getSinglePost = createAsyncThunk(
  "users/singlePost",
  async (id) => {
    try {
      const { data } = await api.getSinglePost(id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createPost = createAsyncThunk(
  "user/createPost",
  async (postData, thunkAPI) => {
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
    const deleted = await api.deletePost(deleteId);
    return deleted;
  }
);

export const likePost = createAsyncThunk(
  "user/likePost",
  async (Id, thunkAPI) => {
    const likedPost = await api.likePost(Id);

    return likedPost;
    //We can do use own dispatch in react redux toolkit.
    // thunkAPI.dispatch(getAllPosts());
  }
);

export const commentPost = createAsyncThunk(
  "user/commentPost",
  async ({ finalComment, id }) => {
    try {
      const comment = await api.commentPost(finalComment, id);
      return comment.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const createPostsSlice = createSlice({
  name: "POSTS",
  initialState: {
    getCall: false,
    post: {},
    posts: [],
    currentPage: null,
    numberOfPages: null,
    isLoading: false,
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
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        return state;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
        state.isLoading = false;
        return state;
      })
      .addCase(getSinglePost.pending, (state, action) => {
        state.isLoading = true;
        return state;
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
        return state;
      })
      .addCase(getPostsBySearch.pending, (state) => {
        state.isLoading = true;
        return state;
      })
      .addCase(getPostsBySearch.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
        return state;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts = [...state.posts, action.payload];
        return state;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload.data._id ? action.payload.data : post
        );
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const deletedState = state.posts.filter(
          (post) => post._id !== action.payload.data._id
        );
        state.posts = deletedState;
        return state;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const likedState = state.posts.map((post) =>
          post._id === action.payload.data._id ? action.payload.data : post
        );
        state.posts = likedState;
        return state;
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        const commentState = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            //Change the post that just received the comment...
            return action.payload;
          } else {
            //or return the posts normally
            return post;
          }
        });
        state.posts = commentState;
        return state;
      });
  },
});

export const postActions = createPostsSlice.actions;
