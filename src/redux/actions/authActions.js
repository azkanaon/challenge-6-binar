import axios from "axios";
import { setUser, setToken } from "../reducers/authReducer";

export const getMe =
  (navigate, navigatePathSuccess, navigatePathError) =>
  async (dispatch, getState) => {
    try {
      let { token } = getState().auth;

      const response = await axios.get(
        `${import.meta.env.VITE_REACT_API_ADDRESS}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response.data;

      // Set the user state from API data
      dispatch(setUser(data));
      if (navigatePathSuccess) navigate(navigatePathSuccess);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // If token is not valid
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          if (navigatePathError) navigate(navigatePathError);
          return;
        }

        alert(error?.response?.data?.message);
        return;
      }

      alert(error?.message);
    }
  };

export const registerLoginWithGoogleAction =
  (accessToken, navigate) => async (dispatch) => {
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_REACT_API_ADDRESS}/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      dispatch(setToken(token));

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response.data.message);
        return;
      }
      alert(error.message);
    }
  };

export const logout = () => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
};

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_ADDRESS}/auth/login`,
      {
        email,
        password,
      }
    );
    const { data } = response.data;
    const { token } = data;

    // Save our token and global state
    dispatch(setToken(token));

    // Redirect to home
    navigate("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error?.response?.data?.message);
      return;
    }

    alert(error?.message);
  }
};

export const setTokenAction = (token) => (dispatch) => {
  dispatch(setToken(token));
};
