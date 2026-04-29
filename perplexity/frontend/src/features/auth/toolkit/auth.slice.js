import { createSlice } from "@reduxjs/toolkit";
const initializeState = {
  user: null,
  loading: true,
  error: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initializeState,
  reducers: {
    setUserState: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { setUserState, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
