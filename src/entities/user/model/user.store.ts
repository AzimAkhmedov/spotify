import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState } from "./";

const initialState: IUserState = {
  user: null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isAuth = true;
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
