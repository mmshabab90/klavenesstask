import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import contractReducer from "../features/contractsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    contracts: contractReducer,
  },
});
