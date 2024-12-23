import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTours,
  fetchTour,
  createTour,
  updateTour,
  deleteTour,
} from "./toursAPI";

const initialState = {
  tours: [],
  tour: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchToursAsync = createAsyncThunk(
  "tours/fetchTours",
  async (_, { rejectWithValue }) => {
    try {
      const tours = await fetchTours();
      return tours;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTourAsync = createAsyncThunk(
  "tours/fetchTour",
  async (id, { rejectWithValue }) => {
    try {
      const tour = await fetchTour(id);
      console.log(tour);

      return tour;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createTourAsync = createAsyncThunk(
  "tours/createTour",
  async (tour, { rejectWithValue }) => {
    try {
      const newTour = await createTour(tour);
      return newTour;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateTourAsync = createAsyncThunk(
  "tours/updateTour",
  async ({ id, tour }, { rejectWithValue }) => {
    try {
      const updatedTour = await updateTour(id, tour);
      return updatedTour;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTourAsync = createAsyncThunk(
  "tours/deleteTour",
  async (id, { rejectWithValue }) => {
    try {
      await deleteTour(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const tourSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchToursAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToursAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload;
      })
      .addCase(fetchToursAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTourAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTourAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tour = action.payload;
      })
      .addCase(fetchTourAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tourSlice.reducer;
