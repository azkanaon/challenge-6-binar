import axios from "axios";
import { setUser } from "../reducers/authReducer";

export const getMe = () => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // If token is not valid
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        return;
      }

      alert(error?.response?.data?.message);
      return;
    }

    alert(error?.message);
  }
};
