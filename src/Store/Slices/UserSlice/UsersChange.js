import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const usersChange = createAsyncThunk("users/usersChange",
    async ({ userid, logedid, photoid }) => {
        const result = await axios.get(`http://localhost:3010/users/${userid}`)
        const chosedPhoto = result.data.photos.find((el) => el.id === photoid)
        let newLikes = []
        if (chosedPhoto.likes.includes(logedid)) {
            newLikes = chosedPhoto.likes.filter(el => el !== logedid)
        } else {
            newLikes = [...chosedPhoto.likes, logedid];
        }
        const newPhotos = result.data.photos.map(el =>
            el.id == photoid ? { ...el, likes: newLikes } : el
        )
        const patchResult = await axios.put(
            `http://localhost:3010/users/${userid}`,
            { ...result.data, photos: newPhotos }
        );
        return patchResult.data
    })