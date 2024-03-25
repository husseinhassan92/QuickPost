import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    searchResults: [],
    searchStatus: 'idle'
}

export const fetchAsyncSearch = createAsyncThunk('search/fetch', async ({ keyword }) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/profiles/search/?first_name=${keyword}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.getItem("access")}`,
                Accept: "application/json",
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
});

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearSearch: (state, action) => {
            state.searchResults = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncSearch.pending, (state, action) => {
                state.searchStatus = 'loading';
            })
            .addCase(fetchAsyncSearch.fulfilled, (state, action) => {
                state.searchResults = action.payload;
                state.searchStatus = 'succeeded';
            })
            .addCase(fetchAsyncSearch.rejected, (state, action) => {
                state.searchStatus = 'failed';
            })
    }
});

export const { clearSearch } = searchSlice.actions;
export const getSearchResults = (state) => state.search.searchResults;
export const getSearchStatus = (state) => state.search.searchStatus;
export default searchSlice.reducer;
