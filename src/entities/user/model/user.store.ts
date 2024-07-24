import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IUser,
  IUserState,
  IUserResponse,
  ICreateUser,
  IOauthResponse,
} from "./";
import {
  LoginRequest,
  RegisterRequest,
  getOAuthContext,
  getOAuthContextSpotify,
} from "@/shared/api/auth";
import { generateErrorFromResponse } from "@/shared/api";

import cookies from "js-cookie";

const initialState: IUserState = {
  user: null,
  isAuth: false,
  authStep: "login",
};

export const login = createAsyncThunk<
  IUserResponse,
  ICreateUser,
  { rejectValue: string }
>("user/login", async (payload: ICreateUser, thunkAPI) => {
  try {
    const { data } = await LoginRequest(payload);
    return data;
  } catch (e: unknown) {
    return thunkAPI.rejectWithValue(generateErrorFromResponse(e));
  }
});

export const register = createAsyncThunk<
  IUserResponse,
  ICreateUser,
  { rejectValue: string }
>("user/register", async (payload: ICreateUser, thunkAPI) => {
  try {
    const { data } = await RegisterRequest(payload);
    return data;
  } catch (e: unknown) {
    return thunkAPI.rejectWithValue(generateErrorFromResponse(e));
  }
});

export const getOAuthContextThunk = createAsyncThunk<
  IOauthResponse,
  string,
  { rejectValue: string }
>("user/getContext", async (token: string, thunkAPI) => {
  try {
    const { data } = await getOAuthContext(token);
    return data;
  } catch (e: unknown) {
    return thunkAPI.rejectWithValue(generateErrorFromResponse(e));
  }
});

export const getOAuthContextSpotifyThunk = createAsyncThunk<
  IOauthResponse,
  string,
  { rejectValue: string }
>("user/getContextSpotify", async (token: string, thunkAPI) => {
  try {
    const { data } = await getOAuthContextSpotify(token);
    return data;
  } catch (e: unknown) {
    return thunkAPI.rejectWithValue(generateErrorFromResponse(e));
  }
});

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
        cookies.set("auth-spot", JSON.stringify(action.payload));
        window.location.reload();
      })
      .addCase(login.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(login.rejected, (state, error) => {
        state.authLoading = false;
        state.authError = error.payload;
      }),
      builder
        .addCase(getOAuthContextThunk.fulfilled, (state, action) => {
          if (action.payload.user) {
            state.isAuth = true;
            state.user = action.payload.user;
            cookies.set("auth-spot", JSON.stringify(action.payload));
            window.location.reload();
          } else {
            state.authLoading = false;
            state.authError = null;
            state.authStep = "register-from-oauth";
            state.defaultUserCredentials = action.payload;
          }
        })
        .addCase(getOAuthContextThunk.rejected, (state, error) => {
          state.authLoading = false;
          state.authError = error.payload;
        })
        .addCase(getOAuthContextThunk.pending, (state) => {
          state.authLoading = true;
          state.authError = null;
          state.authStep = "redirecting";
        });
    builder
      .addCase(getOAuthContextSpotifyThunk.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.isAuth = true;
          state.user = action.payload.user;
          cookies.set("auth-spot", JSON.stringify(action.payload));
          window.location.hash = "";
          window.location.reload();
        } else {
          state.authLoading = false;
          state.authError = null;
          state.authStep = "register-from-oauth";
          state.defaultUserCredentials = action.payload;
        }
      })
      .addCase(getOAuthContextSpotifyThunk.rejected, (state, error) => {
        state.authLoading = false;
        state.authError = error.payload;
      })
      .addCase(getOAuthContextSpotifyThunk.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
        state.authStep = "redirecting";
      });
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.authLoading = false;
        cookies.set("auth-spot", JSON.stringify(action.payload));
        window.location.reload();
      })
      .addCase(register.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(register.rejected, (state, error) => {
        state.authLoading = false;
        state.authError = error.payload;
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
