import { createSlice } from '@reduxjs/toolkit'
import { popupReducer } from '../reduxActions'

// initialState

const initialState = {
    isNotificationVisible: false,
    isSearchVisibile: false
}

const popUpSlice = createSlice({
    name: 'popup',
    initialState,
    reducers:{
        toggleSearchPopup: (state) => {
            state.isSearchVisibile = !state.isSearchVisibile;
            state.isNotificationVisible && (state.isNotificationVisible = false);
        },
        toggleNotificationPopUp: (state) => {
            state.isNotificationVisible = !state.isNotificationVisible;
            state.isSearchVisibile && (state.isSearchVisibile = false);
        }
    },
    extraReducers: {
    
    },
})

export const { toggleSearchPopup, toggleNotificationPopUp } = popUpSlice.actions
export default popUpSlice.reducer


