import {createSlice} from '@reduxjs/toolkit'
import { registerUser } from './authAction'

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
        // register user
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