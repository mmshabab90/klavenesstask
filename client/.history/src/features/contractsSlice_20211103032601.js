/* holds all info about contracts
 * using userSLice equivalent to contracts reducer */
import { createSlice } from "@reduxjs/toolkit";

const contractsSlice = createSlice({
  name: "contracts",
  initialState: {
    isLoading: true,
    selectedContract: null,
    edited: false,
    deleted: false,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSelectedContract: (state, action) => {
      state.selectedContract = action.payload;
    },
    setEdited: (state, action) => {
      state.edited = action.payload;
    },
    setDeleted: (state, action) => {
      state.deleted = action.payload;
    },
  },
});

export const { setIsLoading, setSelectedContract, setEdited, setDeleted } =
  contractsSlice.actions;

export const selectIsLoading = (state) => state.contracts.isLoading;
export const selectSelectedContract = (state) =>
  state.contracts.selectedContract;
export const selectEdited = (state) => state.contracts.edited;
export const selectDeleted = (state) => state.contracts.deleted;

export default contractsSlice.reducer;
