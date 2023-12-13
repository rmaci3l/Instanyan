import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { authApi } from './authService';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store