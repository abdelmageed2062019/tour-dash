import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchVIP, updateVIPTour } from "./vipAPI";

// Async thunk for fetching VIP Tour
export const getVIP = createAsyncThunk(
  "vip/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchVIP();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk for updating VIP Tour
export const updateVIP = createAsyncThunk(
  "vip/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateVIPTour(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const vipSlice = createSlice({
  name: "vip",
  initialState: {
    vipTour: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch VIP Tour
      .addCase(getVIP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVIP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vipTour = action.payload;
      })
      .addCase(getVIP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update VIP Tour
      .addCase(updateVIP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateVIP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vipTour = { ...state.vipTour, ...action.payload };
      })
      .addCase(updateVIP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default vipSlice.reducer;
