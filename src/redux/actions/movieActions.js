import axios from "axios";
import {
  setPopular,
  setSearchResult,
  setGetDetailData,
  setVideo,
  setUser,
} from "../reducers/movieReducer";

export const getPopularMovies =
  (setErrors, errors) => async (dispatch, getState) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IkZhaG1pIEFsZmFyZXphIiwiZW1haWwiOiJmYWxmYXJlemExQGJpbmFyYWNhZGVteS5vcmciLCJpYXQiOjE2OTg0NTg0MTB9.ypFdXQffU1K5hljbOFMr48Vt5PZqFvpXSfzhZDIrEls";
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_API_ADDRESS}/movie/popular`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response.data;

      // kode
      dispatch(setPopular(data));

      setErrors({ ...errors, isError: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors({
          ...errors,
          isError: true,
          message: error?.response?.data?.message || error?.message,
        });
        return;
      }

      alert(error?.message);
      setErrors({
        ...errors,
        isError: true,
        message: error?.message,
      });
    }
  };

export const getSearchMovie =
  (query, setErrors, errors) => async (dispatch, getState) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IkZhaG1pIEFsZmFyZXphIiwiZW1haWwiOiJmYWxmYXJlemExQGJpbmFyYWNhZGVteS5vcmciLCJpYXQiOjE2OTg0NTg0MTB9.ypFdXQffU1K5hljbOFMr48Vt5PZqFvpXSfzhZDIrEls";
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_API_ADDRESS
        }/search/movie?page=1&query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response.data;
      dispatch(setSearchResult(data));
      setErrors({ ...errors, isError: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors({
          ...errors,
          isError: true,
          message: error?.response?.data?.message || error?.message,
        });
        return;
      }

      alert(error?.message);
      setErrors({
        ...errors,
        isError: true,
        message: error?.message,
      });
    }
  };

export const getDetailMovie =
  (errors, setErrors, id) => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem("token");
      dispatch(setGetDetailData([]));
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_API_ADDRESS}/movie/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        const { data } = response.data;
        
        if (id) {
          dispatch(setGetDetailData(data));
        }

      setErrors({ ...errors, isError: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors({
          ...errors,
          isError: true,
          message: error?.response?.data?.message || error?.message,
        });
        return;
      }

      alert(error?.message);
      setErrors({
        ...errors,
        isError: true,
        message: error?.message,
      });
    }
  };

export const getVideo =
  (errors, setErrors, id, page) => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_API_ADDRESS}/movie/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response.data;

      if (page == "detail" || page == "hero") {
        dispatch(setVideo(data.videos));
      }
      if (page == null) {
        dispatch(setVideo([]));
      }
      setErrors({ ...errors, isError: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors({
          ...errors,
          isError: true,
          message: error?.response?.data?.message || error?.message,
        });
        return;
      }

      alert(error?.message);
      setErrors({
        ...errors,
        isError: true,
        message: error?.message,
      });
    }
  };

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
