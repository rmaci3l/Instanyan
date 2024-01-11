import { createSlice } from '@reduxjs/toolkit';
import { likePost, createPost } from '../reduxActions';
import { logout } from '../auth/authSlice';

const initialState = {
    loading: false,
    error: null,
    message: null,
    posts: [{}],
    postCreated : false,
    currentPost: {id: "", likes: "", liked:""}
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
            state.posts = payload.posts;
            state.message = payload.message;
            state.error = payload.error;
        },
        setPostCreated: (state, action) => {
            state.postCreated = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout, (state, action) => {
                // Reset state on logout
                state.posts = [{}];
                state.currentPost = {id: "", likes: "", liked: "" };
                state.message = "";
                state.error = null;
            })
            .addCase(likePost.fulfilled, (state, { payload }) => {
                // Handle likePost.fulfilled
                state.currentPost = payload.data;
                const post = state.posts.find(p => p.id === state.currentPost.id);
                if (post) {
                    post.likes = state.currentPost.likes;
                    post.liked = state.currentPost.liked;
                }
            })
            .addCase(createPost.fulfilled, (state, action) => {
                // Handle new post.
                state.postCreated = true;
                state.loading = false;
            })
            .addCase(createPost.pending, (state) => {
                state.loading = true;
            });
    }
});

export const { setPosts, setSingle, setPostCreated } = postSlice.actions
export default postSlice.reducer