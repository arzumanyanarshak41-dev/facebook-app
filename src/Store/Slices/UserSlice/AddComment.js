import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addComment = createAsyncThunk("users/addComment",
    async ({ whoId, photoId, newComment }) => {
        const response = await axios.get(`http://localhost:3010/users/${whoId}`)
        const photos = response.data.photos.map((el => el.id == photoId ? {
            ...el,
            comments: [...el.comments, newComment]
        } : el))
        await axios.patch(`http://localhost:3010/users/${whoId}`, {
            photos
        });
        return {
            whoId,
            photoId,
            newComment
        }
    }
)
