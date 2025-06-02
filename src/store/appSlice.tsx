import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

//интерфейсы
interface aviasalesState {
  activeSort: string;
}

interface filterState {
  withoutTr: boolean;
  oneTransfer: boolean;
  twoTransfers: boolean;
  threeTransfers: boolean;
}

interface searchTicketsStateType {
  loading: boolean;
  searchResponse: [] | null;
  error: string | null;
}

//стейты
const initialState: aviasalesState = {
  activeSort: "Самый дешёвый",
};

const initialFilterState: filterState = {
  withoutTr: false,
  oneTransfer: false,
  twoTransfers: false,
  threeTransfers: false,
};

const searchTicketsState: searchTicketsStateType = {
  loading: false,
  searchResponse: [],
  error: null,
};

const initialRequestsState = {
  result: [],
  status: "",
  error: "",
};

//слайсы
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

const requestSlice = createSlice({
  name: "request",
  initialState: initialRequestsState,
  reducers: {
    pending: (state) => {
      state.status = "loading";
      state.error = "error";
    },
    fulfilled: (state, action) => {
      state.status = "resolved";
      state.result = action.payload;
    },
    rejected: (state, action) => {},
  },
});

export const fetchTickets = createAsyncThunk(
  "request/fetchTickets",
  async function () {
    const response = await fetch(
      "https://aviasales-test-api.kata.academy/search"
    );

    const { searchId } = await response.json();

    const ticketsResponse = await fetch(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
    );
    const ticketsData = await ticketsResponse.json();

    return ticketsData.tickets;
  }
);

const searchTicketsSlice = createSlice({
  name: "searchID",
  initialState: searchTicketsState as searchTicketsStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action: PayloadAction<[]>) => {
        state.loading = false;
        state.searchResponse = action.payload;
      })
      .addCase(
        fetchTickets.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      );
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

export const { pending, fulfilled, rejected } = requestSlice.actions;

export default mySlice.reducer;

export const filterReducer = filterSlice.reducer;
export const requestReducer = requestSlice.reducer;
export const searchReducer = searchTicketsSlice.reducer;
