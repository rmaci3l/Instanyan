import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin, updateProfile } from '../reduxActions'

const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

const initialState = {
    loading: false,
    userInfo: {}, // user object
    userToken: userToken, // JWT
    profileUpdated: false,
    error: null,
    success: false, // for registration monitor
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) =>{
            localStorage.removeItem('userToken')
            state.loading = false
            state.userInfo = {}
            state.userToken = null
            state.error = null
        },
        setCredentials: (state, {payload}) => {
            state.userInfo = payload.userInfo
        },
        setProfileUpdated: (state, action) => {
            state.profileUpdated = action.payload;
        }
    },
    extraReducers: {
        // login reducer
        [userLogin.pending] : (state) => {
            state.loading = true
            state.error = null
        },
        [userLogin.fulfilled] : (state, {payload}) =>{
            state.loading = false
            state.userInfo = payload.userInfo
            state.userToken = payload.userToken
        },
        [userLogin.rejected] : (state, {payload}) => {
            state.loading = false
            state.error = payload
        },

        // register user reducer
        [registerUser.pending] : (state) =>{
            state.loading = true
            state.error = null
        },
        [registerUser.fulfilled] : (state, {payload}) =>{
            state.loading = false
            state.success = true // successful registration!
        },
        [registerUser.rejected] : (state, {payload}) => {
            state.loading = false
            state.error = payload
        },
        // Update profile reducer
        [updateProfile.fulfilled] : (state, action) =>{
            state.profileUpdated = true;
        }
    },
})

export const {logout, setCredentials, setProfileUpdated} = authSlice.actions;
export default authSlice.reducer