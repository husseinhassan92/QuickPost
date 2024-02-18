import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchResults: [],
    searchStatus: 'idle'
}

export const fetchAsyncSearch = createAsyncThunk('search/fetch', async ({ query, pageNumber}) => {
    try {
        const response = await fetch(`https://dummyapi.io/data/v1/search?query=${query}&page=${pageNumber}&limit=20`, {
            headers: {
                'app-id': '65d08a4661de33117cf6503f'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.data;
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
})

export const { clearSearch } = searchSlice.actions;
export const getSearchResults = (state) => state.search.searchResults;
export const getSearchStatus = (state) => state.search.searchStatus;
export default searchSlice.reducer;
