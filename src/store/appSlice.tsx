import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//интерфейсы
interface aviasalesState {
  activeSort: string;
  sortedTickets: any[] | null;
  withoutTr: boolean;
  oneTransfer: boolean;
  twoTransfers: boolean;
  threeTransfers: boolean;
}

interface filterState {
  withoutTr: boolean;
  oneTransfer: boolean;
  twoTransfers: boolean;
  threeTransfers: boolean;
}

interface searchTicketsStateType {
  loading: boolean;
  searchResponse: any[] | null;
  error: string | null;
  stop: boolean;
}

//стейты
const initialState: aviasalesState = {
  activeSort: "Самый дешёвый",
  sortedTickets: null,
  withoutTr: true,
  oneTransfer: false,
  twoTransfers: false,
  threeTransfers: false,
};

const initialFilterState: filterState = {
  withoutTr: false,
  oneTransfer: false,
  twoTransfers: false,
  threeTransfers: false,
};

//слайсы
const mySlice = createSlice({
  name: "aviasales",
  initialState,
  reducers: {
    setActiveSort: (state, action) => {
      state.activeSort = action.payload;
    },
    setTransferFilters: (state, action) => {
      const { withoutTr, oneTransfer, twoTransfers, threeTransfers } =
        action.payload;
      state.withoutTr = withoutTr;
      state.oneTransfer = oneTransfer;
      state.twoTransfers = twoTransfers;
      state.threeTransfers = threeTransfers;
    },
    sortTickets: (state, action) => {
      const tickets = action.payload;
      if (!tickets) {
        state.sortedTickets = null;
        return;
      }

      const sorted = [...tickets];
      // фильтр с пересадкаим
      const filteredTickets = sorted.filter((ticket) => {
        const stopsTo = ticket.segments[0].stops.length;

        // фильтр по билетам
        return (
          (stopsTo === 0 && state.withoutTr) ||
          (stopsTo === 1 && state.oneTransfer) ||
          (stopsTo === 2 && state.twoTransfers) ||
          (stopsTo === 3 && state.threeTransfers)
        );
      });

      // сортировка по отфилтьтрованным билетам
      switch (state.activeSort) {
        case "Самый дешёвый":
          state.sortedTickets = filteredTickets.sort(
            (a, b) => a.price - b.price
          );
          break;
        case "Самый быстрый":
          state.sortedTickets = filteredTickets.sort((a, b) => {
            const durationA = a.segments[0].duration;
            const durationB = b.segments[0].duration;
            return durationA - durationB;
          });
          break;
        case "Оптимальный":
          state.sortedTickets = filteredTickets.sort((a, b) => {
            const durationA = a.segments[0].duration;
            const durationB = b.segments[0].duration;
            const stopsA = a.segments[0].stops.length;
            const stopsB = b.segments[0].stops.length;

            const normalizedPriceA = a.price / 10000;
            const normalizedPriceB = b.price / 10000;
            const normalizedDurationA = durationA / 1000;
            const normalizedDurationB = durationB / 1000;

            const weightA = normalizedPriceA + normalizedDurationA + stopsA;
            const weightB = normalizedPriceB + normalizedDurationB + stopsB;

            return weightA - weightB;
          });
          break;
        default:
          state.sortedTickets = filteredTickets;
      }
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

const searchTicketsState: searchTicketsStateType = {
  loading: false,
  searchResponse: [],
  error: null,
  stop: false,
};

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const searchResponse = await fetch(
        "https://aviasales-test-api.kata.academy/search"
      );

      if (!searchResponse.ok) {
        throw new Error("Не удалось получить searchId");
      }

      const { searchId } = await searchResponse.json();
      let stop = false;

      while (!stop) {
        const ticketsResponse = await fetch(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
        );

        if (!ticketsResponse.ok) {
          if (ticketsResponse.status === 500) {
            continue;
          }
          throw new Error("Не удалось получить билеты");
        }

        const ticketsData = await ticketsResponse.json();
        dispatch(searchTicketsSlice.actions.updateTickets(ticketsData.tickets));
        stop = ticketsData.stop;
      }

      return { stop: true };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const searchTicketsSlice = createSlice({
  name: "searchID",
  initialState: searchTicketsState as searchTicketsStateType,
  reducers: {
    updateTickets: (state, action) => {
      state.searchResponse = state.searchResponse
        ? [...state.searchResponse, ...action.payload]
        : action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.stop = action.payload.stop;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setActiveSort, sortTickets, setTransferFilters } =
  mySlice.actions;

export const {
  toggleCheckbox1,
  toggleCheckbox2,
  toggleCheckbox3,
  toggleCheckbox4,
  toggleAll,
} = filterSlice.actions;

export default mySlice.reducer;

export const filterReducer = filterSlice.reducer;
export const searchReducer = searchTicketsSlice.reducer;
