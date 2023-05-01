import { configureStore } from "@reduxjs/toolkit";
import { userInfoSlice, tokenSlice, chatsSlice } from "#/features";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    token: tokenSlice,
    chats: chatsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
