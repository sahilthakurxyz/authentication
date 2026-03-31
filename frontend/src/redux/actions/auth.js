import { axiosInstance, BACKEND_URL } from "../../constant";
import {
  loadUserFail,
  loaduserRequest,
  loadUserSuccess,
  loginFailed,
  loginRequest,
  loginSuccess,
  logoutUserFail,
  logoutUserRequest,
  logoutUserSuccess,
  signupFail,
  signupRequest,
  signupSuccess,
} from "../reducers/auth";
import axios from "axios";
export const signupUser = (userData) => async (dispatch) => {
  dispatch(signupRequest());

  try {
    const data = await axios.post(`${BACKEND_URL}/register`, userData, {
      withCredentials: true,
    });
    dispatch(signupSuccess(data?.user));
  } catch (error) {
    dispatch(signupFail(error?.response?.data));
  }
};
export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const data = await axios.post(
      `${BACKEND_URL}/login`,
      {
        email,
        password,
      },
      { withCredentials: true },
    );

    dispatch(loginSuccess(data?.success));
  } catch (error) {
    dispatch(loginFailed(error?.response?.data));
  }
};

export const loadUser = () => async (dispatch) => {
  dispatch(loaduserRequest());
  try {
    const response = await axiosInstance.get("/loaduser", {
      withCredentials: true,
    });
    dispatch(loadUserSuccess(response?.data));
  } catch (error) {
    dispatch(loadUserFail(error?.response?.data));
    console.log(error);
  }
};
// Logout

export const logout = () => async (dispatch) => {
  dispatch(logoutUserRequest());
  try {
    const response = await axios.get(`${BACKEND_URL}/me/logout`, {
      withCredentials: true,
    });

    dispatch(logoutUserSuccess());
  } catch (error) {
    dispatch(logoutUserFail());
    console.log(`there is an error ${error}`);
  }
};
