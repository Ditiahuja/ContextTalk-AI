import axios from "axios";

const API = "http://127.0.0.1:8000";

export const uploadPDF = async (file, mode) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("mode", mode);

  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API}/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};