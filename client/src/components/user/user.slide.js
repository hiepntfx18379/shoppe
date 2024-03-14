import { createSlice } from "@reduxjs/toolkit";

const userSlide = createSlice({
  name: "user",
  initialState: {
    infoUser: null,
    receiver: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.infoUser = action.payload;
    },
    setRecerver: (state, action) => {
      state.receiver = action.payload;
    },
  },
});

export default userSlide;

export const { setUser, setRecerver } = userSlide.actions;

export const infoUser = (state) => state.user.infoUser;
export const infoRecerver = (state) => state.user.receiver;
