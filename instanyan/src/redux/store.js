import { configureStore } from '@reduxjs/toolkit';
import {authReducer, profileReducer, feedReducer, profileApi, authApi } from './'
import { feedApi } from './feedService';

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        feed: feedReducer,
        [authApi.reducerPath]: authApi.reducer,     
        [profileApi.reducerPath] : profileApi.reducer,
        [feedApi.reducerPath] : feedApi.reducer,
    },
    middleware: (gDM) =>
    gDM().concat(authApi.middleware)
    .concat(profileApi.middleware)
    .concat(feedApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store