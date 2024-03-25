import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAsyncFriends = createAsyncThunk('friends/fetch', async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('access')}`,
            },
        };

        const response = await axios.get(`http://127.0.0.1:8000/api/profile/`, config);
        return response.data; // Assuming the response contains an array of friends
    } catch (error) {
        throw error; // Throw the error so it can be caught by the rejected action
    }
});

const initialState = {
    friends: [],
    friendsStatus: 'IDLE'
}

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncFriends.pending, (state, action) => {
                state.friendsStatus = 'LOADING';
            })
            .addCase(fetchAsyncFriends.fulfilled, (state, action) => {
                state.friends = action.payload;
                state.friendsStatus = 'SUCCEEDED';
            })
            .addCase(fetchAsyncFriends.rejected, (state, action) => {
                state.friendsStatus = 'FAILED';
            });
    }
});

export const getAllFriends = (state) => state.friends.friends;
export const getFriendsStatus = (state) => state.friends.friendsStatus;
export default friendsSlice.reducer;
