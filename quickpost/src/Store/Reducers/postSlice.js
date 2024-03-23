import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/post/add/';

// Async thunk action to fetch posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  return response.data;
});

// Async thunk action to create a post
export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
  const response = await axios.post(`${API_BASE_URL}/posts`, postData);
  return response.data;
});

// Async thunk action to delete a post
export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
  await axios.delete(`${API_BASE_URL}/posts/${postId}`);
  return postId;
});

// Async thunk action to edit a post
export const editPost = createAsyncThunk('posts/editPost', async ({ postId, postData }) => {
  const response = await axios.put(`${API_BASE_URL}/posts/${postId}`, postData);
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Additional reducers can go here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const editedPost = action.payload;
        const existingPostIndex = state.posts.findIndex(post => post.id === editedPost.id);
        if (existingPostIndex !== -1) {
          state.posts[existingPostIndex] = editedPost;
        }
      });
  },
});

export default postsSlice.reducer;
