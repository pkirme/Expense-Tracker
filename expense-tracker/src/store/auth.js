import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
  email: localStorage.getItem("email") || "",
  isLoggedIn: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      //   console.log(action.payload);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLoggedIn = !state.isLoggedIn;
    },

    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      state.token = "";
      state.email = "";
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
