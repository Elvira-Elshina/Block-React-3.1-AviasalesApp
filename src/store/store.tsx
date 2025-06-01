import { configureStore } from "@reduxjs/toolkit";
import mySliceReducer, { filterReducer } from "./appSlice";

export const store = configureStore({
  reducer: {
    mySliceReducer: mySliceReducer,
    filterReducer: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
