import { createSlice } from "@reduxjs/toolkit";
import { logedUserAPI } from "./LogedUserAPI";
import { changeLogedUser } from "./ChangeLogedUser";

export const logedUserSlice = createSlice({
    name: "logedUser",
    initialState: {},
    reducers: {
        setSeen(state, { payload }) {
            state.messages = state.messages.map(m =>
                m.friendId === payload
                    ? { ...m, seen: false }
                    : m
            )
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logedUserAPI.fulfilled, (state, action) => {
            return action.payload
        })
            .addCase(logedUserAPI.rejected, (state) => {
                console.error("NotFound Loged User")
            })
            .addCase(changeLogedUser.fulfilled, (state, action) => {
                return { ...state, messages: action.payload || [] };
            });
    }
})

export const logedUserSelect = state => state.logedUser
export const logedUserReducer = logedUserSlice.reducer
export const { setSeen } = logedUserSlice.actions