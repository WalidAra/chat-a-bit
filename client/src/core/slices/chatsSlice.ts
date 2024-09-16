import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "@/types";

const initialState: {
  chats: (Chat & { message: string })[];
} = {
  chats: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat: (
      state,
      action: PayloadAction<(Chat & { message: string })[]>
    ) => {
      state.chats.push(...action.payload);
    },
  },
});

export default chatsSlice.reducer;
export const { addChat } = chatsSlice.actions;
