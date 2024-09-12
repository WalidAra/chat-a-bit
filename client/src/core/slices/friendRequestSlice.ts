import { Client, FriendRequest } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Props = (Client & FriendRequest)[];

const initialState: Props = [];

export const friendRequest = createSlice({
  initialState,
  name: "requests",
  reducers: {
    setFriendRequests: (_state, action: PayloadAction<Props>) => {
      return action.payload;
    },
  },
});

export const { setFriendRequests } = friendRequest.actions;
export default friendRequest.reducer;
