import { configureStore } from "@reduxjs/toolkit";
import { userInfoSlice, tokenSlice } from "#/features";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    token: tokenSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
