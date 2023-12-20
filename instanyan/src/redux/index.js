import feedReducer from "./feed/feedSlice";
import { feedApi } from "./feed/feedService";
import exploreReducer from "./explore/exploreSlice"
import { exploreApi } from "./explore/exploreService";
import profileReducer from "./profile/profileSlice";
import { profileApi } from "./profile/profileService";
import authReducer from "./auth/authSlice";
import { authApi } from "./auth/authService";
import popUpReducer from "./popup/popupSlice"


export {
    feedReducer,
    profileReducer,
    authReducer,
    popUpReducer,
    exploreReducer,
    authApi,
    profileApi,
    feedApi,
    exploreApi,
};