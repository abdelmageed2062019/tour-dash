import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchReviews,
  updateReviewVisibility,
  deleteReview,
  fetchReviewsByTour,
  fetchReviewsByUser,
} from "./ReviewsApi";

// Async Thunks for API Calls

export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchReviews();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const toggleReviewVisibility = createAsyncThunk(
  "reviews/toggleReviewVisibility",
  async (id, { rejectWithValue }) => {
    try {
      return await updateReviewVisibility(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeReview = createAsyncThunk(
  "reviews/removeReview",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteReview(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getReviewsByTour = createAsyncThunk(
  "reviews/getReviewsByTour",
  async (tourId, { rejectWithValue }) => {
    try {
      return await fetchReviewsByTour(tourId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getReviewsByUser = createAsyncThunk(
  "reviews/getReviewsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      return await fetchReviewsByUser(userId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Reviews Slice

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    reviewsByTour: [],
    reviewsByUser: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all reviews
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle review visibility
      .addCase(toggleReviewVisibility.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleReviewVisibility.fulfilled, (state, action) => {
        state.loading = false;
        const updatedReview = action.payload;
        state.reviews = state.reviews.map((review) =>
          review.id === updatedReview.id ? updatedReview : review
        );
      })
      .addCase(toggleReviewVisibility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete a review
      .addCase(removeReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeReview.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg; // ID of deleted review
        state.reviews = state.reviews.filter(
          (review) => review.id !== deletedId
        );
      })
      .addCase(removeReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch reviews by tour
      .addCase(getReviewsByTour.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviewsByTour.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewsByTour = action.payload;
      })
      .addCase(getReviewsByTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch reviews by user
      .addCase(getReviewsByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviewsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewsByUser = action.payload;
      })
      .addCase(getReviewsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = reviewsSlice.actions;

export default reviewsSlice.reducer;
