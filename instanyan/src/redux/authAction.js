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