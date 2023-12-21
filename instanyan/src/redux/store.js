import { configureStore } from '@reduxjs/toolkit';
import { authReducer, profileReducer, popUpReducer, postReducer,
         profileApi, authApi, postApi } from './'

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        popup: popUpReducer,
        posts: postReducer,
        [authApi.reducerPath] : authApi.reducer,     
        [profileApi.reducerPath] : profileApi.reducer,
        [postApi.reducerPath] : postApi.reducer
    },
    middleware: (gDM) =>
    gDM().concat(authApi.middleware)
    .concat(profileApi.middleware)
    .concat(postApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store