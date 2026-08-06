import axios from "axios";

const API = "http://127.0.0.1:8000";

export const deleteDocument = async (filename) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API}/documents/${encodeURIComponent(filename)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};