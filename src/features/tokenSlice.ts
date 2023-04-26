import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface tokenState {
  refresh: string | null;
  access: string | null;
}

const initialState: tokenState = {
  refresh: null,
  access: null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<tokenState>) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
