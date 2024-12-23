import axios from "axios";

// Get token from localStorage
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication token is missing. Please log in.");
  }
  return token;
};

// Base configuration for API requests
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization header dynamically
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API calls
export const createBooking = async (bookingData) => {
  const response = await apiClient.post("/bookings", bookingData);
  return response.data;
};

export const fetchPaginatedBookings = async (page = 1, limit = 10) => {
  const response = await apiClient.get(`/bookings`, {
    params: { page, limit },
  });
  return response.data;
};

export const fetchUserBookings = async (userId) => {
  const response = await apiClient.get(`/bookings/user/${userId}`);
  return response.data;
};

export const fetchBookingById = async (id) => {
  const response = await apiClient.get(`/bookings/${id}`);
  return response.data;
};

export const updateBooking = async (id, bookingData) => {
  const response = await apiClient.put(`/bookings/${id}`, bookingData);
  return response.data;
};

export const deleteBooking = async (id) => {
  const response = await apiClient.delete(`/bookings/${id}`);
  return response.data;
};

export const downloadMonthlyBookings = async (year, month) => {
  try {
    const response = await apiClient.get(
      `/bookings/download/${year}/${month}`,
      {
        responseType: "blob", // Important for handling file downloads
      }
    );

    // Create a download link for the file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `bookings_${year}_${month}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    throw new Error("Failed to download bookings: " + error.message);
  }
};
