import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface IChat {
  username: string;
  profile: string;
  room_id: string;
}

export interface ChatsState {
  chats: IChat[];
}

const initialState: ChatsState = {
  chats: [],
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<IChat[]>) => {
      state.chats = action.payload;
    },
  },
});

export const { setChats } = chatsSlice.actions;

export default chatsSlice.reducer;
