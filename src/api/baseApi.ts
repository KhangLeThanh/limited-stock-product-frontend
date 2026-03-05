// src/api/baseApi.ts
import axios from "axios";
import { getToken } from "../utils/token";

const baseApi = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
});

// Attach JWT token automatically if present
baseApi.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default baseApi;
