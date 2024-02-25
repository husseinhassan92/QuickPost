import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const fetchAsyncFriends = createAsyncThunk('friends/fetch', async () => {
    const response = await fetch(`https://retoolapi.dev/QT2pSl/data`);
    const data = await response.json();
    return data;
});

export const getAllFriends = (state) => state.friends.friends;
export const getFriendsStatus = (state) => state.friends.friendsStatus;
export default friendsSlice.reducer;
