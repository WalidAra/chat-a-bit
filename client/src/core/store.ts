import { configureStore } from "@reduxjs/toolkit";
import { userReducer, pendingReducer, friendRequestReducer } from "./slices";

const store = configureStore({
  reducer: {
    user: userReducer,
    pending: pendingReducer,
    friendRequest: friendRequestReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
