import { createAsyncThunk } from "@reduxjs/toolkit";

export const ChangeProfileCoverPhoto = createAsyncThunk("user/ChangeProfileCoverPhoto",
    async ({ userId, coverPhoto }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3010/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({
          Cover_Photo: coverPhoto,
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
)