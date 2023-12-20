import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    explorePosts: [],
    exploreUsers: [],
    error: false,
    success: false,
}

const exploreSlice = createSlice({
    name: 'explore',
    initialState,
    reducers: {
        getPosts: (state, {payload}) => {
            state.explorePosts = payload.posts;
        },
        getUsers: (state, {payload}) => {
            state.exploreUsers = payload.users;
        }
    },
    extraReducers:{

    },
});

export const { getPosts, getUsers } = exploreSlice.actions
export default exploreSlice.reducer