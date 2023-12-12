import { createSlice } from "@reduxjs/toolkit";

export const popUpSlice = createSlice({
    name: 'popup',
    initialState: {
        isVisible: false,
    },
    reducers: { 
    showPopUp: state => {
        state.isVisible = true;
    },
    hidePopUp: state => {
        state.isVisible = false;
    },
},
});

export const { showPopUp, hidePopUp } = popUpSlice.actions;
export default popUpSlice.reducer;