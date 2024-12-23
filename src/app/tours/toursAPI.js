import axios from "axios";

const token = localStorage.getItem("token");

export const fetchTours = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/tours`,
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

export const fetchTour = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/tours/${id}`,
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

export const createTour = async (tour) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/tours`,
      tour,
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

export const updateTour = async (id, tour) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/tours/${id}`,
      tour,
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

export const deleteTour = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/tours/${id}`,
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
