import axios from "axios";
import {
  setPopular,
  setSearchResult,
  setGetDetailData,
  setVideo,
} from "../reducers/movieReducer";

export const getPopularMovies =
  (setErrors, errors) => async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
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
      const { token } = getState().auth;
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
      const { token } = getState().auth;
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
      const { token } = getState().auth;
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
