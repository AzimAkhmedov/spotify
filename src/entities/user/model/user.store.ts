import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState, IUserResponse, ICreateUser } from "./";
import { LoginRequest } from "@/shared/api/auth";

const initialState: IUserState = {
  user: null,
  isAuth: false,
};

export const login = createAsyncThunk<IUserResponse, ICreateUser>(
  "user/login",
  async (payload: ICreateUser) => {
    const { data } = await LoginRequest(payload);
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;      
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.authLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(login.rejected, (state) => {
        state.authLoading = false;
        state.authError = "Invalid email or password";
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
