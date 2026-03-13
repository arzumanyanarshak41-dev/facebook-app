import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addComment = createAsyncThunk("users/addComment",
    async ({ whoId, photoId, newComment }) => {
        const response = await axios.get(`http://localhost:3010/users/${whoId}`);

        const newPhotos = response.data.photos.map(el =>
            el.id === photoId
                ? { ...el, comments: [...el.comments, newComment] }
                : el
        );

        const newNot = newComment.sender !== whoId
            ? {
                id: Date.now().toString(),
                userid: newComment.sender,
                status: "comment",
                text: newComment.text,
                linkId: photoId,
                time: new Date().toISOString()
            }
            : null;

        const newNotifications = newNot
            ? [...response.data.notifications, newNot]
            : response.data.notifications;
        await axios.patch(`http://localhost:3010/users/${whoId}`, {
            photos: newPhotos,
            notifications: newNotifications
        });
        return {
            whoId,
            photoId,
            newComment
        };
    }
);

