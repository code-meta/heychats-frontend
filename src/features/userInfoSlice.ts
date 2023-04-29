import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserInfoState {
  id: string | null;
  username: string | null;
  email: string | null;
  profile: string | null;
}

const initialState: UserInfoState = {
  id: null,
  username: null,
  email: null,
  profile: null,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfoState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.profile = action.payload.profile;
    },
  },
});

export const { setUser } = userInfoSlice.actions;

export default userInfoSlice.reducer;
