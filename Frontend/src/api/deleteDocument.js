import axios from "axios";

const API = "http://127.0.0.1:8000";

export const deleteDocument = async (filename) => {
  const response = await axios.delete(
    `${API}/documents/${encodeURIComponent(filename)}`
  );

  return response.data;
};