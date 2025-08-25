import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as postsAPI from "./postsAPI";

export const getPosts = createAsyncThunk("posts/fetchAll", postsAPI.getPosts);
export const createPost = createAsyncThunk("posts/add", postsAPI.createPost);
export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ id, data }) => await postsAPI.updatePost(id, data)
);
export const deletePost = createAsyncThunk("posts/delete", postsAPI.deletePost);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const idx = state.items.findIndex(
          (p) => p._id === action.payload.data._id
        );
        if (idx !== -1) state.items[idx] = action.payload.data;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.meta.arg);
      });
  },
});

export default postsSlice.reducer;
