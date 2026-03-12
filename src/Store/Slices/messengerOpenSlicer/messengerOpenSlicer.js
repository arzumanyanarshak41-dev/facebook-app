import { createSlice } from "@reduxjs/toolkit";

export const setMessengerOpen = createSlice({
    name: "messoengerOpen",
    initialState: false,
    reducers: {
        openMess(state) {
            return !state
        }
    }
})
export const selectMessOpen = state => state.messengerOpen
export const messengerReducer = setMessengerOpen.reducer
export const { openMess } = setMessengerOpen.actions