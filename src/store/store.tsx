import { configureStore } from "@reduxjs/toolkit";
import mySliceReducer, {
  filterReducer,
  requestReducer,
  searchReducer,
} from "./appSlice";

export const store = configureStore({
  reducer: {
    mySliceReducer: mySliceReducer,
    filterReducer: filterReducer,
    requestReducer: requestReducer,
    searchReducer: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
