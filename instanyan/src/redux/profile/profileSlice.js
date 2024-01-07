import { createSlice } from '@reduxjs/toolkit';
import { updateProfile, createPost, followProfile } from '../reduxActions';
import { logout } from '../auth/authSlice';

const initialState = {
    loading: false,
    error: null,
    message: null,
    profileDetails: {},
    follows: null,
    exploreProfiles: []
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: { 
        setProfile: (state, {payload}) => {
            state.profileDetails = payload.profile;
            state.message = payload.message;
            state.error = payload.error;
            state.follows = payload.follows;
        },
        setExplore: (state, {payload}) => {
            state.exploreProfiles = payload.users;
            state.message = payload.message;
            state.error = payload.error;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout, (state, action) => {
                // Reset state on logout.
                state.profileDetails = {};
                state.follows = null;
                state.exploreProfiles = [];
                state.message = null;
            })
            .addCase(followProfile.fulfilled, (state, {payload}) => {
                state.follows = payload.data.follows;
            });
    }
});

export const { setProfile, setExplore } = profileSlice.actions
export default profileSlice.reducer