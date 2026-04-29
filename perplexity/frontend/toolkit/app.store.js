import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../src/features/auth/toolkit/auth.slice"
export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
