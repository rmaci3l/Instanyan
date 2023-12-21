import profileReducer from "./profile/profileSlice";
import { profileApi } from "./profile/profileService";
import authReducer from "./auth/authSlice";
import { authApi } from "./auth/authService";
import popUpReducer from "./popup/popupSlice";
import postReducer from "./post/postSlice";
import { postApi } from "./post/postService";

export {   
    profileReducer,
    authReducer,
    popUpReducer,
    postReducer,
    authApi,
    profileApi,
    postApi,
};