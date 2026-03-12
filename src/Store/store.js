import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./Slices/UserSlice/UserSlice";
import { messengerReducer } from "./Slices/messengerOpenSlicer/messengerOpenSlicer";
import { logedUserReducer } from "./Slices/LogedUserSlice/LogedUserSlice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        messengerOpen: messengerReducer,
        logedUser: logedUserReducer,
    }
})