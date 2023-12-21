import { createSlice } from '@reduxjs/toolkit';
import { updateProfile, createPost, followProfile } from '../reduxActions';

const initialState = {
    loading: false,
    error: null,
    message: null,
    profileDetails: {},
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
            state.exploreProfiles = null;
        },
        setExplore: (state, {payload}) => {
            state.exploreProfiles = payload.users;
            state.message = payload.message;
            state.error = payload.error;
        }
    },
    extraReducers: {

    },
});

export const { setProfile, setExplore } = profileSlice.actions
export default profileSlice.reducer