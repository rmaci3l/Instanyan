import { createSlice } from '@reduxjs/toolkit';
import { likePost } from '../reduxActions';

const initialState = {
    loading: false,
    error: null,
    message: null,
    posts: [],
    currentPost: {id: "", likes: "", liked:""},
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, {payload}) => {
            state.posts = payload.posts;
            state.message = payload.message;
            state.error = payload.error;
        }
    },
    extraReducers: {
        [likePost.fulfilled] : (state, action) => {
            state.currentPost = action.payload.data;
            const post = state.posts.find(p => p.id === state.currentPost.id);
            post.likes = state.currentPost.likes;
            post.liked = state.currentPost.liked;
        }
    },
});

export const { setPosts } = postSlice.actions
export default postSlice.reducer