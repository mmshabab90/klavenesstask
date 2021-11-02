/* holds all info about user
 *  data is displayed only when there is a user
 * using userSLice equivalent to user reducer */
import { createSlice } from "@reduxjs/toolkit";

const userSLice = createSlice({
  name: "user",
  initialState: {
    isSignedIn: false,
    userData: null,
    searchInput: "",
    data: null,
  },
  reducers: {
    setSignedIn: (state, action) => {
      state.setSignedIn = acttion.payload;
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
