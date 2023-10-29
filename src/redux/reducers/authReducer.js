import { createSlice } from "@reduxjs/toolkit";

// Initial state, it is like [..., ...] the first variable of useState but it is globally
const initialState = {
  user: {},
};

// Define the slice, the slice is consist of initial state and the setter of the global state
const authSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Export the function to set the state
export const { setUser } = authSlice.actions;

// Export the global state, so the variable in the initialState will be available in any component
export default authSlice.reducer;
