import { createSlice } from "@reduxjs/toolkit";
import { usersFetch } from "./API";
import { usersChange } from "./UsersChange";
import { addComment } from "./AddComment";

export const userSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(usersFetch.rejected, () => {
            console.error("API Fail")
        })
            .addCase(usersFetch.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(usersChange.fulfilled, (state, action) => {
                return state.map(el =>
                    el.id == action.payload.id ? action.payload : el
                )
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const { whoId, photoId, newComment } = action.payload;
                const user = state.find(u => u.id === whoId);
                if (user) {
                    const photo = user.photos.find(p => p.id === photoId);
                    if (photo) {
                        photo.comments.push(newComment);
                    }
                }
            });
    }
})
export const selectUsers = state => state.users
export const usersReducer = userSlice.reducer
// export const { } = userSlice.actions