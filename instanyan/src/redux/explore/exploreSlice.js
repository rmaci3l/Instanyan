import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    searchTerm: '#cats',
    error: false,
    success: false,
}

const exploreSlice = createSlice({
    name: 'explore',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.searchTerm = action.payload
        },
    },
    extraReducers:{

    },
});

export const { setSearch } = exploreSlice.actions
export default exploreSlice.reducer