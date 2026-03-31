import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  user: null,
  error: null,
  success: false,
};
const authSlice = createSlice({
  name: "authorization",
  initialState: initialState,
  reducers: {
    // signup
    signupRequest: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.loading = true;
      state.success = action.payload;
    },
    signupFail: (state, action) => {
      state.loading = true;
      state.success = false;
      state.error = action.payload;
    },
    // login
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      // localStorage.setItem("auth", JSON.stringify(true));
      // console.log(action.payload, "payload");
      // localStorage.setItem("token", action.payload?.token);
      state.success = action.payload;
      state.error = null;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // load user
    loaduserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    },
    // logout reducer
    logoutUserRequest: (state) => {
      state.loading = true;
    },
    logoutUserSuccess: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    },
    logoutUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const {
  signupRequest,
  signupSuccess,
  signupFail,
  loginRequest,
  loginSuccess,
  loginFailed,
  loaduserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFail,
} = authSlice.actions;
