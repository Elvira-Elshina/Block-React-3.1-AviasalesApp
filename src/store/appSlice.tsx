import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface aviasalesState {
  activeSort: string;
}

interface filterState {
  withoutTr: boolean;
  oneTransfer: boolean;
  twoTransfers: boolean;
  threeTransfers: boolean;
}

const initialState: aviasalesState = {
  activeSort: "Самый дешёвый",
};

const initialFilterState: filterState = {
  withoutTr: false,
  oneTransfer: false,
  twoTransfers: false,
  threeTransfers: false,
};

const mySlice = createSlice({
  name: "aviasales",
  initialState,
  reducers: {
    setActiveSort: (state, action) => {
      state.activeSort = action.payload;
    },
  },
});

const filterSlice = createSlice({
  name: "filterSlice",
  initialState: initialFilterState,
  reducers: {
    toggleCheckbox1: (state) => {
      state.withoutTr = !state.withoutTr;
    },
    toggleCheckbox2: (state) => {
      state.oneTransfer = !state.oneTransfer;
    },
    toggleCheckbox3: (state) => {
      state.twoTransfers = !state.twoTransfers;
    },
    toggleCheckbox4: (state) => {
      state.threeTransfers = !state.threeTransfers;
    },
    toggleAll: (state, action) => {
      const newValue = action.payload;
      state.withoutTr = newValue;
      state.oneTransfer = newValue;
      state.twoTransfers = newValue;
      state.threeTransfers = newValue;
    },
  },
});

export const { setActiveSort } = mySlice.actions;

export const {
  toggleCheckbox1,
  toggleCheckbox2,
  toggleCheckbox3,
  toggleCheckbox4,
  toggleAll,
} = filterSlice.actions;
export default mySlice.reducer;
export const filterReducer = filterSlice.reducer;
