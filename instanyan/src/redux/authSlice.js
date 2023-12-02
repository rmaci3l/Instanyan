import {createSlice} from '@reduxjs/toolkit'
import { registerUser, userLogin } from './authAction'

const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

const initialState = {
    loading: false,
    userInfo: {}, // user object
    userToken: null, // JWT
    error: null,
    success: false, // for registration monitor
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        // login reducer
        [userLogin.pending] : (state) => {
            state.loading = true
            state.error = null
        },
        [userLogin.fulfilled] : (state, {payload}) =>{
            state.loading = false
            state.userInfo = payload
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
    },
})

export default authSlice.reducer