import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logedUserAPI = createAsyncThunk("logedUser/logedUserAPI", async () => {
    const id = localStorage.getItem("ID")
    const response = await axios.get(`http://localhost:3010/users/${id}`)
    return response.data
})