import axios from "axios";

// Retrieve the token from local storage
const getToken = () => localStorage.getItem("token");

// Fetch VIP tour data
export const fetchVIP = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/vip`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle error appropriately
    throw error.response?.data || error.message;
  }
};

// Update VIP tour data
export const updateVIPTour = async (data) => {
  try {
    // API call
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/vip/update`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    // Handle error appropriately
    throw error.response ? error.response.data : error.message;
  }
};
