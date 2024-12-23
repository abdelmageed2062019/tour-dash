import axios from "axios";

const token = localStorage.getItem("token");

// Fetch all reviews
export const fetchReviews = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update review visibility
export const updateReviewVisibility = async (id) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/reviews/${id}/visibility`,
      {}, // No body needed for toggling visibility
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a review
export const deleteReview = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/reviews/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Fetch all reviews for a specific tour
export const fetchReviewsByTour = async (tourId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/reviews/${tourId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Fetch all reviews made by a specific user
export const fetchReviewsByUser = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/reviews/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
