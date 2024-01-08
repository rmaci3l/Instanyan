import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { backend_url } from "../constants/index";

const backendURL = `${backend_url}`


// Auth actions.

export const registerUser = createAsyncThunk(
    'auth/register',
    async({name, username, email, password}, {rejectWithValue}) =>{
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            const response = await axios.post(
                `${backendURL}/auth/register`,{name, username, email, password}, config
            );
            return response
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)


export const userLogin = createAsyncThunk(
    'auth/login',
    async({ email, password}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type' : 'application/json'
                },
            }
            const { data } = await axios.post(
                `${backendURL}/auth/login`, { email, password }, config
            );
            localStorage.setItem('userToken', data.userToken)
            return data
            
        } catch (error) {
            if (error.response){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)


// Profile actions.

export const updateProfile = createAsyncThunk(
    'api/user/profile',
    async(profileData, {getState, rejectWithValue}) => {
        const token = getState().auth.userToken;
        try {
            const config ={
                headers: {
                    'Content-Type' : 'application/json',
                    'authorization' : `Bearer ${token}`
                },
            }
            const response = await axios.post(
                `${backendURL}/api/user/profile`, profileData, config
            );
            console.log(response.data.message)
            return response            
            } catch (error) {
                if (error.response) {
                    return rejectWithValue(error.response.data.message)
                }else{
                    return rejectWithValue(error.message)
                }
            }
        }
)

export const followProfile = createAsyncThunk(
    'api/user/follow',
    async(username, { getState, rejectWithValue}) => {
        const token = getState().auth.userToken;
        try {
            const config ={
                headers: {
                    'Content-Type' : 'application/json',
                    'authorization' : `Bearer ${token}`
                },
            }
            const response = await axios.post(
                `${backendURL}/api/user/follow/${username}`, {}, config
            );
            console.log(response.data.message)
            return response
            } catch (error) {
                if (error.response) {
                    return rejectWithValue(error.response.data.message)
                } else {
                    return rejectWithValue(error.message)
                }
            }
        }   
)


// Post actions.

export const createPost = createAsyncThunk(
    'api/post/create',
    async(userPost, {getState, rejectWithValue}) => {
        const token = getState().auth.userToken;
        try {
            const config ={
                headers: {
                    'Content-Type' : 'application/json',
                    'authorization' : `Bearer ${token}`
                },
            }
            const response = await axios.post(
                `${backendURL}/api/post/create`, userPost, config
            );
            console.log(response.data.message)
            return response            
            } catch (error) {
                if (error.response) {
                    return rejectWithValue(error.response.data.message)
                }else{
                    return rejectWithValue(error.message)
                }
            }
        }
)


export const likePost = createAsyncThunk(
    'api/post/like',
    async(postId, { getState, rejectWithValue}) => {
        const token = getState().auth.userToken;
        try {
            const config ={
                headers: {
                    'Content-Type' : 'application/json',
                    'authorization' : `Bearer ${token}`
                },
            }
            const response = await axios.post(
                `${backendURL}/api/post/like/${postId}`, {}, config
            );
            return response
            } catch (error) {
                if (error.response) {
                    return rejectWithValue(error.response.data.message)
                } else {
                    return rejectWithValue(error.message)
                }
            }
        }   
)