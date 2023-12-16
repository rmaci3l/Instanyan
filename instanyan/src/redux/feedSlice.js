import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    loading: false,
    feedPosts: [],
    error: null,
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        getFeed: (state, {payload}) => {
            state.feedPosts = payload.feed;
        }
    },
    extraReducers: {},
});

export const { getFeed } = feedSlice.actions
export default feedSlice.reducer