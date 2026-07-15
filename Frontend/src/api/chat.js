import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const askQuestion = async (question) => {
  const response = await axios.post(`${API_URL}/chat`, {
    question,
  });

  return response.data;
};