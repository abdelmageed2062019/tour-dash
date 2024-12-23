import axios from "axios";

// Retrieve the token from local storage
const getToken = () => localStorage.getItem("token");

// Fetch Nile tour data
export const fetchNile = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/nile`, {
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

// Update Nile tour data
export const updateNileTour = async (data) => {
  try {
    // API call
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/nile/update`,
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
