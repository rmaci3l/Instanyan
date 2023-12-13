import axios from 'axios'
import {createAsyncThunk} from '@reduxjs/toolkit'

const backendURL = 'http://localhost:5000'

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