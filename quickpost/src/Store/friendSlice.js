import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAsyncFriends = createAsyncThunk('friends/fetch', async () => {
    const response = await fetch(`https://dummyapi.io/data/v1/user?limit=200`, {
        headers: {
            'app-id': '65dba58a1351b838dbb92f32' // Replace 'your_app_id' with your actual app ID obtained from the dummyapi.io website
        }
    });
    const data = await response.json();
    return data.data; // Assuming the response has a 'data' property containing an array of friends
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
