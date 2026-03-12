import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const usersFetch = createAsyncThunk("users/usersFetch", async () => {
    try {
        const response = await axios.get("http://localhost:3010/users")
        return response.data
    }
    catch {
        throw new Error("Somthing wrong in data")
    }
})