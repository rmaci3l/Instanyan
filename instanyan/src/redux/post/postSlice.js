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
        },
        setSingle: (state, {payload}) => {
            state.posts = [];
            state.posts[0] = payload.posts;
            state.message = payload.message;
            state.error = payload.error;
        },
    },
    extraReducers: {
        [likePost.fulfilled] : (state, {payload}) => {
            state.currentPost = payload.data;
            const post = state.posts.find(p => p.id === state.currentPost.id);
            post.likes = state.currentPost.likes;
            post.liked = state.currentPost.liked;           
           
        }
    },
});

export const { setPosts, setSingle } = postSlice.actions
export default postSlice.reducer