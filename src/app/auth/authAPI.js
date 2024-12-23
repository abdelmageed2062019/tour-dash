import axios from "axios";
export const login = async (credentials) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
