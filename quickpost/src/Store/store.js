import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice'; 
import friendsReducer from './friendSlice'; // Corrected import path

export default configureStore({
  reducer: {
    search: searchReducer,
    friends: friendsReducer,
  }
});
