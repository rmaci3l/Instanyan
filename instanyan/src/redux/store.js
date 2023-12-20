import { configureStore } from '@reduxjs/toolkit';
import { authReducer, profileReducer, popUpReducer, feedReducer, exploreReducer, 
         feedApi, exploreApi, profileApi, authApi } from './'

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        feed: feedReducer,
        popup: popUpReducer,
        explore: exploreReducer,
        [authApi.reducerPath] : authApi.reducer,     
        [profileApi.reducerPath] : profileApi.reducer,
        [feedApi.reducerPath] : feedApi.reducer,
        [exploreApi.reducerPath] : exploreApi.reducer
    },
    middleware: (gDM) =>
    gDM().concat(authApi.middleware)
    .concat(profileApi.middleware)
    .concat(feedApi.middleware)
    .concat(exploreApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store