import { createSlice } from '@reduxjs/toolkit';
import { updateProfile, createPost } from './reduxActions';

const initialState = {
    loading: false,
    profileInfo: {},
    profilePosts: [],
    error: null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: { 
        setProfile: (state, {payload}) => {
            state.profileInfo = {...payload.profile.profile, message: undefined};
            state.profilePosts = payload.profile.posts;
        }
    },
    extraReducers: {

    },
});

export const { setProfile } = profileSlice.actions
export default profileSlice.reducer