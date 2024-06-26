import { configureStore } from "@reduxjs/toolkit";
import { userReducer as user } from "@/entities/user";

const store = configureStore({
  reducer: {
    user,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;