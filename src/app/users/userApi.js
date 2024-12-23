import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication token is missing. Please log in.");
  }
  return token;
};

export const fetchUsers = async () => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users`,
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

export const fetchUser = async (id) => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users/${id}`,
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

export const createUser = async (user) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users`,
      user,
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

export const updateUser = async (id, user) => {
  try {
    const token = getToken();
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/users/${id}`,
      user,
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

export const deleteUser = async (id) => {
  try {
    const token = getToken();
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/users/${id}`,
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
