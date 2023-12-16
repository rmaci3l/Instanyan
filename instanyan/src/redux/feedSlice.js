import { createSlice } from '@reduxjs/toolkit';
import { likePost } from './reduxActions';


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
    extraReducers: {
        [likePost.fulfilled] : (state, action) => {
            const { id, likes } = action.payload.data;
            // to-do: on fulfill, update the post "likes" quantity
            // with the data received from the server.
        }
    },
});

export const { getFeed } = feedSlice.actions
export default feedSlice.reducer