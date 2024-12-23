import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNile, updateNileTour } from "./nileApi";

// Async thunk for fetching Nile Tour
export const getNile = createAsyncThunk(
  "nile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchNile();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk for updating Nile Tour
export const updateNile = createAsyncThunk(
  "nile/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateNileTour(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const NileSlice = createSlice({
  name: "nile",
  initialState: {
    nileTour: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Nile Tour
      .addCase(getNile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nileTour = action.payload;
      })
      .addCase(getNile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Nile Tour
      .addCase(updateNile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateNile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nileTour = { ...state.NileTour, ...action.payload };
      })
      .addCase(updateNile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default NileSlice.reducer;
