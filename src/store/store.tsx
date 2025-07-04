import { configureStore } from "@reduxjs/toolkit";
import mySliceReducer, { filterReducer, searchReducer } from "./appSlice";

export const store = configureStore({
  reducer: {
    mySliceReducer: mySliceReducer,
    filterReducer: filterReducer,
    searchReducer: searchReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
