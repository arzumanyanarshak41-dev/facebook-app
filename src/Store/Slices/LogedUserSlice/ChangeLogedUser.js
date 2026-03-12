import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const changeLogedUser = createAsyncThunk(
    "messages/sendMessage",
    async ({ senderId, receiverId, text, time }, thunkAPI) => {
        const state = thunkAPI.getState().logedUser;
        const currentMessages = state.messages || [];

        let updatedMessages = currentMessages.map(m =>
            m.friendId === receiverId
                ? { ...m, message: [...m.message, { sender: "me", text, time }] }
                : m
        );

        if (!currentMessages.find(m => m.friendId === receiverId)) {
            updatedMessages = [
                ...currentMessages,
                { friendId: receiverId, message: [{ sender: "me", text, time }] }
            ];
        }

        await axios.patch(`http://localhost:3010/users/${state.id}`, {
            messages: updatedMessages
        });

        const receiver = (await axios.get(`http://localhost:3010/users/${receiverId}`)).data;
        const receiverMessagesArray = receiver.messages || [];
        let receiverMessages = receiverMessagesArray.find(m => m.friendId === senderId); if (receiverMessages) {
            receiverMessages.message.push({ sender: "him", text, time });
            receiverMessages.seen = true;
        } else {
            receiverMessagesArray.push({ friendId: senderId, message: [{ sender: "him", text, time }], seen: true });
        }
        await axios.patch(`http://localhost:3010/users/${receiverId}`, {
            messages: receiverMessagesArray
        });

        return updatedMessages;
    }
);