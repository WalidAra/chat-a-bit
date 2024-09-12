import { Client } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Profile = {
  isAuth: boolean;
  user: Client | null;
};

const initialState: Profile = {
  isAuth: false,
  user: null,
};

const userSlice = createSlice({
  initialState,
  name: "client",
  reducers: {
    setProfile: (state, action: PayloadAction<Client>) => {
      state.isAuth = true;
      state.user = action.payload;
    },

    clearProfile: (state) => {
      state.isAuth = false;
      state.user = null;
    },
  },
});

export const { setProfile, clearProfile } = userSlice.actions;
export default userSlice.reducer;
