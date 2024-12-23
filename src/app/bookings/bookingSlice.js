import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBooking,
  fetchPaginatedBookings,
  fetchUserBookings,
  fetchBookingById,
  updateBooking,
  deleteBooking,
  downloadMonthlyBookings,
} from "./bookingAPI";

// Thunks for asynchronous actions
export const createBookingAsync = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      return await createBooking(bookingData);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchPaginatedBookingsAsync = createAsyncThunk(
  "bookings/fetchPaginatedBookings",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      return await fetchPaginatedBookings(page, limit);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchUserBookingsAsync = createAsyncThunk(
  "bookings/fetchUserBookings",
  async (userId, { rejectWithValue }) => {
    try {
      return await fetchUserBookings(userId);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchBookingByIdAsync = createAsyncThunk(
  "bookings/fetchBookingById",
  async (id, { rejectWithValue }) => {
    try {
      return await fetchBookingById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateBookingAsync = createAsyncThunk(
  "bookings/updateBooking",
  async ({ id, bookingData }, { rejectWithValue }) => {
    try {
      console.log(id, bookingData);
      return await updateBooking(id, bookingData);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteBookingAsync = createAsyncThunk(
  "bookings/deleteBooking",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteBooking(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const downloadMonthlyBookingsAsync = createAsyncThunk(
  "bookings/downloadMonthlyBookings",
  async ({ year, month }, { rejectWithValue }) => {
    try {
      await downloadMonthlyBookings(year, month);
      return { year, month };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Booking slice
const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    booking: null,
    pagination: {
      total: 0,
      pages: 0,
      page: 1,
      limit: 10,
      totalAmount: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearBookingState: (state) => {
      state.booking = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(createBookingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBookingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(createBookingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Paginated Bookings
      .addCase(fetchPaginatedBookingsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedBookingsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
        state.pagination = {
          total: action.payload.meta.total,
          pages: action.payload.meta.pages,
          page: action.payload.meta.page,
          limit: action.payload.meta.limit,
          totalAmount: action.payload.meta.totalAmount,
        };
      })
      .addCase(fetchPaginatedBookingsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch User Bookings
      .addCase(fetchUserBookingsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookingsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookingsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Booking by ID
      .addCase(fetchBookingByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(fetchBookingByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Booking
      .addCase(updateBookingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(updateBookingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Booking
      .addCase(deleteBookingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBookingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.filter(
          (booking) => booking._id !== action.meta.arg
        );
      })
      .addCase(deleteBookingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Download Monthly Bookings
      .addCase(downloadMonthlyBookingsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadMonthlyBookingsAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(downloadMonthlyBookingsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBookingState } = bookingSlice.actions;

export default bookingSlice.reducer;
