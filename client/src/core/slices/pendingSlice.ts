import { Client, PendingRequest } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Props = (Client & PendingRequest)[];

const initialState: Props = [];

export const pendingSlice = createSlice({
  initialState,
  name: "pending",
  reducers: {
    setPendingRequests: (_state, action: PayloadAction<Props>) => {
      return action.payload;
    },
  },
});

export const { setPendingRequests } = pendingSlice.actions;
export default pendingSlice.reducer;
