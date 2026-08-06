const API_BASE_URL = "http://127.0.0.1:8000";

async function request(endpoint, data) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Something went wrong.");
  }

  return result;
}

export function signup(data) {
  return request("/auth/signup", data);
}

export function login(data) {
  return request("/auth/login", data);
}