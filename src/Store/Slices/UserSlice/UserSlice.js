import { createSlice } from "@reduxjs/toolkit";
import { usersFetch } from "./API";
import { usersChange } from "./UsersChange";
import { addComment } from "./AddComment";
import { changeProfileImage } from "./ChangeProfileImage";
import { ChangeProfileCoverPhoto } from "./ChangeProfileCoverPhoto";

export const userSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        addPost(state, { payload }) {
            state.find(user => user.id == payload.userId).photos?.push(payload.post)
        },
        setUsers(state, { payload }) {
            return payload
        }
    },
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
            })
            .addCase(changeProfileImage.rejected, (state, action) => {
                console.error(action.payload);
            })
            .addCase(changeProfileImage.fulfilled, (state, action) => {
                return state.map(user =>
                    user.id === action.payload.id ? action.payload : user
                );
            })
            .addCase(ChangeProfileCoverPhoto.rejected, (state, action) => {
                console.error(action.payload);
            })
            .addCase(ChangeProfileCoverPhoto.fulfilled, (state, action) => {
                return state.map(user =>
                    user.id === action.payload.id ? action.payload : user
                );
            })
    }
})
export const selectUsers = state => state.users
export const usersReducer = userSlice.reducer
export const { addPost, setUsers } = userSlice.actions