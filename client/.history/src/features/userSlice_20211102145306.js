/* holds all info about user
 *  data is displayed only when there is a user
 * using userSLice equivalent to user reducer */
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isSignedIn: false,
    userData: null,
    searchInput: "",
    data: null,
  },
  reducers: {
    setSignedIn: (state, action) => {
      state.setSignedIn = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setSignedIn, setUserData, setSearchInput, setData } =
  userSlice.actions;

export const selectSignedIn = (state) => state.user.isSignedIn;
export const selectUserData = (state) => state.user.userData;
export const selectSearchInput = (state) => state.user.searchInput;
export const selectData = (state) => state.user.data;

export default userSlice.reducer;
