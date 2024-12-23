import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import usersReducer from "./users/userSlice";
import toursReducer from "./tours/toursSlice";
import bookingsReducer from "./bookings/bookingSlice";
import reviewsReducer from "./reviews/ReviewsSlice";
import vipReducer from "./vip/vipSlice";
import nileReducer from "./nile/nileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    tours: toursReducer,
    bookings: bookingsReducer,
    reviews: reviewsReducer,
    vip: vipReducer,
    nile: nileReducer,
  },
});

export default store;
