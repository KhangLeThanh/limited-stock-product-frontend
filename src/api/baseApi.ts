// src/api/baseApi.ts
import axios from "axios";

const baseApi = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
});

baseApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default baseApi;
