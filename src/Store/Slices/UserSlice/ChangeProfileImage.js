import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeProfileImage = createAsyncThunk(
  "user/changeProfileImage",
  async ({ userId, base64Image }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3010/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({
          profile_image: base64Image,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при изменении фото профиля");
      }

      const data = await response.json();
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);