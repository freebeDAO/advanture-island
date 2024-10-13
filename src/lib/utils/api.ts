import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthToken = () => {
  // 从 localStorage 获取存储的 Bearer 令牌
  return localStorage.getItem("token");
};

export const apiRequest = async (
  endpoint: string,
  method: string = "GET",
  body: any = null
) => {
  const token = getAuthToken(); // 获取 Bearer 令牌
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await axios({
      url: `${API_URL}${endpoint}`,
      method,
      headers,
      data: body ? JSON.stringify(body) : null,
    });

    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};
