import { createSlice } from "@reduxjs/toolkit";

// Initial state, it is like [..., ...] the first variable of useState but it is globally
const initialState = {
  popular: [],
  searchResult: [],
  getDetailData: [],
  video: [],
};

// Define the slice, the slice is consist of initial state and the setter of the global state
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setPopular: (state, action) => {
      state.popular = action.payload;
    },
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    setGetDetailData: (state, action) => {
      state.getDetailData = action.payload;
    },
    setVideo: (state, action) => {
      state.video = action.payload;
    },
  },
});

// Export the function to set the state
export const {
  setPopular,
  setDetailMovie,
  setSearchResult,
  setGetDetailData,
  setVideo,
} = movieSlice.actions;

// Export the global state, so the variable in the initialState will be available in any component
export default movieSlice.reducer;
