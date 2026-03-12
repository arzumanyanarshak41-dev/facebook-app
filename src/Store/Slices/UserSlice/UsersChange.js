import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const usersChange = createAsyncThunk("users/usersChange",
    async ({ userid, logedid, photoid }) => {
        const result = await axios.get(`http://localhost:3010/users/${userid}`);
        const chosedPhoto = result.data.photos.find(el => el.id === photoid);

        const alreadyLiked = chosedPhoto.likes.includes(logedid);

        const newLikes = alreadyLiked
            ? chosedPhoto.likes.filter(el => el !== logedid)
            : [...chosedPhoto.likes, logedid];

        const newNot = !alreadyLiked ? {
            id: Date.now().toString(),
            userid: logedid,
            status: "like",
            linkId: photoid,
            time: new Date().toISOString()
        } : null;

        const newPhotos = result.data.photos.map(el =>
            el.id === photoid ? { ...el, likes: newLikes } : el
        );

        const patchResult = await axios.patch(
            `http://localhost:3010/users/${userid}`,
            {
                photos: newPhotos,
                notifications: newNot
                    ? [...result.data.notifications, newNot]
                    : result.data.notifications
            }
        );

        return patchResult.data;
    }
);