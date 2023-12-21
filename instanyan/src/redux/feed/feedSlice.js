import { createSlice } from '@reduxjs/toolkit';
import { likePost } from '../reduxActions';


const initialState = {
    loading: false,
    feedPosts: [],
    currentPost: null,
    currentStatus: null,
    error: null,
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        getFeed: (state, {payload}) => {
            state.feedPosts = payload.feed.feed;
        }
    },
    extraReducers: {
        [likePost.fulfilled] : (state, action) => {
            const { id, likes, liked } = action.payload.data;
            state.currentPost = id;
            state.currentStatus = liked;
            const post = state.feedPosts.find(p => p.id === id);
            post.likes = likes;
            post.liked = liked;
        }
    },
});

export const { getFeed } = feedSlice.actions
export default feedSlice.reducer